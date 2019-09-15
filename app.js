const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const UserModel = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/batilastik', { useMongoClient : true });
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/Auth');

app.use( bodyParser.urlencoded({ extended : false }) );

const routes = require('./routes/Routes');
const secureRoute = require('./routes/SecureRoutes');

app.use('/', routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.listen(3000, () => {
  console.log('Server started')
});