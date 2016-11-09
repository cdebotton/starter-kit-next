const bcrypt = require('bcrypt');

const hash = (password) => new Promise((resolve, reject) => {
  bcrypt.genSalt(12, (saltError, salt) => {
    if (saltError) {
      return reject(saltError);
    }
    bcrypt.hash(password, salt, (hashError, hash) => {
      if (hashError) {
        return reject(hashError);
      }
      resolve(hash);
    });
  });
});

export const seed = async (knex, Promise) => {
  const password = await hash('password');
  await knex('users').del();

  await knex('users').insert({
    id: 1,
    createdAt: new Date(),
    email: 'admin@demo.com',
    password: password,
  });

  await knex('users').insert({
    id: 2,
    createdAt: new Date(),
    email: 'editor@demo.com',
    password: password,
  });

  await knex('users').insert({
    id: 3,
    createdAt: new Date(),
    email: 'user@demo.com',
    password: password,
  });
};
