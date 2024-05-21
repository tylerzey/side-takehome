import { defaultMongoSchemaOptions } from '@api/lib/mongo/constants';
import type { SchemaDefinition } from 'mongoose';
import { Schema, model } from 'mongoose';

export type UserDB = {
  token: string;
  email: string;
};

const schemaDef: Required<SchemaDefinition<UserDB>> = {
  token: { type: String, required: true },
  email: { type: String, required: true },
};
const schema = new Schema<UserDB>(schemaDef, defaultMongoSchemaOptions);
export const userModel = model('users', schema);
