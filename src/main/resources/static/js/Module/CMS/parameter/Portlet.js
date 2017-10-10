Ext.define('Module.CMS.parameter.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sanoticeportlet',
	
	requires  : [
		'Module.CMS.parameter.Operation',
		'Module.CMS.parameter.Data',
 	],
 		
 	VIEW : {
		'Module.CMS.parameter.view.Panel' : LABEL.grid
	},
    
	title: PARAMETER_MANAGE_LABEL.paramInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.CMS.parameter',
    
    moduleSessionView : 'Module.CMS.parameterCurrentView',
    
    dataObj : Module.CMS.parameter.Data,
    
    configObj : Module.CMS.parameter.Config,
	
    defaultView : 'Module.CMS.parameter.view.Panel',
	
    supportView :['Module.CMS.parameter.view.Panel'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

    buildParamType : function() {
    	var menu = Ext.create('Ext.menu.Menu', {
    		id : 'paramtype',
    		name : 'paramtype',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: []
	    });
		return menu;
    },

    syncGlobalConfig : function() {
    	var button = new Ext.Button({
    		text: PARAMETER_MANAGE_LABEL.configSync,
			width: 80,
			handler: function(){
				var configUrl = '/globalconfig/';
				// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
				Soul.Ajax.restAction(configUrl, 'get', {'fetch' : 'True'}, 
					{'fetch' : 'True'}, function(){}, null, null);
			}
		});
		return button;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments);
	    var paramCombox = {
	        text: PARAMETER_MANAGE_LABEL.paramType,
	        menu: this.buildParamType()
	    };

		toolbar.push(paramCombox);
		toolbar.push(this.syncGlobalConfig());
		return toolbar;
    }
});
