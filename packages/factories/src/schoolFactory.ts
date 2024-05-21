import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import type { School } from './generated/types';
import { RequiredBaseEntity } from './types';

export const schoolFactory = Factory.Sync.makeFactory<RequiredBaseEntity<School>>({
  middleSchool: Factory.each(() => faker.company.name()),
  highSchool: Factory.each(() => faker.company.name()),
  elementarySchool: Factory.each(() => faker.company.name()),
  __typename: 'School',
  district: Factory.each(() => faker.company.name()),
});
