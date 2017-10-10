Ext.define('Module.Voucher.userVoucher.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Voucher.userVoucher.Tools',
 		'Module.Voucher.userVoucher.model.UserVoucherModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return VOUCHER_USERVOUCHER_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return VOUCHER_USERVOUCHER_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateUserVoucherSource : function(v){
		if(v == '00'){
			return VOUCHER_USERVOUCHER_LABEL.source_direct;
		}else if(v == '10'){
			return VOUCHER_USERVOUCHER_LABEL.source_vouhcerbill;
		}else{
			return VOUCHER_USERVOUCHER_LABEL.unknown;
		}
	},
	translateUserVoucherStatus : function(v){
		if(v == '00'){
			return VOUCHER_USERVOUCHER_LABEL.normal;
		}else if(v == '10'){
			return VOUCHER_USERVOUCHER_LABEL.used;
		}else if(v == '20'){
			return VOUCHER_USERVOUCHER_LABEL.invalid;
		}else{
			return VOUCHER_USERVOUCHER_LABEL.unknown;
		}
	},
	translateVoucherType : function(v){
		if(v == '00'){
			return '优惠券';
		}else if(v == '10'){
			return '资金抵用券';
		}else{
			return VOUCHER_VOUCHER_LABEL.unknown;
		}
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Voucher.userVoucher.model.UserVoucherModel;
   	}
});