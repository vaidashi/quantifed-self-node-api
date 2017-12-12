const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function selectAllFoods() {
  return database.raw(`SELECT * FROM foods`)
}

module.exports = {selectAllFoods}
