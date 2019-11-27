var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var fs = require("fs");
var connection  = require('express-myconnection');
var mysql = require('mysql');

var app = express();

app.use(

    connection(mysql,{

        host: '34.94.217.52', //'localhost',
        user: 'wb',
        password : '&SRNxv5*KnkD',
        port : 3306, //port mysql
        database:'WEASEL_BEAGLE'

    },'request') //or single

);


// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler());
}




var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * INCLUDE ALL ROUTES
 */
require('./routes')(app);


/*
 * GET home page.
 */
app.use( express.static(__dirname + '/dist/frontEnd' ) ); //<- it will automatically search for index.html under src folder.

/* final catch-all route to index.html defined last */
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/frontEnd/index.html');
});




// /**
//  * Module dependencies.
//  */
//
//
// var express = require('express');
// //var routes = require('./routes');
// var http = require('http');
// var path = require('path');
// var fs = require("fs");
//
// //load customers route
// var app = express();
//
// var connection  = require('express-myconnection');
// var mysql = require('mysql');
//
// // all environments
// app.set('port', process.env.PORT || 4300);
// var logger = require('morgan');
// var json = require('json');
// var urlencode = require('urlencode');
// var methodOverride = require('method-override');
// app.use(logger('dev'));
// app.use(json);
// app.use(urlencode);
// app.use(methodOverride);
//
//
// /*
//  * GET home page.
//  */
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + './src/index.html'));
// });
//
// // //Put your angular dist folder here
// // app.use(express.static(path.join(__dirname, 'frontEnd')));
//
//
//
// // app.use(express.static(path.join(__dirname, 'public')));
//
// // development only
// if ('development' == app.get('env')) {
//   var errorhandler = require('errorhandler');
//   app.use(errorhandler);
// }
//
// /*------------------------------------------
//     connection peer, register as middleware
//     type koneksi : single,pool and request
// -------------------------------------------*/
//

//
//
//
// // app.use(express.static('src')); // myApp will be the same folder name.
// // app.get('/', function (req, res,next) {
// //   res.redirect('/');
// // });
//
//
//
// //app.use(app.router);
//
// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
