Ext.define('Module.Soul.group.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sagroupportlet',
	
	requires  : [
		'Module.Soul.group.Operation',
		'Module.Soul.group.Data',
		'Module.Soul.group.store.GroupStore'
 	],
 		
 	VIEW : {
		'Module.Soul.group.view.Grid' : LABEL.grid
	},
    
	title: USERMANAGE_LABEL.userInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Soul.group',
    
    moduleSessionView : 'Module.Soul.groupCurrentView',
    
    dataObj : Module.Soul.group.Data,
    
    configObj : Module.Soul.group.Config,
	
    defaultView : 'Module.Soul.group.view.Grid',
	
    supportView :['Module.Soul.group.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
	
	addGroupOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'groupAddAtion',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [
	                {
					text: GROUP_LABEL.newGroup,
					disabled:false,
					name : 'addGroup',
					iconCls : 'x-add-icon'
				},
	                {
					text: GROUP_LABEL.upGroup,
					disabled:true,
					name : 'upGroup',
					iconCls : 'update'
				},
	                {
					text: GROUP_LABEL.delGroup,
					disabled:true,
					name : 'delGroup',
					iconCls : 'delete'
				},
	                {
					text: GROUP_LABEL.operUser,
					disabled:true,
					name : 'operUser',
					iconCls : 'pool_setting'
				},{
					text: GROUP_LABEL.addRoleToGroup,
					disabled:true,
					name : 'operRole',
					iconCls : 'pool_setting'
				},{
					text: GROUP_LABEL.removeRoleToGroup,
					disabled:true,
					name : 'removeRole',
					iconCls : 'pool_setting'
				}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			userMenu = {
	            text: GROUP_LABEL.operation,
	            iconCls: 'pool_setting',  
	            menu: this.addGroupOptMenu()
	        };
		toolbar.push(userMenu);
		return toolbar;
    }
//	buildUserOptMenu : function(){
//    	var menu = Ext.create('Ext.menu.Menu', {
//    		name : 'useroperation',
//	        style: {
//	            overflow: 'visible'     // For the Combo popup
//	        },
//	        items: [
//	                {
//					text: USERMANAGE_LABEL.lockUser,
//					disabled:true,
//					name : 'lockuser',
//					iconCls : 'lock'
//				}]
//	    });
//		return menu;
//    },
     		
//    initToolbar : function(){
//		var toolbar = this.callParent(arguments),
//			userMenu = {
//	            text: USERMANAGE_LABEL.operation,
//	            iconCls: 'pool_setting',  
//	            menu: this.buildUserOptMenu()
//	        };
//		toolbar.push(userMenu);
//		return toolbar;
//    }
});




