const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const config = require("config")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth');
const User = require('../../models/User')
//creation du route
//@route    GET api/auth
//@desc     Test route 
//@access   Public -> if you need a token ? or not
router.get('/', auth, async (req, res) => {

try{

    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

}catch(err){
    console.error(err.message);
    res.status(500).send('server Error')
}



});


//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public 

router.post('/', [
    body('email', 'Email is required').isEmail(),
    body('password', 'Password is required ').exists(),
    // body('role', 'Role is required').not().isEmpty(),



],
    async (req, res) => {
        // console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body;




        try {


            //see if user exist and  ,email,matricule
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials !' }] })
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials !' }] })
            }
           

            
            
            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: 360000},
                (err, token)=> {
                    if(err) throw err;
                    res.json({ token });
                    
                    }
                );

            //return jsonwebtoken
           
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error!')

        }

        //see if user exist and phone ,email,matricule
        


    

    });


module.exports = router;