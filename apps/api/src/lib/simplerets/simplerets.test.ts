import axios from 'axios';
import { SimplyRETSClient } from './index';
import { vi, describe, beforeEach, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { fromPartial } from '@total-typescript/shoehorn';

vi.mock('axios');

describe('SimplyRETSClient', () => {
  let client: SimplyRETSClient;

  beforeAll(() => {
    process.env.SIMPLYRETS_API_URL = 'http://example.com';
    process.env.SIMPLYRETS_API_USERNAME = 'username';
    process.env.SIMPLYRETS_API_PASSWORD = 'password';
  });
  afterAll(() => {
    vi.resetModules();
  });

  beforeEach(() => {
    client = new SimplyRETSClient();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('queryProperties', () => {
    it('should make a GET request to the properties endpoint with the provided params', async () => {
      const params = { city: ['New York'] };
      const response = { data: [{ id: 1, city: 'New York' }] };
      (axios.get as any).mockResolvedValueOnce(response);

      const result = await client.queryProperties(fromPartial(params));

      expect(axios.get).toHaveBeenCalledWith(`${client.apiUrl}/properties`, {
        params,
        auth: { username: client.username, password: client.password },
      });
      expect(result).toEqual(response.data);
    });

    it('should throw an error if the request fails', async () => {
      const params = { city: ['New York'] };
      const error = new Error('Request failed');
      (axios.get as any).mockRejectedValueOnce(error);

      await expect(client.queryProperties(params)).rejects.toThrow(error);
    });
  });

  describe('getProperty', () => {
    it('should make a GET request to the property endpoint with the provided propertyId', async () => {
      const propertyId = 12345;
      const response = { data: { id: '12345', city: 'New York' } };
      (axios.get as any).mockResolvedValueOnce(response);

      const result = await client.getProperty({ propertyId });

      expect(axios.get).toHaveBeenCalledWith(`${client.apiUrl}/properties/${propertyId}`, {
        auth: { username: client.username, password: client.password },
      });
      expect(result).toEqual(response.data);
    });
  });
});
