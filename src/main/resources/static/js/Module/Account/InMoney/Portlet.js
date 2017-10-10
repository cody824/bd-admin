Ext.define('Module.Account.InMoney.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Account.InMoney.Operation',
		'Module.Account.InMoney.Data',
		'Module.Account.InMoney.store.AccInBarohStore'
 	],
 		
 	VIEW : {
		'Module.Account.InMoney.view.Grid' : LABEL.grid
	},
    
	title: ACCOUNT_ACCINBARON_LABEL.accInBaronInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Account.InMoney',
    
    moduleSessionView : 'Module.Account.accInBarohCurrentView',
    
    dataObj : Module.Account.InMoney.Data,
    
    configObj : Module.Account.InMoney.Config,
	
    defaultView : 'Module.Account.InMoney.view.Grid',
	
    supportView :['Module.Account.InMoney.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	}
   
});
