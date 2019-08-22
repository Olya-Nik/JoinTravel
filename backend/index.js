const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const indexRouter = require('./routes/indexRouters');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const passport = require('passport');
const MongoStore = require('connect-mongodb-session')(session);

mongoose.connect('mongodb://localhost:27017/JoinTravel', {
  useNewUrlParser: true
});
const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
};

app.use(cookieParser());
require('./passport')(passport);
app.use(
  session({
    store: new MongoStore(
      {
        uri: 'mongodb://localhost/JoinTravel',
        collection: 'sessions',
        expires: 1000 * 60 * 60 * 24
      },
      error => {}
    ),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// function isAuth(req, res, next) {
//   if (!req.isAuthenticated()) return res.status(401).end();
//   next();
// }

app.get('/auth', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).end();
  res.json(req.user);
});

app.post('auth/login', (req, res, next) => {
  passport.authenticate(
    'local-login',
    { failureFlash: true },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json([info.message]);
      }

      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        res.json({ username: user.username, id: user._id });
      });
    }
  )(req, res, next);
});

app.post('auth/signup', (req, res, next) => {
  passport.authenticate(
    'local-signup',
    { failureFlash: true },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json([info.message]);
      }

      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        res.json({ username: user.username, id: user._id });
      });
    }
  )(req, res, next);
});

app.post('auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.use(corsMiddleware);
app.use('/', indexRouter);
app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});

module.exports = app;
