// import getUserFromToken from './getUserFromToken';
import { map } from 'lodash';
import generateUserDataLoaders from '../dataLoaders/users';
import generatePageDataLoader from '../dataLoaders/page';
import db from '../db';
import transport from '../email/connectors/transport';


// the function that sets up the global context for each resolver, using the req
export default async ({ req, res }) => {
  // get the user token from the headers
  // let token = req && req.headers && req.headers.authorization ? req.headers.authorization : '';
  // if (token.startsWith('Bearer ')) {
  //   // Remove Bearer from string
  //   token = token.slice(7, token.length).trimLeft();
  // }
  // instantiate user DataLoader so I can use it for auth
  const userDataLoaders = generateUserDataLoaders();
  const pageDataLoaders = generatePageDataLoader();

  // try to retrieve a user with the token
  // const user = await getUserFromToken(token, userDataLoaders);
  const user = req.userId ? await userDataLoaders.byId.load(req.userId) : null;
  const roles = req.userId ? await userDataLoaders.rolesbyUserId.load(user.id) : [];

  const cleanRoles = map(roles, 'role');
  if (cleanRoles.length === 0) cleanRoles.push('applicant');
  if (user && roles) user.roles = cleanRoles;

  return {
    user,
    dataLoaders: {
      user: userDataLoaders,
      page: pageDataLoaders,
    },
    db,
    sendEmail: transport.sendMail,
    res,
  };
};
