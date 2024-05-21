import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { listingTypeDefs } from '@api/entities/listings/listingTypeDefs';
import { privateDirective } from '@api/lib/graphql/directivePrivate';
import { rootSchemaTypeDef } from '@api/lib/graphql/root';
import type { IExecutableSchemaDefinition } from '@graphql-tools/schema';
import { userTypeDefs } from './users/userTypeDefs';
import { favoriteTypeDefs } from './favorites/favoriteTypeDefs';
/**
 * A lookup of all the typeDefs for the GraphQL API.
 */
export const typeDefs: IExecutableSchemaDefinition['typeDefs'] = [
  rootSchemaTypeDef,
  privateDirective,
  scalarTypeDefs,
  userTypeDefs,
  listingTypeDefs,
  favoriteTypeDefs,
];
