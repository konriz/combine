import express from 'express';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import {initLogString, logAround} from '../logging.js';
import {booksDataSource} from './books/booksDataSource.js';
import {usersDataSource} from './users/usersDataSource.js';
import {prepareBooksFieldsConfig} from './books/booksSchemas.js';
import {prepareUsersFieldsConfig} from './users/usersSchemas.js';

export function bootstrap(port) {
  return logAround(createServer, initLogString('graphql', port), port);
}

function createServer(port) {
  const {schema} = initGraphQL();

  const app = express();

  app.use('/graphql', graphqlHTTP({schema, graphiql: true}));

  return app.listen(port);
}

function initGraphQL() {
  return {schema: resolveSchema()};
}

function resolveSchema() {
  const booksData = booksDataSource();
  const booksFieldsConfig = prepareBooksFieldsConfig(booksData);

  const usersData = usersDataSource();
  const usersFieldsConfig = prepareUsersFieldsConfig(usersData);

  const queryFields = { ...booksFieldsConfig.queryFieldsConfig, ...usersFieldsConfig.queryFieldsConfig };
  const mutationFields = { ...booksFieldsConfig.mutationFieldsConfig, ...booksFieldsConfig.mutationFieldsConfig };

  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: queryFields
  });

  const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: mutationFields
  });

  return new GraphQLSchema({query: RootQuery, mutation: RootMutation});
}
