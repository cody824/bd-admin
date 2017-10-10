Ext.define('Module.Account.sysAccCheck.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['checkingId', 'checkingType', 'checkingName', 'checkingTime','checkingDate',
	                  'checkingIsOk', 'checkingDis', 'checkingState', 'checkingDoDis', 'checkingDoTime'],

	getRendererConfig : function() {
		var ret = {
				checkingType : Module.Account.sysAccCheck.Renderer.translateCheckingType,
				checkingIsOk : Module.Account.sysAccCheck.Renderer.translateCheckingIsOK,
				checkingState : Module.Account.sysAccCheck.Renderer.translateCheckingState,
				checkingTime : Module.Account.sysAccCheck.Renderer.translateCheckingTime,
				checkingDoTime : Module.Account.sysAccCheck.Renderer.translateCheckingTime,
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
