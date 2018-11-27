exports.up = knex => knex.schema.createTable('users', (t) => {
  t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
  t.string('email', 256).unique();
  t.string('name');
  t.string('login_token');
  t.timestamp('login_token_expiry');
  //   t.text('content');
  //   t.boolean('status').notNullable().defaultTo(false);
  t.timestamp('created_at', true).notNullable().defaultTo(knex.fn.now());
  t.timestamp('updated_at', true).notNullable().defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('users');
