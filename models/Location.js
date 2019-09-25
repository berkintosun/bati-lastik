const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema

const locationSchema = new Schema({
    userId:{
        type:Number,
        required:true
    },
    Lat:{
        type:String,
        required:true
    },
    Long:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('location',locationSchema);