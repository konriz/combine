import express from 'express';
import {GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import {initLogString, logAround} from '../logging.js';

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
  return new GraphQLSchema({query: RootQuery});
}

const books = [{id: '1', title: 'The Foundation', genre: 'Science Fiction'},
  {id: '2', title: 'The Fellowship of the Ring', genre: 'Fantasy'},
  {id: '3', title: 'The Eye of the World', genre: 'Fantasy'}];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        return books.find(book => book.id === args.id);
      }
    }
  }
});
