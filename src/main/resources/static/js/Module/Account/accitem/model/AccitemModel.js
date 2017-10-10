Ext.define('Module.Account.accitem.model.AccitemModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'accItemId',
		mapping : 'obj.accItemId'
	},{
		name : 'CyTypeCode',
		mapping : 'obj.CyTypeCode'
	},{
		name : 'accItemVer',
		mapping : 'obj.accItemVer'
	},{
		name : 'accItemCode',
		mapping : 'obj.accItemCode'
	},{
		name : 'accItemState',
		mapping : 'obj.accItemState'
	},{
		name : 'accItemDate',
		mapping : 'obj.accItemDate'
	},{
		name : 'accItemLogOutDate',
		mapping : 'obj.accItemLogOutDate'
	},{
		name : 'accItemAllBalna',
		mapping : 'obj.accItemAllBalna'
	},{
		name : 'accItemUseBalna',
		mapping : 'obj.accItemUseBalna'
	},{
		name : 'accItemBailBalna',
		mapping : 'obj.accItemBailBalna'
	},{
		name : 'accItemConBalna',
		mapping : 'obj.accItemConBalna'
	},{
		name : 'accItemLogoutDate',
		mapping : 'obj.accItemLogoutDate'
	},{
		name : 'accMenAcc.memAccName',
		mapping : 'obj.accMenAcc.memAccName'
	},{
		name : 'memAccName',
		mapping : 'obj.accMenAcc.memAccName'
	},{
		name : 'relationUsers',
		mapping : 'obj.relationUsers'
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

Module.Account.accitem.model.AccitemModel.ACTIVE = '00';
Module.Account.accitem.model.AccitemModel.LOCKED = '20';
Module.Account.accitem.model.AccitemModel.CANCELLED = '30';