Ext.define('Module.Account.accitem.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['memAccName', 'accItemCode', 'accItemAllBalna', 'accItemState', 'accItemDate'],

	getRendererConfig : function() {
		var ret = {
				accItemDate : Module.Account.accitem.Renderer.translateCdate,
				accItemState : Module.Account.accitem.Renderer.translateAccitemState,
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
