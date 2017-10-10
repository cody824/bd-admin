Ext.define('Module.Account.InMoney.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Account.InMoney.Tools',
 		'Module.Account.InMoney.model.AccInBarohModel'
  	],
  	translateCtime : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateAccInBarohType : function(v){
		if(v == null){
			return ACCOUNT_ACCINBARON_LABEL.unknown;
		}

		if(v == '00'){
			return '线下汇款';
		}else if(v == '10'){
			return '第三方法支付';
		}else if(v == '20'){
			return '企业网银';
		}else if(v == '30'){
			return '银企直连';
		}else{
			return ACCOUNT_ACCINBARON_LABEL.unknown;
		}
	},
	translateAccInBarohOrgan : function(v){
		if(v == null){
			return ACCOUNT_ACCINBARON_LABEL.unknown;
		}

		if(v == 'F'){
			return '机构端';
		}else if(v == 'B'){
			return '银行';
		}else{
			return ACCOUNT_ACCINBARON_LABEL.unknown;
		}
	},
	translateAccInBarohDate : function(v){
		if(v == null) {
			return ACCOUNT_ACCINBARON_LABEL.unknown;
		}
		
		var year = v.substr(0,4);
		var month = v.substr(4,2);
		var day = v.substr(6,2);
		return Ext.String.format("{0}-{1}-{2}",year,month,day);
	},
	translateAccInBarohTime : function(value){
		if(value == null) {
			return ACCOUNT_ACCINBARON_LABEL.unknown;
		}
		
		var year = value.substr(0,4);
		var month = value.substr(4,2);
		var day = value.substr(6,2);
		var hour = value.substr(8,2);
		var min = value.substr(10,2);
		var sec = value.substr(12,2);
		return Ext.String.format("{0}-{1}-{2} {3}:{4}:{5}",year,month,day,hour,min,sec);
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Account.InMoney.model.AccInBarohModel;
   	}
});