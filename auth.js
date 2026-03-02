var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
   function(username, password, done) {
       // Look up the user in the db by username
       // Uses findOne() because we're searching by username, not by id
       var user = db.findOne(username);

       // If user exists and the password matches, authentication succeeds
       if (user && user.password === password)
       {
           return done(null, user);
       }
       else
       {
           // Either user not found or password didn't match
           return done(null, false);
       }
   }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
