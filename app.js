// Dotenv
require('dotenv').config();

// Express
const express = require('express');
// Morgan
const morgan = require('morgan');
// Body Parser
const bodyparser = require('body-parser');

// Path
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

const mongoose = require('mongoose');

// MONGO
mongoose.connect('mongodb://localhost:27017/cruduser', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// mongodb connection 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// log requests
app.use(morgan('tiny'));

// parser request to body-parser
app.use(bodyparser.urlencoded({extended: true}));

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load Assets
app.use('/css', express.static(path.resolve(__dirname, 'public/css')));
app.use('/img', express.static(path.resolve(__dirname, 'public/img')));
app.use('/js', express.static(path.resolve(__dirname, 'public/js')));


// Load routes
app.use('/', require('./api/routes/router'));

app.listen(PORT, () => {
    console.log(`Server is runing on Port :${PORT}`);
})