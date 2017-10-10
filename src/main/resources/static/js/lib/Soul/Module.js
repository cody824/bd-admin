Ext.define('Soul.Module', {
	singleton : true,

	requires : [ 'Soul.Ajax' ],

	moduleFolder : "/js/Module",

	base : "Module",

	basePackage : '',

	loadLocalJs : function(packageName, name, locale, cb) {
		var localeJs = Ext.util.Format.format(Soul.Module.moduleFolder
				+ "/{0}/{1}/locale/{2}.js", packageName, name, locale);
		return Ext.Loader.loadScript({
			url : localeJs,
			onLoad : cb
		});
	},

	loadLocal : function(moduleList, language, cb) {
		var me = this;
		var n = 0;
		
		Ext.Array.each(moduleList, function(moduleGroup, index, itself) {
			Ext.Array.each(moduleGroup.subModules, function(module, i, s) {
				n++;
			});
		});
		var tmpCb = function(){
			n--;
			if (n <= 0 && typeof(cb) == "function") {
				cb();
			}
		};
		
		Ext.Array.each(moduleList, function(moduleGroup, index, itself) {
			Ext.Array.each(moduleGroup.subModules, function(module, i, s) {
				var packageName = (module.config ? module.config.packageN
						: me.basePackage)
						|| me.basePackage;
				me.loadLocalJs(packageName, module.name, language, tmpCb);
			});
		});

	},

	initModuleConfig : function(fullName, config) {
		if (config == null)
			return;
		for ( var p in config) {
			var o = config[p];
			if (typeof (o) != "function") {
				if (o == 'false')
					o = false;
				else if (o == 'true')
					o = true;
				eval(fullName + '.Config["' + p + '"]=o');
			}
		}
	},

	initConfig : function(moduleList) {
		var me = this;
		Ext.Array.each(moduleList, function(moduleGroup, index, itself) {
			Ext.Array.each(moduleGroup.subModules, function(module, i, s) {
				var mpn = (module.config ? module.config.packageN
						: me.basePackage)
						|| me.basePackage;
				var fullName = me.base + "." + mpn + "." + module.name;
				module.fullName = fullName;

				var tmp = function() {
					me.initModuleConfig(fullName, module.config);
				};
				if (Ext.firefoxVersion == 0) {
					Ext.require([ fullName + '.Config', fullName + '.Data' ],
							tmp);
				} else {
					Ext.syncRequire([ fullName + '.Config', fullName + '.Data' ],
							tmp);
				}
			});
		});
	},

	getModuleGroupByModule : function(moduleList, moduleName) {
		var found = false, group = null;

		Ext.Array.each(moduleList, function(moduleGroup, index, itself) {
			if (!found) {
				Ext.Array.each(moduleGroup.subModules, function(module, i, s) {
					if (module.fullName == moduleName) {
						group = moduleGroup;
						found = true;
						return false;
					}
				});
			} else {
				return false;
			}
		});
		return group;
	},

	initModule : function(container, fullName) {
		var module = container.getComponent(fullName);
		if (module == null) {
			module = Ext.create(fullName + '.Portlet');
			container.add(module);
			container.layout.setActiveItem(fullName);
			module.initUI();
		} else {
			container.layout.setActiveItem(fullName);
			module.initUI();
		}
	}
});
