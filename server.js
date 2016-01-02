var express = require('express');
//parsing json body ..to be parsed by express
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

//create todos obj model of array
var todos = [];

//create obj to keep tracking our data.. to increment new todo id so getting new id
var todoNextId = 1;

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
  var matchedid;

  todos.forEach(function (todo){
  	if (todoid === todo.id){
  		matchedid = todo;
  	}
  });

  if (matchedid){
  	res.json(matchedid);
  }else{
  	res.status(404).send();
  }
});

//POST /todos/:id
app.post('/todos', function (req, res){
	var body = req.body;

	//add id field
	body.id = todoNextId++;

	//push body into array
	todos.push(body);

	//console.log('description: ' + body.description);

	res.json(body);
});


app.listen(PORT, function (){
	console.log('Express is listening on port: ' + PORT);
});