import { favoriteModel } from '@api/entities/favorites/favoriteModel';
import { userModel } from '@api/entities/users/userModel';
import type { Model } from 'mongoose';
/**
 * A collection of all the models in the MongoDB database.
 */
export const mongoModels = {
  favoriteModel,
  userModel,
  // Add more models here
};

type LimitedMongooseApi<T extends Record<string, Model<any>>> = {
  [K in keyof T]: Pick<
    T[K],
    'findByIdAndDelete' | 'findByIdAndUpdate' | 'create' | 'find' | 'findOne'
  >;
};
export type MongoModels = LimitedMongooseApi<typeof mongoModels>;
