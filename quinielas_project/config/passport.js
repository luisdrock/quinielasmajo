var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'pass'
  },
  function(user, password, done) {
    Users.findOne({ user: user }, function (err, finde) {
      if (err) { return done(err); }
      if (!finde) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      hash = crypt.decrypt(password,finde.pass)
      
      if(hash == true) {
          var returnUser = {
            user: finde,
            createdAt: finde.createdAt,
            id: finde.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        }
      else{
        return done(null, false, {
              message: 'Invalid Password'
            })
      }
    });
  }
));