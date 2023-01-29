import { bootstrap as bootstrapGraphQL } from './graphQLApp.js';
import * as config from '../config/index.js';
import { MongoSetup } from '../databaseClients/mongoClient.js';
import { booksMongoDataSource } from './books/dataSources/booksMongoDataSource.js';
import { usersMongoDataSource } from './users/dataSources/usersMongoDataSource.js';
import { booksInMemoryDataSource } from './books/dataSources/booksInMemoryDataSource.js';
import { usersInMemoryDataSource } from './users/dataSources/usersInMemoryDataSource.js';

export async function runGraphApp(dataSources) {
  async function prepareDataSources(env) {
    if (env === 'mongo') {
      const client = await MongoSetup().setupClient();
      const db = client.getDb('public');
      return {
        booksData: booksMongoDataSource(db),
        usersData: usersMongoDataSource(db),
      };
    }
    return { booksData: booksInMemoryDataSource(), usersData: usersInMemoryDataSource() };
  }

  const dataSrc = dataSources ?? (await prepareDataSources(config.graphApp.env));

  return bootstrapGraphQL(config.graphApp.port, dataSrc);
}
