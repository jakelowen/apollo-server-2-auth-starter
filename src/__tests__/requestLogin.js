/* eslint-disable no-undef */
import gql from 'graphql-tag';

import { createTestClient } from 'apollo-server-testing';
import { constructTestServer, makeTestContext } from './__utils';
import db from '../db';
// import makeContext from '../utils/makeContext';
// import { makeTestContext } from './__utils';
// const nock = require('nock');

const REQUEST_LOGIN_MUTATION = gql`
    mutation requestLogin($email: String!){
        requestLogin(email:$email) {
            code
            success
            securityCode
            message
        }
    }
`;


beforeAll(async () => db.migrate.latest());
beforeEach(async () => Promise.all([db.raw('TRUNCATE TABLE users CASCADE')]));
afterAll(async () => db.destroy());

describe('RequestLogin', () => {
  test('Happy Path', async () => {
    await db.table('users').insert([
      { id: 'b6bf639f-6e80-4c6b-a46b-dc1373a395be', email: 'fake@test.com', name: 'Fake1' },
      { id: 'a6bf639f-6e80-4c6b-a46b-dc1373a395bf', email: 'fake2@test.com', name: 'Fake2' },
    ]);

    const mockSendEmail = jest.fn();

    const { server } = constructTestServer({
      context: await makeTestContext(null, { sendEmail: mockSendEmail }),
    });

    const { mutate } = createTestClient(server);
    const res = await mutate({ mutation: REQUEST_LOGIN_MUTATION, variables: { email: 'fake@test.com' } });
    // console.log(res);
    expect(mockSendEmail).toHaveBeenCalled();
    expect(res.data.requestLogin.code).toBe('ok');
    expect(res.data.requestLogin.message).toBe('A message has been sent to your email with a magic link you need to click to log in.');
    expect(res.data.requestLogin.success).toBe(true);
    //
  });

  test('throws error if logged in', async () => {
    const { server } = constructTestServer({
      context: await makeTestContext(null, { user: { id: 1, email: 'a@a.a' } }),
    });
    const { mutate } = createTestClient(server);
    const res = await mutate({ mutation: REQUEST_LOGIN_MUTATION, variables: { email: 'fake@test.com' } });
    // expect(res.data).toBe(null);
    // expect(res.errors[0].message).toEqual('You must not be logged in to perform this action.');
    expect(res).toMatchSnapshot();
  });

  test('encourages redirect if not current user', async () => {
    await db.table('users').insert([
      { id: 'b6bf639f-6e80-4c6b-a46b-dc1373a395be', email: 'fake@test.com', name: 'Fake1' },
      { id: 'a6bf639f-6e80-4c6b-a46b-dc1373a395bf', email: 'fake2@test.com', name: 'Fake2' },
    ]);

    const { server } = constructTestServer({
      context: await makeTestContext(),
    });

    const { mutate } = createTestClient(server);
    const res = await mutate({ mutation: REQUEST_LOGIN_MUTATION, variables: { email: 'notauser@test.com' } });
    // expect(res.data.requestLogin.code).toBe('noUser');
    // expect(res.data.requestLogin.message).toBe('No such user found for email notauser@test.com');
    // expect(res.data.requestLogin.success).toBe(false);
    expect(res).toMatchSnapshot();
  });
});
