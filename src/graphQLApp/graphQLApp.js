import express from 'express';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { initLogString, logAround } from '../logging.js';
import { booksInMemoryDataSource } from './books/dataSources/booksInMemoryDataSource.js';
import { prepareBooksFieldsConfig } from './books/booksSchemas.js';
import { prepareUsersFieldsConfig } from './users/usersSchemas.js';
import { usersInMemoryDataSource } from './users/dataSources/usersInMemoryDataSource.js';
import { booksMongoDataSource } from './books/dataSources/booksMongoDataSource.js';
import { usersMongoDataSource } from './users/dataSources/usersMongoDataSource.js';
import { MongoSetup } from '../databaseClients/mongoClient.js';

export async function bootstrap(port, env) {
  return logAround(await createServer, initLogString('graphql', port), port, env);
}

async function createServer(port, env) {
  const dataSources = await prepareDataSources(env);

  const { schema } = initGraphQL(dataSources);

  const app = express();

  app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

  return app.listen(port);
}

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

function initGraphQL({ booksData, usersData }) {
  return { schema: resolveSchema({ booksData, usersData }) };
}

function resolveSchema({ booksData, usersData }) {
  const booksFieldsConfig = prepareBooksFieldsConfig(booksData);
  const usersFieldsConfig = prepareUsersFieldsConfig(usersData);

  const queryFields = {
    ...booksFieldsConfig.queryFieldsConfig,
    ...usersFieldsConfig.queryFieldsConfig,
  };
  const mutationFields = {
    ...booksFieldsConfig.mutationFieldsConfig,
    ...booksFieldsConfig.mutationFieldsConfig,
  };

  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: queryFields,
  });

  const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: mutationFields,
  });

  return new GraphQLSchema({ query: RootQuery, mutation: RootMutation });
}
