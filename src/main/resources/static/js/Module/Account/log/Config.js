Ext.define('Module.Account.log.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['id', 'luser', 'ldate', 'url', 'method', 'lip', 'lcontext', 'luserRole', 'requestType'],

	getRendererConfig : function() {
		var ret = {
//				accItemDate : Module.Account.log.Renderer.translateLogDate,
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});