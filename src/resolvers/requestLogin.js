import { isNotAuthenticatedResolver } from '../utils/functionalResolvers';
import generateRandomBytes from '../utils/genRandomBytes';
import generateSecurityCode from '../utils/securityCode';
import { subject, html, text } from '../email/templates/magicLogin';

const requestLogin = isNotAuthenticatedResolver.createResolver(
  async (root, {
    email,
  }, { dataLoaders, db, sendEmail }) => {
    /*  Response target
        type ReguestLoginResponse {
            code: String!
            success: Boolean!
            message: String!
            securityCode: String!
          }
        */

    // 1. Check if this is a real user
    const user = await dataLoaders.user.byEmail.load(email);


    if (!user) {
      return {
        code: 'noUser',
        success: false,
        message: `No such user found for email ${email}`,
        securityCode: null,
      };
    }

    // 2. Set a reset token and expiry on that user
    const loginToken = await generateRandomBytes(20);

    await db('users')
      .update({
        login_token: loginToken,
        login_token_expiry: db.raw('now() + \'24 HOUR\'::INTERVAL'),
      })
      .where({ email });

    const securityCode = await generateSecurityCode();


    // construct url
    const url = `${process.env.FRONTEND_HOST}/confirm-login?token=${loginToken}`;


    // 3. Email them that reset token
    const messageData = {
      from: process.env.EMAIL_SENDER,
      to: user.email,
      subject: subject(),
      html: html(url, securityCode),
      text: text(url, securityCode),
    };

    await sendEmail(messageData);

    // 4. Return the message
    return {
      code: 'ok',
      success: true,
      message:
      'A message has been sent to your email with a magic link you need to click to log in.',
      securityCode,
    };
  },
);


export default {
  Mutation: {
    requestLogin,
  },
};
