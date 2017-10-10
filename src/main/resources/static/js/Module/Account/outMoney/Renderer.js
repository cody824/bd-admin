Ext.define('Module.Account.outMoney.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Account.outMoney.Tools',
 		'Module.Account.outMoney.model.AccOutBarohModel'
  	],
  	translateCtime : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateAccOutBarohType : function(v){
		if(v == null){
			return ACCOUNT_ACCOUTBARON_LABEL.unknown;
		}

		if(v == '00'){
			return '申请出金-线下汇款';
		}else if(v == '01'){
			return '申请出金-第三方法支付';
		}else if(v == '02'){
			return '申请出金-企业网银';
		}else if(v == '10'){
			return '实时出金-第三方支付';
		}else if(v == '11'){
			return '实时出金-银企直连';
		}else{
			return ACCOUNT_ACCINBARON_LABEL.unknown;
		}
	},

	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Account.outMoney.model.AccOutBarohModel;
   	}
});