const { UserAuth } = require('./models/UserAuth');
const config = require('./config/constants');

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;

function findOrCreateUser(provider, profile, done) {
  // FACEBOOK
  UserAuth.findOne({ provider, providerId: profile.id }, (err, user) => {
    if (err) return done(err);
    if (user) return done(err, user);
  });

  let user = new UserAuth({
    username: profile.displayName,
    provider,
    providerId: profile.id
  });

  user.save(err => {
    if (err) console.log(err);
    return done(err, user);
  });
}

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: '902894376737142',
        clientSecret: 'aa63048dc7c64f0214822fea5a48d163',
        callbackURL: 'http://localhost:3001/auth/facebook/cb'
      },
      function(accessToken, refreshToken, profile, cb) {
        UserAuth.findOne(
          {
            providerId: profile.id
          },
          (err, user) => {
            // if (err) return cb(err);

            // if (user) return cb(null, false, { message: 'Имя уже занято!' });

            const newUser = new UserAuth();
            newUser.username = profile.displayName;
            newUser.provider = 'facebook';
            newUser.providerId = profile.id;
            newUser.save(err => {
              if (err) throw err;
              return cb(null, newUser);
            });
          }
        );
      }
    )
  );

  passport.use(
    new VKontakteStrategy(
      {
        clientID: 7117356,
        clientSecret: 'oZG8uSvxNVSgb74QKNI9',
        callbackURL: 'http://localhost:3001/auth/vkontakte/cb'
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log('=================',profile)
        findOrCreateUser('vkontakte', { vkontakteId: profile.id }, function(
          err,
          user
        ) {
          return cb(err, user);
        });
      }
    )
  );

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      (req, username, password, done) => {
        console.log('hello');
        process.nextTick(function() {
          UserAuth.findOne({ provider: 'local', username }, (err, user) => {
            if (err) return done(err);

            if (user) return done(null, false, { message: 'Имя уже занято!' });

            let newUser = new UserAuth();
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            newUser.provider = 'local';
            newUser.save(err => {
              if (err) throw err;
              return done(null, newUser);
            });
          });
        });
      }
    )
  );

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      (req, username, password, done) => {
        UserAuth.findOne({ username, provider: 'local' }, (err, user) => {
          if (err) return done(err);

          if (!user)
            return done(null, false, {
              message: 'Пользователя с таким именем нет!'
            });

          if (!user.validPassword(password))
            return done(null, false, { message: 'Неверный пароль!' });

          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserAuth.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
