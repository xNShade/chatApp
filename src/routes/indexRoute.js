//jshint esversion:6
const express = require("express");
var indexRouter=express.Router();
var i_router=function(con){
    indexRouter.route("/")
      .get(function(req,res){
        res.render('index',{});
      });
      return indexRouter;
  };
  module.exports=i_router;
