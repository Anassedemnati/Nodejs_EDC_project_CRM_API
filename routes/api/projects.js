const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Project = require('../../models/Projects')
const User = require('../../models/User')
const { body, validationResult } = require('express-validator');

//creation du route
//@route    GET api/projects/one
//@desc     Get current project 
//@access   Private
router.get('/one', auth, async (req, res) => {
    try{
        const project = await Project.findOne({ user: req.user.id }).populate('user', ['name']).populate('organization',['name']);

        if(!project){
            return res.status(400).json({msg: 'There is no project'})
        }
        res.json({project});
    }catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error !');
    }




});

//creation du route
//@route    POST api/projects/
//@desc     create or update user profile 
//@access   Private
router.post('/',[  auth,[
    body('code','code is required').not().isEmpty(),
    body('name','name is required').not().isEmpty(),
    body('montant','montant is required').not().isEmpty(),
    body('user','user is required').not().isEmpty(),
    body('organization','organization is required').not().isEmpty()
] ], async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {code, name, description, user, organization, montant, date_start, date_end} = req.body;
    // Build Project object.
    const projectFields = {};
    projectFields.user = req.user.id;
    if(code) projectFields.code = code;
    if(name) projectFields.name = name;
    if(description) projectFields.description = description;
    if(user) projectFields.user = user;
    if(organization) projectFields.organization = organization;
    if(montant) projectFields.montant = montant;
    if(date_start) projectFields.date_start = date_start;
    if(date_end) projectFields.date_end = date_end;
    

    try{
        let project = await Project.findOne({code: req.code })
        if(project){
            //Update
            project = await Project.findOneAndUpdate({  user: req.user.id },{$set: projectFields },{new: true});
            return res.json(project);
        }
        //Create 
        project = new Project(projectFields);
        await project.save();
        res.json(project)

    }catch(err){
        console.error(err.message)
        return res.status(500).send('Server Error!');


    }


});

//creation du route
//@route    GET api/projects/
//@desc     get all  projects
//@access   public
router.get('/',async (req, res)=> {
    try {
        const projects = await Project.find().populate('user', ['name']);
        res.json(projects)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error!');
    }


});

//creation du route
//@route    GET api/projects/user/:user_id
//@desc     get projects by user id
//@access   public
router.get('/user/:user_id',async (req, res)=> {
    try {
        const project = await Project.findOne({ user: req.params.user_id}).populate('user', ['name']);
        if(!project) return res.status(400).json({msg: 'Profile not found'});
        res.json(project)
    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error!');
    }


});




//creation du route
//@route    DELETE api/projects/
//@desc     Delete project
//@access   privet
router.delete('/', auth, async (req, res)=> {
    try {
        //@to do - remove projects
        //Remove Project
         await Project.findOneAndDelete({ user: req.user.id });
         res.json({ msg: 'Project deleted'});
        
    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error!');
    }


});



module.exports = router;