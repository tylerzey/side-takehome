const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      ip: '127.0.0.1',
      dbName: 'properties',
    },
  });
  const uri = mongod.getUri();
  const port = mongod.instanceInfo.port;
  const dbPath = mongod.instanceInfo.dbPath;
  const dbName = mongod.instanceInfo.dbName;

  console.log(`Database uri: ${uri}`);
  console.log(`Database running on port: ${port}`);
  console.log(`Database Name: ${dbName}`);
  console.log(`Local DB Storage path ${dbPath}`);

  const MongoClient = require('mongodb').MongoClient;
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);
  await db.collection('users').insertMany([
    {
      email: 'user1@sideinc.com',
      token: '676cfd34-e706-4cce-87ca-97f947c43bd4',
    },
    {
      email: 'user2@sideinc.com',
      token: '2f403433-ba0b-4ce9-be02-d1cf4ad6f453',
    },
  ]);
  console.log('Seeded users');
  await client.close();
})();
