const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const db = require('../models');
const config = require('../secrets');


//local strategy

//pass in options to rewrite username field
let options = {usernameField: 'email'}

let localLogin = new LocalStrategy(options, async (email, password, done) => {
    try{
        //check to see if email is in our db
        let records = await db.users.findAll({where: {email}})
        if(records !== null){
            //email found
            // check password
            bcrypt.compare(password, records[0].password, (err, isMatch)=>{
                //check if error
                if(err){
                    return done(err)
                }
                //mismatch passwords
                if(!isMatch){
                    return done(null, false)
                }
                //valid user - send back user on session
                return done(null, records[0])
            })
        } else {
            //no email found
            //exit with error
            return done(null, false)
        }
    } catch(err){
        return done(err)
    }
})

//jwt strategy

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secrets,
    passReqToCallback: true
}

let jwtLogin = new JwtStrategy(jwtOptions, async (req, payload, done) => {
    //payload.sub == primary key
    try {
        //check if user in db
        let user = await db.users.findByPk(payload.sub)
        if(user){
            //success
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch(err){
        //error in reading db
        return done(error)
    }
})






passport.use(localLogin)
passport.use(jwtLogin)






// const init = (passport) => {
//     passport.use(new LocalStrategy({
//         usernameField: 'email'
//     },
//     async (email, password, done) =>{
//         try{
//             let result = await db.users.findOne({where: {email}})
//             if(result){
//                 bcrypt.compare(password, result.password, (err, match) => {
//                     if(match){
//                         return done(null, result)
//                     } else {
//                         return done(null, false)
//                     }
//                 })
//             } else {
//                 return done(null, false)
//             }
//         } catch(err){
//             return done(err);
//         }
//       }
//     ));
// }

// module.exports = init
