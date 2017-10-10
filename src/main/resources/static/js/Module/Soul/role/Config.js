Ext.define('Module.Soul.role.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : [ 'name', 'cName', 'status','comment', 'type'],

	getRendererConfig : function() {//状态转换
		var ret = {
				status : Module.Soul.role.Renderer.translateIsStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
