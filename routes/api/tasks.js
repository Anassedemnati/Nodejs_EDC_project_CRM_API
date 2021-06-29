const express = require('express');
const router = express.Router();
//creation du route
//@route    GET api/tasks
//@desc     Test route 
//@access   Public -> if you need a token ? or not
router.get('/', (req, res) => res.send('Tasks route'))


module.exports = router;