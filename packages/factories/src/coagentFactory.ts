import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { CoAgent } from './generated/types';
import { RequiredBaseEntity } from './types';
import { contactFactory } from './contactFactory';

export const coagentFactory = Factory.Sync.makeFactory<RequiredBaseEntity<CoAgent>>({
  __typename: 'CoAgent',
  lastName: Factory.each(() => faker.person.lastName()),
  contact: Factory.each(() => contactFactory.build()),
  address: Factory.each(() => faker.location.streetAddress()),
  firstName: Factory.each(() => faker.person.firstName()),
  id: Factory.each(() => faker.string.uuid()),
});
