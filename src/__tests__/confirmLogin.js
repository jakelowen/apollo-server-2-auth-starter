/* eslint-disable no-undef */
import gql from 'graphql-tag';
import { createTestClient } from 'apollo-server-testing';
import jwt from 'jsonwebtoken';
import { constructTestServer, makeTestContext } from './__utils';
import db from '../db';

require('dotenv').config();

const CONFIRM_LOGIN_MUTATION = gql`
    mutation confirmLogin($token: String!){
      confirmLogin(token: $token) {
            code
            success
            message
            user {
              id
            }
        }
    }
`;

beforeAll(async () => db.migrate.latest());
beforeEach(async () => Promise.all([db.raw('TRUNCATE TABLE users CASCADE')]));
afterAll(async () => db.destroy());

describe('ConfirmLogin', () => {
  test('Happy Path', async () => {
    // insert record
    const loginToken = 'look at me I am a test string';
    const email = 'fake123@test.com';
    const id = '0b986756-e6e3-4bec-bb3c-fe5ce28d0751';
    await db.table('users').insert({
      id, name: 'fake dude', email, login_token: loginToken, login_token_expiry: db.raw('now() + \'24 HOUR\'::INTERVAL'),
    });
    await db('permission').insert([
      { user_id: id, role: 'foo' },
      { user_id: id, role: 'bar' },
    ]);
    const cookie = jest.fn();

    const { server } = constructTestServer({
      context: await makeTestContext(null, { res: { cookie } }),
    });

    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: CONFIRM_LOGIN_MUTATION,
      variables: { token: loginToken },
    });

    // verify cookie is set
    expect(cookie).toHaveBeenCalled();

    // verify database record removes login_token
    const dbUser = await db('users').where({ email }).first();
    expect(dbUser.loginToken).toBe(undefined);
    expect(dbUser.login_token_expiry).toBe(null);

    // grab token from mock function
    const authTokenCalls = cookie.mock.calls[0];
    expect(authTokenCalls[0]).toBe('token');
    expect(authTokenCalls[2]).toEqual({
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    const authToken = authTokenCalls[1];
    // 1 verify is legit token
    const decodedAuthToken = jwt.verify(authToken, process.env.TOKEN_SECRET);


    // 2 verify permission roles match
    // expect(decodedAuthToken.roles).toContain('applicant');
    // expect(decodedAuthToken.roles).toContain('foo');
    // expect(decodedAuthToken.roles).toContain('bar');
    // 3 verify user id
    expect(decodedAuthToken.userId).toBe(id);

    // all as snapshot?
    expect(res).toMatchSnapshot();
  });


  test('throws error if logged in', async () => {
    const { server } = constructTestServer({
      context: await makeTestContext(null, { user: { id: 1, email: 'a@a.a' } }),
    });
    const { mutate } = createTestClient(server);
    const res = await mutate({ mutation: CONFIRM_LOGIN_MUTATION, variables: { token: 'nonsense' } });
    expect(res).toMatchSnapshot();
  });

  test('response if no matching user', async () => {
    const { server } = constructTestServer({
      context: await makeTestContext(),
    });

    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: CONFIRM_LOGIN_MUTATION,
      variables: { token: 'nonsense' },
    });
    expect(res).toMatchSnapshot();
  });
});
