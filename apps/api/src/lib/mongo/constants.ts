import type { SchemaOptions } from 'mongoose';

export const defaultMongoSchemaOptions: SchemaOptions<any> = {
  strict: true,
  strictQuery: true,
  timestamps: false,
};
