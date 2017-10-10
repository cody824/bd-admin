Ext.define('Module.Account.accitem.model.AccCondetaModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'condetaId',
		mapping : 'obj.condetaId'
	},{
		name : 'relationUserBuyID',
		mapping : 'obj.relationUserBuyID'
	},{
		name : 'relationUserSellID',
		mapping : 'obj.relationUserSellID'
	},{
		name : 'condetaMoney',
		mapping : 'obj.condetaMoney'
	},{
		name : 'condetaType',
		mapping : 'obj.condetaType'
	},{
		name : 'condetaNote',
		mapping : 'obj.condetaNote'
	},{
		name : 'condetaState',
		mapping : 'obj.condetaState'
	},{
		name : 'terraceCode',
		mapping : 'obj.terraceCode'
	},{
		name : 'condetaTime',
		mapping : 'obj.condetaTime'
	},{
		name : 'condetaDoTime',
		mapping : 'obj.condetaDoTime'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});