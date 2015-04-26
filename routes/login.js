/**
 * Created by adityamangipudi1 on 4/24/15.
 */
var express = require('express');
var router = express.Router();
var SignupModel = require('../models/user_model')
var SessionModel = require('../models/login_model')


/* GET home page. */
router.post('/', function(req, res, next) {
    //console.log(req.body)
    SignupModel.find(req.body, function(err, result){
        //console.log(result)
        if(err) {
            res.status(500).json(err)
        }
        else {

            if(result.length>0) {
               // console.log('res', result)
                var obj = Array.isArray(result) ? result.pop() : result;
                //var cookieId
               // console.log('in here 1')

                var id=obj._id
                var limit = 900000*4
                var expiretime = new Date(Date.now() + limit);


                SessionModel.find({userid: id}, function(err, result){
                    //console.log('in here 2')
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        //console.log('in here 3')

                        if(result.length<1){


                            var userData = {userid: id, timestamp: expiretime};
                            //console.log('in here 4');
                            (new SessionModel(userData)).save(function (err, result) {
                                if (err) {
                                    res.status(500).json(err);
                                }
                                else {
                                    //console.log(result)
                                    var cookieId = result['_id'];
                                    res.cookie('session-id', cookieId, {expires: expiretime, httpOnly: false})
                                    res.status(200).json(result);
                                }
                            });
                        }else{
                            var obj = result.pop();
                            var userData = { timestamp: expiretime};
                           // console.log('in here 5');
                            SessionModel.update(userData, function(err, result){
                                if (err) {
                                    res.status(500).json(err);
                                }
                                else {
                                    //console.log(result)

                                    var cookieId = obj['_id'];
                                    res.cookie('session-id', cookieId, {expires: expiretime, maxAge: limit, httpOnly: false})
                                    res.status(200).json(result);
                                }

                            });
                        }
                    }

                });

            }else{
                //no such user
                //console.log('in here 7')

                res.status(200).json(result)
            }
        }
    });
});

module.exports = router;
