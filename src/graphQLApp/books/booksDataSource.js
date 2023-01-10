export function booksDataSource() {
  const books = [{id: '1', title: 'The Foundation', genre: 'Science Fiction'},
    {id: '2', title: 'The Fellowship of the Ring', genre: 'Fantasy'},
    {id: '3', title: 'The Eye of the World', genre: 'Fantasy'}];

  return {
    getBooks: () => books,
    findBook: (id) => books.find(book => book.id === id),
    createBook: ({title, genre}) => {
      const book = {id: `${books.length + 1}`, title, genre};
      books.push(book);
      return book;
    }
  };
}
