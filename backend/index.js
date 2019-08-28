const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const indexRouter = require('./routes/indexRouters');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const MongoStore = require('connect-mongodb-session')(session);
const { Messages, Chat} = require('./models/Messages');
const multer = require('multer')
const { User } = require('./models/User');
const { UserAuth } = require('./models/UserAuth');
const { myImage } = require('./models/myImage')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage
});

mongoose.connect('mongodb://localhost:27017/JoinTravel', {
  useNewUrlParser: true
});
const app = express();

//app.use(cookieParser());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
};

require('./passport')(passport);
app.use(
  session({
    store: new MongoStore(
      {
        uri: 'mongodb://localhost/JoinTravel',
        collection: 'sessions'
       // expires: 1000 * 60 * 60 * 24
      },
      error => {}
    ),
    sameSite: false,
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false
  })
);

app.use(corsMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/', indexRouter);

function isAuth(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).end();
  next();
}

app.get('/auth', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).end();
  res.json(req.username);
  console.log(req.username)
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);

app.post('/auth/login', (req, res, next) => {
  //console.log(1, req.session);
  passport.authenticate(
    'local-login',
    { failureFlash: true },
    (err, user, info) => {
      //console.log(2, req.session);
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

app.post('/auth/signup', (req, res, next) => {
  //console.log(req.body);
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

app.post('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/messages', isAuth, async function(req, res) {
  const dataMongo = await Messages.find({});
  console.log(dataMongo)
  const arrMessages = [];
  
  for (let i = 0; i < dataMongo.length; i++) {
    arrMessages.push({
      sender: dataMongo[i].senderUserId,
      messageText: dataMongo[i].messageText,
      date: dataMongo[i].date});
  }

  // const userId = await UserAuth.find({});
  // for (let i = 0; i < userId.length; i++){
  //   if (arrMessages[i].sender === userId[i]._id){
  //     return arrMessages[i].sender = userId[i].username
  //   }
  //   res.send(arrMessages)
  // }

  //res.send(userId[0]._id)
  res.send(arrMessages);
});

app.post('/messages', async function(req, res) {
  const dataMongo = await req.body.data;
  console.log(dataMongo);
  const mes = new Messages({ messageText: dataMongo });
  mes.save();
  res.send(mes);
});

app.post('/profilesend', upload.single('imageData'), async function(req, res) {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    imageName: req.body.imageName,
    imageData: req.file.path,
    image: req.body.image,
    country: req.body.country,
    city: req.body.city,
    dateDepature: req.body.dateDepature,
    dateReturn: req.body.dateReturn,
    gastronomy: req.body.gastronomy,
    shopping: req.body.shopping,
    sightSeeings: req.body.sightSeeings,
    seaChilling: req.body.seaChilling
  });
  await user.save();
  res.end();
});

// app.post('/uploadimage', upload.single('imageData'), async (req, res, next) => {
//   console.log(req.body)
//   console.log(req.file)
//   const newImage = new myImage({
//     imageName: req.body.imageName,
//     imageData: req.file.path
//   });
//   await newImage.save()
//   res.end()
// })
// app.get ('/getprofileready', async function (req, res){
//   const profileData = await User.findById()
// })
app.get('/getall', async function(req, res) {
  const users = await User.find();
  console.log(users);
  res.json(users);
});

app.get('/getprofileready', async function(req, res) {
  const profileData = await User.findById();
});

app.get('/user/:id', async function(req, res) {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.post('/filter', async function (req, res) {
  console.log(req.body)
  const matchesDep = await User.find({dateDepature: {$gte: req.body.dateDepature, $lte: req.body.dateReturn}})
  const matchesRet = await User.find({dateReturn: {$gte: req.body.dateDepature, $lte: req.body.dateReturn}})
  const allMatches = matchesDep.concat(matchesRet)
  res.json(allMatches)
})

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});

module.exports = app;
