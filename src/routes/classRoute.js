//jshint esversion:6
const express = require("express");
var classRouter=express.Router();
var cl_router=function(con){
    classRouter.route("/")
      .get(function(req,res){
        if(req.user){
          res.render('class',{});
        }else{
          res.redirect('login');
        }
      })
      .post(function(req,res){
        var classname = req.body.classname;
        var thisuser = req.user;
        var userstatus = thisuser[0].userstatus;
        var myuser = thisuser[0].alias;
        var username = thisuser[0].username;
        res.render('chat',{myuser:myuser,classname:classname,userstatus:userstatus,username:username});
      });
      return classRouter;
  };
  module.exports=cl_router;
