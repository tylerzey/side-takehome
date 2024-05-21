import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Address } from './generated/types';
import { RequiredBaseEntity } from './types';

export const addressFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Address>>({
  __typename: 'Address',
  city: Factory.each(() => faker.location.city()),
  state: Factory.each(() => faker.location.state()),
  country: Factory.each(() => faker.location.country()),
  streetName: Factory.each(() => faker.location.street()),
  streetNumber: Factory.each(() => +faker.location.buildingNumber()),
  streetNumberText: Factory.each(() => faker.location.buildingNumber()),
  full: null,
  unit: null,
  crossStreet: null,
  postalCode: null,
});
