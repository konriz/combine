import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

export function prepareBooksFieldsConfig(dataSource) {
  const queryFieldsConfig = {
    books: {
      type: GraphQLList(BookType),
      async resolve() {
        return await dataSource.getBooks();
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, { id }) {
        return dataSource.findBook(id);
      },
    },
  };

  const mutationFieldsConfig = {
    createBook: {
      type: BookType,
      args: { title: { type: GraphQLString }, genre: { type: GraphQLString } },
      async resolve(parent, { title, genre }) {
        return dataSource.createBook({ title, genre });
      },
    },
  };

  return { queryFieldsConfig, mutationFieldsConfig };
}
