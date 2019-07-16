//jshint esversion:6
const express = require("express");
var chatRouter=express.Router();
var c_router=function(con){
    chatRouter.route("/")
      .get(function(req,res){
        var thisuser = req.user;
        var myuser = thisuser[0].alias;
        if(req.user){
          res.render('chat',{myuser:myuser});
        }else{
          res.redirect('login');
        }
      });
      return chatRouter;
  };
  module.exports=c_router;
