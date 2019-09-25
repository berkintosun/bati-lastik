const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema

const sikayetSchema = new Schema({
    sikayet:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('sikayet',sikayetSchema);