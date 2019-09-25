const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema

const oneriSchema = new Schema({
    oneri:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('oneri',oneriSchema);