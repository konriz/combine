import express from 'express';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import {initLogString, logAround} from '../logging.js';
import {prepareFieldsConfig} from './books/booksSchemas.js';
import {booksDataSource} from './books/booksDataSource.js';

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
  return new GraphQLSchema({query: RootQuery, mutation: RootMutation});
}

const dataSource = booksDataSource();
const fieldsConfig = prepareFieldsConfig(dataSource);

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: fieldsConfig.queryFieldsConfig
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: fieldsConfig.mutationFieldsConfig
});
