import { MongoClient } from 'mongodb';

export function MongoSetup() {
  let client = undefined;

  async function setupClient() {
    if (!!client) {
      return;
    }
    // TODO: move this to config
    client = new MongoClient('mongodb://root:example@localhost:27017/');
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('MongoDB connected successfully to server');

    return { getDb: (name) => client.db(name) };
  }

  return { setupClient };
}
