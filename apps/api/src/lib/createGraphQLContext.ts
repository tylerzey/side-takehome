import { ForbiddenError } from '@casl/ability';
import type { AppAbility } from '@side/auth/src';
import { defineAbilityFor } from '@side/auth/src';
import { assertNotNil } from '@side/utils/src/assert/assertNotNil';
import type { Request } from 'express';
import { getDataLoaders, type IAPIDataLoaders } from './dataloaders';
import { MongoModels, mongoModels } from './mongo/mongoModels';
import { z } from 'zod';
import { UserDB } from '@api/entities/users/userModel';

export interface APIContext {
  ability: AppAbility;
  assertCan: (...args: Parameters<AppAbility['can']>) => void;
  loaders: IAPIDataLoaders;
  user: UserDB;
  models: MongoModels;
}
const authModel = z.object({ auth: z.object({ user: z.string(), password: z.string() }) });

/**
 * Creates a new context for the GraphQL API.
 *
 * We consume all resources needed in GraphQL from the context layer to avoid circular imports, keep query patterns consistent, and to keep the resolvers lean.
 *
 * IMPROVE: we should add request data here (origin ip and user agent), add an analytics reporter, and add a logger.
 */
export const createGraphQLContext = async (req: Request): Promise<APIContext> => {
  const loaders = getDataLoaders(mongoModels);
  const { auth } = authModel.parse(req);
  const user = await loaders.findUserByEmail.load(auth.user);

  assertNotNil(user, 'User from basic auth not found');
  const ability = defineAbilityFor(user);

  return {
    user,
    ability,
    assertCan: (...args) => ForbiddenError.from(ability).throwUnlessCan(...args),
    loaders,
    models: mongoModels,
  };
};
