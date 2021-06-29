const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
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



],
    async (req, res) => {
        // console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { matricule, first_name, last_name, email, phone, adresse, password, role } = req.body;




        try {


            //see if user exist and  ,email,matricule
            let matricu = await User.findOne({ matricule })
            if (matricu) {
                return res.status(400).json({ errors: [{ msg: 'matricule alredy exists' }] })
            }
            let emai = await User.findOne({ email })
            if (emai) {
                return res.status(400).json({ errors: [{ msg: 'email alredy exists' }] })
            }

            user = new User({
                matricule,
                first_name,
                last_name,
                email,
                phone,
                adresse,
                password,
                role,
            })



            //encrypt password
            //salt for encry
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            await user.save();



            //return jsonwebtoken
            res.send('User registred')

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error!')

        }

        //see if user exist and phone ,email,matricule
        //encrypt password
        //return jsonwebtoken

        res.send('User route')


    });
router.get('/', (req, res) => res.send('Users route'))
// router.get('/add', (req, res) => res.send('User add'))


module.exports = router;