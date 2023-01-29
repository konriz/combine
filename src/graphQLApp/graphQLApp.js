import express from 'express';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { initLogString, logAround } from '../logging.js';
import { prepareBooksFieldsConfig } from './books/booksSchemas.js';
import { prepareUsersFieldsConfig } from './users/usersSchemas.js';

export async function bootstrap(port, dataSources) {
  return logAround(await createServer, initLogString('graphql', port), port, dataSources);
}

async function createServer(port, dataSources) {
  const { schema } = initGraphQL(dataSources);

  const app = express();

  app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

  return app.listen(port);
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
