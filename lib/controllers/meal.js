const Meal = require('../models/meal')


function getMealFoods(request, response) {
  Meal.selectAllMeals()
  .then(function(data) {
    if (data.rowCount == 0) {return response.sendStatus(404)}
    response.json(data.rows)
  })
}

module.exports = {getMealFoods}
