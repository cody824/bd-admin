Ext.define('Module.Soul.notify.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.btplportlet',
	
	requires  : [
		'Module.Soul.notify.Data',
		'Module.Soul.notify.store.NotifyConfigStore'
 	],
 		
 	VIEW : {
		'Module.Soul.notify.view.Grid' : LABEL.grid,
	},
    
	title: "通知管理",
			
	icon : '/img/icon/switch.png',
	
	moduleName : 'Module.Soul.notify',
    
    moduleSessionView : 'Module.Soul.notifyCurrentView',
    
    dataObj : Module.Soul.notify.Data,
    
    configObj : Module.Soul.notify.Config,
	
    defaultView : 'Module.Soul.notify.view.Grid',
	
    supportView :['Module.Soul.notify.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
	
	buildBookTplOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'useroperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
				text: "新建模板",
				disabled:false,
				name : 'createBtpl',
				iconCls : 'add'
			}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			addBtn = {
	            text: "添加事件",
	            iconCls: 'pool_setting', 
	            name : 'createNC'
	        },
			saveBtn = {
	            text: "保存修改",
	            iconCls: 'save', 
	            disabled: true,
	            name : 'updateNC'
	        };
		toolbar.push(addBtn);
		toolbar.push(saveBtn);
		return toolbar;
    }
});




