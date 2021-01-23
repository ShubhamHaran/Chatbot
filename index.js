var express=require("express");
var app=express();
const bodyParser = require("body-parser");
const router=express.Router();
let middleware = require('./middleware');
const server=require('./server');

const MongoClient=require('mongodb').MongoClient;

const url='mongodb://localhost:27017';
const dbName='kmit_admission_cell';
const err="Error 404 not found...";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let db
MongoClient.connect(url,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },(err,client)=>{
if(err) return console.log(err);
db=client.db(dbName);
console.log(`Connected Database: ${url}`);
console.log(`Database: ${dbName}`);
});
app.post('/getdetailsbynumber',function(req,res){
    console.log("Finding details by number...");
    db.collection('kmit',function(err,collection){
    console.log(req.body.phno);
    var q={phno:new RegExp(req.body.phno)};
    collection.find(q).toArray(function(err,items){
    if (err) throw err;
    console.log(items);
    res.send(items);
    res.end();
        });
        });});
    app.listen(8082);
