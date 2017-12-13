var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const foodsController = require('./lib/controllers/food')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//////// endpoints below /////////
app.get('/', function(request, response) {
  response.send(app.locals.title)
})

app.get('/api/v1/foods', foodsController.getFoods)
app.get('/api/v1/foods/:id', foodsController.getSpecificFood)
app.post('/api/v1/foods', foodsController.postFood)



if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}


/////exporting/////
module.exports = app
