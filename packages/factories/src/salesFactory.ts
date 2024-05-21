import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Sales } from './generated/types';
import { RequiredBaseEntity } from './types';
import { agentFactory } from './agentFactory';
import { officeFactory } from './officeFactory';

export const salesFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Sales>>({
  __typename: 'Sales',
  closeDate: Factory.each(() => faker.date.recent().toISOString()),
  closePrice: Factory.each(() => +faker.finance.amount(500000, 25000000)),
  contractDate: Factory.each(() => faker.date.recent().toISOString()),
  agent: Factory.each(() => agentFactory.build()),
  office: Factory.each(() => officeFactory.build()),
});
