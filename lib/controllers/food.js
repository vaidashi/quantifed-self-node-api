const Food = require('../models/food')

function getFoods(request, response) {
  Food.selectAllFoods()
  .then(function(data) {
    if (data.rowCount == 0) {return response.sendStatus(404)}
    response.json(data.rows)
  })
}

function getSpecificFood(request, response) {
  var id = request.params.id
  Food.show(id)
  .then(function(data) {
    if (data.rowCount == 0) {return response.sendStatus(404)}

    response.json(data.rows[0])
  })
}

module.exports = {getFoods, getSpecificFood}
