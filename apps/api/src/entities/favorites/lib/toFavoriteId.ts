export const toFavoriteId = (userEmail: string, mlsId: number) => {
  return `${userEmail}:${mlsId}`;
};
