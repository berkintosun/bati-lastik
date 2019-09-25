const jwt = require('jsonwebtoken');


const router = require('express').Router()    
const UsersRouter = require('./users');

router.use((req, res, next) => {
    console.log(req.headers);
    let token = req.headers['authorization'] || req.headers['Authorization'] // handle lowercase
    //let [, token] = authorizationHeader.split(' ')
    if (!token) {
        return res.sendStatus(403) // Forbidden, you're not logged in
    } else {
        // validate the token
        try {
            let tokenIsValid = jwt.verify(token,"BatiLastikBerkin");
            console.log(tokenIsValid);
            res.locals.id = tokenIsValid.id;
            res.locals.name = tokenIsValid.name;
            res.locals.email = tokenIsValid.email;
            // Everything is good, continue to the next middleware
            return next()
        }
        catch{
            return res.sendStatus(403) // Forbidden, invalid token

        }
    }
})

router.use('/users', UsersRouter)

module.exports = router