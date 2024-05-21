import { parse } from 'graphql';
import {
  NoSchemaIntrospectionCustomRule,
  NoUnusedFragmentsRule,
  NoUnusedVariablesRule,
  validate,
} from 'graphql/validation';
import { getGraphQLTotalQueryDepth } from 'graphql-operation-statistics';
import { getEnvVar } from '@side/utils/src/env/getEnvVar';

import { createAPISchema } from './createAPISchema';

const schema = createAPISchema();

/**
 * This function asserts that a query is valid.
 *
 * It does so by making sure that the query is not too deep and that it does not contain any unused fragments or variables.
 *
 * It also disables introspection in production.
 */
export const assertValidQuery = (query: string, depthLimit = 100) => {
  const totalDepth = getGraphQLTotalQueryDepth(query);
  if (totalDepth > depthLimit) {
    throw new Error('GraphQLDepthIsAboveLimit');
  }

  const rules = [NoUnusedFragmentsRule, NoUnusedVariablesRule];
  if (getEnvVar('STAGE') === 'production') {
    rules.push(NoSchemaIntrospectionCustomRule);
  }

  const errs = validate(schema, parse(query, { maxTokens: 3000 }), rules);
  if (errs.length > 0) {
    console.log(query);

    console.error(errs);
    throw new Error('GraphQLQueryIsDisallowed');
  }
};
