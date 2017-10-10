Ext.define('Module.Account.outMoney.model.AccOutBarohModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'outbarohId',
		mapping : 'obj.outbarohId'
	},{
		name : 'outbarohCode',
		mapping : 'obj.outbarohCode'
	},{
		name : 'outbarohType',
		mapping : 'obj.outbarohType'
	},{
		name : 'outbarohMoney',
		mapping : 'obj.outbarohMoney'
	},{
		name : 'outbarohBackSeq',
		mapping : 'obj.outbarohBackSeq'
	},{
		name : 'outbarohBackCode',
		mapping : 'obj.outbarohBackCode'
	},{
		name : 'outbarohTime',
		mapping : 'obj.outbarohTime'
	},{
		name : 'outbarohRemark',
		mapping : 'obj.outbarohRemark'
	},{
		name : 'outbarohBackName',
		mapping : 'obj.outbarohBackName'
	},{
		name : 'relationUser.relationName',
		mapping : 'obj.relationUser.relationName'
	},{
		name : 'relationUser.terrace.terraceName',
		mapping : 'obj.relationUser.terrace.terraceName'
	},{
		name : 'accItem',
		mapping : 'obj.accItem'
	},{
		name : 'relationUser',
		mapping : 'obj.relationUser'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});