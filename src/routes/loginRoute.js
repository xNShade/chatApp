var express=require('express');
var passport=require('passport');
var loginRouter=express.Router();
var l_router=function(){
    loginRouter.route("/")
        .post(passport.authenticate('local', {successRedirect: '/class',
                                              failureRedirect: '/login',
                                              failureFlash: true
                                            }))
        .get(function(req,res){
          res.render('login',{});
        });
        return loginRouter;
};
module.exports=l_router;
