/* eslint-disable no-undef */
import gql from 'graphql-tag';

import { createTestClient } from 'apollo-server-testing';
import { constructTestServer, makeTestContext } from './__utils';
import db from '../db';
// import makeContext from '../utils/makeContext';
// import { makeTestContext } from './__utils';
// const nock = require('nock');

const ALL_USERS = gql`
    {
        users {
            items {
                id
                email
            }
            pageInfo {
                fromCache
                totalCount
                nextCursor
            }
        }
    }
`;

beforeAll(async () => db.migrate.latest());
beforeEach(async () => Promise.all([db.raw('TRUNCATE TABLE users CASCADE')]));
afterAll(async () => db.destroy());

describe('Queries', () => {
  test('fetches list of users if admin', async () => {
    await db.table('users').insert([
      { id: 'b6bf639f-6e80-4c6b-a46b-dc1373a395be', email: 'fake@test.com', name: 'Fake1' },
      { id: 'a6bf639f-6e80-4c6b-a46b-dc1373a395bf', email: 'fake2@test.com', name: 'Fake2' },
    ]);
    const { server } = constructTestServer({
      context: await makeTestContext(null, { user: { id: 1, email: 'a@a.a', roles: ['admin'] } }),
    });

    const { query } = createTestClient(server);
    const res = await query({ query: ALL_USERS });
    expect(res).toMatchSnapshot();
  });

  test('fetches list of users fails if not admin', async () => {
    await db.table('users').insert([
      { id: 'b6bf639f-6e80-4c6b-a46b-dc1373a395be', email: 'fake@test.com', name: 'Fake1' },
      { id: 'a6bf639f-6e80-4c6b-a46b-dc1373a395bf', email: 'fake2@test.com', name: 'Fake2' },
    ]);
    const { server } = constructTestServer({
      context: await makeTestContext(null, { user: { id: 1, email: 'a@a.a', roles: ['applicant'] } }),
    });

    const { query } = createTestClient(server);
    const res = await query({ query: ALL_USERS });
    expect(res).toMatchSnapshot();
  });
});
