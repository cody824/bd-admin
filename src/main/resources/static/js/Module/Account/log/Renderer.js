Ext.define('Module.Account.log.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Account.log.Tools',
 		'Module.Account.log.model.LogModel'
  	],
  	translateCtime : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateLogDate : function(v){
		if(v == null) {
			return ACCOUNT_LOG_LABEL.unknown;
		}
		
		var year = v.substr(0,4);
		var month = v.substr(4,2);
		var day = v.substr(6,2);
		return Ext.String.format("{0}-{1}-{2}",year,month,day);
	},
	translateLogTime : function(value){
		if(value == null) {
			return ACCOUNT_LOG_LABEL.unknown;
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
        this.UM = Module.Account.log.model.LogModel;
   	}
});