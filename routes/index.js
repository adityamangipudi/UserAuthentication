var express = require('express');
var router = express.Router();
var valid = false;
var ContactModel = require('../models/contacts_model');
var SessionModel = require('../models/login_model');
function validate(req, res, next) {
  console.log('req cookies');
  console.log(req.cookies);
  if (typeof req.cookies['session-id'] === 'undefined')
     // &&valid(req.cookies['session-id']))
    next();
  else {
    console.log(req.cookies['session-id']);
    //next();
    SessionModel.find({_id:req.cookies['session-id'] }, function(err, result){
      if(err) {

      }else{
        if(result.length>0){
          var obj=result.pop();

          if(obj['timestamp'] >Date.now()){
            console.log('true');
            var limit = 900000*4;
            var expiretime = new Date(Date.now() + limit);
            var userData = { timestamp: expiretime};

            SessionModel.update(userData, function(err, result){
              if (err) {
                res.status(500).json(err);
              }
              else {
                //console.log(result)

                var cookieId = obj['_id'];
                res.cookie('session-id', cookieId, {expires: expiretime, maxAge: limit, httpOnly: false});
                console.log('got here');
                res.render('index', { user: 'Valid' });
                //res.status(200).json({message: 'User Found Cookie Updated'});
              }

            });
          }else{
            console.log('false')
            next();
          }

          //console.log(obj)
        }
        else{
          next();
        }

      }

    });

   // res.status(200).json({message: 'Redirect the User'});
  }
}
/* GET home page. */
router.get('/', validate,function(req, res, next) {
  res.render('index', { user: 'Invalid' });
});

module.exports = router;
