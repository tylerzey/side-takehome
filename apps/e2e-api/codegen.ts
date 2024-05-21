import type { CodegenConfig } from '@graphql-codegen/cli';
import scalars from '@side/scripts/scalars';

const config: CodegenConfig = {
  documents: ['src/**/*.ts', 'src/*.ts'],
  // for better experience with the watcher
  generates: {
    './src/generated/sdk.ts': {
      config: {
        allowParentTypeOverride: true,
        enumsAsConst: true,
        rawRequest: true,
        scalars: scalars,
        useTypeImports: true,
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
    },
  },
  ignoreNoDocuments: true,
  schema: '../api/schema.graphql',
};

export default config;
