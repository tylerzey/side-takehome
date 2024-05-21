import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Geo } from './generated/types';
import { RequiredBaseEntity } from './types';

export const geoFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Geo>>({
  __typename: 'Geo',
  county: Factory.each(() => faker.location.county()),
  lat: Factory.each(() => faker.location.latitude()),
  lng: Factory.each(() => faker.location.longitude()),
  marketArea: Factory.each(() => faker.location.city()),
  directions: Factory.each(() => faker.lorem.sentence()),
});
