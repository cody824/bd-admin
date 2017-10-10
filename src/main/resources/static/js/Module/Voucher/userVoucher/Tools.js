Ext.define('Module.Voucher.userVoucher.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	showVoucherInEast : function(userVoucherId){
		var me = this;
		
		var userVoucher = Module.Voucher.userVoucher.Data.getUserVoucherById(userVoucherId);
		if(window.console){console.log(userVoucher);}
		if (userVoucher != null){
			var property = me.getVoucherPropertyGrid(userVoucher);
			Soul.util.ObjectView.showInEast(property, userVoucher.userVoucherName);
		}
	},

	getVoucherPropertyGrid : function(userVoucher){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(
				userVoucher,
				Module.Voucher.userVoucher.Config.getRendererConfig(), 
				VOUCHER_USERVOUCHER_PROPERTY,
				Module.Voucher.userVoucher.Config.showProperties,
				{iconCls : 'md-user'});
		
		return property;
	},
	
	constructor : function() {
        this.callParent(arguments);
    }
});