const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema

const jobSchema = new Schema({
    jobType:{
        type:String,
        required:true
    },
    plaka:{
        type:String,
        required:true
    },
    aracMarka:{
        type:String,
        required:true
    },
    lastikEbat:{
        type:String
    },
    lastikMarka:{
        type:String
    },
    atananId:{
        type:Number
    },
    liftNo:{
        type:Number
    },
    ekHizmet:{
        type:String
    },
    status:{
        type:String,
        default:"waiting"
    },
    workStart:{
        type:Date
    },
    workEnd:{
        type:Date
    },
    ucret:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('job',jobSchema);