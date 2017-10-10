Ext.define('Module.Account.sysRunPara.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Account.sysRunPara.Operation',
		'Module.Account.sysRunPara.Data',
		'Module.Account.sysRunPara.store.SysRunParaStore'
 	],
 		
 	VIEW : {
		'Module.Account.sysRunPara.view.Grid' : LABEL.grid
	},
    
	title: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Account.sysRunPara',
    
    moduleSessionView : 'Module.Account.sysRunParaCurrentView',
    
    dataObj : Module.Account.sysRunPara.Data,
    
    configObj : Module.Account.sysRunPara.Config,
	
    defaultView : 'Module.Account.sysRunPara.view.Grid',
	
    supportView :['Module.Account.sysRunPara.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	buildSysRunParaOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'sysrunparaoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
					text: ACCOUNT_SYSRUNPARA_LABEL.addSysRunPara,
					disabled : false,
					name : 'addSysRunPara',
					iconCls : 'x-add-icon'
				},{
					text: ACCOUNT_SYSRUNPARA_LABEL.editSysRunPara,
					disabled : true,
					name : 'editSysRunPara',
					iconCls : 'extensive-edit'
				},{
					text: ACCOUNT_SYSRUNPARA_LABEL.deleteSysRunPara,
					disabled : true,
					name : 'deletedPara',
					iconCls : 'x-del-icon'
				}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		sysRunParaMenu = {
			text: ACCOUNT_SYSRUNPARA_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildSysRunParaOptMenu()
		};
		toolbar.push(sysRunParaMenu);
		return toolbar;
    }
});
