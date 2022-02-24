const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const { users } = require("../db")



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

    else{
        
        res.status(200).send('Success');
    }


    //Hashing our password


})


module.exports = router;
