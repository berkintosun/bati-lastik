const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../models/User');
const User = mongoose.model('users');

// Register
router.post('/',(req,res)=>{
    let errors = [];
    console.log(req.body);
    if(req.body.password != req.body.password2){
        errors.push({text:'Passwords do not match'});
    }
    if(req.body.password.length < 4){
        errors.push({text:'Password must be longer than 4 characters'});
    }

    if(errors.length>0){
        res.send(JSON.stringify(errors));
    }
    else{
        User.findOne({email:req.body.email})
        .then(user => {
            if(user){
                res.status(400).send('User Already Exists');
            }
            else{
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(req.body.password,salt, (err,hash) => {
                        if(err) throw err;
                        const newUser = new User ({
                            name: req.body.name,
                            email:req.body.email,
                            password:hash
                        });
                        newUser.save()
                        .then(user => {
                            res.send(JSON.stringify({
                                registry:"Success",
                                token:jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),id:user._id,name:user.name,email:user.email},"BatiLastikBerkin")
                            }))
                        })
                        .catch(err => {
                            console.log(err);
                            return;
                        })
                    })
                });
            }
        })
    }
})

module.exports = router;