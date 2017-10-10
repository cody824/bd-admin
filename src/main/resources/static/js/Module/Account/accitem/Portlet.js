Ext.define('Module.Account.accitem.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Account.accitem.Operation',
		'Module.Account.accitem.Data',
		'Module.Account.accitem.store.AccitemStore'
 	],
 		
 	VIEW : {
		'Module.Account.accitem.view.Grid' : LABEL.grid
	},
    
	title: ACCITEM_LABEL.accitemInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Account.accitem',
    
    moduleSessionView : 'Module.Account.accitemCurrentView',
    
    dataObj : Module.Account.accitem.Data,
    
    configObj : Module.Account.accitem.Config,
	
    defaultView : 'Module.Account.accitem.view.Grid',
	
    supportView :['Module.Account.accitem.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	buildAccitemOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'accitemoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: ACCITEM_LABEL.lockAccitem,
					disabled:true,
					name : 'lockedAccitem',
					iconCls : 'lock'
				},{
					text: ACCITEM_LABEL.cancelAccitem,
					disabled:true,
					name : 'canceledAccitem',
					iconCls : 'lock'
				},{
					text: ACCITEM_LABEL.listRelationUser,
					disabled: true,
					name: 'listRelationUser',
					iconCls : 'view'
				},{
					text: ACCITEM_LABEL.listReconciliation,
					disabled: true,
					name: 'listReconciliation',
					iconCls : 'view'
				},{
					text: ACCITEM_LABEL.listAccCondeta,
					disabled: true,
					name: 'listAccCondeta',
					iconCls : 'view'
				},{
					text: ACCITEM_LABEL.transfer,
					disabled: true,
					name: 'doTransfer',
					iconCls : 'view'
				}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			accitemMenu = {
				text: ACCITEM_LABEL.operation,
	            iconCls: 'pool_setting',
	            menu: this.buildAccitemOptMenu()
	        };
		toolbar.push(accitemMenu);
		return toolbar;
    }
});