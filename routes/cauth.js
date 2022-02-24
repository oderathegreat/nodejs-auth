const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const { users } = require("../db");
const bcrypt = require('bcrypt');



router.post('/register', 
[
    check("email", "Please input a valid email")
        .isEmail(),
    check("password", "Please input a password with a min length of 6")
        .isLength({min: 6})
], async (req, res) => {
    const { email, password } = req.body;

    // Validate the inputs 
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        })
    }

    //check if user is in our database
    let user = users.find((user) => {
        return user.email === email
    });

    //if user already exists show an error
    if(user) {
        return res.status(422).json({
            errors: [
                {
                    msg: "This user already exists in our databases",
                }
            ]
        })
    }

    //Hashing our password

    let hashedPassword = await bcrypt.hash(password, 11);

    // Save the password into the db
    users.push({
        email,
        password: hashedPassword
    });

    res.send('Sign Up Success').status(200);

    console.log(hashedPassword);



})

router.get('/all-users', (req, res)=> {

    res.send(users);

});


module.exports = router;
