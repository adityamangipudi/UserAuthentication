/**
 * Created by adityamangipudi1 on 4/24/15.
 */
var mongoose = require('mongoose')
var SessionModel = mongoose.model('session', {
    userid: {
        type: Object,
        required: true,
        unique: true
    }, timestamp:{
        type: Object
    }
})
module.exports = SessionModel
