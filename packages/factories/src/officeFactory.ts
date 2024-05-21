import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Office } from './generated/types';
import { RequiredBaseEntity } from './types';
import { contactFactory } from './contactFactory';

export const officeFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Office>>({
  __typename: 'Office',
  contact: Factory.each(() => contactFactory.build()),
  name: Factory.each(() => faker.company.name()),
  servingName: Factory.each(() => faker.company.name()),
  brokerid: Factory.each(() => faker.string.uuid()),
});
