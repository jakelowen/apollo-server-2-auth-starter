import { mergeResolvers } from 'merge-graphql-schemas';
import UserResolver from './userResolver';
import RegisterResolver from './register';
import RequestLoginResolver from './requestLogin';
import SignoutResolver from './signout';
import ConfirmLogin from './confirmLogin';
import MeResolver from './me';

export default mergeResolvers([
  UserResolver,
  RegisterResolver,
  RequestLoginResolver,
  SignoutResolver,
  ConfirmLogin,
  MeResolver,
]);
