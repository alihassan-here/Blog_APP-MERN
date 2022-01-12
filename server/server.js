const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//IMPORT ROUTES
const postRoute = require('./routes/post.route')

//APP
const app = express();

//DB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connected!')).catch(err => console.log(err));

//MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

//ROUTES
app.use('/api', postRoute);

//PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));