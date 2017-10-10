Ext.define('Module.Soul.job.view.Grid', {
	extend: 'Soul.view.AdvanceSearchGrid',
	alias: 'widget.jobGrid',

	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.Soul.job.Data',
		'Module.Soul.job.Renderer',
		'Soul.ux.grid.column.ComboColumn',
		'Module.Soul.job.Operation'
	],

	initComponent: function () {
		var columns = new Array();
		var renders = Module.Soul.job.Renderer;
		var comboData = Module.Soul.job.Config.COMBO_DATA;
		columns.push(
			//new Ext.grid.RowNumberer(),
			{
				text: JOB_PROPERTY.id,
				dataIndex: 'id',
				searchType: 'number',
				align: 'center',
				width: 50
			},
			{
				text: JOB_PROPERTY.jobName,
				dataIndex: 'jobName',
				searchType: 'string',
				align: 'center',
				width: 150
			}, {
				text: JOB_PROPERTY.jobGroup,
				dataIndex: 'jobGroup',
				searchType: 'string',
				align: 'center',
				width: 150
			},{
				text: JOB_PROPERTY.jobStatus,
				dataIndex: 'jobStatus',
				searchType: 'combo',
				align: 'center',
				width: 100,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return renders.translateJobStatus(v);
				},
				comboData: comboData.jobStatus
			},{
				text: JOB_PROPERTY.cronExpression,
				dataIndex: 'cronExpression',
				searchType: 'string',
				align: 'center',
				width: 150
			},{
				text: JOB_PROPERTY.mode,
				dataIndex: 'mode',
				searchType: 'combo',
				align: 'center',
				width: 100,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return renders.translateJobMode(v);
				},
				comboData: comboData.jobMode
			},  {
				text: JOB_PROPERTY.type,
				dataIndex: 'type',
				searchType: 'combo',
				align: 'center',
				width: 100,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return renders.translateJobType(v);
				},
				comboData: comboData.jobType
			}, {
				text: JOB_PROPERTY.percent,
				dataIndex: 'percent',
				searchType: 'number',
				align: 'center',
				width: 150
			}, {
				text: JOB_PROPERTY.createTime,
				dataIndex: 'createTime',
				searchType: 'date',
				align: 'center',
				width: 150,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					var val = new Date(v);
					return Ext.util.Format.date(val, 'Y-m-d H:i:s');
				}
			},{
				text: JOB_PROPERTY.updateTime,
				dataIndex: 'updateTime',
				searchType: 'date',
				align: 'center',
				width: 150,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					var val = new Date(v);
					return Ext.util.Format.date(val, 'Y-m-d H:i:s');
				}
			},
			//{
			//	text: JOB_PROPERTY.description,
			//	dataIndex: 'description',
			//	searchType: 'string',
			//	align: 'center',
			//	width: 150
			//}, {
			//	text: JOB_PROPERTY.beanClass,
			//	dataIndex: 'beanClass',
			//	searchType: 'string',
			//	align: 'center',
			//	width: 150
			//},
			{
				text: JOB_PROPERTY.isConcurrent,
				dataIndex: 'isConcurrent',
				searchType: 'number',
				align: 'center',
				width: 100,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return renders.translateJobConcurrent(v);
				}
			},
			//{
			//	text: JOB_PROPERTY.springId,
			//	dataIndex: 'springId',
			//	searchType: 'string',
			//	align: 'center',
			//	width: 150
			//}, {
			//	text: JOB_PROPERTY.methodName,
			//	dataIndex: 'methodName',
			//	searchType: 'string',
			//	align: 'center',
			//	width: 150
			//},
			{
				text: JOB_PROPERTY.runNum,
				dataIndex: 'runNum',
				searchType: 'number',
				align: 'center',
				width: 150
			}, {
				text: JOB_PROPERTY.appId,
				dataIndex: 'appId',
				searchType: 'string',
				align: 'center',
				width: 150
			}
		);

		var me = this;

		//右击事件
		me.contextMenu = me.portlet.buildJobOptMenu();
	
		//双击事件 --> 作业日记
		me.doubleClick = function (view, record, item, index, e) {
			Module.Soul.job.Operation.viewJobLogs(record, null);
		};

		var sm = new Ext.selection.CheckboxModel({
			mode:'single',
			listeners : {
				selectionchange : function(sm2) {
					var records = sm2.getSelection();
					
					var status = records[0].data.jobStatus;
					
					var closeBtnRight = me.contextMenu.down('menuitem[name=close]');
					var resumeBtnRight = me.contextMenu.down('menuitem[name=resume]');
					var triggerBtnRight = me.contextMenu.down('menuitem[name=trigger]');
					var stopBtnRight = me.contextMenu.down('menuitem[name=stop]');
					var logBtnRight = me.contextMenu.down('menuitem[name=log]');
	
				   var defaultBtn = function(){
					    closeBtnRight.disable();
						resumeBtnRight.disable();
						triggerBtnRight.disable();
						stopBtnRight.disable();
						logBtnRight.disable();	
						
						//所有状态下都可以查看日志
						logBtnRight.enable();	
					};
						
					console.log(status)
						
					//正常的状态下
					if(Module.Soul.job.model.JobModel.STATE_NORMAL==status)
					{
						defaultBtn();
						triggerBtnRight.enable();
						stopBtnRight.enable();
						closeBtnRight.enable();
						return false;
					}
					
					//暂停的状态下
					if(Module.Soul.job.model.JobModel.STATE_PAUSED==status)
					{
						defaultBtn();
						resumeBtnRight.enable();
						return false;
					}
					//完成的状态下
					if(Module.Soul.job.model.JobModel.STATE_COMPLETE==status)
					{
						defaultBtn();
						triggerBtnRight.enable();
						return false;
					}
		
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns: columns,
			viewConfig: {
				emptyText: "未查询到数据"
			},
			store: Ext.data.StoreManager.lookup("Module.Soul.job.store.JobStore")
		});

		this.callParent(arguments);
	},

	afterRender: function () {
		var me = this;
		me.callParent(arguments);
		var sm = me.selModel;	
        var callbackFun = function(){
	      	var current = me.store.currentPage;
	        if (me.fireEvent('beforechange', me, current) !== false) {
	            me.store.loadPage(current);
	        }
		};
		
		var closeBtnRight = me.contextMenu.down('menuitem[name=close]');
		var resumeBtnRight = me.contextMenu.down('menuitem[name=resume]');
		var triggerBtnRight = me.contextMenu.down('menuitem[name=trigger]');
		var stopBtnRight = me.contextMenu.down('menuitem[name=stop]');
		var logBtnRight = me.contextMenu.down('menuitem[name=log]');
		
		 //查看日志
        var showLogFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	Module.Soul.job.Operation.viewJobLogs(records[0], null);
        	
        };
        logBtnRight.on('click', showLogFunc);
		  
        //暂停
        var  stopBtnFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	Module.Soul.job.Operation.doPauseJobProcessFunction(records, callbackFun);
        	
        };
        stopBtnRight.on('click', stopBtnFunc);
 
		//恢复
        var  resumeBtnFunc = function(item, e, eOpts){   
        	var records = sm.getSelection();
    		Module.Soul.job.Operation.doResumeJobProcessFunction(records, callbackFun);
        };
        resumeBtnRight.on('click', resumeBtnFunc);
     
        //触发
        var triggerBtnFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
    		Module.Soul.job.Operation.doTriggerJobProcessFunction(records, callbackFun);
        	
        };
        triggerBtnRight.on('click', triggerBtnFunc);

        // 结束
        var  closeBtnFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	Module.Soul.job.Operation.doStopJobProcessFunction(records, callbackFun);
        };
        closeBtnRight.on('click', closeBtnFunc);
      	
	}
});
