const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Loading Model
require('../../models/Job');
const Job = mongoose.model('job');

router.post('/createJob',(req,res) => {
    const job = new Job(req.body);

    job.save()
    .then(savedJob =>{
        res.send(JSON.stringify({
            message:"Success",
            jobId: savedJob._id
        }))
    })
    .catch(err => {
        console.log(err);
        return res.send('Error');
    })
})

router.post('/assignJob',(req,res) => {
    Job.findOne({_id:req.body.jobId})
    .then(job => {
        if(!job){
            return res.send(JSON.stringify({message:'Job cannot be found'}));
        }
        job.atananId = req.body.atananId;
        job.status = "assigned";
        job.workStart = Date.now
        job.save()
        .then(editedJob => {
            return res.send(JSON.stringify({message:'Success'}));
        })
        .catch(err => {
            console.log(err)
            return res.send(JSON.stringify({message:'Error'}));
        })
    })
})

router.post('/finishJob',(req,res) => {
    Job.findOne({_id:req.body.jobId})
    .then(job => {
        if(!job){
            return res.send(JSON.stringify({message:'Job cannot be found'}));
        }
        job.workEnd = Date.now
        job.status = "finished";
        job.save()
        .then(editedJob => {
            return res.send(JSON.stringify({message:'Success'}));
        })
        .catch(err => {
            console.log(err)
            return res.send(JSON.stringify({message:'Error'}));
        })
    })
})

router.post('/jobSummary',(req,res) => {
    Job.find({
        date:{$gte:new ISODate(req.body.startDate),$lt:new ISODate(req.body.endDate)}
    }).then(jobs => {
        if(!jobs){
            res.send(JSON.stringify({message:'Error'}))
        }
        return res.send(JSON.stringify(jobs));
    })
})

module.exports = router;