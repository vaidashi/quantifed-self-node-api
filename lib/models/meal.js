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


function showMeal(id) {
  return database.raw(`SELECT meals.*, json_agg(foods.*) AS foods
                      FROM meals
                      JOIN meal_foods ON meals.id=meal_foods.meal_id
                      JOIN foods ON meal_foods.food_id=foods.id
                      WHERE meals.id=` + id + ` GROUP BY meals.id`)
}

function addFoodToMeal(foodId, mealId) {
  return database.raw("INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?) RETURNING id",
  [mealId, foodId])
}


module.exports = {selectAllMeals, showMeal, addFoodToMeal}
