Ext.define('Module.Account.ledger.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Account.ledger.Operation',
		'Module.Account.ledger.Data',
		'Module.Account.ledger.store.LedgerStore'
 	],
 		
 	VIEW : {
		'Module.Account.ledger.view.Grid' : LABEL.grid
	},
    
	title: ACCOUNT_LEDGER_LABEL.ledgerInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Account.ledger',
    
    moduleSessionView : 'Module.Account.ledgerCurrentView',
    
    dataObj : Module.Account.ledger.Data,
    
    configObj : Module.Account.ledger.Config,
	
    defaultView : 'Module.Account.ledger.view.Grid',
	
    supportView :['Module.Account.ledger.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildLedgerOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'terraceoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text : ACCOUNT_LEDGER_LABEL.viewMoreDetail,
					disabled : true,
					name : 'viewMoreDetail',
					iconCls : 'view'
				}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		menu = {
			text: ACCOUNT_LEDGER_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildLedgerOptMenu()
		};
		toolbar.push(menu);
		return toolbar;
    }
});