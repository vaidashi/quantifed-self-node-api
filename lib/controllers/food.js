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

function postFood(request, response) {
  var params = request.body.food

  if (!params['name'] || !params['calories']) {
  return response.status(422).send({error: "Name and caloric count must be provided!"})
}

  Food.createFood(params['name'], params['calories'])
  .then(function(data) {
    if (data.rowCount == 0) {return response.sendStatus(404)}

    response.status(201).json(data.rows[0])
    // response.json(data.rows)
  })
}

function editFood(request, response) {
  var id = request.params.id
  var params = request.body.food

  if (params['name'] != null) {
    Food.updateFoodName(params['name'], id)
    .then(function(data) {
      if (data.rowCount == 0) {return response.sendStatus(404)}
      response.json(data.rows)
    })
  } else if (params['calories'] != null) {
    Food.updateFoodCalories(params['calories'], id)
    .then(function(data) {
      if (data.rowCount == 0) {return response.sendStatus(404)}
      response.json(data.rows)
    })
  }
}

function deleteFood(request, response) {
  var id = request.params.id

  Food.destroyFood(id)
  .then(function(data) {
    if (data.rowCount == 0) {return response.sendStatus(404)}
    response.json(data.rows)
  })
}


module.exports = {getFoods, getSpecificFood, postFood, editFood, deleteFood}
