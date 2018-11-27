import { isAuthenticatedResolver } from '../utils/functionalResolvers';

const me = isAuthenticatedResolver.createResolver(
  async (_, __, { user }) => user,
);


export default {
  Query: {
    me,
  },
};
