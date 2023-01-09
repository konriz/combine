import express from 'express';
import {GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';
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
  return new GraphQLSchema({query: RootQuery, mutation: RootMutation});
}

let booksCounter = 3;

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
    books: {
      type: GraphQLList(BookType),
      resolve() {
        return books;
      }
    },
    book: {
      type: BookType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        return books.find(book => book.id === args.id);
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createBook: {
      type: BookType,
      args: {title: {type: GraphQLString}, genre: {type: GraphQLString}},
      resolve(parent, args) {
        booksCounter += 1;
        const book = { id: `${booksCounter}`, title: args.title, genre: args.genre };
        books.push(book);
        return book;
      }
    }
  }
});
