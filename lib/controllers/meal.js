const Meal = require('../models/meal')


function getMealFoods(request, response) {
  Meal.selectAllMeals()
  .then(function(data) {
    if (data.rowCount == 0) {return response.sendStatus(404)}
    response.json(data.rows)
  })
}

function getMeal(request, response) {
  var id = request.params.meal_id

  Meal.showMeal(id)
  .then(function(data) {
    if (data.rowCount == 0) {return response.sendStatus(404)}

    response.json(data.rows[0])
  })

}

module.exports = {getMealFoods, getMeal}
