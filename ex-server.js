var express = require('express');
var app = express();
var path=require('path');
var MongoClient = require('mongodb').MongoClient;
//var request = require('request');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// parse various different custom JSON types as JSON
app.use(bodyParser.json())


app.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname,'public', 'index.html'));
res.json({"error" : false,"message" : "Hello World"});
});

app.get('/about', function (req, res) {
	
   // res.sendFile(path.join(__dirname,'public', 'index1.html'));
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//res.header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");



var url = "mongodb://localhost:27017/";
MongoClient.connect(url,  { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mynewdb");
  // create table
/*  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });*/

  /*var myobj = { name: "Company Infdac", address: "Highway 373" };
  dbo.collection("customers").insertOne(myobj, { useNewUrlParser: true }, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    console.log(res.insertedCount);
    db.close();
  });*/

 //======================get data============== //
// get data -  find db
dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    res.send(result);
  //  return result;
    db.close();
  });


/*// post data - insert db
var myobj = { name: "Ranajeet", address: "Highway 12" };
dbo.collection("customers").insertOne(myobj, { useNewUrlParser: true }, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    //res.send(result);
    //console.log(result);
    db.close();
  });*/

});
//res.send(result);
    
});


// header need to set this for post data to DB
app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
   
}); 

app.post('/add', urlencodedParser, function (req, res) {
/*res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');*/
	var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mynewdb");
		// post data - insert db
		var myobj = {  name: req.body.name,  address: req.body.address };
		dbo.collection("customers").insertOne(myobj, { useNewUrlParser: true }, function(err, res) {
		    if (err) throw err;
		    console.log("1 document inserted");
		    if(err) { throw err; }
		    db.close();
		});
	}); 
});







/*app.get('/add', urlencodedParser,  function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});*/

/*app.get('/add', jsonParser, (req, res) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    console.log(req.body);
    return;
});*/


//app.use('/coins', Router); 
var port = process.env.PORT || 3000;
app.listen(3000, function (){
	console.log(` Port No ${port} is running`);
});