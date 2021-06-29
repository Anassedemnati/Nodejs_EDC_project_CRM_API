const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
//creation du route
//@route    POST api/users
//@desc     register user
//@access   Public -> if you need a token ? or not
//req.body object of data
router.post('/', [
    body('matricule', 'matricule is required').not().isEmpty(),
    body('first_name', 'First Name is required').not().isEmpty(),
    body('last_name', 'Last Name is required').not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    body('phone', 'Phone is required').isMobilePhone(),
    body('adresse', 'Adresse is required').not().isEmpty(),
    body('password', 'Plase eneter a  password is whith 6 or more characters').isLength({ min: 6 }),
    body('role', 'Role is required').not().isEmpty(),



], (req, res) => {
    // console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    res.send('User route')


});
router.get('/', (req, res) => res.send('Users route'))
// router.get('/add', (req, res) => res.send('User add'))


module.exports = router;