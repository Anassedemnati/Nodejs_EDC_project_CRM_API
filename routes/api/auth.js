const express = require('express');
const router = express.Router();
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


module.exports = router;