Ext.define('Module.Voucher.voucher.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Voucher.voucher.Tools',
 		'Module.Voucher.voucher.model.VoucherModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return VOUCHER_VOUCHER_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return VOUCHER_VOUCHER_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateTerraceCode : function(v){
		if(v == null){
			return "未知";
		}

		if(v == 'yearbook'){
			return "忆尔";
		}else if(v == 'v-yearbook'){
			return "幸福流";
		}else if(v == 'haoke'){
			return "职教好课";
		}else{
			return v;
		}
	},
	translateVoucherStatus : function(v){
		if(v == '00'){
			return VOUCHER_VOUCHER_LABEL.normal;
		}else if(v == '10'){
			return VOUCHER_VOUCHER_LABEL.overdate;
		}else if(v == '20'){
			return VOUCHER_VOUCHER_LABEL.countzero;
		}else if(v == '30'){
			return VOUCHER_VOUCHER_LABEL.stopped;
		}else if(v == '99'){
			return VOUCHER_VOUCHER_LABEL.cancelled;
		}else{
			return VOUCHER_VOUCHER_LABEL.unknown;
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
	translateVoucherBillStatus : function(v){
		if(v == '00'){
			return '未激活';
		}else if(v == '10'){
			return '已激活';
		}else if(v == '20'){
			return '失效';
		}else{
			return VOUCHER_VOUCHER_LABEL.unknown;
		}
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Voucher.voucher.model.VoucherModel;
   	}
});