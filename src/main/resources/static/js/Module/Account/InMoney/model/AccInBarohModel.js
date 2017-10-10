Ext.define('Module.Account.InMoney.model.AccInBarohModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'inbarohId',
		mapping : 'obj.inbarohId'
	},{
		name : 'inbarohCode',
		mapping : 'obj.inbarohCode'
	},{
		name : 'inbarohType',
		mapping : 'obj.inbarohType'
	},{
		name : 'inbarohMoney',
		mapping : 'obj.inbarohMoney'
	},{
		name : 'inbarohOrgan',
		mapping : 'obj.inbarohOrgan'
	},{
		name : 'inbarohBackSeq',
		mapping : 'obj.inbarohBackSeq'
	},{
		name : 'inbarohBackCode',
		mapping : 'obj.inbarohBackCode'
	},{
		name : 'inbarohTime',
		mapping : 'obj.inbarohTime'
	},{
		name : 'inbarohRemark',
		mapping : 'obj.inbarohRemark'
	},{
		name : 'inbarohBackName',
		mapping : 'obj.inbarohBackName'
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
		name : 'relationUsers',
		mapping : 'obj.relationUsers'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});