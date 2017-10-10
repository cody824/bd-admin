Ext.define('Module.Account.ledger.model.FundHistoryModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'fundId',
		mapping : 'obj.fundId'
	},{
		name : 'fundtime',
		mapping : 'obj.fundtime'
	},{
		name : 'fundTolMoney',
		mapping : 'obj.fundTolMoney'
	},{
		name : 'fundChangeMoney',
		mapping : 'obj.fundChangeMoney'
	},{
		name : 'fundIncomeMoney',
		mapping : 'obj.fundIncomeMoney'
	},{
		name : 'fundDbMoney',
		mapping : 'obj.fundDbMoney'
	},{
		name : 'fundLastTime',
		mapping : 'obj.fundLastTime'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});