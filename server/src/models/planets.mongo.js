const mongoose = require('mongoose');

const planet_schema = new mongoose.Schema({
    kepler_name : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('Planet', planet_schema);