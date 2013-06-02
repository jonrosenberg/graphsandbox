// Class: DataSetManager
// Scott Beaudreau
// Version 0.52

exports.DataSet = DataSet;

//tracelog.info("Initializing the DataSetManager class");

var Slate = require('./DataSetManager.js');

// Class: Dashboard
function DataSet(dataSetManager, namespace, name, config) {
    // Implement a Private Constructor with a Factory Pattern
    //if (arguments.callee.caller !== Slate.DataSetManager().Create) {
    if (false) {
        var msg = "class DataSet has a private constructor and must be created by DataSetManager::Create(...) or DataSetManager::Load(...)";
        console.error(msg);
        throw msg;
        return {};
    }
    else
    {
		// It is all good then....
    }

   // Config variables
   this.DEFAULT_BINDING_CONFIG_NAMES = ["Series1", "Series2", "Series3", "Series4", "Labels1", "Labels2", "Labels3", "Labels4"];
   this.DEFAULT_NUMERIC_BINDING_CONFIG_NAMES = ["Series1", "Series2", "Series3", "Series4"];

   (function init(self, manager, namespace, name, config)
   {
       self.manager = manager;
       self.config = config || {};		
       self.SupportedDataBindingConfigNames = self.config.DataBindingConfigNames || self.DEFAULT_BINDING_CONFIG_NAMES;
       self.SupportedNumericDataBindingConfigNames = self.config.NumericDataBindingConfigNames || self.DEFAULT_NUMERIC_BINDING_CONFIG_NAMES;

       self.name = name;
       self.namespace = namespace;
       self.data = {};
       self.viewModels = {};
       console.log("Constructed a new DataSet");
   })(this, dataSetManager, namespace, name, config);
}


DataSet.prototype.Rows = function() {
   return this.data ? this.data["Rows"] : [];
}

DataSet.prototype.Fields = function() {
   return this.data ? this.data["Fields"] : [];
}


DataSet.prototype.Test = function()
{
	console.log("DataSet::Test()");
	console.log(this.namespace + "/" + this.name);
}


DataSet.prototype.Load = function() {
   console.log("DataSet::Load()");
   this.manager.LoadDataSetFromStore(this);
}


DataSet.prototype.Save = function() {
   console.log("DataSet::Save()");
}


DataSet.prototype.Validate = function() {
   console.log("DataSet::Validate()");
}


DataSet.prototype.Refresh = function() {
   console.log("DataSet::Refresh()");
}

DataSet.prototype.Reset = function() {
   console.log("DataSet::Reset()");
   this.data = {};
   this.viewModels = {};
}

DataSet.prototype.Dump = function() {
   console.log("DataSet::Dump()");
}


DataSet.prototype.GetTableColumnValues = function(columnName, columnType)
{
   console.log("DataSetManager.prototype.GetTableColumnValues(%s, %s, %s)", this.name, columnName, columnType);
   var values = [];
   var dataset = this.data; // HackHack
   if (!dataset) return values;
   var rows = dataset["Rows"];
   var fields = dataset["Fields"];
   var colIndex = fields.indexOf(columnName);
   if (colIndex >= 0)
   {
      for (var rowIndex = 0; rowIndex < rows.length; rowIndex++)
      {
         var v = rows[rowIndex][colIndex]; if (v) v = v.trim();
         if ((v) && (v.length > 0) && (columnType == "Number"))
         {
            var vold = v;
            // If this is an array object, it has [] around a set of floating numbers. e.g [1,4,3,6.5]
            // In this case, the numbers are assumed to be comma separated values
            if ((v[0] == '[') && (v[v.length-1] == ']'))
            {
               var vector = v.substr(1, v.length-2).split(',');
               v = [];
               for (var vectorIndex = 0; vectorIndex < vector.length; vectorIndex++) v.push(Number(vector[vectorIndex]));
            }
            else
            {
               try
               {
                  v = v.replace(/,/g, "");
                  v = Number(v);
                  v = Number.isNaN(v) ? vold : v;
               }
               catch(e)
               {
                  v = vold;
               }
            }
         }
         values.push(v);
      }
   }
   return values;
}


DataSet.prototype.ValidateDataBinding = function(configSet, errors)
{
   var isValid = false;
   errors = errors || [];

   if ((this.data != null) && !this.data["Validated"]) return isValid;   // If we have a dataset but it's invalid, data binding is also invalid.
   
   var fieldErrorCount = 0;   
   var fields = (this.data != null) ? this.data["Fields"] : [];
   
   for (var configName in configSet)
   {
      if (this.SupportedDataBindingConfigNames.indexOf(configName) >= 0)
      {         
         var config = configSet[configName];
         if (config.length > 2)
         {
            colName = config.substr(1, config.length-2);
            var colNumber = fields.indexOf(colName);
            if (colNumber >= 0)
            {
               //config["ColumnName"] = colName;
               //config["ColumnNumber"] = colNumber;
               configIsValid = true;
            }
            else
            {
               fieldErrorCount++;
               //if (dataset) dataset["Debug"].push("Data Binding Error: '" + dsRef + "' is an invalid column header in file '" + dataset["Filename"] + "'");
            }         
         }
      }
   }
   
   isValid = (fieldErrorCount == 0);   
   errors.push("Data Binding " + (isValid ? "is" : "is NOT") + " valid");
   return isValid;
}
