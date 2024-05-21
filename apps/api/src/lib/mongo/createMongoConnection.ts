import * as mongoose from 'mongoose';
/**
 * Creates a new connection to the MongoDB database.
 */
export const createMongoConnection = async (mongoUrl: string) => {
  console.log('Initializing Mongoose Connection');
  const connectURL = `${mongoUrl}?retryWrites=true&w=majority`;

  mongoose.set('strictQuery', true);
  await mongoose.connect(connectURL, {
    maxPoolSize: 5,
    minPoolSize: 3,
    serverSelectionTimeoutMS: 15000,
  });
  await mongoose.syncIndexes();
  return true;
};
