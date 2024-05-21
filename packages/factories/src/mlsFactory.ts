import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Mls } from './generated/types';
import { RequiredBaseEntity } from './types';

export const mlsFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Mls>>({
  __typename: 'Mls',
  status: Factory.each(() => faker.lorem.sentence()),
  area: Factory.each(() => faker.lorem.sentence()),
  daysOnMarket: Factory.each(() => faker.number.int({ min: 1, max: 100 })),
  originalEntryTimestamp: Factory.each(() => faker.date.past().toISOString()),
  originatingSystemName: Factory.each(() => faker.lorem.sentence()),
  statusText: Factory.each(() => faker.lorem.sentence()),
  areaMinor: Factory.each(() => faker.lorem.sentence()),
});
