/* eslint-disable no-undef */
import gql from 'graphql-tag';
import { createTestClient } from 'apollo-server-testing';
import { constructTestServer, makeTestContext } from './__utils';
import db from '../db';

require('dotenv').config();

const ME_QUERY = gql`
    {
      me {
        id
        name
        email
        roles
      }
    }
`;

beforeAll(async () => db.migrate.latest());
beforeEach(async () => Promise.all([db.raw('TRUNCATE TABLE users CASCADE')]));
afterAll(async () => db.destroy());

describe('ME', () => {
  test('Happy Path no perms', async () => {
    const email = 'fake124@test.com';
    const id = '0b986756-e6e3-4bec-bb3c-fe5ce28d0752';
    const name = 'fake dude';
    await db.table('users').insert({
      id, name, email,
    });

    const context = await makeTestContext({ req: { userId: id } }); // user: { id, email, name } }),
    // console.log('CONTEXT user', context.user);
    const { server } = constructTestServer({
      context,
    });

    const { query } = createTestClient(server);
    const res = await query({
      mutation: ME_QUERY,
    });
    expect(res).toMatchSnapshot();
  });

  test('Happy Path with perms', async () => {
    const email = 'fake124@test.com';
    const id = '0b986756-e6e3-4bec-bb3c-fe5ce28d0752';
    const name = 'fake dude';
    await db.table('users').insert({
      id, name, email,
    });

    await db('permission').insert([
      { user_id: id, role: 'foo' },
      { user_id: id, role: 'bar' },
    ]);

    const context = await makeTestContext({ req: { userId: id } }); // user: { id, email, name } }),
    // console.log('CONTEXT user', context.user);
    const { server } = constructTestServer({
      context,
    });

    const { query } = createTestClient(server);
    const res = await query({
      mutation: ME_QUERY,
    });
    expect(res).toMatchSnapshot();
  });


  test('throws error if not logged in', async () => {
    const clearCookie = jest.fn();
    const { server } = constructTestServer({
      context: await makeTestContext({ res: { clearCookie } }),
    });
    const { query } = createTestClient(server);
    const res = await query({ mutation: ME_QUERY });
    expect(res).toMatchSnapshot();
  });
});
