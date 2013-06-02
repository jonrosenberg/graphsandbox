// Parser for the Dashboard Config and bind it to data
// Scott Beaudreau
// Version 0.52

// Dashboard - the object instance with helper class (optional)
// DashboardManager - the helper class
// FileStoreProvider - the data store
// DataSetManager - the dataset management service
// DashboardService - the API
// (dynamic) DashboardJson - the object instance in JSON - this is constructed and there is no actual .JS file for it.


// Module Exports
exports.DashboardManager = DashboardManager;


// Requires
var Slate = {};
Slate.Dashboard = require('./Dashboard.js').Dashboard;
Slate.FileStoreProvider = require('./FileStoreProvider.js').FileStoreProvider;
Slate.DataSetManager = require('./DataSetManager.js').DataSetManager;


// Class: DashboardManager
// Purpose: Static class for managing dashboard instances. This is stateless and always returns a Dashboard object
function DashboardManager(config)
{
   // Implement a Singleton pattern
   if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance; else arguments.callee._singletonInstance = this;

   // Static constructor
   (function constructorStatic(self, config)
   {
	  debugger;
      console.log("DashboardManager Static Constructor");

      var config = config || {};
      self.config = config;

      config.CacheStore = config.CacheStore || {};   
      config.DashboardStore = config.DashboardStore || {};   
      config.DataSetManager = config.DataSetManager || {};
      //static/data
      // Now do the type-level instantiation
      config.CacheStore.FileStoreProviderBaseDirectory = fs.realpathSync(config.CacheStore.FileStoreProviderBaseDirectory || "config/dashboards/cache") + "/";
      config.CacheStore.DefaultDashboardName = config.CacheStore.DefaultDashboardName || "Default";
      config.CacheStore.DashboardFileExtension = config.CacheStore.DashboardFileExtension || ".json";

      config.DashboardStore.FileStoreProviderBaseDirectory = fs.realpathSync(config.DashboardStore.FileStoreProviderBaseDirectory || "config/dashboards/models") + "/";
      config.DashboardStore.DefaultDashboardName = config.DashboardStore.DefaultDashboardName || "Default";
      config.DashboardStore.DashboardFileExtension = config.DashboardStore.DashboardFileExtension || ".txt";

      self.cacheStore = new Slate.FileStoreProvider(config.CacheStore);
      self.dashboardStore = new Slate.FileStoreProvider(config.DashboardStore);
      self.dataSetManager = new Slate.DataSetManager(config.DataSetManager);

   })(this, config);
}


DashboardManager.prototype.Init = function() {}
DashboardManager.prototype.CreateDashboard = function(name, catalog) {}
DashboardManager.prototype.RemoveDashboard = function(name) {}
DashboardManager.prototype.ImportDashboard = function(name, catalog, dashboardFile) {}
DashboardManager.prototype.ExportDashboard = function(name, dashboardFile) {}
DashboardManager.prototype.SaveDashboard = function(name, dashboard) {}
DashboardManager.prototype.LoadDashboard = function(name, catalog) {}
DashboardManager.prototype.ParseDashboardFile = function(name, catalog, resolvedDashboardFile) {}
DashboardManager.prototype.UnwrapReference = function(ref) {}
DashboardManager.prototype.GetDataSetFromModule = function(catalog, module) {}
DashboardManager.prototype.ValidateModuleDataBinding = function(module, dataset) {}
DashboardManager.prototype.FormatString = function(format, value, series, id) {}
DashboardManager.prototype.FormatString = function(format, value, vector, id) {}
DashboardManager.prototype.RoundDecimals = function(z, n, isFixed) {}
DashboardManager.prototype.FormatWithCommas = function(value, decimalPlaces, useFixed) {}
DashboardManager.prototype.ConvertToFloat = function(series) {}
DashboardManager.prototype.ProcessSparkline = function(line) {}
DashboardManager.prototype.DatabindModule = function(dashboard, viewName, moduleName) {}




DashboardManager.prototype.Init = function()
{
	debugger;
	// First create the directory for the cache
	if (this.cacheStore.Put(null, null, null)) {
		console.log("Directory is fine")
	}
}




DashboardManager.prototype.CreateDashboard = function(name, catalog)
{
   var dashboard = new Slate.Dashboard(this);
   dashboard.name = name;
   dashboard.catalog = catalog;
   return dashboard;
}

DashboardManager.prototype.RemoveDashboard = function(name)
{
   //return this.dashboardStore.Remove(name);
   var fname = "Dashboards_" + name;
   return this.cacheStore.Delete(null, fname);
}

DashboardManager.prototype.ImportDashboard = function(name, catalog, dashboardFile)
{
  debugger;
   console.log("Reading and parsing TSV file...");
   var dashboard = this.ParseDashboardFile(name, catalog, dashboardFile);

   console.log("Validating...\n");
   var isValid = dashboard.Validate();
   
   for (var viewName in dashboard.views)
   {
      var view = dashboard.views[viewName];
      var modules = view["Modules"];
      for (var moduleName in modules)
      {
         var module = modules[moduleName];
         console.log("%s\t%d\t%d\t%s [%s]\t%s", viewName, module["Row"], module["Col"], moduleName, module["Type"], module["DataSource"]);
      }
   }

   // Now save the dashboard to the store (assuming it is valid)
   if (isValid) this.SaveDashboard(name, dashboard);

   // Return the dashboard object
   return dashboard;
}

DashboardManager.prototype.ExportDashboard = function(name, dashboardFile)
{
   throw "Not Implemented";
   return;
}

/*
DashboardManager.prototype.CreateDashboardFromJSON = function(name, dashboardJSON)
{
   throw "Not Implemented";
   return;
}
*/

// Write it to the dashboard store
DashboardManager.prototype.SaveDashboard = function(name, dashboard)
{  
   var fname = "Dashboards_" + name;
   return this.cacheStore.Put(null, fname, dashboard);
   //return this.dashboardStore.Save(name, dashboard);
}

// Read the json data from file
DashboardManager.prototype.LoadDashboard = function(name, catalog)
{
   var fname = "Dashboards_" + name;
   var data = this.cacheStore.Get(null, fname);
   if (data != null)
   {
      var dashboard = this.CreateDashboard(name, catalog);
      console.log(dashboard);
      return dashboard;
   }
   else
   {
      console.log("The dashboard could not be loaded.");
      return null;
   }
}

// Parse the Dashboard data file
DashboardManager.prototype.ParseDashboardFile = function(name, catalog, resolvedDashboardFile)
{
   var dashboardRows = this.dashboardStore.Get(null, resolvedDashboardFile, {format: "tsv"});
   var views = {};
   for (var i = 0; i < (dashboardRows ? dashboardRows.length : 0); i++)
   {
      if (i == 0) continue;
      var row = dashboardRows[i];
      var cols = row.split('\t');
      if (row.length <= 0) continue;

      var view = null;
      var module = {};
      
      var j = 0;
      viewName = cols[j++];      
      module["Name"] = cols[j++];
      module["Type"] = cols[j++];
      module["Width"] = cols[j++];
      module["Row"] = cols[j++];
      module["Col"] = cols[j++];
      module["DataSource"] = cols[j++];
      module["DataSetName"] = this.UnwrapReference(module["DataSource"]);

      var bindings = {};
      module["Bindings"] = bindings;
      
      bindings["Series1"] = cols[j++];
      bindings["Series2"] = cols[j++];
      bindings["Series3"] = cols[j++];
      bindings["Series4"] = cols[j++];
      bindings["Labels1"] = cols[j++];
      bindings["Labels2"] = cols[j++];
      bindings["Labels3"] = cols[j++];
      bindings["Labels4"] = cols[j++];
   
      module["Header"] = cols[j++];
      module["Footer"] = cols[j++];
      module["Context"] = cols[j++];
      module["ID"] = "module_" + module["Row"] + "_" + module["Col"];
      module["Debug"] = [];
      
      var modules = {};
      if (viewName in views)
      {
         view = views[viewName];
         modules = view["Modules"];
      }
      else
      {
         view = {};
         views[viewName] = view;
         modules = {};
         view["Modules"] = modules;
         view["Name"] = viewName;
      }
      
      modules[module["Name"]] = module;
   }

   var dashboard = this.CreateDashboard(name, catalog);
   dashboard.views = views;

   return dashboard;
};

DashboardManager.prototype.UnwrapReference = function(ref)
{
   var name = ref;
   name = name.substr(1, name.length-2);
   return name;
}

DashboardManager.prototype.GetDataSetFromModule = function(catalog, module)
{
   console.log("DashboardManager::GetDataSetFromModule()");
   var name = module["DataSetName"];
   if (!name || name.length <= 0) return null;
   var dataset = this.dataSetManager.Get(catalog, name);
   return dataset;
}

DashboardManager.prototype.ValidateModuleDataBinding = function(module, dataset)
{
   return this.dataSetManager.ValidateModuleDataBinding(module, dataset);
}

DashboardManager.prototype.FormatString = function(format, value, vector, id)
{
   var line = format;
   line = line.replace("{0:0,0}", this.FormatWithCommas(value, 0));
   line = line.replace("{0}", value);
   line = line.replace("{0:0,1%}", (Math.round(value * 1000.0) / 10.0) + "%");
   line = line.replace("{0:0,2%}", (Math.round(value * 10000.0) / 100.0) + "%");
   line = line.replace("{0:0,1}", Math.round(value * 10.0) / 10.0);
   line = line.replace("{0:0,2C}", "$" + Math.round(value * 100.0) / 100.0);
   line = line.replace("{0:D}", value);
   return line;
}

DashboardManager.prototype.RoundDecimals = function(z, n, isFixed)
{
   var n2 = z.length - n;
   var znew = (Math.round(z / Math.pow(10, n2)) * Math.pow(10, n2)) + "";
   var z3 = znew.slice(znew.length - z.length, z.length + 1);
   if (isFixed) z3 = z3 + "0000000000".substr(0, Math.max(0, n - z3.length));
   return z3.substr(0, n);
}

DashboardManager.prototype.FormatWithCommas = function(value, decimalPlaces, useFixed)
{
   if (!decimalPlaces) decimalPlaces = 0;
   useFixed = useFixed || false;
   var n = value;
   n = (n != null) ? (n + "").trim().replace("+", "") : "";
   var dp = n.indexOf(".");
   var frac = (dp >= 0) ? n.slice(dp+1, n.length) : "";
   var sfrac = this.RoundDecimals(frac, decimalPlaces, useFixed);
   var d = (dp >= 0) ? n.slice(0, dp) : n;
   var buffer = [];
   for (var z = d.length-1; z >= 0; z--)
   {
      var z2 = (d.length - 1) - z;
      if (((z2 % 3) == 0) && (z != d.length-1) && (d[z] != '-')) buffer.push(',');
      buffer.push(d[z]);
   }
   var out = buffer.reverse().join("");
   if (sfrac.length > 0) out += "." + sfrac;
   return out;
}


DashboardManager.prototype.ConvertToFloat = function(series)
{
   if (!series) return null;
   var n1 = [];
   for (var i = 0; i < series.length; i++)
   {
      n1[i] = series[i] * 1.0;
   }
   return n1;
}

DashboardManager.prototype.ProcessSparkline = function(line)
{
   if (line.sparkline && line.sparkline.values && line.sparkline.values.length && (line.sparkline.values.length > 0))
   {
      var j1 = line.text.indexOf("{sparkline:");
      if (j1 >= 0)
      {
         var len1 = "{sparkline:".length;
         var j2 = line.text.indexOf("}", j1);
         line.sparkline.type = line.text.substr(j1+len1, j2-j1-len1);
         var span = "&nbsp;<span id='" + line.id + "' class='sparklines " + line.sparkline.type + "' values='" + line.sparkline.values.join(",") + "' />";
         line.text = line.text.substr(0, j1) + line.text.substr(j2+1);
         console.log("%s:", line.text);
      }
   }
}

DashboardManager.prototype.DatabindModule = function(dashboard, viewName, moduleName)
{
  debugger;

   //console.log("DatabindModule(%s, %s)", viewName, moduleName);
   var vm = {  series: [], seriesName: [], labels: [], metrics: [], lines: [], images: [], gauges:[], table: { fields: [],  rows: [] }, header: null, footer: null };
   
   var result = [];

   var datasets = dashboard.datasets || {};
   var keys = Object.keys(datasets)
   console.log("There are " + keys.length + " datasets.");

   var view = dashboard.views[viewName];
   var modules = view["Modules"];
   var module = modules[moduleName];
   var configs = module["Bindings"];

   var dsName = module["DataSetName"];
   var ds = datasets[dsName];
   
   var moduleTitle = module["Header"];
   var moduleId = module["ID"];
   var moduleFooter = module["Footer"];
   var moduleType = module["Type"];

   vm.header = moduleTitle;
   vm.footer = moduleFooter;

   var columns = {};
   for (var i = 0; i < this.dataSetManager.SupportedDataBindingConfigNames.length; i++)
   {
      var configName = this.dataSetManager.SupportedDataBindingConfigNames[i];
      var colName = this.UnwrapReference(configs[configName]);
      var columnData = [];
      if (colName)
      {
          vm.seriesName.push(colName);
         //console.log("About to Data Bind to '%s'", colName);
         var dataType = (this.dataSetManager.SupportedNumericDataBindingConfigNames.indexOf(configName) >= 0) ? "Number" : "Text";
         columnData = ds.GetTableColumnValues(colName, dataType);
      }
      columns[configName] = columnData;
   }

   //console.log("\n");
   //console.log("%s [%s]", moduleName, moduleType);
   //console.log("--------------------------------------------------------------------------------");
   //if (moduleTitle) console.log("%s", moduleTitle);

   var labels1 = columns["Labels1"];
   var labels2 = columns["Labels2"];
   var labels3 = columns["Labels3"];
   var labels4 = columns["Labels4"];
   var series1 = columns["Series1"];
   var series2 = columns["Series2"];
   var series3 = columns["Series3"];
   var series4 = columns["Series4"];
 

   switch(moduleType)
   {
      case "Image":
         for (var i = 0; i < series1.length; i++)
         {
            var line = {};
			line.image = series1[i];
			line.text = labels1[i];
			line.href = labels2[i];
			line.format = labels3[i];
			line.transformn = labels4[i];
			line.width = series2[i];
			line.height = series3[i];
			line.zoom = series4[i];
            vm.images.push(line);
            //console.log("%s", JSON.stringify(line));
         }      
         break;
      case "Answer":
         // We support showing CategoryNames1 binding to Series1 and with headername in Series2.
         for (var i = 0; i < labels1.length; i++)
         {
            var d = series1[i];
            var line = {};
            var text = this.FormatString(labels1[i], d);
            var debugLine = text;
            var image = null;
            var header = labels2[i];

            if (header && (header.length > 0))
            {
               if (header == "Image")
               {
                  image = text;
                  header = null;                  
                  debugLine = "<img url='" + image + "'>";
               }
               else
               {
                  debugLine = header + ": " + text;
               }
            }
            line.header = header; line.text = text; line.image = image;
            vm.lines.push(line);
            //console.log("%s", JSON.stringify(line));
         }      
         break;
      case "Metric":
		 debugger;
         for (var i = 0; i < series1.length; i++)
         {
            var d = series1[i] * 1.0;
			var percent = series2[i] * 1.0; 
            var sparklineData = series3[i];
            var id = moduleId + "_" + i;
			var category = labels1[i];
			var formattedValue = this.FormatString("{0:0,0}", d);
			var formattedChange = this.FormatString("{0:0,2%}", percent);
			var unit = labels2[i];			
            var line = {id: id, formattedValue: formattedValue, value:d, category:category, unit:unit, description:labels4[i], percent:percent, formattedChange:formattedChange,  icon:null, sparkline: {type:null, values:sparklineData }};            
            this.ProcessSparkline(line);                     
            var icon = labels3[i];
            if (icon && (icon.length > 0)) line.icon = icon;
            vm.metrics.push(line);
         }      
         break;    
      case "BulletChart":
		 // Only process this if the bullet graphs have the minimum set of: range, measure, and title.
	   	 // And optionally the markers can be there but not more than the measures.
	 	 if ((series1.length != series2.length) || (series1.length != labels1.length) || (series3.length > series1.length)) 
	 	 {
			console.Error("The bullet graphs do not have the same number of records for measures, ranges, and titles.");
			return;
		 }
		 vm.series[0] = series1;
		 vm.series[1] = series2;
		 vm.series[2] = series3;
		 vm.labels[0] = labels1;
		 vm.labels[1] = labels2;
         break;        
      case "WordCloud":
		 // Only process this if the bullet graphs have the minimum set of: range, measure, and title.
	   	 // And optionally the markers can be there but not more than the measures.
	 	 if (series1.length != labels1.length) 
	 	 {
			console.Error("The Word Graph does not have the same number of records for words and frequencies.");
			return;
		 }
		 vm.series[0] = series1;
		 vm.labels[0] = labels1;
		 vm.labels[1] = labels2;
         break;        
      case "KPISummary":
         // We support showing CategoryNames1 binding to Series1 for data values and with headername for icon vectors.
         for (var i = 0; i < labels1.length; i++)
         {
            var d = series1[i] * 1.0;
            var sparklineData = series2[i];
            var id = moduleId + "_" + i;
            var line = {id: id, text:null, icon:null, sparkline: {type:null, values:sparklineData }};            
            line.text = this.FormatString(labels1[i], d);
            this.ProcessSparkline(line);                     
            var icon = labels2[i];
            if (icon && (icon.length > 0)) line.icon = icon.trim().toLowerCase();
            vm.lines.push(line);
         }      
         break;      
      case "GaugeSet":
         // We support a single gauge per row in a gaugeset. Series1 is the value, Series2 is the Min, Series3 is the Max, Label1 is the Name, Label2 is the Unit
         var gauges = [];
         for (var i = 0; i < labels1.length; i++)
         {
            var value = series1[i] * 1.0;
            var min = series2[i] ? series2[i] * 1.0 : 0.0;  // Default to 0
            var max = series3[i] ? series3[i] * 1.0 : 1.0;  // Default to Max (where we assume the value itself is a percentage)
            var name = labels1[i];
            var unit = labels2[i] ? labels2[i] : "%";
	    var redMin = 0.0;
            var redMax = max * 0.1;
            var yellowMin = redMax;
            var yellowMax = max * 0.25;
            var greenMin = max * 0.75;
            var greenMax = max;

            var gauge = {id:"g"+i, value:value,  min:min, max:max, label:name, unit:unit, majorTicks:5, minorTicks:2, zones:{"red": [{from: redMin, to:redMax}], "yellow": [{from: yellowMin, to: yellowMax}], "green":[{from:greenMin, to:greenMax}] }}
            gauges.push(gauge);
            //console.log("Gauge: %s from %d to %d %s = %d", name, min, max, unit, value);
         }      

         vm.gauges = gauges;

         break;      
       case "DonutChart":
       case "PieChart":
         // If Pie chart, then we get the categorynames and series1. Series2 would be used for a data label in the future.
         var total = 0;

         for (var i = 0; i < series1.length; i++)
         {
            d = series1[i] * 1.0;
            total += d;
         }

         vm.series.push(this.ConvertToFloat(series1));
         vm.labels.push(labels1);
      
         for (var i = 0; i < labels1.length; i++)
         {
            var category = labels1[i];
            var d = series1[i] * 1.0;
            var p = ((d / total) * 100.0);
            //console.log("Pie Slice: %s with %d at %d percentage", category, d, p);
         }      
         break;
      case "TimeSeriesLineChart":
      case "LineChart":
         // If Line chart, then we get the series names from the first row. We can have multiple series values but only 1 category values axis.

         // The first label and series must be present in all cases.
//         vm.labels.push(labels1[i]);
         vm.labels.push(labels1);
         vm.series.push(this.ConvertToFloat(series1));
      
         if (series2.length > 0) vm.series.push(this.ConvertToFloat(series2));
         if (series3.length > 0) vm.series.push(this.ConvertToFloat(series2));
         if (series4.length > 0) vm.series.push(this.ConvertToFloat(series3));

         // JUST FOR CONSOLE DUMP
         for (var i = 0; i < series1.length; i++)
         {
            var vector = [];
            if (series1.length > 0) vector.push(series1[i]);
            if (series2.length > 0) vector.push(series2[i]);
            if (series3.length > 0) vector.push(series3[i]);
            if (series4.length > 0) vector.push(series4[i]);      
            var label = labels1[i];
            //console.log("%s\t%s", label, vector.join("\t"));
         }
         // END
      
         break;
       case "HorizontalBarChart":
       case "VerticalBarChart":
           // If a bar chart, then we get the series names from the first row. We can have multiple series values but only 1 category values axis.

           // The first label and series must be present in all cases.
           //vm.labels.push(labels1[i]);
           vm.labels.push(labels1);
           if (labels2.length > 0) vm.labels.push(labels2);
           if (labels3.length > 0) vm.labels.push(labels3);
           if (labels4.length > 0) vm.labels.push(labels4);

           vm.series.push(this.ConvertToFloat(series1));
           if (series2.length > 0) vm.series.push(this.ConvertToFloat(series2));
           if (series3.length > 0) vm.series.push(this.ConvertToFloat(series3));
           if (series4.length > 0) vm.series.push(this.ConvertToFloat(series4));

           // JUST FOR CONSOLE DUMP
           for (var i = 0; i < series1.length; i++) {
               var vector = [];
               if (series1.length > 0) vector.push(series1[i]);
               if (series2.length > 0) vector.push(series2[i]);
               if (series3.length > 0) vector.push(series3[i]);
               if (series4.length > 0) vector.push(series4[i]);
               var label = labels1[i];
               //console.log("%s\t%s", label, vector.join("\t"));
           }
           // END

           break;
       case "Table":
         // For Tables, we just take all of the rows and columns in the table and show them.
         // To Do: Filters, Columns to Show, Column Data Types, Column Decorators (e.g. Images), etc.
         if (ds)
         {
            var fields = ds.Fields();
            var rows = ds.Rows();
            vm.table.fields = fields;
            vm.table.rows = rows;
            //console.log(fields.join("\t"));
            for (var i = 0; i < rows.length; i++)
            {
               //console.log(rows[i].join("\t"));
            }
         }
         break;      
      default:
         break;
   }
   console.log("VM type = '%s' Data='%s'", moduleType, JSON.stringify(vm));
   return vm;
}










