// Class: DataSetManager
// Scott Beaudreau
// Version 0.52

exports.DataSetManager = DataSetManager;

// Requires
var Slate = {};
Slate.DataSet = require('./DataSet.js').DataSet;

// Requires
fs = require('fs');
//tracelog.info("Initializing the DataSetManager class");

// Class: DataSetManager
// Purpose: Static class for managing dashboard dataset loading and saving of data.
function DataSetManager(config)
{
	// Implement a Singleton pattern
	if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance; else arguments.callee._singletonInstance = this;

   // Config variables
   this.DEFAULT_DATASET_RELDIR = 'static/data';
   this.DEFAULT_EXTENSION = ".txt";
   this.DEFAULT_BINDING_CONFIG_NAMES = ["Series1", "Series2", "Series3", "Series4", "Labels1", "Labels2", "Labels3", "Labels4"];
   this.DEFAULT_NUMERIC_BINDING_CONFIG_NAMES = ["Series1", "Series2", "Series3", "Series4"];

   // Static constructor
   (function constructorStatic(self, config)
   {
      // Now do the type-level instantiation

      var config = config || {};
      self.config = config;

      var resolvedPath = fs.realpathSync(config.DataSetBaseDirectory || self.DEFAULT_DATASET_RELDIR) + "/";
      console.log("DataSetManager using absolute dataset path of: %s", resolvedPath);

      config.DataSetBaseDirectory = resolvedPath;
      config.DataSetFileExtension = config.DataSetFileExtension || self.DEFAULT_EXTENSION;
      config.DataBindingConfigNames = config.DataBindingConfigNames || self.DEFAULT_BINDING_CONFIG_NAMES;
      config.NumericDataBindingConfigNames = config.NumericDataBindingConfigNames || self.DEFAULT_NUMERIC_BINDING_CONFIG_NAMES;

      self.configDirectory = config.DataSetBaseDirectory;
      self.extension = config.DataSetFileExtension;
      self.SupportedDataBindingConfigNames = config.DataBindingConfigNames;
      self.SupportedNumericDataBindingConfigNames = config.NumericDataBindingConfigNames;
   })(this, config);
}


DataSetManager.prototype.GenerateFullyQualifiedFilename = function(catalog, name)
{
	// ToDo: name needs to be cleanly verified to avoid evil doers. Strip out all path hacks.
	var filename = (name) ? this.configDirectory + catalog + "/" + name + this.extension : null;
	return filename;
}


DataSetManager.prototype.Get = function(catalog, name)
{
   console.log("DataSetManager::Get()");	
	// HackHack: Test out the new DataSet class
	var ds = new Slate.DataSet(this, catalog, name);
	ds.Load();
    return ds;
}


DataSetManager.prototype.LoadDataSetFromStore = function(dataset)
{	
   console.log("DataSetManager::LoadDataSetFromStore()");
   if (!dataset) return false;

   dataset.Reset();

   var filename = this.GenerateFullyQualifiedFilename(dataset.namespace, dataset.name);
   console.log("Reading the dataset '%s' in catalog '%s' from file '%s'", dataset.name, dataset.namespace, filename);   

   var ds = {};   
   ds["Name"] = dataset.name;
   ds["Filename"] = filename;
   ds["Fields"] = [];
   ds["LineCount"] = 0;
   ds["Debug"] = [];
   ds["Validated"] = true;
   
   try
   {   
      var dashboardTsv = fs.readFileSync(filename, 'utf8');
      var lines = dashboardTsv.split('\r\n');
      if (lines.length <= 1) lines = dashboardTsv.split('\n');
      if (lines.length > 0)
      {
         var fields = lines[0].split('\t');
         var fieldCount = fields.length;
         ds["Fields"] = fields;
         rows = [];
         ds["Rows"] = rows;
         ds["LineCount"] = lines.length;

         // Now read all of the lines (skipping 1st line)
         for (var i = 1; i < lines.length; i++)
         {
            if (lines[i].length < 1) continue;
            vals = lines[i].split('\t');
            row = [];
            for (var j = 0; (j < vals.length) && (j < fieldCount); j++)
            {
               row[j] = vals[j];
            }
            rows.push(row);
         }         
         ds["Validated"] = true;
         dataset.data = ds;
      }
      else
      {
         console.log["Debug"].push("The target file had no header lines.");
      }      
   }
   catch(e)
   {
      console.log(e);
      console.log("No DataSet object returned.");
      console.log(e.message);
      return false;
   }
   return true;
}


DataSetManager.prototype.SaveDataSet = function(catalog, name)
{
   console.log("Saving the dataset: %s in %s", name, catalog);   
   var filename = this.GenerateFullyQualifiedFilename(catalog, name);

   var dashboardTsv = fs.readFileSync(filename, 'utf8');
   dashboardRows = dashboardTsv.split('\r\n');
   return dashboardRows;
}


DataSetManager.prototype.ValidateModuleDataBinding = function(module, ds)
{
   var isValid = false;
   var configSet = module["Bindings"];
   var errors = [];
   return ds.ValidateDataBinding(configSet, errors);
}
