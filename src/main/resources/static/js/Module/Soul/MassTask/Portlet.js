Ext.define('Module.Soul.MassTask.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.JobPortlet',
	
	requires  : [
		'Module.Soul.MassTask.Operation',
		'Module.Soul.MassTask.Data',
		'Module.Soul.MassTask.store.MassTaskStore'
	],
		
	VIEW : {
		'Module.Soul.MassTask.view.Grid' : LABEL.grid
	},
	
	title: MASS_TASK_LABEL.title,

	iconCls : 'md-user',
	
	moduleName : 'Module.Soul.MassTask',
	
	moduleSessionView : 'Module.Soul.MassTaskCurrentView',
	
	dataObj : Module.Soul.MassTask.Data,
	
	configObj : Module.Soul.MassTask.Config,
	
	defaultView : 'Module.Soul.MassTask.view.Grid',
	
	supportView :['Module.Soul.MassTask.view.Grid'],
	
	havUpdateButton : false,
	
	initComponent : function() {
		this.callParent(arguments);
	},

	  createMessTaskBtn : function() {
	    	var button = new Ext.Button({
	    		iconCls : 'x-add-icon',
	    		text: MASS_TASK_LABEL.create,
				width: 100,
				name: 'createMessTask',
				handler: function(){}
			});
			return button;
	    },
	    
	    testMessTaskBtn : function() {
	    	var button = new Ext.Button({
	    		iconCls : 'view',
	    		text: MASS_TASK_LABEL.test,
				width: 100,
				disabled: false,
				name: 'testMessTask',
				handler: function(){}
			});
			return button;
	    },
	
	    
	    buildMessTaskOptMenu : function(){
	    	var menu = Ext.create('Ext.menu.Menu', {
	    		name : 'messTaskoperation',
		        style: {
		            overflow: 'visible'     // For the Combo popup
		        },
		        items: [{        		
		        		text: MASS_TASK_LABEL.detail,
						disabled: true,
						name: 'showTaslDetail',
						iconCls: 'view'		
					},{
					text: MASS_TASK_LABEL.test,
					disabled: true,
					name: 'testMessTask',
					iconCls: 'view'
					},{
		        		text: MASS_TASK_LABEL.trigger,
						disabled: true,
						name: 'triggerTask',
						iconCls: 'update'
					},{
		        		text: MASS_TASK_LABEL.addUser,
						disabled: true,
						name: 'addMessTaskUser',
						iconCls: 'x-add-icon'
					},{
		        		text: MASS_TASK_LABEL.import,
						disabled: true,
						name: 'importMessTask',
						iconCls: 'x-add-icon'
					},{
						text: MASS_TASK_LABEL.importOrder,
						disabled: true,
						name: 'importOrderMessTask',
						iconCls: 'x-add-icon'
					},{
					text: MASS_TASK_LABEL.importPhoneBindUser,
					disabled: true,
					name: 'importPhoneBindUser',
					iconCls: 'x-add-icon'
				},{
					text: MASS_TASK_LABEL.importEmailBindUser,
					disabled: true,
					name: 'importEmailBindUser',
					iconCls: 'x-add-icon'
				},{
		        		text: MASS_TASK_LABEL.stop,
						disabled: true,
						name: 'stopMessTask',
						iconCls: 'update'
					},{
		        		text: MASS_TASK_LABEL.delete,
						disabled: true,
						name: 'delMessTask',
						iconCls: 'x-del-icon'
					}]
		    });
			return menu;
	    },
		
	    
	    initToolbar : function(){
			var toolbar = this.callParent(arguments);
			toolbar.push(this.createMessTaskBtn());
			return toolbar;
	    }
	    
	
	    
});