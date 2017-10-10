Ext.define('Module.CMS.dictionary.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sanoticeportlet',
	
	requires  : [
		'Module.CMS.dictionary.Operation',
		'Module.CMS.dictionary.Data',
		'Module.CMS.dictionary.store.DictionaryStore'
 	],
 		
 	VIEW : {
		'Module.CMS.dictionary.view.Grid' : LABEL.grid
	},
    
	title: DICT_MANAGE_LABEL.dictionaryInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.CMS.dictionary',
    
    moduleSessionView : 'Module.CMS.dictionaryCurrentView',
    
    dataObj : Module.CMS.dictionary.Data,
    
    configObj : Module.CMS.dictionary.Config,
	
    defaultView : 'Module.CMS.dictionary.view.Grid',
	
    supportView :['Module.CMS.dictionary.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildDictionaryOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'dictoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [
	                {
					text: DICT_MANAGE_LABEL.add,
					disabled:false,
					name : 'add',
					iconCls : 'x-add-icon'
				},{
					text: DICT_MANAGE_LABEL.edit,
					disabled:true,
					name : 'edit',
					iconCls : 'extensive-edit'
				},{
					text: DICT_MANAGE_LABEL.delete,
					disabled:true,
					name : 'delete',
					iconCls : 'x-del-icon'
				},{
					text: DICT_MANAGE_LABEL.import,
					disabled:false,
					name : 'import',
					iconCls : 'import'
				},{
					text: DICT_MANAGE_LABEL.export,
					disabled:true,
					name : 'export',
					iconCls : 'export'
				},{
					text: DICT_MANAGE_LABEL.additem,
					disabled:true,
					name : 'additem',
					iconCls : 'x-add-icon'
				},{
					text: DICT_MANAGE_LABEL.viewitem,
					disabled:true,
					name : 'viewitem',
					iconCls : 'view'
				}]
	    });
		return menu;
    },
	
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			dictMenu = {
	            text: DICT_MANAGE_LABEL.dictOperation,
	            iconCls: 'pool_setting',  
	            menu: this.buildDictionaryOptMenu()
	        };
		toolbar.push(dictMenu);
		return toolbar;
    }
});
