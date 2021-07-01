const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Organization = require('../../models/Organizations')
const User = require('../../models/User')
const { body, validationResult } = require('express-validator');


//creation du route
//@route    POST api/organization/
//@desc     create or update organization 
//@access   Private
router.post('/',[  auth,[
    body('code','code is required').not().isEmpty(),
    body('name','name is required').not().isEmpty(),
    body('tele','tele is required').not().isEmpty(),
    body('contact_email','contact_email is required').not().isEmpty(),
    body('web_site','web_site is required').not().isEmpty()
] ], async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {code, name, adresse, tele, contact_name, contact_email, web_site} = req.body;
    // Build organization object.
    const organizationFields = {};
    organizationFields.user = req.user.id;
    if(code) projectFields.code = code;
    if(name) projectFields.name = name;
    if(adresse) projectFields.adresse = adresse;
    if(tele) projectFields.tele = tele;
    if(contact_name) projectFields.contact_name = contact_name;
    if(contact_email) projectFields.contact_email = contact_email;
    if(web_site) projectFields.web_site = web_site;
    
    

    try{
        let organization = await Organization.findOne({code: req.code })
        if(organization){
            //Update
            organization = await Organization.findOneAndUpdate({  user: req.user.id },{$set: organizationFields },{new: true});
            return res.json(organization);
        }
        
        organization = new Project(organizationFields);
        await organization.save();
        res.json(organization)

    }catch(err){
        console.error(err.message)
        return res.status(500).send('Server Error!');


    }


});



//creation du route
//@route    GET  api/organization
//@desc     get all organization
//@access   Public 
router.get('/',async (req, res)=> {
    try {
        const organization = await Organization.find().populate('user', ['name']);
        res.json(organization)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error!');
    }


});
//creation du route
//@route    DELETE api/organization/
//@desc     Delete organization
//@access   privet
router.delete('/', auth, async (req, res)=> {
    try {
        //@to do - remove organization
        //Remove organization
         await Organization.findOneAndDelete({ user: req.user.id });
         res.json({ msg: 'Organization deleted'});
        
    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error!');
    }


});


module.exports = router;