
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.dateTime('createdAt').notNull();
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();

    table.string('email').notNull();
    table.string('firstName').nullable();
    table.string('lastName').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
