Ext.define('Soul.util.TaskUtil', {
    singleton: true, 
    alias : 'util.taskutil',
    
	failedNum : 0,
	
	taskWin : null,
	
	progressBar : null,
	
	statusBar : null,
	
	stB : null, //stop button
	
	bgB : null, // background button
	
	ifB : null, // info button
	
	
    
	/*
	 *构建任务进度显示窗口
	 * pid 任务的后台进程pid号
	 *fn	回调函数，在任务进度窗口销毁后执行
	*/
	showTaskPbar : function (pid, fn){
		var taskBar = new Ext.ProgressBar( {
			width:250,
			x:50,
			y:35,
			name : 'taskPbar',
			text : 'Begin'
		});
		if (Soul.util.TaskUtil.taskWin != null)
			Soul.util.TaskUtil.taskWin.destroy();
		Soul.util.TaskUtil.taskWin = new Ext.Window({
			width: 350,
			minWidth: 300,
			height: 150,
			draggable: true, //是否可以拖放
			closable: false, //不能关闭
			modal: true,
			layout:'absolute',
			closeAction: 'hide',
			bodyStyle: 'padding:10px;',
			items:taskBar,
			bbar: new Ext.ux.StatusBar({
				name: 'taskStatusbar',
				items: [{
					text: '',
					name: 'infoButton',
					handler: function(){;}
				},{
					text: LABEL.in_backgroubd,
					name: 'backgroudButton',
					handler: function(){
						barWin.destroy();
					}
				}, '-',{
					text: LABEL.stop_task,
					name: 'stopTaskButton',
					handler: function(){
						Soul.util.TaskUtil.stopTask(pid);
					}
				},
				new Date().format('n/d/Y'), ' ', ' ', '-'
			], 
			afterRender : function(){
				Soul.util.TaskUtil.progressBar =  Soul.util.TaskUtil.taskWin.down('progressbar[name:taskPbar]');
				Soul.util.TaskUtil.statusBar =  Soul.util.TaskUtil.taskWin.down('statusbar[name:taskStatusbar]');
				Soul.util.TaskUtil.stB = Soul.util.TaskUtil.taskWin.down('button[name:stopTaskButton]');
				Soul.util.TaskUtil.bgB = Soul.util.TaskUtil.taskWin.down('button[name:backgroudButton]');
				Soul.util.TaskUtil.ifB = Soul.util.TaskUtil.taskWin.down('button[name:infoButton]');
			}
	        })
	    });
		Soul.util.TaskUtil.taskWin.show();
		Soul.util.TaskUtil.taskWin.on("destroy",fn);
		Soul.util.TaskUtil.updateProgressBar(pid);
	},
    
	/*
	 *停止任务
	 * pid 任务的后台进程pid号
	 *
	*/ 
	stopTask : function (pid){
		Ext.Ajax.request({   
	  	        url: taskManagerUrl,
	  	        params: {requestType:"stopTask",pid:pid},
	  	        success: function(response, option) { ;},
	  	        failure: function() {;} 
	  	});
	},
	
	
	updateForGetTaskFailed : function(pid){
		if (Soul.util.TaskUtil.taskWin == null)
			return;
		Soul.util.TaskUtil.failedNum++;
		if(Soul.util.TaskUtil.failedNum < 10){
			t = window.setTimeout(function() {
				Soul.util.TaskUtil.updateProgressBar(pid);
			}, 3000);
			return;
		}  
		Soul.util.TaskUtil.progressBar.updateProgress(0.0, LABEL.get_task_status_error);
		Soul.util.TaskUtil.statusBar.clearStatus({text:LABEL.abnormal});
		Soul.util.TaskUtil.stB.disable();
		Soul.util.TaskUtil.bgB.setText(LABEL.close);
		Soul.util.TaskUtil.ifB.setText(LABEL.show_results);
		Soul.util.TaskUtil.ifB.handler = function(){
			Soul.util.TaskUtil.showResult(task.result);
		};
	},
	
	updateForTaskExec :function(task){
		window.setTimeout(function() {
			Soul.util.TaskUtil.updateProgressBar(task.pid);
		}, 1000);
		var pers = task.percentage*100;
		var per = pers.toFixed(0);
		Soul.util.TaskUtil.ifB.setText(LABEL.complete+":"+per+"%");
		Soul.util.TaskUtil.progressBar.updateProgress(task.percentage,task.statusText); 
	},
	
	updateForTaskComp :function(task){
		Soul.util.TaskUtil.statusBar.clearStatus({text : LABEL.complete});
		updateButtonEnd();
	},
	
	updateForTaskStop :function(task){
		Soul.util.TaskUtil.statusBar.clearStatus({text : LABEL.stop});
		updateButtonEnd();
	},
	
	updateForTaskAnor :function(task){
		Soul.util.TaskUtil.statusBar.clearStatus({text : LABEL.abnormal});
		updateButtonEnd();
	},
	
	updateButtonEnd : function(task){
		Soul.util.TaskUtil.progressBar.updateProgress(1, task.statusText); 
		Soul.util.TaskUtil.stB.disable();
		Soul.util.TaskUtil.bgB.setText(LABEL.close);
		Soul.util.TaskUtil.ifB.setText(LABEL.show_results);
		Soul.util.TaskUtil.ifB.handler = function(){
			Soul.util.TaskUtil.showResult(task.result);
		};
	},
	
	showBusy : function(){
		Soul.util.TaskUtil.statusBar.showBusy();
	},
	
	/*
 	*更新任务进度条
	 * pid 任务的后台进程pid号
	 * progressBar  进度条
	 * win 进度条窗口
	*/
	updateProgressBar : function (pid){
		Ext.Ajax.request({   
	  	   	url: ACTION_URL.TASK_GET_TASK_STATE_ACTION_URL,
			params: {pid:pid, 'requestType': 'getTaskInfoByPid', remoteIp : baseConfig.managedIp},
			timeout: 3000000,
  	        success: function(response, option) { 
				Soul.util.TaskUtil.failedNum = 0;
				if(response.responseText == "" || response.responseText == '{}'){
					Soul.util.TaskUtil.updateForGetTaskFailed(pid);
					return;
				}
  	        	var task = Ext.util.JSON.decode(response.responseText);  	
  	        	switch (task.status) {
				case 0: //系统异常
					messageUtil.showErrorInfo(LABEL.failure,parseError(task.statusText));
					Soul.util.TaskUtil.taskWin.destroy();
					break;
				case 1: //任务正在进行
					Soul.util.TaskUtil.updateForTaskExec(task);
					break;
				case 2://任务完成
					Soul.util.TaskUtil.updateForTaskComp(task);
					break;
				case 3://任务异常终止
					Soul.util.TaskUtil.updateForTaskAnor(task);
					break;
				case 4://用户停止任务
					Soul.util.TaskUtil.updateForTaskStop(task);
					break;
				default:
					Soul.util.TaskUtil.taskWin.destroy();
	        		break; 
				}
  	        },
  	        failure: function() {   
				Soul.util.TaskUtil.updateForGetTaskFailed(pid);
            } 
	  	});
	},
	
	 
	/**
	*显示任务执行结果
	*
	*/
	showResult : function (result){
		var showInfo = new Array();
		showInfo[showInfo.length] = [LABEL.success,result.success.toString()];
		showInfo[showInfo.length] = [LABEL.failure,result.failed.toString()];
		showInfo[showInfo.length] = [LABEL.overleap,result.overleap.toString()];
		
		var fields = [
			{name: 'name', mapping : 0},
			{name: 'value', mapping : 1}
		];
		
		var resultsInfo = new Ext.data.ArrayStore({
			fields: fields,
			proxy: new Ext.data.MemoryProxy(showInfo)
		});
		resultsInfo.load();
			
		var colModel = new Ext.grid.ColumnModel({
			columns: [
				{ header: "name",  dataIndex: 'name',width:50},
				{ header: "value",dataIndex: 'value',width:330,
				renderer:function (data, metadata, record, rowIndex, columnIndex, store) {     
					if(data.indexOf(",") < 0)
						return data;
					var tip = "";
					var dataArr = data.split(",");
					for(var i = 0; i < dataArr.length; i++){
						if(i != (dataArr.length - 1)){
							tip = tip + dataArr[i]+',';
							if((1 + i )  % 8 == 0 )
								tip = tip + '<br>';
						}else
							tip = tip + dataArr[i];
					}
					//metadata.attr = 'ext:qtitle=""' + 'ext:qwidth="330" ext:qtip="' + tip + '"';   
					return tip;   
				}
				}
			]
		});
	
		var resultsGrid = new Ext.grid.GridPanel({
			store: resultsInfo,
			cm:colModel,
			border:false,
			hideHeaders : true,
			autoScroll: true, 
			autoHeight: true
		});
				
		var cssname = 'gridpanel';
		setBoxMarkup(cssname);
		var win = new Ext.Window( {
			title : LABEL.task_results,
			width:420,
			autoHeight : true,
			buttonAlign : 'center',
			headerCfg: {cls: 'x-window-'+cssname+'-header'},
			bodyCfg: {cls: 'x-window-'+cssname+'-body'},
			footerCfg: {cls: 'x-window-'+cssname+'-footer'},
			items : resultsGrid,
			modal:true
		});
		win.show();
		initBoxMarkup();
	},
	
	
	/*
	 *向后台发起执行任务命令
	 * url:请求任务的url
	 * params:请求的参数列表
	 * callbackFn:callback函数
	 * isRemote: 本地任务还是远程任务
	*/
	doTaskAction : function (url,params,callbackFn){
//		showTaskPbar(params.pid,callbackFn,0, isRemote);
		Soul.Ajax.doCommonAction(ACTION_URL.TASK_CREATE_TASK, params, 
			function(ret){
				if (ret < 0)
					return;
				Soul.util.TaskUtil.showTaskPbar(ret,callbackFn);
				Soul.util.TaskUtil.showBusy();
				Ext.Ajax.request({ 
					url: url, params: params,
					success : function(response, option) {},
					failure : function(response) {
						
					}
				});
			}, LABEL.createTask);
	},


	/*
	 *构建任务请求的FROM提交配置对象
	 * url:请求任务的url
	 * params:请求的参数列表
	 *containerId:FROM所在容器ID
	 * callbackFn:callback函数
	*/
	getTaskFromSubmitObj : function (url,params,containerId,callbackFn, isRemote){
		var obj = {
			clientValidation : true,
			url : url,
			params : params,
			success : function(form, action) {
				//var taskPid=action.result.msg;
				if(containerId !=null)
					Ext.getCmp(containerId).destroy();
				//showTaskPbar(taskPid,callbackFn,0);//显示任务处理窗口
			},
			failure : function(form, action) {
				switch (action.failureType) {
				case Ext.form.Action.CLIENT_INVALID:
					if(containerId !=null && Ext.getCmp(containerId)!=null)
						Ext.getCmp(containerId).show();
					break;
				case Ext.form.Action.CONNECT_FAILURE:
	//				showSysFaultInfo(LABEL.failure, action.response.responseText);
					if(containerId !=null && Ext.getCmp(containerId)!=null)
						Ext.getCmp(containerId).destroy();
					break;
				case Ext.form.Action.SERVER_INVALID:
	//				showSysFaultInfo(LABEL.failure, action.response.responseText);
					if(containerId !=null && Ext.getCmp(containerId)!=null)
						Ext.getCmp(containerId).destroy();
				}
			}
		};
		return obj;
	}
    

});











