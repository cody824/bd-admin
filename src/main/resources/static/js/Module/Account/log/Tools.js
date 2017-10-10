Ext.define('Module.Account.log.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	showLogInEast : function(logId){
		var me = this;
		
		var log = Module.Account.log.Data.getLogById(logId);
		console.log("log");
		console.log(log);
		if (log != null){
			var property = me.getLogPropertyGrid(log);
			Soul.util.ObjectView.showInEast(property, log.data.accMenAcc.memAccName);
		} 
	},

	getLogPropertyGrid : function(log){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(log, Module.Account.log.Config.getRendererConfig(), 
				ACCOUNT_LOG_PROPERTY, Module.Account.log.Config.showProperties, {
				iconCls : 'md-user'
		});
		// property.on("beforeshow", function(c, eOpts){
		// 	var source = Module.Account.log.Data.getLogById(log.accItemId);
		// 	c.setSource(source);
		// });
		return property;
	},
	
	constructor : function() {
        this.callParent(arguments);
    }
});