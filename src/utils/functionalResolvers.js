import { createResolver } from 'apollo-resolvers';
import { isInstance } from 'apollo-errors';
import { includes } from 'lodash';
import {
  UnknownError,
  AuthenticationRequiredError,
  NonAuthenticationRequiredError,
  AdminRoleRequiredError,
} from './errors';

export const baseResolver = createResolver(
  // incoming requests will pass through this resolver like a no-op
  null,
  /*
     Only mask outgoing errors that aren't already apollo-errors,
     such as ORM errors etc
   */
  (root, args, context, error) => (isInstance(error) ? error : new UnknownError()),
);


export const isAuthenticatedResolver = baseResolver.createResolver(
  // Extract the user from context (undefined if non-existent)
  (root, args, { user }) => {
    if (!user) throw new AuthenticationRequiredError();
  },
);

export const isNotAuthenticatedResolver = baseResolver.createResolver(
  (root, args, { user }) => {
    if (user) throw new NonAuthenticationRequiredError();
  },
);

export const isAdminResolver = isAuthenticatedResolver.createResolver(
  // Extract the user from context (undefined if non-existent)
  (root, args, { user }) => {
    if (!includes(user.roles, 'admin')) throw new AdminRoleRequiredError();
  },
);
