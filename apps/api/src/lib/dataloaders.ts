import { UserDB } from '@api/entities/users/userModel';
import DataLoader from 'dataloader';
import { MongoModels } from './mongo/mongoModels';
import { Listing } from '@api/generated/resolvers';
import { FavoriteDB } from '@api/entities/favorites/favoriteModel';
import { SimplyRETSClient } from './simplerets';
import { batchedForLoop } from '@side/utils/src/lang/batchedForLoop';

export interface IAPIDataLoaders {
  findUserByEmail: DataLoader<string, UserDB | null>;
  findListingById: DataLoader<number, Listing | null>;
  queryFavoritesByUserEmail: DataLoader<string, FavoriteDB[]>;
  findFavoriteById: DataLoader<string, FavoriteDB | null>;
  queryListings: DataLoader<{ cities: null | string[] | undefined }, Listing[]>;
  countFavoritesByMLSId: DataLoader<number, number>;
}

/**
 * Returns a new instance of the data loaders.
 * Dataloaders allow us to batch and dedupe requests to the databases and APIs.
 *
 * This allows us to improve GraphQL performance and reduce the number of requests to the databases and APIs.
 *
 * It also gives us a centralized location to query our data.
 */
export const getDataLoaders = (mongoModels: MongoModels): IAPIDataLoaders => {
  const retsClient = new SimplyRETSClient();
  return {
    findUserByEmail: new DataLoader(async (emails) => {
      if (emails.length === 0) {
        return [];
      }

      const users = await mongoModels.userModel.find({ email: { $in: emails } });

      return emails.map((email) => users.find((u) => u.email === email) ?? null);
    }),
    findListingById: new DataLoader(async (ids) => {
      if (ids.length === 0) {
        return [];
      }

      const listing = await batchedForLoop(ids, async (id) => {
        return await retsClient.getProperty({ propertyId: id });
      });

      return ids.map((id) => listing.find((l) => l?.mlsId === id) ?? null);
    }),
    queryListings: new DataLoader(async (filters) => {
      return await batchedForLoop(filters, async (filter) => {
        const listings = await retsClient.queryProperties({
          cities: filter.cities ?? undefined,
        });
        return listings;
      });
    }),
    queryFavoritesByUserEmail: new DataLoader(async (emails) => {
      const favorites = await mongoModels.favoriteModel.find({
        isFavorite: { $eq: true },
        userEmail: { $in: emails },
      });

      return emails.map((email) => favorites.filter((f) => f.userEmail === email));
    }),
    findFavoriteById: new DataLoader(async (ids) => {
      const favorites = await mongoModels.favoriteModel.find({ _id: { $in: ids } });

      return ids.map((id) => favorites.find((f) => f._id === id) ?? null);
    }),
    countFavoritesByMLSId: new DataLoader(async (ids) => {
      const favorites = await mongoModels.favoriteModel.find({
        isFavorite: { $eq: true },
        mlsId: { $in: ids },
      });

      return ids.map((id) => favorites.filter((f) => f.mlsId === id).length);
    }),
  };
};
