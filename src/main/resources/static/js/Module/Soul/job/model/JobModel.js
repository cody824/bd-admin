
Ext.define('Module.Soul.job.model.JobModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'appId',
		mapping : 'appId'
	},{
		name : 'mode',
		mapping : 'mode'
	},{
		name : 'type',
		mapping : 'type'
	},{
		name : 'percent',
		mapping : 'percent'
	},{   
		name : 'createTime',
		mapping : 'createTime'
	},{
		name : 'updateTime',
		mapping : 'updateTime'
	},{
		name : 'jobName',
		mapping : 'jobName'
	},{
		name : 'jobGroup',
		mapping : 'jobGroup'
	},{
		name : 'jobStatus',
		mapping : 'jobStatus'
	},{
		name : 'cronExpression',
		mapping : 'cronExpression'
	},{
		name : 'description',
		mapping : 'description'
	},{
		name : 'beanClass',
		mapping : 'beanClass'
	},{
		name : 'isConcurrent',
		mapping : 'isConcurrent'
	},{
		name : 'springId',
		mapping : 'springId'
	},{
		name : 'methodName',
		mapping : 'methodName'
	},{
		name : 'runNum',
		mapping : 'runNum'
	}]
});

//NONE, NORMAL, PAUSED, COMPLETE, ERROR, BLOCKED 
Module.Soul.job.model.JobModel.STATE_NORMAL = "NORMAL";
Module.Soul.job.model.JobModel.STATE_PAUSED = "PAUSED";
Module.Soul.job.model.JobModel.STATE_COMPLETE = "COMPLETE";
