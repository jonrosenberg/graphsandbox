var express = require('express');
var app = express.createServer();
var fs = require('fs');

// Auth Stuff 
var passport = require('passport');
var util = require('util');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var FACEBOOK_APP_ID = "272123709112";
var FACEBOOK_APP_SECRET = "67d328ec19d7aeffb96b992f486b8885";
// End of Auth Stuff

exports.reloadUserDirectory = function(userDirectoryFileName, users) {
    var usersJson = fs.readFileSync(userDirectoryFileName, 'utf-8');
    var users = JSON.parse(usersJson);	
    return users;
}

exports.init = function (port) {
    app.configure(function () {
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.use(express.bodyParser());

        // Begin Auth
        app.use(express.logger());
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'keyboard cat' }));
        app.use(passport.initialize()); // Initialize passport
        app.use(passport.session()); // use passport.session() middleware, to support persistent login sessions (recommended).
        app.use(express.methodOverride());
        app.use(express.static(__dirname + '/public'));
        // End Auth

        app.use(express.static(__dirname + '/static'));
        app.use(app.router);
        app.enable("jsonp callback");
    });

    app.configure('development', function () {
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
        // app.use(express.logger({ format: ':method :url' }));
    });

    app.configure('production', function () {
        app.use(express.errorHandler());
    });


    app.error(function (err, req, res, next) {
        res.render('500.ejs', { locals: { error: err }, status: 500 });
    });



    // Authentication modules


    // ----------------------------- Local Authentication Functions -----------------------------------
    var users = exports.reloadUserDirectory('config/accounts.json');

    //var json = fs.readFileSync('config/accounts.json', 'utf-8');
    //var users = JSON.parse(json);


    function findById(id, fn) {
        var idx = id - 1;
        if (users[idx]) {
            fn(null, users[idx]);
        } else {
            fn(new Error('User ' + id + ' does not exist'));
        }
    }

    function findByUsername(username, fn) {
        for (var i = 0, len = users.length; i < len; i++) {
            var user = users[i];
            if (user.username === username) {
                return fn(null, user);
            }
        }
        return fn(null, null);
    }


    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.  However, since this example does not
    //   have a database of user records, for example, the complete Twitter profile is serialized
    //   and deserialized.
    passport.serializeUser(function (user, done) {
        console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });


    // Use the FacebookStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Facebook
    //   profile), and invoke a callback with a user object.
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://demo.cognovus.com:3000/auth/facebook/callback"
    },
  function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

          powerusers = ['1502370202', '731429298', '691024929'];
          administrators = ['500080005'];

          // To keep the example simple, the user's Facebook profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Facebook account with a user record in your database,
          // and return that user instead.
          profile.authenticated = true;
          var isAdmin = administrators.indexOf(profile.id) >= 0;
          var isPowerUser = powerusers.indexOf(profile.id) >= 0;
          profile.role = isAdmin ? 'Administrator' : (isPowerUser ? 'Power User' : 'Member');
          profile.projects = isAdmin ? ["1", "2", "3", "4", "5"] : (isPowerUser ? ["1", "2", "3"] : ["0"]);
          //profile.role = (profile.id == '500080005') ? 'Administrator' : 'Member';
          console.log(profile);
          return done(null, profile);
      });
  }
));





    // Use the LocalStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a username and password), and invoke a callback
    //   with a user object.  In the real world, this would query a database;
    //   however, in this example we are using a baked-in set of users.
    passport.use(new LocalStrategy(
  function (username, password, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

          // Find the user by username.  If there is no user with the given
          // username, or the password is not correct, set the user to `false` to
          // indicate failure and set a flash message.  Otherwise, return the
          // authenticated `user`.
          findByUsername(username, function (err, user) {
              console.log(user);
              if (err) { return done(err); }
              if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
              if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
              user.provider = "local";
              user.authenticated = true;
              user.displayName = user.username;
              console.log(user);
              return done(null, user);
          })
      });
  }
));



    // -------------------------------- Faecbook --------------------------------
    // GET /auth/facebook
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Facebook authentication will involve
    //   redirecting the user to facebook.com.  After authorization, Facebook will
    //   redirect the user back to this application at /auth/facebook/callback
    app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function (req, res) {
      // The request will be redirected to Facebook for authentication, so this
      // function will not be called.
  });

    // GET /auth/facebook/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
      res.redirect('/');
  });



    // -------------------------------- Local Login --------------------------------
    // POST /login
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    //
    //   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
    app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function (req, res) {
      res.redirect('/');
  });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // Add an ensureAuthenticated method
    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    app.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login')
    }


    // Begin Auth Routes
    //app.get('/account', app.ensureAuthenticated, function(req,res) {  user: req.user, res.render('account_test', {layout:false, user: req.user} );});
    //app.get('/login',                        function(req,res) { res.render('login', {layout:false, user: req.user, message:''});});

    // End Auth Routes

    // End Authentication


    app.helpers({
        renderScriptsTags: function (all) {
            if (all != undefined) {
                return all.map(function (script) {
                    return '<script src="' + script + '"></script>';
                }).join('\n ');
            }
            else {
                return '';
            }
        }
    });

    app.dynamicHelpers({
        scripts: function (req, res) {
            return [];
        }
    });



    console.log("The port is: " + port);
    console.log("The address is: " + app.address());
    app.listen(port);

    console.log("Listening on port %d in %s mode", app.address().port, app.settings.env);

    return app;
}

