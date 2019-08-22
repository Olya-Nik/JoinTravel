const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const indexRouter = require('./routes/indexRouters');
const mongoose = require("mongoose");

const cookieParser = require('cookie-parser');
const passport = require('passport');
const MongoStore = require('connect-mongodb-session')(session);

mongoose.connect('mongodb://localhost:27017/JoinTravel', { useNewUrlParser: true });
const app = express();

app.use(logger('dev'));

// const sessionConfig = {
//     secret: "keyboard cat",
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new FileStore({}),
// }
// app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));
const corsMiddleware = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	next();
}

app.use(cookieParser());
require('./passport')(passport);
app.use(session({
    store: new MongoStore({
        uri: 'mongodb://localhost/JoinTravel',
        collection: 'sessions',
        expires: 1000 * 60 * 60 * 24,
    },
    (error) => {}),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(corsMiddleware);
app.use('/', indexRouter);
app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
  });
  
  module.exports = app;