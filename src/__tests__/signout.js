/* eslint-disable no-undef */
import gql from 'graphql-tag';

import { createTestClient } from 'apollo-server-testing';
import { constructTestServer, makeTestContext } from './__utils';
import db from '../db';
// import makeContext from '../utils/makeContext';
// import { makeTestContext } from './__utils';
// const nock = require('nock');

const SIGNOUT_MUTATION = gql`
    mutation {
        signout {
            code
            success
            message
        }
    }
`;


beforeAll(async () => db.migrate.latest());
beforeEach(async () => Promise.all([db.raw('TRUNCATE TABLE users CASCADE')]));
afterAll(async () => db.destroy());

describe('Signout', () => {
  test('Happy Path', async () => {
    const clearCookie = jest.fn();

    const { server } = constructTestServer({
      context: await makeTestContext(null, { res: { clearCookie }, user: { id: 1, email: 'a@a.a' } }),
    });

    const { mutate } = createTestClient(server);
    const res = await mutate({ mutation: SIGNOUT_MUTATION });
    // console.log(res);
    expect(clearCookie).toHaveBeenCalled();
    expect(clearCookie).toBeCalledWith('token');
    expect(res).toMatchSnapshot();
  });

  test('throws error if not logged in', async () => {
    const clearCookie = jest.fn();
    const { server } = constructTestServer({
      context: await makeTestContext({ res: { clearCookie } }),
    });
    const { mutate } = createTestClient(server);
    const res = await mutate({ mutation: SIGNOUT_MUTATION });
    // console.log(res);
    expect(res.errors[0].message).toEqual('You must be logged in to do this');
  });
});
