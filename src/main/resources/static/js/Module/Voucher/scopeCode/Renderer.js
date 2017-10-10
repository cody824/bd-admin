Ext.define('Module.Voucher.scopeCode.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Voucher.scopeCode.Tools',
 		'Module.Voucher.scopeCode.model.ScopeCodeModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return VOUCHER_SCOPE_CODE_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return VOUCHER_SCOPE_CODE_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateScopeCodeStatus : function(v){
		if (v == Module.Voucher.scopeCode.model.ScopeCodeModel.INUSE)
			return VOUCHER_SCOPE_CODE_LABEL.used;
		else if (v == Module.Voucher.scopeCode.model.ScopeCodeModel.NOTUSE)
			return VOUCHER_SCOPE_CODE_LABEL.unused;
		else
			return VOUCHER_SCOPE_CODE_LABEL.unknown;
	},
	
	constructor : function() {
		this.callParent(arguments);
		this.UM = Module.Voucher.scopeCode.model.ScopeCodeModel;
	}
});