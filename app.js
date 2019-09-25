const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// DB connection via mongoose
mongoose.connect('mongodb://localhost/batilastik',{
    useNewUrlParser: true
})
.then(()=> console.log('Db Connected'))
.catch(err => console.log(err));

//Routes
// Load routes
const apiRouter = require('./routes/api/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
// Using loaded routes
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/api',apiRouter);

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
