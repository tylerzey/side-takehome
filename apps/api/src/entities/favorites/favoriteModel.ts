import { uuid } from '@side/utils/src/lang/uuid';
import { defaultMongoSchemaOptions } from '@api/lib/mongo/constants';
import type { SchemaDefinition } from 'mongoose';
import { Schema, model } from 'mongoose';

export type FavoriteDB = {
  userEmail: string;
  _id: string;
  mlsId: number;
  isFavorite: boolean;
};

const schemaDef: Required<SchemaDefinition<FavoriteDB>> = {
  _id: { default: uuid, type: String },
  userEmail: { type: String, required: true },
  mlsId: { type: Number, required: true },
  isFavorite: { type: Boolean, required: true },
};
const schema = new Schema<FavoriteDB>(schemaDef, defaultMongoSchemaOptions);
export const favoriteModel = model('favorites', schema);
