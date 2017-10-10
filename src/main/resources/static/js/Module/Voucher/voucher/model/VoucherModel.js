Ext.define('Module.Voucher.voucher.model.VoucherModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'voucherId',
		mapping : 'obj.voucherId'
	},{
		name : 'voucherName',
		mapping : 'obj.voucherName'
	},{
		name : 'voucherCode',
		mapping : 'obj.voucherCode'
	},{
		name : 'voucherType',
		mapping : 'obj.voucherType'
	},{
		name : 'voucherStatus',
		mapping : 'obj.voucherStatus'
	},{
		name : 'voucherCount',
		mapping : 'obj.voucherCount'
	},{
		name : 'voucherBillCount',
		mapping : 'obj.voucherBillCount'
	},{
		name : 'voucherActivateCount',
		mapping : 'obj.voucherActivateCount'
	},{
		name : 'voucherUseCount',
		mapping : 'obj.voucherUseCount'
	},{
		name : 'voucherScopeCode',
		mapping : 'obj.voucherScopeCode'
	},{
		name : 'voucherScopeNote',
		mapping : 'obj.voucherScopeNote'
	},{
		name : 'voucherStartTime',
		mapping : 'obj.voucherStartTime'
	},{
		name : 'voucherEndTime',
		mapping : 'obj.voucherEndTime'
	},{
		name : 'days',
		mapping : 'obj.days'
	},{
		name : 'money',
		mapping : 'obj.money'
	},{
		name : 'limitMoney',
		mapping : 'obj.limitMoney'
	},{
		name : 'createTime',
		mapping : 'obj.createTime'
	},{
		name : 'userId',
		mapping : 'obj.userId'
	},{
		name : 'userName',
		mapping : 'obj.userName'
	},{
		name : 'terraceCode',
		mapping : 'obj.terraceCode'
	},{
		name : 'note',
		mapping : 'obj.note'
	},{
		name : 'userLimit',
		mapping : 'obj.userLimit'
	},{
		name : 'voucherBillCount',
		mapping : 'obj.voucherBillCount'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	},{
		name : 'isAutoGet',
		mapping : 'isAutoGet'
	}]
});

Module.Voucher.voucher.model.VoucherModel.ACTIVE = '00';
Module.Voucher.voucher.model.VoucherModel.LOCKED = '10';
Module.Voucher.voucher.model.VoucherModel.CANCELLED = '99';