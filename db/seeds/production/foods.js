
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["AA Breakfast Burrito", 1300, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["cereal", 200, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["bananas", 100, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["gelato", 1280, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["fried chicken", 1400, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["ravioli", 1250, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["quesadilla", 450, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["danwich sandwich", 1210, new Date]
      )
    ]);
  });
};
