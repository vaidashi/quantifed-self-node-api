const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function selectAllFoods() {
  return database.raw(`SELECT * FROM foods`)
}

function show(id) {
  return database.raw(`SELECT * FROM foods WHERE id=?`, [id])
}

function createFood(name, calories) {
  return database.raw(
    `INSERT INTO foods (name, calories, created_at) VALUES (?,?,?) RETURNING id, name, calories`,
    [name, calories, new Date]
  )
}

module.exports = {selectAllFoods, show, createFood}
