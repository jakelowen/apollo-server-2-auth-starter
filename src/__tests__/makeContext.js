/* eslint-disable no-undef */
import makeContext from '../utils/makeContext';
import db from '../db';

require('dotenv').config();

beforeAll(async () => db.migrate.latest());
beforeEach(async () => Promise.all([db.raw('TRUNCATE TABLE users CASCADE')]));
afterAll(async () => db.destroy());

describe('makeContext', () => {
  test('loads user and roles', async () => {
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

    const context = await makeContext({ req: { userId: id } });
    expect(context.user.id).toBe(id);
    expect(context.user.name).toBe(name);
    expect(context.user.email).toBe(email);
    expect(context.user.roles).toContain('foo');
    expect(context.user.roles).toContain('bar');
  });
});
