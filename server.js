/**
 * Module dependencies.
 */


var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require("fs");

//load customers route
var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(

    connection(mysql,{

        host: '34.94.217.52', //'localhost',
        user: 'wb',
        password : '&SRNxv5*KnkD',
        port : 3306, //port mysql
        database:'WEASEL_BEAGLE'

    },'request') //or single

);

require('./routes')(app);

/*
 * GET home page.
 */
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + './index.html'));
});



//app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
