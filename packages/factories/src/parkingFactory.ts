import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Parking } from './generated/types';
import { RequiredBaseEntity } from './types';

export const parkingFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Parking>>({
  __typename: 'Parking',
  leased: null,
  spaces: 1,
  description: Factory.each(() => faker.lorem.sentence()),
});
