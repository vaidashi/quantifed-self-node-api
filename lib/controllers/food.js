const Food = require('../models/food')

function getFoods(request, response) {
  Food.selectAllFoods()
  .then(function(data) {
    if (data.rowCount == 0) {return response.sendStatus(404)}
    response.json(data.rows)
  })
}


module.exports = {getFoods}
