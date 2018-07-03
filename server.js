const express=require('express');
const bodyParser=require('body-parser');
const dbConfig=require('./config/database.config.js');
const mongoose=require('mongoose');

// create express app
const app=express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - aaplication/json
app.use(bodyParser.json());

mongoose.Promise=global.Promise;

mongoose.connect(dbConfig.url).then(()=>{
    console.log("Successfully connected to the database");  
}).catch(err=>{
    console.log("can't connect to the database");  
});

//simple route
app.get('/',(req,res)=>{
    res.json(
    {
        "message":"Welcome to CRUD books app"
    });   
});

require('./app/routes/book.route')(app);

app.listen(3000,()=>{
    console.log("server is listining to port 3000");
});