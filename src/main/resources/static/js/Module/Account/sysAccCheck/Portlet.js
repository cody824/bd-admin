Ext.define('Module.Account.sysAccCheck.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Account.sysAccCheck.Operation',
		'Module.Account.sysAccCheck.Data',
		'Module.Account.sysAccCheck.store.CheckingStore'
 	],
 		
 	VIEW : {
		'Module.Account.sysAccCheck.view.Grid' : LABEL.grid
	},
    
	title: ACCOUNT_CHECKING_LABEL.checkingInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Account.sysAccCheck',
    
    moduleSessionView : 'Module.Account.sysAccCheckCurrentView',
    
    dataObj : Module.Account.sysAccCheck.Data,
    
    configObj : Module.Account.sysAccCheck.Config,
	
    defaultView : 'Module.Account.sysAccCheck.view.Grid',
	
    supportView :['Module.Account.sysAccCheck.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	buildCheckingOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'checkingoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
					text : ACCOUNT_CHECKING_LABEL.addSysAccCheck,
					disabled : false,
					name : 'addSysAccCheck',
					iconCls : 'x-add-icon'
				},{
					text: ACCOUNT_CHECKING_LABEL.processSysAccCheck,
					disabled : true,
					name : 'processSysAccCheck',
					iconCls : 'extensive-edit'
				}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		checkingMenu = {
			text: ACCOUNT_CHECKING_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildCheckingOptMenu()
		};
		toolbar.push(checkingMenu);
		return toolbar;
    }
});
