import { merge } from '@side/utils/src/lang/merge';

import { typeDefs } from './typeDefs';
import { resolverObjects } from './resolvers';

export const combinedResolversAndTypes = () => {
  const resolvers = merge(resolverObjects);

  return {
    resolvers,
    typeDefs,
  };
};
