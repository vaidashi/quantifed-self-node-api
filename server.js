var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const foodsController = require('./lib/controllers/food')
const mealsController = require('./lib/controllers/meal')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})



app.get('/', function(request, response) {
  response.send(app.locals.title)
})

app.get('/api/v1/foods', foodsController.getFoods)
app.get('/api/v1/foods/:id', foodsController.getSpecificFood)
app.post('/api/v1/foods', foodsController.postFood)
app.patch('/api/v1/foods/:id', foodsController.editFood)
app.delete('/api/v1/foods/:id', foodsController.deleteFood)

app.get('/api/v1/meals', mealsController.getMealFoods)
app.get('/api/v1/meals/:meal_id/foods', mealsController.getMeal)
app.post('/api/v1/meals/:meal_id/foods/:id', mealsController.postFoodToMeal)
app.delete('/api/v1/meals/:meal_id/foods/:id', mealsController.deleteFromMeal)


if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}



module.exports = app
