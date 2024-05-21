import { MapperKind, mapSchema } from '@graphql-tools/utils';
import { type GraphQLSchema } from 'graphql';

export const privateDirective = /* GraphQL */ `
  directive @private on FIELD_DEFINITION
`;
/**
 * Fields with the @private directive will always return null.
 *
 * This allows us to hide old fields from the schema without removing them. Or, to add new fields that are not yet ready for use.
 *
 * It also will allow us to add fields that are only available to certain admin users. in the future
 */
export const directivesPrivate = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isPrivate = fieldConfig.astNode?.directives?.some((d) => d.name.value === 'private');

      if (isPrivate) {
        fieldConfig.resolve = () => {
          return null;
        };
      }

      return fieldConfig;
    },
  });
