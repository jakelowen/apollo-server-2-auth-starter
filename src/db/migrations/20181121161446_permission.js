
exports.up = knex => knex.schema.createTable('permission', (t) => {
  t.uuid('user_id').references('id').inTable('users');
  t.string('role').notNullable().defaultTo('applicant');
  t.primary(['user_id', 'role']);
});

exports.down = knex => knex.schema.dropTable('permission');
