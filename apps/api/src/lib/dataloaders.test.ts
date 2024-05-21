import { describe, it, expect, vi } from 'vitest';
import { MongoModels } from './mongo/mongoModels';
import { getDataLoaders } from './dataloaders';

describe('getDataLoaders', () => {
  const mongoModels: MongoModels = { favoriteModel: {} as any, userModel: {} as any };
  const dataloaders = getDataLoaders(mongoModels);

  it('queryFavoritesByUserEmail should return the favorites for the provided emails in the correct order', async () => {
    mongoModels.favoriteModel.find = vi
      .fn()
      .mockResolvedValueOnce([{ userEmail: 'two@gmail.com' }, { userEmail: 'one@gmail.com' }]);
    const emails = ['one@gmail.com', 'two@gmail.com'];

    const res = await dataloaders.queryFavoritesByUserEmail.loadMany(emails);

    expect(res).toMatchInlineSnapshot(`
      [
        [
          {
            "userEmail": "one@gmail.com",
          },
        ],
        [
          {
            "userEmail": "two@gmail.com",
          },
        ],
      ]
    `);
  });
});
