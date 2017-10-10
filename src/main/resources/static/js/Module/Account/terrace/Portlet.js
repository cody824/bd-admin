Ext.define('Module.Account.terrace.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Account.terrace.Operation',
		'Module.Account.terrace.Data',
		'Module.Account.terrace.store.TerraceStore'
 	],
 		
 	VIEW : {
		'Module.Account.terrace.view.Grid' : LABEL.grid
	},
    
	title: ACCOUNT_TERRACE_LABEL.terraceInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Account.terrace',
    
    moduleSessionView : 'Module.Account.terraceCurrentView',
    
    dataObj : Module.Account.terrace.Data,
    
    configObj : Module.Account.terrace.Config,
	
    defaultView : 'Module.Account.terrace.view.Grid',
	
    supportView :['Module.Account.terrace.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	buildTerraceOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'terraceoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: ACCOUNT_TERRACE_LABEL.lockTerrace,
					disabled:true,
					name : 'lockedTerrace',
					iconCls : 'lock'
				},{
					text: ACCOUNT_TERRACE_LABEL.addTerrace,
					disabled : false,
					name : 'addTerrace',
					iconCls : 'x-add-icon'
				},{
					text: ACCOUNT_TERRACE_LABEL.editTerrace,
					disabled : false,
					name : 'editTerrace',
					iconCls : 'extensive-edit'
				}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		terraceMenu = {
			text: ACCOUNT_TERRACE_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildTerraceOptMenu()
		};
		toolbar.push(terraceMenu);
		return toolbar;
    }
});