const express = require('express');
const router = express.Router();
//creation du route
//@route    GET api/auth
//@desc     Test route 
//@access   Public -> if you need a token ? or not
router.get('/', (req, res) => res.send('auth route'))


module.exports = router;