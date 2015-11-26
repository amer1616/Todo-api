var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;

//create todos obj model
var todos = [
{
  id: 1,
  description: 'Meet mom for launch',
  completed: false
},
{
  id: 2,
  description: 'Go to Market',
  completed: false
},
{
  id: 3,
  description: 'Feed the cat',
  completed: false
}];


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
  })
  if (matchedid){
    res.json(matchedid);
  }else{
    res.status(404).send();
  }


});


app.listen(PORT, function (){
  console.log('Express is listening on port: ' + PORT);
})