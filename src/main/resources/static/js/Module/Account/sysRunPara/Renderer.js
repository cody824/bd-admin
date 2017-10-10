Ext.define('Module.Account.sysRunPara.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Account.sysRunPara.Tools',
 		'Module.Account.sysRunPara.model.SysRunParaModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return ACCOUNT_SYSRUNPARA_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return ACCOUNT_SYSRUNPARA_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateSysRunParaType : function(v){
		if(v == null){
			return ACCOUNT_SYSRUNPARA_LABEL.unknown;
		}

		if(v == '00'){
			return '整数';
		}else if(v == '10'){
			return '浮点数';
		}else if(v == '20'){
			return '字符串';
		}else if(v == '30'){
			return '枚举';
		}else{
			return ACCOUNT_SYSRUNPARA_LABEL.unknown;
		}
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Account.sysRunPara.model.SysRunParaModel;
   	}
});