const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Loading Model
require('../models/User');
const User = mongoose.model('users');

// Login route
router.post('/',(req,res,next) => {
    User.findOne({
        email:req.body.email
    }).then(user => {
        if(!user){
            return res.send(JSON.stringify({message:'User cannot be found'}));
        }
        console.log(user)
        // Password Matching
        bcrypt.compare(req.body.password,user.password,(err,success) => {
            if(err) throw err;
            if(success) return res.send(JSON.stringify({token:jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),id:user._id,name:user.name,email:user.email},"BatiLastikBerkin")}));
            return res.send(JSON.stringify({message:'Check your incridials'}));
        })
    })
})

module.exports = router;