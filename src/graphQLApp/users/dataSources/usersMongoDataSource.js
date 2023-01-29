export function usersMongoDataSource(User) {
  return {
    getBooks: async () => User.find(),
    findBook: async (id) => User.findById({ id }),
    createBook: async ({ name, surname }) => {
      const user = new User({ name, surname });
      return user.save();
    },
  };
}
