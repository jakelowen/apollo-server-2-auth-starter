import { isAuthenticatedResolver } from '../utils/functionalResolvers';

const signout = isAuthenticatedResolver.createResolver(
  async (_, __, { res }) => {
    res.clearCookie('token');
    return {
      code: 'ok',
      success: true,
      message: 'Goodbye!',
    };
  },
);


export default {
  Mutation: {
    signout,
  },
};
