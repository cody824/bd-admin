Ext.define('Module.Account.terrace.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['terraceId', 'terraceName', 'terraceCode', 'terraceDate', 'accItemCode',
	                  'accItemCodeGuarantee', 'accItemCode01', 'accItemCode02', 'accItemCode03',
	                  'accItemLevel', 'terraceState', 'creatName'],

	getRendererConfig : function() {
		var ret = {
				terraceDate : Module.Account.terrace.Renderer.translateTerraceDate,
				terraceState : Module.Account.terrace.Renderer.translateTerraceState,
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
