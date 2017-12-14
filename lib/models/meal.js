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
  return database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?) RETURNING id`,
  [mealId, foodId])
}

function deleteMealFood(foodId, mealId) {
  return database.raw(`DELETE FROM meal_foods
                      WHERE meal_id=` + mealId + `AND food_id=` + foodId + `RETURNING id`)
}

module.exports = {selectAllMeals, showMeal, addFoodToMeal, deleteMealFood}
