//jshint esversion:6
const express = require("express");
var registerRouter=express.Router();
var r_router=function(con){
    registerRouter.route("/")
      .post(function(req,res){
          var sql = "INSERT INTO users VALUES (?)";
          var id = req.body.studid;
          var alias = req.body.uname;
          var fullname = req.body.studname;
          var upass = req.body.upass;
          var status = req.body.userstatus;
          var values = [id, alias, fullname, upass, status];
          con.query(sql, [values], function (err, result) {
              if (err) console.log(err);
              else{
                console.log("User Added");
              }
          });
          res.redirect('login');
        })
      .get(function(req,res){
        res.render('register',{});
      });
      return registerRouter;
  };
  module.exports=r_router;
