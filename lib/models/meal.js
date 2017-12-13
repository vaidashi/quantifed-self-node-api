const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function selectAllMeals() {
  return database.raw(`SELECT meals.*, json_agg(foods.*) AS foods
                      FROM meals
                      JOIN meal_foods ON meals.id=meal_foods.meal_id
                      JOIN foods ON meal_foods.food_id=foods.id
                      GROUP BY meals.id;`)
}



module.exports = {selectAllMeals}