const express = require('express');
const router = express.Router();
//creation du route
//@route    GET api/organization
//@desc     Test route 
//@access   Public -> if you need a token ? or not
router.get('/', (req, res) => res.send('Organization route'))


module.exports = router;