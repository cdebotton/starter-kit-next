export const up = (knex) => {
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

export const down = (knex) => {
  return knex.schema.dropTable('users');
};
