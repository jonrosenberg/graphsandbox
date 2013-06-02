// Global Variables
var Settings = { DisableAuthentication: true, DefaultProjectId: "1" };
var _version = "0.10.0";
var _branch = "master";

var argv = {'dbhost': '166.78.138.47', 'dbport': '6379', 'port':'3001'}
var redis_server = argv.dbhost; //'166.78.138.47';
var redis_port = argv.dbport; //'6379';
var server_port = argv.port; //3000;
var _applicationName = "Swivel v" + _version + " (" + _branch + ") on " + server_port;

var _isInStealthMode = false;
var _showNavBar = false;

process.title = _applicationName;
console.log("\n\nStarting %s ...", _applicationName);


var winston = require('winston');
var url = require('url');
var twitter = require('ntwitter');
var fs = require('fs');
var redis = require("redis");
var _ = require('underscore');
//var nodemailer = require("nodemailer");


var Slate = require('./lib/DashboardManager.js');

console.log("Creating the application global object.");

// Create the global application object
var application = {};
application.projects = {};
application.users = {};
application.sessions = {};

// Add a helper formatter to String
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};



// Now start the App Init
var app = require('./app').init(server_port);

var io = require('socket.io').listen(app);
io.set('log level', 1);

// Create the twitter client and related structures
var twitterQueries = [];
var statistics = {}; statistics.totalTweets = 0; statistics.totalTweetsPerPeriod = 0;
var twitterClient = new twitter({ consumer_key: 'nPjDerKURGSWMScxPD6Q', consumer_secret: 'dLWJgpewyQXYZhmMTXDL9U2X4L7qt97kx4r9Co', access_token_key: '5635082-lzbwRc1LPHwPyaLqCY9XBD4TB2ein9RAz0Y1BxF1HN', access_token_secret: 'Cbgtuxx50iPZDxvtbV7srVF0x9a87F5ddGppgiff4M' });
var currentStream = null;

// Start a timer
function PushClientStats() {
    var stat = statistics.totalTweetsPerPeriod;
    statistics.totalTweetsPerPeriod = 0;
    io.sockets.emit('metricsupdate', stat);
}
setInterval(PushClientStats, 1000);

function twitterStreamingError(err) { console.log("ERROR: ##############" + err ? err : ""); }

// Subscribe to socket.io events
io.sockets.on('connection', function (socket) {
    socket.on('data', function (action, data) {
        if (action === '+') {
            console.log("Add %s", data);
            twitterQueries.push(data);

            if (currentStream) { currentStream.destroy(); currentStream = null; }
        }
        else {
            console.log("Remove %s", data);
            for (var i = 0; i < twitterQueries.length; i++)
                {
                    if (twitterQueries[i] == data)
                    {
                        twitterQueries.splice(i, 1);
                        break;
                    }
                }
            if (currentStream) { currentStream.destroy(); currentStream = null; }
        }
    });
    socket.on('getfilter', function () { io.sockets.emit('pushfilter', twitterQueries); });

    if (twitterQueries.length > 0) ListenToTwitter(socket);
});

function ListenToTwitter(socket) {
    if ((twitterQueries.length != 0) && !currentStream) {
        twitterClient.stream('user', { track: twitterQueries }, function (stream, err) {
            console.log("Creating a new Twitter stream for [%s]", twitterQueries);
            currentStream = stream;
            stream.on('data', function (tweet) {
                var json = JSON.stringify(tweet);
                if (tweet.user) {
                    var name = tweet.user.screen_name;
                    var loc = tweet.user.location;
                    var text = tweet.text;
                    console.log("%d\t%d\t%s\t%s\t%s", statistics.totalTweets, statistics.totalTweetsPerPeriod, name, loc, text);
                }
                //fs.appendFile('tweets.txt', json);
                io.sockets.volatile.emit('message', json);

                statistics.totalTweets = statistics.totalTweets + 1;
                statistics.totalTweetsPerPeriod = statistics.totalTweetsPerPeriod + 1;
            });
            stream.on('error', function (err) { twitterStreamingError(err); });
            stream.on('end', function (response) { console.log("Twitter Stream Disconnected"); });
            stream.on('destroy', function (response) { console.log("Twitter Stream Destroyed"); });
        });
    }
}


// Dashboard helpers
function PreExecuteDashboardProcessor()
{
}

function ExecuteDashboardProcessor(name, catalog, filename)
{
   debugger;
   var testLevel = 3;
   var config = {}; config.CacheStore = {}; config.DashboardStore = {};   

   config.CacheStore.FileStoreProviderBaseDirectory = fs.realpathSync(config.CacheStore.FileStoreProviderBaseDirectory || "config/dashboards/cache") + "/";
   config.CacheStore.DefaultDashboardName = config.CacheStore.DefaultDashboardName || "Default";
   config.CacheStore.DashboardFileExtension = config.CacheStore.DashboardFileExtension || ".json";

   config.DashboardStore.FileStoreProviderBaseDirectory = fs.realpathSync(config.DashboardStore.FileStoreProviderBaseDirectory || "config/dashboards/models") + "/";
   config.DashboardStore.DefaultDashboardName = config.DashboardStore.DefaultDashboardName || "Default";
   config.DashboardStore.DashboardFileExtension = config.DashboardStore.DashboardFileExtension || ".txt";

   var dashboardManager = new Slate.DashboardManager(config);
   dashboardManager.Init();
 
   winston.profile('importdashboard');
   var dashboard = dashboardManager.ImportDashboard(name, catalog, filename);
   winston.profile('importdashboard');
   
   var viewmodels = (dashboard && dashboard.IsValid()) ? dashboard.DataBind() : {};
   if (dashboard)
   {
      if (testLevel > 0) dashboard.DumpDashboardConfig();      
      if (testLevel > 1) dashboard.DumpTree();
      if (testLevel > 2) dashboard.DumpDataSetTables();
      if (testLevel > 3) dashboard.DumpDashboardConfigAsJSON();
   }

   return dashboard;
}

function ExecuteDashboardProcessor2(name, catalog, filename)
{
   // Setup the input variables
   debugger;
   var configDashboardFileRel = 'config/dashboards/models/' + filename;
   var configDashboardFile = require('fs').realpathSync(configDashboardFileRel);
   var testLevel = 3;   
   var config = {};  

   try
   {
      var dir = __dirname + "/config/dashboards/cache"; 
      var stats;
      try
      {
         stats = fs.statSync(dir); 
         if (!stats.isDirectory())
         {
            fs.mkdirSync(dir);
         }
         else {
         }
      }
      catch(e)
      {
         fs.mkdirSync(dir);
      }
   }
   catch(e)
   {
   }
 
   var dashboardManager = new Slate.DashboardManager(config);
 
   winston.profile('importdashboard');
   var dashboard = dashboardManager.ImportDashboard(name, catalog, configDashboardFile);
   winston.profile('importdashboard');
   
   var viewmodels = (dashboard && dashboard.IsValid()) ? dashboard.DataBind() : {};
   if (dashboard)
   {
      if (testLevel > 0) dashboard.DumpDashboardConfig();      
      if (testLevel > 1) dashboard.DumpTree();
      if (testLevel > 2) dashboard.DumpDataSetTables();
      if (testLevel > 3) dashboard.DumpDashboardConfigAsJSON();
   }

   return dashboard;
}


function PostExecuteDashboardProcessor()
{
   console.log("\n");
   console.log("Finsihed\n");
}

function LoadProjectsForUser(user)
{
   var allowedProjects = (user && user.projects) ? user.projects : [Settings.DefaultProjectId,"0"];
   console.log("Loading the project list for user: %s", user ? user.displayName : "<Anonymous>");   
   var allprojects;
   try
   {
      var projectsJson = fs.readFileSync('config/' + 'projects.json', 'utf-8');
      allprojects = JSON.parse(projectsJson);
  }
   catch(e)
   {
      allprojects = { "0": { "id": 0, "name": "(None)", "file": "Empty.txt"} };
   }

   // Now find the projects for this user.
   var projects = [];
   for (var projectKey in allprojects)
   {
      if (allowedProjects.indexOf(projectKey) >= 0)
      {
         console.log("%s was in %s", projectKey, JSON.stringify(allowedProjects));
         projects[projectKey] = allprojects[projectKey];
      }
      else
      {
         console.log("%s was NOT in %s", projectKey, JSON.stringify(allowedProjects));
      }
   }
   //console.log("%s", JSON.stringify(projects));
   return projects;
}

function GetDefaultProject(projects)
{
   var project = allprojects = { "0": { "id": 0, "name": "(None)", "file": "Empty.txt"} };
   //var project = "Foo";
   if (projects) {
      for (var projectKey in projects)
      {
         project = projects[projectKey];
         break;
      }
   }
   return project;
}

function GetBreadcrumbs()
{
   var breadcrumbs = [{ name: "Home", href: "#" }, { name: "Library", href: "#" }, { name: "Data", href: null }];
   return breadcrumbs;
}

function CreateNavMenus(dashboard, role)
{   
   console.log("Now iterating over the view to build the menu.");
   var navBaseMenuItems = [];
   var isFirstTab = true;
   var views = dashboard.views;
   for (var viewName in views)
   {
      navBaseMenuItems.push({ name: viewName, icon: "icon-home", href: "dashboard.html?view=" + viewName, isActive: isFirstTab});
      isFirstTab = false;
   }
   var navMenuItems = [];
   if (role == "Administrator")
   {
      navMenuItems.push({ name: "Main", items: [{name:"Members", icon:"icon-user", href:"members.html", isActive: false},{name:"Comments", icon:"icon-comment", href:"comments.html", isActive: false},{name:"Gallery", icon:"icon-picture", href:"gallery.html", isActive: false}]});
      navMenuItems.push({ name: "Settings", items: [{ name: "Delete Cookies", icon: "icon-wrench", href: "#", isActive: false }, { name: "Logout", icon: "icon-off", href: "login.html", isActive: false}] });
   }
   else if (role == "Power User")
   {
   }
   
   navMenuItems.push({ name: "Views", items: navBaseMenuItems });
   return navMenuItems;
}

function CreateDashboard(name, catalog, filename)
{
   PreExecuteDashboardProcessor();
   var dashboard = ExecuteDashboardProcessor(name, catalog, filename);
   if (dashboard && dashboard.IsValid()) dashboard.DataBind();
   PostExecuteDashboardProcessor();
   return dashboard;
}



// Global Properties being set
/*
projects
dashboard
navMenuItems
breadcrumbs
*/

projects = {};
dashboard = {};
navMenuItems = {};
breadcrumbs = {};

var locals =
{
   title: _applicationName,
   description: 'DataKid.com Data Portal for Kids',
   author: 'Scott Beaudreau',
   email: '',
   lastAction: '',
   company: '',
   showNavMenu: _showNavBar,
   navMenuItems: navMenuItems,
   breadcrumbs: breadcrumbs,
   showBreadcrumbs: false,
   projects: projects,
   selectedProjectId: 0,
   dashboard: dashboard
};

function isLoginOrSignup(pageName)
{
    return _isInStealthMode || (pageName == "login") || (pageName == "signup");
}

function isCustomLayoutPage(pageName)
{
    return _isInStealthMode || (pageName == "home") || (pageName == "test3") || isLoginOrSignup(pageName);
}

function isAuthRequiredForPage(pageName)
{
    var required = !Settings.DisableAuthentication && !isLoginOrSignup(pageName);
    console.log("Required: " + required)
    return required;
}

function parseQueryString(req)
{
    var info = { path: null, pageName:null, selectedTabName: null, authRequired: true, template: null, selectedProjectId:null, refresh: false};
    console.log("Request URL is %s", req.url);
    debugger;
    info.path = url.parse(req.url).pathname.toLowerCase();
    info.path = info.path.substr((info.path.charAt(0) == '/') ? 1 : 0);
    info.pageName = null;
    info.selectedTabName = null;

    if (info.path == "")
    {
       info.path = "dashboard.html?view=Demo";
       info.pageName = "dashboard";
       info.selectedTabName = "demo";
    }
    if (true)
    {
       info.pageName = info.path.split(".")[0];
       var qsSegments = url.parse(req.url).query;
       if (qsSegments)
       {
          var qsparams = qsSegments.toLowerCase().split("&");
          for (var i in qsparams)
          {
             var qs = qsparams[i];
             var pair = qs.split("=");
             if (pair.length == 2)
             {
                if (pair[0] == "view") info.selectedTabName = pair[1];
                else if (pair[0] == "project") info.selectedProjectId = pair[1]; 
                else if (pair[0] == "refresh") info.refresh = (pair[1] && true); 
             }
          }
       }
        if ((info.pageName == "dashboard") && (info.selectedTabName == null))
        {
            info.path = "dashboard.html?view=Summary";
            info.selectedTabName = "summary";
        }
    }
    info.selectedTabName = info.selectedTabName ? info.selectedTabName : "summary";
    info.template = info.pageName + ".ejs";

    console.log("Path=" + info.path);
    console.log("PageName=" + info.pageName);
    console.log("SelectedTabName=" + info.selectedTabName);    
    console.log("Template=" + info.template);
    
    return info;
}

function verifyAuth(pageName, req, res)
{
    var isAuthRequired = isAuthRequiredForPage(pageName);
    var isAuthenticated = false;
    if (isAuthRequired)
    {
        var isAuthenticated = app.ensureAuthenticated(req, res, function () { return true; });
        if (isAuthenticated)
        {
           console.log(req.user);
           req.isAuthenticated = true;
           console.log("User Is Authenticated");
        }
        else
        {
           console.log("User Is Unauthenticated");
           req.isAuthenticated = false;
        }
    }
    if (typeof req.user === "undefined") {  req.user = { provider: "none", username:"anonymous", displayName: 'Not Logged In', authenticated: false, role: 'Guest' }; }
    var redirectToLoginPage = isAuthRequired && !isAuthenticated && !isLoginOrSignup(pageName);
    return redirectToLoginPage;
}

function createNewSession(sessionKey, req)
{
   console.log("********************* CREATING SESSION for %s **********************", sessionKey);
   var session = {};
   application.sessions[sessionKey] = session;
   session.projects = LoadProjectsForUser(req.user);
   session.selectedProject = GetDefaultProject(session.projects);
   console.log("Name:%s   Catalog:%s    File:%s", session.selectedProject.name, session.selectedProject.id, session.selectedProject.file);
   session.dashboard = CreateDashboard(session.selectedProject.name, session.selectedProject.id, session.selectedProject.file);
   session.breadcrumbs = GetBreadcrumbs();
   return session;
}

function processPage(req, res)
{
    console.log("\n\n\n\n\nURL: %s\n", req.url);
    var info = parseQueryString(req);

    console.log(JSON.stringify(info));

    var redirectToLoginPage = verifyAuth(info.pageName, req, res);
    if (redirectToLoginPage)
    {
       console.log("This should never happen!!!!!");
       return;
    }
    else if (isLoginOrSignup(info.pageName))
    {
	    console.log("isLoginOrSignup = true");
        req.user = { provider: "none", username:"anonymous", displayName: 'Not Logged In', authenticated: false, role: 'Guest' };
        info.selectedTabName = "";
    }
    else
    {
 	   console.log("Looking for the session");
       var sessionKey = req.user.username + "@" + req.user.provider;
       var session = application.sessions[sessionKey];
       if (session)
       {
          console.log("Loading session for %s", sessionKey);
       }
       else
       {
		  console.log("Creating a new session");
          session = createNewSession(sessionKey, req);
       }

       // If we have a refresh command, then we need to do a few things. 1) We reload the project file and databind, and 2) We act like selectedProjectChanged
       if (info.refresh) {
	      console.log("We have refresh");
		  info.selectedProjectId = session.selectedProject.id;
		  session.selectedProjectChanged = true;
       }
  
       // The Project selection was changed
       if (info.selectedProjectId || (session.selectedProjectChanged == true))
       {
          console.log("Changing projects to project %s", info.selectedProjectId);
          session.selectedProjectChanged = false;
          session.dashboard = CreateDashboard(session.selectedProject.name, session.selectedProject.id, session.selectedProject.file);
          session.breadcrumbs = GetBreadcrumbs();
       }

       locals.breadcrumbs = session.breadcrumbs;
       locals.projects = session.projects;
       locals.selectedProjectId = session.selectedProject.id;
       locals.dashboard = session.dashboard;
       locals.showNavMenu = !((locals.selectedProjectId == 7) || (locals.selectedProjectId == 8));

       // Now personalize the menu    
       var currentMenuItems = CreateNavMenus(session.dashboard, req.user.role);

       // Update the proper menu
       locals.navMenuItems = currentMenuItems;  

       for (var i = 0; i < currentMenuItems.length; i++) {
           var menuSection = currentMenuItems[i];
           for (var x = 0; x < menuSection.items.length; x++) {
               var menuItem = menuSection.items[x];
               //console.log(menuItem.href);
               if (info.selectedTabName)
               {
                  menuItem.isActive = (info.selectedTabName.toLowerCase() == menuItem.name.toLowerCase());
               }
               else
               {
                  menuItem.isActive = (info.path == menuItem.href);
                  if (menuItem.isActive) info.selectedTabName = menuItem.name.toLowerCase();
               }
           }
       }
    }

    locals.page = info.pageName;
    locals.user = req.user;
    if (locals.user && !locals.user.projects) locals.user.projects = [Settings.DefaultProjectId,"0"];
    locals.currentViewName = info.selectedTabName;

    if (isCustomLayoutPage(info.pageName))
    {
        res.render(info.template, { layout: false, message: '', locals: locals });
    }
    else
    {
        res.render(info.template, locals);
    }
}


function processForm(req, res)
{
   console.log("\n\n\n\n\nURL: %s\n", req.url);
   var project = null;
   try
   {
   var redirectToLoginPage = verifyAuth("selectProject", req, res);
   
   var sessionKey = req.user.username + "@" + req.user.provider;
   var session = application.sessions[sessionKey];
   if (session)
   {
      console.log("Loading session for %s", sessionKey);
   }
   else
   {
      session = createNewSession(sessionKey, req);
   }

   var selectedProjectKey = req.param("selectedProjectId");
   for (var projectKey in session.projects)
   {
      if (projectKey == selectedProjectKey)
      {
         project = session.projects[projectKey];
         console.log("Found Project: %s", project);
         break;
      }
   }
   console.log(project);
   session.selectedProject = project;
   session.selectedProjectChanged = true;
   res.redirect("/");
   } 
   catch(err)
   {
   }
   return project;   
}


function processLaunchRegistrationForm(req, res)
{
   console.log('IP Address = %s', req.ip);
   console.log("\n\n\n\n\nURL: %s\n", req.url);
   var email = req.param("email");
   locals.email = email;
   locals.lastAction = "registerForLaunch";

   // Create the Data Adapter
   var eventStore = redis.createClient(redis_port, redis_server);
   eventStore.on("error", function (err) { console.log("Error " + err); });
   eventStore.on("ready", function(err) { console.log("Initialized Event Store Connection to Redis"); });

   var eventPublisher = redis.createClient(redis_port, redis_server);
   eventPublisher.on("error", function (err) { console.log("Error " + err); });
   eventPublisher.on("ready", function(err) { console.log("Initialized Pub/Sub Connection to Redis"); });

   var ts = new Date();
   var sourceIp = getClientIp(req);
   var registrationRecord = {email:email, timestamp:ts.toGMTString(), time: { year:ts.getFullYear() , month:ts.getMonth(), day:ts.getDate(), hour:ts.getHours(), minute:ts.getMinutes(), second: ts.getSeconds()}, ip:sourceIp, referer:req.headers['Referer'], useragent: req.headers['user-agent'] };
   var json = JSON.stringify(registrationRecord);
   console.log(json);
   eventStore.lpush("registrations", json);
   eventPublisher.publish("registrationReceived", json);

   res.redirect("/");
   return email;
}



// snippet taken from http://catapulty.tumblr.com/post/8303749793/heroku-and-node-js-how-to-get-the-client-ip-address
function getClientIp(req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};


function sendEmail(email, content)
{
// Initialize the email service
var transport = nodemailer.createTransport("SES", {
    AWSAccessKeyID: "AWSACCESSKEY",
    AWSSecretKey: "AWS/Secret/key"
});

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "gmail.user@gmail.com",
        pass: "userpass"
    }
});

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
    to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    smtpTransport.close(); // shut down the connection pool, no more messages
  });
}




// Set up the routes and handline now.

if (_isInStealthMode) {
   app.post('/registerForLaunch', processLaunchRegistrationForm);
   app.get('/*', function (req, res) { res.render('register.ejs',  { layout: false, message: '', locals: locals });});
}
else {
   app.post('/selectProject', processForm);   
   app.get('/*', processPage);
}
 
app.get('/*', function (req, res) { res.render('404.ejs', locals); });  // The 404 Route (ALWAYS Keep this as the last route)


