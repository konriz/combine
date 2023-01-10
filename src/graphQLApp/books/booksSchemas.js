import {GraphQLList, GraphQLObjectType, GraphQLString} from 'graphql';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});

export function prepareFieldsConfig(dataSource) {
  const queryFieldsConfig = {
    books: {
      type: GraphQLList(BookType),
      resolve() {
        return dataSource.getBooks();
      }
    },
    book: {
      type: BookType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        return dataSource.findBook(args.id);
      }
    }
  };

  const mutationFieldsConfig = {
    createBook: {
      type: BookType,
      args: {title: {type: GraphQLString}, genre: {type: GraphQLString}},
      resolve(parent, args) {
        const {title, genre} = args;
        return dataSource.createBook({title, genre});
      }
    }
  };

  return {queryFieldsConfig, mutationFieldsConfig};
}
