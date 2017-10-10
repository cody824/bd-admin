Ext.define('Module.Voucher.userVoucher.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['userVoucherName', 'userVoucherStatus'],

	getRendererConfig : function() {
		var ret = {
			userVoucherStatus : Module.Voucher.userVoucher.Renderer.translateUserVoucherStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});