import { createError } from 'apollo-errors';

export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred!  Please try again later',
});

export const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
  message: 'You must be logged in to do this',
});

export const NonAuthenticationRequiredError = createError('NonAuthenticationRequiredError', {
  message: 'You must not be logged in to perform this action.',
});

export const AdminRoleRequiredError = createError('AdminRoleRequiredError', {
  message: 'You must be an admin to perform this action.',
});
