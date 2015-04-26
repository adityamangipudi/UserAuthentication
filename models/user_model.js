/**
 * Created by adityamangipudi1 on 4/24/15.
 */
var mongoose = require('mongoose')
var SignupModel = mongoose.model('user', {

    email: {
        type: String,
        required: true,
        validate: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        unique: true
    },name: {
        type: String,
        required: true

    },
    password:{
        type: String,
        required: true,
        validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,20}$///i
    }
})
module.exports = SignupModel
