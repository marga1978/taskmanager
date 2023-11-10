const express = require("express");
//require('./db/mongoose');
const Task=require('../models/task');
const auth = require("../middleware/auth");
const router= new express.Router()


router.patch('/tasks/:id', auth, async (req,res)=>{
  try {
    const updates=Object.keys(req.body)
    const allowedUpdates=['description','completed']
    const isValidOperation=updates.every(update=>allowedUpdates.includes(update))
    if (!isValidOperation)
      return res.status(404).send({"Error": "Invalid updates!"})
    
    const _id=req.params.id
    // const task=await Task.findByIdAndUpdate(_id, req.body, {new:true, runValidators:true});
    // if (!task)
    //   return res.status(404).send()
    //const task=await Task.findById(_id);
    const task=await Task.findOne({_id, owner: req.user._id}).exec();
    if (!task)
      return res.status(404).send({Error:"nessun task trovato"})
    updates.forEach(prop => task[prop]=req.body[prop]);
    const resTask=await task.save();
    res.send(resTask);
  } catch (err) {
    res.status(400).send(err.message)
  } 
})


router.post('/tasks', auth, async (req,res)=>{
  //console.log(req.body)
  try {
    //const task=new Task(req.body)
    const task=new Task({
      ...req.body,
      owner: req.user._id
    })
    const resTaskDoc = await task.save();
    console.log(resTaskDoc)
    res.status(201).send(resTaskDoc)
  } catch (err) {
    res.status(400).send(err.message)
    console.log(err.message)
  } 
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req,res)=>{
    //const tasks=await Task.find({owner: req.user._id}).exec();
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
              limit: parseInt(req.query.limit),
              skip: parseInt(req.query.skip),
              sort
            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/tasks/:id', auth, async (req,res)=>{
  try {
    const _id=req.params.id
    //const task=await Task.findById(_id).exec();
    const task=await Task.findOne({_id, owner: req.user._id}).exec();
    if (!task)
      return res.status(404).send()
    res.send(task)
  } catch (err) {
    res.status(500).send(err.message)
  } 
})

router.delete('/tasks/:id', auth, async (req,res)=>{
  try {
    const _id=req.params.id
    //const task=await Task.findByIdAndDelete(_id);
    const task=await Task.findByIdAndDelete({_id, owner:req.user.id});
    if (!task)
      return res.status(404).send()
    res.send(task)
  } catch (err) {
    res.status(400).send(err.message)
  } 
})
module.exports=router;