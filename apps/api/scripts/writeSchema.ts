import { writeFileSync } from 'fs';

import { printSchema } from 'graphql';

import { typeDefs } from '../src/entities/typeDefs';
import { makeExecutableSchema } from '@graphql-tools/schema';

(() => {
  writeFileSync(`${__dirname}/../schema.graphql`, printSchema(makeExecutableSchema({ typeDefs })));
})();
