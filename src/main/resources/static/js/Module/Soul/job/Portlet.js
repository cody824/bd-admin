Ext.define('Module.Soul.job.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.JobPortlet',
	
	requires  : [
		'Module.Soul.job.Operation',
		'Module.Soul.job.Data',
		'Module.Soul.job.store.JobStore'
	],
		
	VIEW : {
		'Module.Soul.job.view.Grid' : LABEL.grid
	},
	
	title: JOB_LABEL.title,

	iconCls : 'md-user',
	
	moduleName : 'Module.Soul.job',
	
	moduleSessionView : 'Module.Soul.jobCurrentView',
	
	dataObj : Module.Soul.job.Data,
	
	configObj : Module.Soul.job.Config,
	
	defaultView : 'Module.Soul.job.view.Grid',
	
	supportView :['Module.Soul.job.view.Grid'],
	
	havUpdateButton : false,
	
	initComponent : function() {
		this.callParent(arguments);
	},

	buildJobOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : '作业操作',
			style: {
				overflow: 'visible'     // For the Combo popup
			},
			items: [
				{
					text: JOB_LABEL.pause,
					disabled:true,
					name : 'stop',
					iconCls : 'extensive-edit'
				},{
					text: JOB_LABEL.resume,
					disabled:true,
					name : 'resume',
					iconCls : 'extensive-edit'
				},{
					text: JOB_LABEL.trigger,
					disabled:true,
					name : 'trigger',
					iconCls : 'extensive-edit'
				},{
					text: JOB_LABEL.stop,
					disabled:true,
					name : 'close',
					iconCls : 'extensive-edit'
				},{
					text: JOB_LABEL.log,
					disabled:true,
					name : 'log',
					iconCls : 'view'
				}]
		});
		return menu;
	},
});