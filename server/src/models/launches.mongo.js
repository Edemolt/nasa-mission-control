const mongoose = require('mongoose');

const launches_schema = new mongoose.Schema({
    flightNumber : {
        type : Number,
        required : true,    
    },
    launchDate : {
        type : Date,
        required : true,
    },
    mission : {
        type : String,
        required : true,
    },
    rocket : {
        type : String,
        required : true,
    },
    target : {
        type : String,
        // required : true,
    },
    upcoming : {
        type : Boolean,
        required : true,
    },
    success : {
        type : Boolean,
        required : true,
        default : true,
    },
    upcoming : {
        type : Boolean,
        required : true,
    },
    customers : [String],

});

module.exports = mongoose.model('Launch', launches_schema);