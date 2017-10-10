/**
Ext.define('Module.Account.ledger.model.LedgerModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'terraceId',
		mapping : 'obj.terraceId'
	},{
		name : 'terraceName',
		mapping : 'obj.terraceName'
	},{
		name : 'inuseAccItemCount',
		mapping : 'obj.inuseAccItemCount'
	},{
		name : 'terraceTotalMoney',
		mapping : 'obj.terraceTotalMoney'
	},{
		name : 'terraceOwnMoney',
		mapping : 'obj.terraceOwnMoney'
	},{
		name : 'time',
		mapping : 'obj.time'
	},{
		name : 'lastTerraceTotalMoney',
		mapping : 'obj.lastTerraceTotalMoney'
	},{
		name : 'lastTerraceOwnMoney',
		mapping : 'obj.lastTerraceOwnMoney'
	},{
		name : 'lastTime',
		mapping : 'obj.lastTime'
	},{
		name : 'changeMoney',
		mapping : 'obj.changeMoney'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});
**/

Ext.define('Module.Account.ledger.model.LedgerModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'terraceId',
		mapping : 'terraceId'
	},{
		name : 'terraceName',
		mapping : 'terraceName'
	},{
		name : 'inuseAccItemCount',
		mapping : 'inuseAccItemCount'
	},{
		name : 'terraceTotalMoney',
		mapping : 'terraceTotalMoney'
	},{
		name : 'terraceOwnMoney',
		mapping : 'terraceOwnMoney'
	},{
		name : 'time',
		mapping : 'time'
	},{
		name : 'lastTerraceTotalMoney',
		mapping : 'lastTerraceTotalMoney'
	},{
		name : 'lastTerraceOwnMoney',
		mapping : 'lastTerraceOwnMoney'
	},{
		name : 'lastTime',
		mapping : 'lastTime'
	},{
		name : 'changeMoney',
		mapping : 'changeMoney'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});