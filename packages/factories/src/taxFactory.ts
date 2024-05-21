import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Tax } from './generated/types';
import { RequiredBaseEntity } from './types';

export const taxFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Tax>>({
  taxAnnualAmount: Factory.each(() => faker.number.int({ min: 500, max: 10000 })),
  taxYear: Factory.each(() => faker.date.past().getFullYear()),
  id: Factory.each(() => faker.string.uuid()),
  __typename: 'Tax',
});
