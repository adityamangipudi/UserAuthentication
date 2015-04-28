/**
 * Created by adityamangipudi1 on 4/26/15.
 */
var router  =require('express').Router();
var ContactModel = require('../models/contacts_model');
var SessionModel = require('../models/login_model');
function validate(req, res, next) {
    console.log('req cookies');
    console.log(req.cookies);
    if (typeof req.cookies['session-id'] !== 'undefined'
        &&valid(req.cookies['session-id']))
        next();
    else {
        res.status(300).json({error: 'Redirect the User'});
    }
}
function valid(sessionid){
    //console.log('ses;, ', sessionid)
    SessionModel.find({_id:sessionid}, function(err, result){
        if(err) {
            return false;
        }
        else{
            var curr = new Date();
           // console.log(result)
            if(Array.isArray(result)){
                var obj = result.pop();

            }else{
                obj = result;
            }
            //console.log(obj.timestamp)
            var cookietime = new Date(obj.timestamp);
            var diff=cookietime-curr;
            //console.log('diff', diff)

            //console.log('times', curr, cookietime, diff)
            if(diff>0&& diff<1 ){
                return true;
            }else{
                return false;
            }
        }
    })

    console.log('here');
    return true;
}
router.get('/', validate,function (req, res){
        ContactModel.find({},function(err, result){
            if(err) res.status(500).json(err);
            else res.status(200).json(result);
        })

})
router.get('/logout',function (req, res){
    console.log(req.cookies)
    var limit = 900000*4;
    var expiretime = new Date(Date.now() - limit);
    SessionModel.update({_id:req.cookies['session-id']}, {timestamp: expiretime},function(err, result){
        if(err) res.status(500).json(err);
        else {

            res.clearCookie('session-id');
            res.redirect('/');
        }
    })


       /* SessionModel.update({_id:rea},function(err, result){
            if(err) res.status(500).json(err);
            else res.status(200).json(result);
        })*/

})

module.exports = router;
