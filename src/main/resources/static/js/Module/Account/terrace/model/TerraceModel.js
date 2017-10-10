Ext.define('Module.Account.terrace.model.TerraceModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'terraceId',
		mapping : 'obj.terraceId'
	},{
		name : 'terraceName',
		mapping : 'obj.terraceName'
	},{
		name : 'terraceCode',
		mapping : 'obj.terraceCode'
	},{
		name : 'terraceDate',
		mapping : 'obj.terraceDate'
	},{
		name : 'accItemCode',
		mapping : 'obj.accItemCode'
	},{
		name : 'accItemCodeGuarantee',
		mapping : 'obj.accItemCodeGuarantee'
	},{
		name : 'accItemCode01',
		mapping : 'obj.accItemCode01'
	},{
		name : 'accItemCode02',
		mapping : 'obj.accItemCode02'
	},{
		name : 'accItemCode03',
		mapping : 'obj.accItemCode03'
	},{
		name : 'accItemLevel',
		mapping : 'obj.accItemLevel'
	},{
		name : 'terraceState',
		mapping : 'obj.terraceState'
	},{
		name : 'creatName',
		mapping : 'obj.creatName'
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

Module.Account.terrace.model.TerraceModel.ACTIVE = '00';
Module.Account.terrace.model.TerraceModel.LOCKED = '10';
Module.Account.terrace.model.TerraceModel.CANCELLED = '99';