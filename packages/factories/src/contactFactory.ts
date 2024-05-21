import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Contact } from './generated/types';
import { RequiredBaseEntity } from './types';

export const contactFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Contact>>({
  __typename: 'Contact',
  email: Factory.each(() => faker.internet.email()),
  cell: Factory.each(() => faker.phone.number()),
  office: Factory.each(() => faker.phone.number()),
});
