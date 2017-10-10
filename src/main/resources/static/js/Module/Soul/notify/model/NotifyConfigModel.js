
Ext.define('Module.Soul.notify.model.NotifyConfigModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'notifyType',
		mapping : 'notifyType'
	},{
		name : 'notifyName',
		mapping : 'notifyName'
	},{
		name : 'status',
		mapping : 'status'
	},{
		name : 'supportNodifyMode',
		mapping : 'supportNodifyMode'
	},{
		name : 'roleNodify',
		mapping : 'roleNodify'
	},{
		name : 'userNodify',
		mapping : 'userNodify'
	}],
	
	proxy : {
		type : 'rest',
		appendId : true,
		idParam : 'notifyType',
		url : '/notifyConfig/'
	}
});

