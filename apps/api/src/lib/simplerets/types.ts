/**
 * This is a subset of the query parameters that are supported by the SimplyRETS API.
 * IMPROVE: add support and test coverage for the rest of the properties
 * @see https://docs.simplyrets.com/api/index.html#/Listings/get_properties
 */
export type QueryPropertiesParams = {
  cities?: string[];
  q?: string[];
};

export type GetPropertyParams = {
  propertyId: number;
};
