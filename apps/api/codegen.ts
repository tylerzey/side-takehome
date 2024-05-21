import scalars from '@side/scripts/scalars';

/** @type {import('graphql-config').IGraphQLConfig } */
export default {
  extensions: {
    codegen: {
      config: { scalars },
      generates: {
        '../../packages/factories/src/generated/types.ts': {
          config: {
            allowParentTypeOverride: true,
            enumsAsConst: true,
            useTypeImports: true,
          },
          plugins: ['typescript'],
        },
        '../../packages/utils/src/generated/types.ts': {
          config: {
            allowParentTypeOverride: true,
            enumsAsConst: true,
            nonOptionalTypename: true,
            useTypeImports: true,
          },
          plugins: ['typescript'],
        },
        './src/generated/resolvers.ts': {
          config: {
            allowParentTypeOverride: true,
            contextType: 'APIContext',
            enumsAsConst: true,
            makeResolverTypeCallable: true,
            optionalInfoArgument: true,
            useTypeImports: true,
            wrapFieldDefinitions: true,
          },
          plugins: [
            {
              add: {
                content: "import type {APIContext} from '../lib/createGraphQLContext';",
              },
            },
            'typescript',
            'typescript-resolvers',
          ],
        },
      },
    },
  },
  schema: 'schema.graphql',
};
