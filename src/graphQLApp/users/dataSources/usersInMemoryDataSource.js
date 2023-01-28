import { randomUUID } from 'crypto';

export function usersInMemoryDataSource() {
  const users = new Map();

  return {
    getUsers: () => Array.from(users.entries()).map((value) => ({ id: value[0], ...value[1] })),
    findUser: (id) => users.get(id),
    createUser: ({ name, surname }) => {
      const id = randomUUID();
      users.set(id, { name, surname });
      return { id, name, surname };
    },
  };
}
