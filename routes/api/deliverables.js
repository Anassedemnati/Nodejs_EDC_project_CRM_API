const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Deleverable = require('../../models/Deleverable')
const User = require('../../models/User')
const { body, validationResult } = require('express-validator');


//creation du route
//@route    POST api/deliverables/
//@desc     create or update deliverable 
//@access   Private
router.post('/',[  auth,[
    body('code','code is required').not().isEmpty(),
    body('label','label is required').not().isEmpty(),
    body('link','link is required').not().isEmpty(),
    
] ], async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {code, label, link} = req.body;
    // Build deliverables object.
    const deleverableFields = {};
    projectFields.user = req.user.id;
    if(code) projectFields.code = code;
    if(label) projectFields.label = label;
    if(link) projectFields.link = link;
    
    

    try{
        let  deleverable = await Deleverable.findOne({code: req.code })
        if(deleverable){
            //Update
            deleverable = await Deleverable.findOneAndUpdate({  user: req.user.id },{$set: deleverableFields },{new: true});
            return res.json(deleverable);
        }
        
        project = new Project(projectFields);
        await deleverable.save();
        res.json(deleverable)

    }catch(err){
        console.error(err.message)
        return res.status(500).send('Server Error!');


    }


});
//creation du route
//@route    GET api/deliverables/
//@desc     get all  deliverable
//@access   public
router.get('/',async (req, res)=> {
    try {
        const deleverable = await Deleverable.find().populate('user', ['name']);
        res.json(deleverable)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error!');
    }


});

//creation du route
//@route    DELETE api/deliverables/
//@desc     Delete deliverable
//@access   privet
router.delete('/', auth, async (req, res)=> {
    try {
        //@to do - remove projects
        //Remove Project
         await Deleverable.findOneAndDelete({ user: req.user.id });
         res.json({ msg: 'deliverables deleted'});
        
    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error!');
    }


});

module.exports = router;