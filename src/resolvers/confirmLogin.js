import jwt from 'jsonwebtoken';
import { isNotAuthenticatedResolver } from '../utils/functionalResolvers';

const confirmLogin = isNotAuthenticatedResolver.createResolver(
  async (root, {
    token,
  }, { db, res }) => {
    /*  Response target
        type ConfirmLoginResponse {
            code: String!
            success: Boolean!
            message: String!
            user: User
        }
    */

    const user = await db('users')
      .where('login_token', '=', token)
      .andWhere('login_token_expiry', '>', 'now()')
      .first();

    // console.log(user, args);
    // console.log('USER', user);
    if (!user) {
      // console.log('!!!!! NO USER');
      return {
        code: 'noUser',
        success: false,
        message: 'This token is either invalid or expired!',
        user: null,
      };
    }

    const [updatedUser] = await db('users')
      .update({
        login_token: null,
        login_token_expiry: null,
      })
      .where({ email: user.email })
      .returning('*');


    // get permissions
    const permissions = await db('permission')
      .where({ user_id: updatedUser.id })
      .select('role');

    const allowedRoles = permissions.map(permission => permission.role);
    allowedRoles.push('applicant');

    // figure out default role
    // const defaultRole = _.includes(allowedRoles, 'user') ? 'user' : 'anonymous';

    // 4. Generate JWT
    const loginToken = jwt.sign(
      {
        userId: updatedUser.id,
      },
      process.env.TOKEN_SECRET,
    );

    // console.log('JWT', token);

    // 5. Set the JWT cookie
    res.cookie('token', loginToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    // 6. return the new user
    return {
      code: 'ok',
      success: true,
      message:
    'You have successfully logged in. You may close this window and return to your previous tab to continue!',
      user: updatedUser,
    };
  },
);


export default {
  Mutation: {
    confirmLogin,
  },
};
