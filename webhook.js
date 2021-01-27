const express=require('express')
const app=express();
const dfff=require('dialogflow-fulfillment')
const bodyParser = require("body-parser");
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://localhost:27017';
const dbName='actfibernet';
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
app.get('/',(req,res)=>{
    res.send("Shubham is live!!!")
    res.end()
});
app.post('/add_issue',function(req,res){
    const agent=new dfff.WebhookClient({
        request:req,
        response:res,
    });
    function action(agent){
    console.log("Adding issue details...");
    var phno=agent.parameters['phno'];
    var issue=agent.parameters['issue'];
    var desc=agent.parameters['desc'];
    var time=agent.parameters['time'];
    var status=agent.parameters['status'];
    var digits = '0123456789'; 
    let OTP = ''; 
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "T"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    for (let i = 0; i < 10; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    var query={"phno":phno,"issue":issue,"status":status,"Description":desc,"token":OTP,"time":datetime};
    db.collection('issues',function(err,collection){
    collection.insertOne(query,function(err,items){
    if (err) throw err;
    console.log("1 issue added...");
    res.end("1 issue added.."+items) ;
    res.end();
        });
        });}
        var intentMap=new Map();
        intentMap.set('Internet',action);
        agent.handleRequest(intentMap);

    });
app.listen(3333,()=>console.log('Server is live at 3333'));
