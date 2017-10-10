Ext.define('Module.Soul.job.Operation', {
	singleton : true,
	requires : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView',
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Soul.job.store.JobLogStore'
	],

	viewJobLogs : function(record, callbackFn) {

		var jobStore = Ext.data.StoreManager.lookup("Module.Soul.job.store.JobLogStore");

		jobStore.proxy.api.read = '/api/admin/job/'+ record.data.id +'/logs';

		var jobGrid = Ext.create('Module.Soul.job.view.JobLogGrid',{
			id : 'jobLogGrid' +  record.data.id,
			anchor : '100% 100%',
			store : jobStore,
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar'
				//items: initToolbar()
			}]
		});

		var win = new Ext.Window({
			title: "作业日志",
			items: jobGrid,
			width: 1000,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true
		});
		win.show();
	},
	
	 doStopJobProcessFunction: function (records, callbackFn) {
	     if(this.checkRecords(records))
	    	 this.doJobProcessFunction(records[0].data.id,"stop",callbackFn)   
	 },
	
	 doPauseJobProcessFunction: function (records, callbackFn) {
		 if(this.checkRecords(records))
			 this.doJobProcessFunction(records[0].data.id,"pause",callbackFn)   
	 },
	 
	 doResumeJobProcessFunction: function (records, callbackFn) {
		 if(this.checkRecords(records))
			 this.doJobProcessFunction(records[0].data.id,"resume",callbackFn)   
	 },
	 
	 doTriggerJobProcessFunction: function (records, callbackFn) {
		 if(this.checkRecords(records))
			 this.doJobProcessFunction(records[0].data.id,"trigger",callbackFn)   
	 },
	
	 checkRecords:function(records){
		   if (records.length == 0) {
	            Ext.Msg.alert('请选中需要处理的job！');
	            return false;
	        }
		 return true;
	 },
	 
	  doJobProcessFunction: function (id, type, callbackFn) {
		  //start  pause  resume stop trigger
	            var url = "/api/job/"+id+"/" +type;
	            Soul.Ajax.restAction(url, "post", null, null, function (ret) {
	                callbackFn();
	            }, null, null, null);   
	    }

});