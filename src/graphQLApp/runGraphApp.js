import { bootstrap as bootstrapGraphQL } from './graphQLApp.js';
import * as config from '../config/index.js';
import { mongoSchema } from '../databaseClients/mongoClient.js';
import { booksMongoDataSource } from './books/dataSources/booksMongoDataSource.js';
import { usersMongoDataSource } from './users/dataSources/usersMongoDataSource.js';
import { booksInMemoryDataSource } from './books/dataSources/booksInMemoryDataSource.js';
import { usersInMemoryDataSource } from './users/dataSources/usersInMemoryDataSource.js';
import { log } from '../logging.js';

export async function runGraphApp(dataSources) {
  async function prepareDataSources() {
    const mongoURI = config.graphApp.mongoUri;
    if (!!mongoURI) {
      log('Mongo data source setup');
      const { Book, User } = await mongoSchema(mongoURI);
      return {
        booksData: booksMongoDataSource(Book),
        usersData: usersMongoDataSource(User),
      };
    }
    log('In memory data source setup');
    return { booksData: booksInMemoryDataSource(), usersData: usersInMemoryDataSource() };
  }

  const dataSrc = dataSources ?? (await prepareDataSources());

  return bootstrapGraphQL(config.graphApp.port, dataSrc);
}
