const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models'); //access to all db models
const jwt = require('jwt-simple');
const config = require('../secrets'); //secrets object inside config variable
const passport = require('passport');
router.use(passport.initialize());
require('../auth/passAuth')



//middleware function - gatekeeper
let requireLogin = passport.authenticate('local', {session: false})
let requireJwt = passport.authenticate('jwt', {session: false})

const token = (user) => {
    let timestamp = new Date().getTime(); //current time
    return jwt.encode({sub:user.id, iat:timestamp}, config.secrets) //encode take {data} and secret
}


router.get('/', (req, res)=>{
    res.send('Hello World')
})

router.get('/protected', requireJwt, (req, res) => {
    res.json({isValid: true})
})

//user logging with exist credentials
router.post('/login', requireLogin, (req, res) => {
    //if successful req.user
    res.json({token: token(req.user)})
})

router.post('/register', async (req, res)=>{

    //scrape info from header
    let {email, password} = req.body
    try{
        
        //determine if email already exists in our db
        let search = await db.users.findAll({where: {email}})
        if(search.length === 0){
            //email wasnt found in db
            
            //encrypt password
            password = bcrypt.hashSync(password, 8)
            //create new record
            let user = await db.users.create({
                email,
                password
            })

            let jwtToken = token(user)
            return res.json({token: jwtToken})
        } else {
            //email was found

            //return error with a status code
            return res.status(422).json({error: 'Email already exists'})
        }
    }catch(err){
        console.log(err);
        return res.status(423).json({error: `Can't access database`})
    }  

})




module.exports = router;
