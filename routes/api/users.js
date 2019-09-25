const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Loading Model
require('../../models/User');
const User = mongoose.model('users');

require('../../models/Location');
const Location = mongoose.model('location');


router.post('/test',(req,res) => {
    console.log("WTDTRRFFDFDF")
    console.log(req.body)
    res.send("Succehehehess");
})

router.post('/setAvailable',(req,res) => {
    User.update
    User.findOne({
        email:res.locals.email
    }).then(user => {
        if(!user){
            return res.send(JSON.stringify({message:'User cannot be found'}));
        }
        user.available = true;
        user.save(function (err) {
            if(err) {
                console.error('ERROR!');
                console.log(err);
                return res.send(JSON.stringify({message:'Failed'}));
            }
        });
        return res.send(JSON.stringify({message:'Success'}));
    })
})

router.post('/setBusy',(req,res) => {
    User.update
    User.findOne({
        email:res.locals.email
    }).then(user => {
        if(!user){
            return res.send(JSON.stringify({message:'User cannot be found'}));
        }
        user.available = false;
        user.save(function (err) {
            if(err) {
                console.error('ERROR!');
                console.log(err);
                return res.send(JSON.stringify({message:'Failed'}));
            }
        });
        return res.send(JSON.stringify({message:'Success'}));
    })
})

router.post('/availableWorkers',(req,res) => {
    User.update
    User.find({
        available:true
    },'name').then(users => {
        if(!users){
            return res.send(JSON.stringify({message:'Users cannot be found'}));
        }
        return res.send(users);
    })
})

router.post('/updateLoc',(req,res) => {
    const loc = new Location({
        userId:res.locals.id,
        Lat:req.body.lat,
        Long:req.body.long
    });

    loc.save()
    .then(savedLoc => {
        return res.send(JSON.stringify({message:'Success'}));
    })
    .catch(err => {
        console.log(err);
        return res.send(JSON.stringify({message:'Error happened'}));
    })
})

module.exports = router;