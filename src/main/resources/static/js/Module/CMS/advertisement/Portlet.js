Ext.define('Module.CMS.advertisement.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sanoticeportlet',
	
	requires  : [
		'Module.CMS.advertisement.Operation',
		'Module.CMS.advertisement.Data',
		'Module.CMS.advertisement.store.Adv_siteStore'
 	],
 		
 	VIEW : {
		'Module.CMS.advertisement.view.Grid' : LABEL.grid
	},
    
	title: ADV_MANAGE_LABEL.advertisementInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.CMS.advertisement',
    
    moduleSessionView : 'Module.CMS.adv_siteCurrentView',
    
    dataObj : Module.CMS.advertisement.Data,
    
    configObj : Module.CMS.advertisement.Config,
	
    defaultView : 'Module.CMS.advertisement.view.Grid',
	
    supportView :['Module.CMS.advertisement.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildSiteOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'siteoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [
	                {
					text: ADV_MANAGE_LABEL.siteAdd,
					disabled:false,
					name : 'addsite',
					iconCls : 'x-add-icon'
				},{
					text: ADV_MANAGE_LABEL.siteEdit,
					disabled:true,
					name : 'editsite',
					iconCls : 'extensive-edit'
				},{
					text: ADV_MANAGE_LABEL.siteDel,
					disabled:true,
					name : 'delsite',
					iconCls : 'x-del-icon'
				},{
					text: ADV_MANAGE_LABEL.advAdd,
					disabled:true,
					name : 'addadv',
					iconCls : 'x-add-icon'
				},{
					text: ADV_MANAGE_LABEL.advView,
					disabled:true,
					name : 'viewadv',
					iconCls : 'view'
				}]
	    });
		return menu;
    },
	
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			siteMenu = {
	            text: ADV_MANAGE_LABEL.operation,
	            iconCls: 'pool_setting',  
	            menu: this.buildSiteOptMenu()
	        };
		toolbar.push(siteMenu);
		return toolbar;
    }
});
