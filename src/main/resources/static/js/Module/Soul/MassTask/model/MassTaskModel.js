Ext.define('Module.Soul.MassTask.model.MassTaskModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'type',
		mapping : 'type'
	},{
		name : 'status',
		mapping : 'status'
	},{
		name : 'createName',
		mapping : 'createName'
	},{   
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'utime',
		mapping : 'utime'
	},{
		name : 'content',
		mapping : 'content'
	},{
		name : 'jobId',
		mapping : 'jobId'
	},{
		name : 'msgNum',
		mapping : 'msgNum'
	}]
});