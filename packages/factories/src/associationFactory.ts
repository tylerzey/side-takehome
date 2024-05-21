import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Association } from './generated/types';
import { RequiredBaseEntity } from './types';

export const associationFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Association>>({
  __typename: 'Association',
  frequency: Factory.each(() => faker.lorem.sentence()),
  fee: Factory.each(() => faker.number.int({ min: 500, max: 10000 })),
  name: Factory.each(() => faker.lorem.sentence()),
  amenities: Factory.each(() => faker.lorem.sentence()),
});
