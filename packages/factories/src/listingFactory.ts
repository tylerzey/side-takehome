import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { Listing } from './generated/types';
import { RequiredBaseEntity } from './types';
import dayjs from 'dayjs';
import { propertyFactory } from './propertyFactory';
import { officeFactory } from './officeFactory';
import { addressFactory } from './addressFactory';
import { agentFactory } from './agentFactory';
import { schoolFactory } from './schoolFactory';
import { mlsFactory } from './mlsFactory';
import { geoFactory } from './geoFactory';
import { taxFactory } from './taxFactory';
import { coagentFactory } from './coagentFactory';
import { salesFactory } from './salesFactory';
import { associationFactory } from './associationFactory';

export const listingFactory = Factory.Sync.makeFactory<RequiredBaseEntity<Listing>>({
  __typename: 'Listing',
  resolvedValues: Factory.each(() => ({ favoritesCount: faker.number.int({ min: 0, max: 100 }) })),
  privateRemarks: Factory.each(() => faker.lorem.sentence()),
  showingContactName: Factory.each(() => faker.person.fullName()),
  mlsId: Factory.each((i) => i),
  showingContactPhone: Factory.each(() => faker.phone.number()),
  terms: Factory.each((i) => `terms${i}`),
  showingInstructions: Factory.each(() => faker.lorem.sentence()),
  leaseTerm: Factory.each((i) => `leaseTerm${i}`),
  disclaimer: Factory.each((i) => `disclaimer${i}`),
  originalListPrice: Factory.each(() => +faker.finance.amount(500000, 25000000)),
  agreement: Factory.each((i) => `agreement${i}`),
  listDate: Factory.each(() =>
    dayjs()
      .subtract(faker.number.int({ min: 1, max: 365 }), 'day')
      .toISOString()
  ),
  modified: Factory.each(() =>
    dayjs()
      .subtract(faker.number.int({ min: 1, max: 365 }), 'day')
      .toISOString()
  ),
  listPrice: Factory.each(() => faker.number.int({ min: 500000, max: 25000000 })),
  internetAddressDisplay: Factory.each(() => faker.datatype.boolean()),
  listingId: Factory.each((i) => `listingId${i}`),
  internetEntireListingDisplay: Factory.each(() => faker.datatype.boolean()),
  leaseType: Factory.each((i) => `leaseType${i}`),
  virtualTourUrl: Factory.each((i) => `virtualTourUrl${i}`),
  remarks: Factory.each((i) => `remarks${i}`),
  association: Factory.each(() => associationFactory.build()),
  sales: Factory.each(() => salesFactory.build()),
  coAgent: Factory.each(() => coagentFactory.build()),
  tax: Factory.each(() => taxFactory.build()),
  geo: Factory.each(() => geoFactory.build()),
  mls: Factory.each(() => mlsFactory.build()),
  photos: Factory.each((i) => [`photo${i}`]),
  school: Factory.each(() => schoolFactory.build()),
  agent: Factory.each(() => agentFactory.build()),
  address: Factory.each(() => addressFactory.build()),
  office: Factory.each(() => officeFactory.build()),
  property: Factory.each(() => propertyFactory.build()),
});
