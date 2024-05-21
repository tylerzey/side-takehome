import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Agent } from './generated/types';
import { RequiredBaseEntity } from './types';
import { contactFactory } from './contactFactory';

export const agentFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Agent>>({
  __typename: 'Agent',
  lastName: Factory.each(() => faker.person.lastName()),
  contact: Factory.each(() => contactFactory.build()),
  address: Factory.each(() => faker.location.streetAddress()),
  firstName: Factory.each(() => faker.person.firstName()),
  id: Factory.each(() => faker.string.uuid()),
});
