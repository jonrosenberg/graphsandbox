// Parser for the Dashboard Config and bind it to data
// Scott Beaudreau
// Version 0.52

// Module Exports
exports.Dashboard = Dashboard;

var Slate = require('./DashboardManager.js');

// Class: Dashboard
function Dashboard(dashboardManager) {
    // Implement a Private Constructor with a Factory Pattern
    if (arguments.callee.caller !== Slate.DashboardManager().CreateDashboard) {
        var msg = "class Dashboard has a private constructor and must be created by DashboardManager::createDashboard(name).";
        console.error(msg);
        throw msg;
        return {};
    }
    else
    {
        //console.error("Dashboard static constructor");
    }

   (function init(self, dm)
   {
       self.dashboardManager = dm;
       //self.data = {};
       self.datasets = {};
       self.views = {};
       self.validated = false;
       self.viewModels = {};
       self.catalog = "";
       self.name = "";
   })(this, dashboardManager);


   this.DumpDataSetTables = function()
   {
      console.log("\n\n");
      //var datasets = dashboardData["DataSets"];
      for (var dsName in this.datasets)
      {
         var ds = this.datasets[dsName];
         var fields = ds.Fields();
         var rows = ds.Rows();
         console.log(fields.join("\t"));
         for (var i = 0; i < rows.length; i++)
         {
            console.log(rows[i].join("\t"));
         }
         console.log("");
      }
   }

   this.Reset = function() {
	  this.datasets = {}; 
	  this.validated = false;
   }

   this.Validate = function()
   {
	  debugger;
      this.Reset();
      var viewErrorCount = 0;
      
      console.log(JSON.stringify(this.views));
      for (var viewName in this.views)
      {
         var view = this.views[viewName];
         if (!this.ValidateView(view))
         {
            console.log("Error in View %s", viewName);
            viewErrorCount++;
         }
      }
      isValid = (viewErrorCount == 0);
      this.validated = isValid;
      return isValid;
   }
   
   this.ValidateView = function(view)
   {
      var moduleErrorCount = 0;
      var modules = view["Modules"];

      for (var moduleName in modules)
      {
         var module = modules[moduleName];
         if (!this.ValidateModule(module)) moduleErrorCount++;
      }
      isValid = (moduleErrorCount == 0);

      view["Validated"] = isValid;
      return isValid;
   }
   this.ValidateModule = function(module)
   {
	  console.log("Dashboard::ValidateModule()");
	
      var isValid = true;
      var filename = "";
      var linecount = 0;

      var ds = this.dashboardManager.GetDataSetFromModule(this.catalog, module);
      if (ds != null)
      {
         if (this.dashboardManager.ValidateModuleDataBinding(module, ds)) {
            this.datasets[ds.name] = ds;
            module["DataSetName"] = ds.name;
         }
      }
      
      module["Validated"] = isValid;
      return isValid;
   }

   this.DataBind = function()
   {
      debugger;

      // Now do a data binding for all modules
      this.viewModels = {};
      
      for (var viewName in this.views)
      {
         var view = this.views[viewName];
         var modules = view["Modules"];
         for (var moduleName in modules)
         {
            var vm = this.dashboardManager.DatabindModule(this, viewName, moduleName);
            if (vm) { console.log(JSON.stringify(vm)); }
            else { console.log("No data loaded for %s and %s", viewName, moduleName); }
            var viewKey = this.CreateViewModelKey(viewName, moduleName);
            this.viewModels[viewKey] = vm;
         }
      }      
   }
   this.CreateViewModelKey = function(viewName, moduleName)
   {
      var munge = (moduleName ? moduleName : "<module>") + "@" + (viewName ? viewName : "<view>");
      var key =  munge.replace(/\ /g, "").toLowerCase();
      return key;
   }
   this.GetViewModel =  function(viewName, moduleName)
   {
      var viewKey = this.CreateViewModelKey(viewName, moduleName)
      //console.log("Request for ViewModel for [%s] and [%s] resulting in a key of [%s]", viewName, moduleName, viewKey);
      var vm = this.viewModels[viewKey];
      return vm;
   }
   this.GetViewModelAsJson =  function(viewName, moduleName)
   {
      var vm = this.GetViewModel(viewName, moduleName);
      var json = null;
      if (vm)
      {
         json = JSON.stringify(vm);
         console.log(JSON.stringify(vm));
      }
      else
      {
         console.log("The viewmodel was not found");
         json = JSON.stringify({});
      }
      return json;
   }
   
}

Dashboard.prototype.GetViews = function() {}
Dashboard.prototype.GetView = function(viewName) {}
Dashboard.prototype.GetModules = function(viewName) {}
Dashboard.prototype.GetModule = function(viewName, moduleName) {}
Dashboard.prototype.IsValid = function(viewName, moduleName) {}


Dashboard.prototype.IsValid = function(viewName, moduleName)
{
   return (this.validated);
}


Dashboard.prototype.DumpDashboardConfig = function()
{
   if (!this.validated) console.log("Dashboard config is invalid\n");
   
   for (var viewName in this.views)
   {
      var view = this.views[viewName];
      viewValid = view["Validated"];
      var modules = view["Modules"];            
      console.log("View: %s has %d modules defined and %s valid:", viewName, Object.keys(modules).length, viewValid ? "is" : "is NOT");
      
      for (var moduleName in modules)
      {
         var module = modules[moduleName];
         var dsName = module["DataSetName"];  // Only valid data sets are returned in module["DataSet"] so the configured name must be used.
         if (dsName.length > 0)
         {
            var ds = this.datasets[dsName];
            var file = (ds && ds["Filename"]) ? ds["Filename"] : "(None)";
            var linecount = (ds && ds["LineCount"]) ? ds["LineCount"] : "0";
            var modValid = module["Validated"];         
            console.log("\tModule: '%s'%s is a %s at (%d,%d) with width %d bound to [%s] at '%s' (%d lines).", moduleName, modValid ? "" : " [INVALID]", module["Type"], module["Row"], module["Col"], module["Width"], dsName, file, linecount);
         }
      }
      console.log("");
   }
}
Dashboard.prototype.DumpDashboardConfigAsJSON = function()
{
   console.log("\nDashboard Dump in JSON:\n");
   console.log(JSON.stringify(this));
}
Dashboard.prototype.DumpTree = function()
{
   console.log("\nDashboard Tree in JSON:\n");
   var tree = {};
   for (var viewName in this.views)
   {
      var viewKey = viewName.toLowerCase();
      var view = this.views[viewName];
      var modules = view["Modules"];
      tree[viewKey] = new Array();
      var modsPerViewCount = 0;
      for (var moduleName in modules)
      {
         var module = modules[moduleName];
         var entry = {"name":moduleName, "row": module["Row"], "order":module["Col"], "width":module["Width"], "type":module["Type"]}
         tree[viewKey].push(entry);
         console.log("%s::%s [%s] (%d,%d) %d", viewName, moduleName, module["Type"], module["Row"], module["Col"], module["Width"]);
      }
   }
   console.log("\nTree in JSON");
   var jsonTree = JSON.stringify(tree);
   console.log("%s", jsonTree);
}


