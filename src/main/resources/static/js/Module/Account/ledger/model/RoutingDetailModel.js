Ext.define('Module.Account.ledger.model.RoutingDetailModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'routingId',
		mapping : 'obj.routingId'
	},{
		name : 'routingAllMoney',
		mapping : 'obj.routingAllMoney'
	},{
		name : 'routingChangeMoney',
		mapping : 'obj.routingChangeMoney'
	},{
		name : 'routingIncomeMoney',
		mapping : 'obj.routingIncomeMoney'
	},{
		name : 'routingUseMoney',
		mapping : 'obj.routingUseMoney'
	},{
		name : 'routingBailMoney',
		mapping : 'obj.routingBailMoney'
	},{
		name : 'routingConMoney',
		mapping : 'obj.routingConMoney'
	},{
		name : 'routingDbMoney',
		mapping : 'obj.routingDbMoney'
	},{
		name : 'routingtime',
		mapping : 'obj.routingtime'
	},{
		name : 'routingLastTime',
		mapping : 'obj.routingLastTime'
	},{
		name : 'terrace',
		mapping : 'obj.terrace'
	},{
		name : 'fundHistory',
		mapping : 'obj.fundHistory'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});