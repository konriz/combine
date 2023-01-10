import {GraphQLList, GraphQLObjectType, GraphQLString} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    surname: {type: GraphQLString}
  })
});

export function prepareUsersFieldsConfig(dataSource) {
  const queryFieldsConfig = {
    users: {
      type: GraphQLList(UserType),
      resolve() {
        return dataSource.getUsers();
      }
    },
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parent, {id}) {
        return dataSource.findUser(id);
      }
    }
  };

  const mutationFieldsConfig = {
    createUser: {
      type: UserType,
      args: {name: {type: GraphQLString}, surname: {type: GraphQLString}},
      resolve(parent, {name, surname}) {
        return dataSource.createUser({name, surname});
      }
    }
  };

  return {queryFieldsConfig, mutationFieldsConfig};
}
