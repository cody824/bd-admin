Ext.define('Module.Account.log.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Account.log.Operation',
		'Module.Account.log.Data',
		'Module.Account.log.store.LogStore'
 	],
 		
 	VIEW : {
		'Module.Account.log.view.Grid' : LABEL.grid
	},
    
	title: ACCOUNT_LOG_LABEL.logInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Account.log',
    
    moduleSessionView : 'Module.Account.logCurrentView',
    
    dataObj : Module.Account.log.Data,
    
    configObj : Module.Account.log.Config,
	
    defaultView : 'Module.Account.log.view.Grid',
	
    supportView :['Module.Account.log.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
     		
//    initToolbar : function(){
//		var toolbar = this.callParent(arguments),
//		return toolbar;
//    }
});
