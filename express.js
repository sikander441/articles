const express=require('express')
const bodyParser = require("body-parser");
var fs = require('fs')
var path = require('path')
var cookieParser = require('cookie-parser'); 
var cors = require('cors')

//------------Import routers-----------



const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((cli, res, next) => {
    res.setHeader('Allow', "*")
    res.setHeader('Connection', "keep-alive")
    res.setHeader("Date", Date())
   // res.setHeader("Content-Type", "application/json; charset=utf-8")
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Allow-Control-Allow-Methods', "*")
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")

    next()
})

app.use(cookieParser())





const db = require('./dbconnect')
db.openConnection();

module.exports = app