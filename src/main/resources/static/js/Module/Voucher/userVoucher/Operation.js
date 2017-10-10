Ext.define('Module.Voucher.userVoucher.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Voucher.userVoucher.Tools'
	],
	
	getOperationForUserVoucher : function(userVoucher){
		userVoucher.httpParams = new Object();
		userVoucher.httpMethod = new Object();
		userVoucher.requestBody = new Object();
		userVoucher.methodConfirm = new Object();
		userVoucher.methodConfirm["forceStoppedUserVoucher"] = {
			"put" : {
				msg : Ext.String.format(VOUCHER_USERVOUCHER_MESSAGE.confirmLockUserVoucher, userVoucher.userVoucherName)
			}
		};
		userVoucher.httpMethod["forceStoppedUserVoucher"] = "put";
	},

	doLockUserVoucherFunction : function(records, callbackFn){
		var requestBody = [];
		var confirmBody = [];
		Ext.each(records, function(r, i, rs){
			confirmBody.push(r.data.userVoucherName);
			requestBody.push(r.data.userVoucherId);
		});
		var method = "put";
		var userVoucher = records[0].data;
		var confirm = {
			"put" : {
				msg : Ext.String.format(VOUCHER_USERVOUCHER_MESSAGE.confirmLockUserVoucher, confirmBody)
			}
		};
		
		Soul.Ajax.confirmRestAction(userVoucher.links.forceStoppedUserVouchers, method, null, requestBody,  callbackFn, null, null, confirm);
	}
});