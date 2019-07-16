//jshint esversion:6
const express = require("express");
const app = express();
var mysql = require("mysql");
var cookieParser=require('cookie-parser');
var passport=require('passport');
var session=require('express-session');
app.use(cookieParser());
app.use(session({secret:'boogiewoogie',
                saveUninitialized: true,
                resave: true
              }));
require('./src/conf/passport')(app);

require('dotenv').config();

var http = require('http').createServer(app);
var io = require("socket.io").listen(http);

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.set('views','./src/views');
app.set('view engine', 'ejs');

var con = mysql.createConnection({
  host: process.env.DB_HOST, // ip address of server running mysql
  user: process.env.DB_USER, // user name to your mysql database
  password: process.env.DB_PASS, // corresponding password
  database: process.env.DB_DATABASE
});

con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

//Routers will go here.
var indexRouter=require('./src/routes/indexRoute')(con);
app.use('/',indexRouter);
var loginRouter=require('./src/routes/loginRoute')(con);
app.use('/login',loginRouter);
var registerRouter=require('./src/routes/registerRoute')(con);
app.use('/register',registerRouter);
var chatRouter=require('./src/routes/chatRoute')(con);
app.use('/chat',chatRouter);
var classRouter=require('./src/routes/classRoute')();
app.use('/class',classRouter);

io.sockets.on('connection', function(socket){
  //Added username arg
  socket.on('joinroom',function(newroom, username, alias, status){
    socket.join(newroom);
    socket.username = username;
    socket.alias = alias;
    socket.room = newroom;
    socket.status = status;
  });
  socket.on('sendchat',function(data){
    if(socket.status == "teacher"){
      io.sockets.in(socket.room).emit('sendchat',socket.username, data);
    }else{
      io.sockets.in(socket.room).emit('sendchat',socket.alias, data);
    }
  });
});

http.listen(3000, function() {
  console.log("Server started on port:3000");
});
