Ext.define('Module.Voucher.userVoucher.model.UserVoucherModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'userVoucherId',
		mapping : 'obj.userVoucherId'
	},{
		name : 'voucher.voucherName',
		mapping : 'obj.voucher.voucherName'
	},{
		name : 'userVoucherCode',
		mapping : 'obj.userVoucherCode'
	},{
		name : 'voucher.voucherType',
		mapping : 'obj.voucher.voucherType'
	},{
		name : 'userVoucherStatus',
		mapping : 'obj.userVoucherStatus'
	},{
		name : 'userVoucherSource',
		mapping : 'obj.userVoucherSource'
	},{
		name : 'userVoucherGetTime',
		mapping : 'obj.userVoucherGetTime'
	},{
		name : 'userVoucherStartTime',
		mapping : 'obj.userVoucherStartTime'
	},{
		name : 'userVoucherEndTime',
		mapping : 'obj.userVoucherEndTime'
	},{
		name : 'userVoucherUseTime',
		mapping : 'obj.userVoucherUseTime'
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
		name : 'orderNo',
		mapping : 'obj.orderNo'
	},{
		name : 'freezeId',
		mapping : 'obj.freezeId'
	},{
		name : 'voucher.money',
		mapping : 'obj.voucher.money'
	},{
		name : 'voucher.limitMoney',
		mapping : 'obj.voucher.limitMoney'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});