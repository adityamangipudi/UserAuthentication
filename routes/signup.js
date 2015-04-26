/**
 * Created by adityamangipudi1 on 4/24/15.
 */
var express = require('express');
var router = express.Router();
var SignupModel = require('../models/user_model')

var cookieParser = require('cookie-parser');

/* GET users listing. */
router.post('/', function(req, res) {
    console.log(req.body);
    (new SignupModel(req.body)).save( function(err, result){
        console.log(err, result);
        if(err) res.status(500).json(err)
        else res.status(200).json(result)
    });

});

module.exports = router;
