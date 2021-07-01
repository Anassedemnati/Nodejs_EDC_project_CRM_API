const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Task = require('../../models/Tasks')
const User = require('../../models/User')
const { body, validationResult } = require('express-validator');

//creation du route
//@route    POST api/tasks/
//@desc     create or update task
//@access   Private
router.post('/',[ auth,[
    body('code','code is required').not().isEmpty(),
    body('label','label is required').not().isEmpty(),
    body('user','user is required').not().isEmpty(),
    body('deleverable','deleverable is required').not().isEmpty(),
    

]],async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    const {code, label, description, user, ended, deleverable} = res.body;
    const taskFields={};
    taskFields.user = req.user.id;
    if(code) taskFields.code = code;
    if(label) taskFields.label = label;
    if(description) taskFields.description = description;
    if(user) taskFields.user = user;
    if(ended) taskFields.ended = ended;
    if(deleverable) taskFields.deleverable = deleverable;

    try {
        let task = await Task.findOne({user: req.user.id})
        if (task){
            Update
            task= await Task.findOneAndUpdate({user: req.user.id}, {$set:taskFields},{new: true});
            return res.json(task);
        }

        task= new Task(taskFields);
        await task.save();
        res.json(task)



    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server Error');
    }

});


//creation du route
//@route    GET api/tasks/
//@desc     get all  tasks
//@access   public
router.get('/',async (req, res)=> {
    try {
        const task = await Task.find().populate('user', ['name']);
        res.json(task)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error!');
    }


});
//creation du route
//@route    GET api/tasks/user/:user_id
//@desc     get task by user id
//@access   public
router.get('/tasks/:user_id',async (req, res)=> {
    try {
        const task = await Task.findOne({ user: req.params.user_id}).populate('user', ['name']);
        if(!task) return res.status(400).json({msg: 'Profile not found'});
        res.json(task)
    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error!');
    }


});
//creation du route
//@route    DELETE api/tasks/
//@desc     Delete task
//@access   privet
router.delete('/', auth, async (req, res)=> {
    try {
        //@to do - remove projects
        //Remove Project
         await Task.findOneAndDelete({ user: req.user.id });
         res.json({ msg: 'Task deleted'});
        
    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error!');
    }


});

module.exports = router;