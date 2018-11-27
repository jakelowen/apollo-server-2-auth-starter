/* eslint-disable no-undef */
import gql from 'graphql-tag';

import { createTestClient } from 'apollo-server-testing';
import { constructTestServer, makeTestContext } from './__utils';
import db from '../db';

const REGISTER_MUTATION = gql`
    mutation register($email: String!, $name: String!){
        register(email:$email, name:$name) {
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


describe('Register', () => {
  test('Happy Path', async () => {
    const mockSendEmail = jest.fn();

    const { server } = constructTestServer({
      context: await makeTestContext(null, { sendEmail: mockSendEmail }),
    });

    const { mutate } = createTestClient(server);
    const res = await mutate({ mutation: REGISTER_MUTATION, variables: { email: 'fake@test.com', name: 'Fake Dude' } });
    // console.log(res);
    expect(mockSendEmail).toHaveBeenCalled();
    expect(res.data.register.code).toBe('ok');
    expect(res.data.register.message).toBe('A message has been sent to your email with a magic link you need to click to log in.');
    expect(res.data.register.success).toBe(true);
  });

  test('throws error if logged in', async () => {
    const { server } = constructTestServer({
      context: await makeTestContext(null, { user: { id: 1, email: 'a@a.a' } }),
    });
    const { mutate } = createTestClient(server);
    const res = await mutate({ mutation: REGISTER_MUTATION, variables: { email: 'fake@test.com', name: 'Fake Dude' } });
    expect(res).toMatchSnapshot();
  });

  test('does not update name if record already exists', async () => {
    await db.table('users').insert([
      { id: 'b6bf639f-6e80-4c6b-a46b-dc1373a395be', email: 'fake@test.com', name: 'Fake1' },
      { id: 'a6bf639f-6e80-4c6b-a46b-dc1373a395bf', email: 'fake2@test.com', name: 'Fake2' },
    ]);

    const { server } = constructTestServer({
      context: await makeTestContext(),
    });

    const { mutate } = createTestClient(server);
    const res = await mutate({ mutation: REGISTER_MUTATION, variables: { email: 'fake@test.com', name: 'Fake Dude' } });
    expect(res).toMatchSnapshot();
  });
});
