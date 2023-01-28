export function booksMongoDataSource(db) {
  const collection = db.collection('books');

  return {
    getBooks: async () => {
      const cursor = await collection.find();
      return cursor.toArray();
    },
    findBook: async (id) => await collection.findOne({ id }),
    createBook: async ({ title, genre }) => {
      return await collection.insertOne({ title, genre });
    },
  };
}
