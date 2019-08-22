const { UserAuth } = require('./models/UserAuth');
const config = require('./config/constants');

// function findOrCreateUser(provider, profile, done) {  // FACEBOOK
//   UserAuth.findOne({ provider, providerId: profile.id }, (err, user) => {
//     if (err) return done(err);
//     if (user) return done(err, user);
//   });

//   let user = new UserAuth({
//     username: profile.displayName,
//     provider,
//     providerId: profile.id
//   });

//   user.save(err => {
//     if (err) console.log(err);
//     return done(err, user);
//   });
// }

module.exports = passport => {
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      (req, username, password, done) => {
        console.log('hello');
        process.nextTick(function() {
          User.findOne({ provider: 'local', username }, (err, user) => {
            if (err) return done(err);

            if (user) return done(null, false, { message: 'Имя уже занято!' });

            let newUser = new User();
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
        User.findOne({ username, provider: 'local' }, (err, user) => {
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
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
