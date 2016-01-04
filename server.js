var express = require('express');
//parsing json body ..to be parsed by express
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

//create todos obj model of array
var todos = [];

//create obj to keep tracking our data.. to increment new todo id so getting new id
var todoNextId = 1;

//adding underscore dependency
var _ = require('underscore');

//adding bodyParser for parsing json from the server by express
app.use(bodyParser.json());

app.get('/', function (req,res){
	res.send('Todo API Root');
});

//GET /todos
app.get('/todos', function (req, res){
	res.json(todos);
});

//geting single todos by fetching id ... GET /todos/:id
app.get('/todos/:id', function (req, res){

  //create todoid obj representing the params id
  var todoid = parseInt(req.params.id, 10);
	//using underscore method: _.findWhere() to find todoid
  var matchedTodoid = _.findWhere(todos, {id: todoid});


  if (matchedTodoid){
  	res.json(matchedTodoid);
  }else{
  	res.status(404).send();
  }
});

//POST /todos/:id
app.post('/todos', function (req, res){
	var body = _.pick(req.body, 'description', 'completed'); //wrapping with _.pick(), which is picking up only 2 params

	//creating a validation check for input entries: completed, description
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	//eleminating any free spaces in descriptin
	body.description = body.description.trim();

	//add id field
	body.id = todoNextId++;

	//push body into array
	todos.push(body);

	//console.log('description: ' + body.description);

	res.json(body);
});

//DELETE /todos/:id
app.delete('/todos/:id', function (req, res){
	//fetching the matched todoid by using _.findwhere
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	//check if matchedTodo not found return error 404, else set todos without the matchedTodo id & respond with matchedTodo id in json
	if(!matchedTodo){
		res.status(404).json({"error": "no todo found with that id"});
	}else{

		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
});


app.listen(PORT, function (){
	console.log('Express is listening on port: ' + PORT);
});