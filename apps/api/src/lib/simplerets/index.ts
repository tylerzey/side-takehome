import { getEnvVar } from '@side/utils/src/env/getEnvVar';
import axios, { isAxiosError } from 'axios';
import { GetPropertyParams, QueryPropertiesParams } from './types';
import axiosRetry from 'axios-retry';
import { schemas } from './openapiZodClient';
import { stringify } from 'qs';

/**
 * We should only retry 429 and 500 errors as they are the only ones that are likely to be caused by rate limits or flakiness.
 *
 * 400 - Bad Request
 * 401 - Authentication Required
 * 403 - Authorization required
 * 429 - Too many requests
 * 500 - Internal Server Error
 */
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response?.status === 500 || error.response?.status === 429;
  },
});

/**
 * A client for consuming the SimplyRETS API.
 *
 * IMPROVE: we should share a get client.
 */
export class SimplyRETSClient {
  apiUrl: string;
  username: string;
  password: string;

  constructor() {
    this.apiUrl = getEnvVar('SIMPLYRETS_API_URL');
    this.username = getEnvVar('SIMPLYRETS_API_USERNAME');
    this.password = getEnvVar('SIMPLYRETS_API_PASSWORD');
  }

  async queryProperties(params: QueryPropertiesParams) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/properties?${stringify(params, { arrayFormat: 'repeat' })}`,
        {
          auth: { username: this.username, password: this.password },
        }
      );
      return schemas.Listing.array().parse(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }

  async getProperty(params: GetPropertyParams) {
    try {
      const response = await axios.get(`${this.apiUrl}/properties/${params.propertyId}`, {
        auth: { username: this.username, password: this.password },
      });
      return schemas.Listing.parse(response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.log('Property not found');
        return null;
      }
      console.error('Error fetching property:', error);
      throw error;
    }
  }
}
