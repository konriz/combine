import {GraphQLList, GraphQLObjectType, GraphQLString} from 'graphql';

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

export const queryFieldsConfig = {
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

export const mutationFieldsConfig = {
  createBook: {
    type: BookType,
    args: {title: {type: GraphQLString}, genre: {type: GraphQLString}},
    resolve(parent, args) {
      const book = { id: `${books.length + 1}`, title: args.title, genre: args.genre };
      books.push(book);
      return book;
    }
  }
}
