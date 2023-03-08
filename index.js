const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');





// use 

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/ums')
.then(() => console.log('Connected!'));

// for route
const user_route  = require('./routes/user_route');

app.use('/',user_route);


app.listen(3000,()=>{
    console.log('Running on http://localhost:3000');
});