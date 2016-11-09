export const up = (knex) => {
  return knex.schema.table('users', (table) => {
    table.string('password').notNull();
    table.unique('email');
  });
};

export const down = (knex) => {
  return knex.schema.table('users', (table) => {
    table.dropColumn('password');
    table.dropUnique('email');
  });
};
