import { randomUUID } from 'crypto';

export function booksInMemoryDataSource() {
  const books = new Map();

  return {
    getBooks: () => Array.from(books.entries()).map((value) => ({ id: value[0], ...value[1] })),
    findBook: (id) => books.get(id),
    createBook: ({ title, genre }) => {
      const id = randomUUID();
      books.set(id, { title, genre });
      return { id, title, genre };
    },
  };
}
