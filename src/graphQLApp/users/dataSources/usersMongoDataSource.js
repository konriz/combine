export function usersMongoDataSource() {
  const users = [{id: '1', name: 'John', surname: 'Doe'}];

  return {
    getUsers: () => users,
    findUser: (id) => users.find(user => user.id === id),
    createUser: ({name, surname}) => {
      const user = {id: `${users.length + 1}`, name, surname};
      users.push(user);
      return user;
    }
  };
}
