Ext.define('Module.Account.outMoney.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Account.outMoney.Operation',
		'Module.Account.outMoney.Data',
		'Module.Account.outMoney.store.AccOutBarohStore'
 	],
 		
 	VIEW : {
		'Module.Account.outMoney.view.Grid' : LABEL.grid
	},
    
	title: ACCOUNT_ACCOUTBARON_LABEL.terraceInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Account.outMoney',
    
    moduleSessionView : 'Module.Account.outMoneyCurrentView',
    
    dataObj : Module.Account.outMoney.Data,
    
    configObj : Module.Account.outMoney.Config,
	
    defaultView : 'Module.Account.outMoney.view.Grid',
	
    supportView :['Module.Account.outMoney.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	}
});
