export function booksMongoDataSource(Book) {
  return {
    getBooks: async () => Book.find(),
    findBook: async (id) => Book.findById({ id }),
    createBook: async ({ title, genre }) => {
      const book = new Book({ title, genre });
      return book.save();
    },
  };
}
