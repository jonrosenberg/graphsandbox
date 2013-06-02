// Parser for the Dashboard Config and bind it to data
// Scott Beaudreau
// Version 0.52

exports.DashboardStore = DashboardStore;


// Requires
fs = require('fs');


// Class: DashboardStore
// Purpose: Static class for managing dashboard serialization and persistence.
function DashboardStore(config)
{
   // Implement a Singleton pattern
   if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance; else arguments.callee._singletonInstance = this;

   // Config variables
   this.DEFAULT_DASHBOARDSTORE_RELDIR = "config/dashboards/cache"
   this.DEFAULT_EXTENSION = ".json";
   this.DEFAULT_DASHBOARD_NAME = "Default";

   // Static constructor
   (function constructorStatic(self, config)
   {
      //console.log("DashboardStore Static Constructor");

      var config = config || {};
      self.config = config;

      var resolvedPath = fs.realpathSync(config.DashboardStoreBaseDirectory || self.DEFAULT_DASHBOARDSTORE_RELDIR) + "/";
      console.log("DashboardStore using absolute dashboard file store path of: %s", resolvedPath);

      config.DashboardStoreBaseDirectory = resolvedPath;
      config.DefaultDashboardName = config.DefaultDashboardName || self.DEFAULT_DASHBOARD_NAME;
      config.DashboardFileExtension = config.DashboardFileExtension || self.DEFAULT_EXTENSION;

      self.configDirectory = config.DashboardStoreBaseDirectory;
      self.name = config.DefaultDashboardName;
      self.extension = config.DashboardFileExtension;

      // Now do the type-level instantiation
   })(this, config);
}


DashboardStore.prototype.Resolve = function(name)
{
   var outputFileName = this.configDirectory + "Dashboards_" + name + this.extension;
   console.log("Filename = %s", outputFileName);
   return outputFileName;
}
DashboardStore.prototype.Save = function(name, dashboard)
{
   var json = JSON.stringify(dashboard);
   var outputFileName = this.Resolve(name);
   return fs.writeFileSync(outputFileName, json);   
}
DashboardStore.prototype.Load = function(name)
{
   var dashboard = null;
   try
   {
      var inputFileName = this.Resolve(name);
      console.log("Loading dashboard named '%s' from file '%s'", name, inputFileName);
      var json = fs.readFileSync(inputFileName, 'utf8');
      dashboard = JSON.parse(json);
   }
   catch(e)
   {
      console.error(e);
   }
   return dashboard; // This returns a serialized data dictionary
}
DashboardStore.prototype.Remove = function(name)
{
   var fileName = this.Resolve(name);
   if (fs.existsSync(fileName))
   {
      fs.rename(filename, filename + ".old");
   }
   return true;
}
DashboardStore.prototype.ReadTsvFileLines = function(resolvedDashboardFile)
{
   var dashboardTsv = fs.readFileSync(resolvedDashboardFile, 'utf8');
   var dashboardRows = dashboardTsv.split('\r\n');
   if (dashboardRows.length <= 1) dashboardRows = dashboardTsv.split('\n');
   if (dashboardRows.length <= 1) dashboardRows = dashboardTsv.split('\r');
   return dashboardRows;
}

