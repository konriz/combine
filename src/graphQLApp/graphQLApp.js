import express from 'express';
import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import {initLogString, logAround} from '../logging.js';

export function bootstrap(port) {
  return logAround(createServer, initLogString('graphql', port), port);
}

function createServer(port) {
  const {schema, root} = initGraphQL();

  const app = express();

  app.use('/graphql', graphqlHTTP({schema, rootValue: root, graphiql: true}));

  return app.listen(port);
}

function initGraphQL() {
  return {schema: resolveSchema(), root: resolveRoot()};
}

function resolveSchema() {
  return buildSchema(`
  type Query { 
    hello: String
  }
  `);
}

function resolveRoot() {
  return {
    hello: () => 'Hello world!'
  };
}
