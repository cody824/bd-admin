Ext.define('Module.Account.accitem.model.RelationUserModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'relationId',
		mapping : 'obj.relationId'
	},{
		name : 'relationUserId',
		mapping : 'obj.relationUserId'
	},{
		name : 'relationName',
		mapping : 'obj.relationName'
	},{
		name : 'relationIsAdmin',
		mapping : 'obj.relationIsAdmin'
	},{
		name : 'relationState',
		mapping : 'obj.relationState'
	},{
		name : 'relationUseBalna',
		mapping : 'obj.relationUseBalna'
	},{
		name : 'relationHasUseBalna',
		mapping : 'obj.relationHasUseBalna'
	},{
		name : 'relationTakeBalna',
		mapping : 'obj.relationTakeBalna'
	},{
		name : 'relationHasTakeBalna',
		mapping : 'obj.relationHasTakeBalna'
	},{
		name : 'relationBoundType',
		mapping : 'obj.relationBoundType'
	},{
		name : 'relationBoundValue',
		mapping : 'obj.relationBoundValue'
	},{
		name : 'relationDate',
		mapping : 'obj.relationDate'
	},{
		name : 'relationKey',
		mapping : 'obj.relationKey'
	},{
		name : 'relationRemark',
		mapping : 'obj.relationRemark'
	},{
		name : 'relationCreatMan',
		mapping : 'obj.relationCreatMan'
	},{
		name : 'accItem',
		mapping : 'obj.accItem'
	},{
		name : 'terrace',
		mapping : 'obj.terrace'
	},{
		name : 'accReconciliations',
		mapping : 'obj.accReconciliations'
	},{
		name : 'accInbarohs',
		mapping : 'obj.accInbarohs'
	},{
		name : 'accOutBarohs',
		mapping : 'obj.accOutBarohs'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});

Module.Account.accitem.model.RelationUserModel.ACTIVE = '00';
Module.Account.accitem.model.RelationUserModel.LOCKED = '20';
Module.Account.accitem.model.RelationUserModel.CANCELLED = '99';