// Parser for the Dashboard Config and bind it to data
// Scott Beaudreau
// Version 0.52

exports.FileStoreProvider = FileStoreProvider;


// Requires
fs = require('fs');


// Class: FileStoreProvider
// Purpose: Static class for managing dashboard serialization and persistence.
function FileStoreProvider(config)
{
   // Implement a Singleton pattern
   //if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance; else arguments.callee._singletonInstance = this;

   // Config variables
   this.DEFAULT_FILESTORE_RELDIR = "config/dashboards/cache"
   this.DEFAULT_EXTENSION = ".json";
   this.DEFAULT_DASHBOARD_NAME = "Default";

   // Static constructor
   (function constructorStatic(self, config)
   {
      console.log("FileStoreProvider Static Constructor");

      var config = config || {};
      self.config = config;

      var resolvedPath = fs.realpathSync(config.FileStoreProviderBaseDirectory || self.DEFAULT_FILESTORE_RELDIR) + "/";
      console.log("FileStoreProvider using absolute dashboard file store path of: %s", resolvedPath);

      config.FileStoreProviderBaseDirectory = resolvedPath;
      config.DefaultDashboardName = config.DefaultDashboardName || self.DEFAULT_DASHBOARD_NAME;
      config.DashboardFileExtension = config.DashboardFileExtension || self.DEFAULT_EXTENSION;

      self.configDirectory = config.FileStoreProviderBaseDirectory;
      self.name = config.DefaultDashboardName;
      self.extension = config.DashboardFileExtension;

      // Now do the type-level instantiation
   })(this, config);
}


FileStoreProvider.prototype.Get = function(namespace, name, options) { 
   var data = null;
   debugger;
   console.log("%s : %s", namespace, name);
   var options = options || {};
   try
   {
	  if (name) {
        var inputFileName = this.Resolve(namespace, name);
        console.log("Loading file://localhost/%s/%s data from file at path '%s'", namespace, name, inputFileName);
        var raw = fs.readFileSync(inputFileName, 'utf8');
        if (options.format == "tsv") {
	       if (raw) {
			   var rows = raw.split('\r\n');
			   if (rows.length <= 1) rows = raw.split('\n');
			   if (rows.length <= 1) rows = raw.split('\r');
			   data = rows;
	       }
	    }
	    else {
		   data = JSON.parse(raw);
	    }
   	  }
   }
   catch(e)
   {
      console.error(e);
   }
   return data; // This returns a serialized data dictionary or a directory of objects
}


FileStoreProvider.prototype.Put = function(namespace, name, data) {
   try
   {
	   if (name) {
		   var json = JSON.stringify(data);
		   var outputFileName = this.Resolve(namespace, name);
		   return fs.writeFileSync(outputFileName, json);
	   }
	   else {
		   // Else there is only a namespace (in theory), so we should try to create a directory
		   if (!this.Exists(namespace, name)) {
		   	   var dir = this.Resolve(namespace, name);
		       return fs.mkdirSync(dir);
		   } else { return true; } 
	   }
   }
   catch(e)
   {
      console.error(e);
   }
   return false;
}


FileStoreProvider.prototype.Delete = function(namespace, name) { 
   try
   {
	   if (name) {
		   var fileName = this.Resolve(namespace, name);
		   if (fs.existsSync(fileName)) {
		      fs.rename(filename, filename + ".old");
		   }
	   }
	   else {
		  // We don't delete dierctories right now
	   }
   }
   catch(e)
   {
      console.error(e);
   }
   return true;
}


// Not implemented, but will create the resource if not there and append to that resource if there.
FileStoreProvider.prototype.Post = function(namespace, name, data) {
	
}


FileStoreProvider.prototype.Exists = function(namespace, name) { 
	// If we have a valid name, then we can check for the existence of the object with that key.
	// If we do not have a name, then it only makes sense to check the namespace to see if a corresponding container exists
	var fileName = this.Resolve(namespace, name);
	var stat = fs.existsSync(fileName);
	return name ? stat.isFile() : stat.isDirectory();
}


FileStoreProvider.prototype.List = function(namespace, filter) { 
   var data = null;
   try
   {
       var dir = this.Resolve(namespace, name);
	   data = fs.readdirSync(dir);
   }
   catch(e)
   {
      console.error(e);
   }
   return data; // This returns a serialized data dictionary or a directory of objects
}


FileStoreProvider.prototype.Resolve = function(namespace, name)
{
   var outputFileName = this.configDirectory + (namespace ? (namespace + "/") : "") + name + this.extension;
   console.log("Filename = %s", outputFileName);
   return outputFileName;
}

