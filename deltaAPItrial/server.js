// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
// var db = require('./db.js');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8080;        // set our port


//MIDDLEWARE API CALLS FOR REQUESTS

app.use(function(req,res,next) {
  //Do Logging on Every Request
  console.log('Something is happening');
  next();
});

app.get('/test', function(req, res) {
    res.json({ message: 'hello' });
});

app.get('/info', function(req, res) {
	var array = [1,2,3,4];
    res.json(array);
});


//GET REQUESTS


//POST REQUESTS





// //Api to get the Initial Items from the Server
// app.get('/initial' , function(req,res){
//   // let initialData = db.getItemList();
//   res.json(db.getItemList());
//   console.log(db.items);
//   // db.items = initialData;
// });


// //API for Adding an Item, Takes in an object with 
// //name/id from client and returns an updated initial Data array
// app.post('/addItem', function(req, res){
//    console.log("The item to add is: " + req.body);
// if (db.items.length > 0) {
//   db.items.push(req.body);
//   console.log("Successfully added an item. The new list is: " + db.items);
// } else {
//   let newList = [];
//   newList.push(req.body);
//   console.log("the new list has one item, " + req.body);
//   db.items = newList;
// }
//    res.json(db.items);
//    db.saveItemList(db.items);
//   console.log("db is" + db.items);

// });



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);





