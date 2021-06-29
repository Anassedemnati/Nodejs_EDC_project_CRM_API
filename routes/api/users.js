const express = require('express');
const router = express.Router();
//creation du route
//@route    GET api/users
//@desc     Test route 
//@access   Public -> if you need a token ? or not
router.get('/', (req, res) => res.send('User route'))
// router.get('/add', (req, res) => res.send('User add'))


module.exports = router;