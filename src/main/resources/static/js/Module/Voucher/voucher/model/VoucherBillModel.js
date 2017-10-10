Ext.define('Module.Voucher.voucher.model.VoucherBillModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'obj.id'
	},{
		name : 'voucherBillCode',
		mapping : 'obj.voucherBillCode'
	},{
		name : 'voucherBillPassword',
		mapping : 'obj.voucherBillPassword'
	},{
		name : 'voucherBillStatus',
		mapping : 'obj.voucherBillStatus'
	},{
		name : 'voucherBillActivateTime',
		mapping : 'obj.voucherBillActivateTime'
	},{
		name : 'voucherBillCreator',
		mapping : 'obj.voucherBillCreator'
	},{
		name : 'userVoucherId',
		mapping : 'obj.userVoucherId'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});

Module.Voucher.voucher.model.VoucherBillModel.NOTACTIVATED = '00';
Module.Voucher.voucher.model.VoucherBillModel.ACTIVATED = '10';
Module.Voucher.voucher.model.VoucherBillModel.INVALID = '20';