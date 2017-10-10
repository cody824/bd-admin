Ext.define('Module.Soul.group.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : [ 'name', 'cName', 'status', 'comment', 'type', 'roles'],

	getRendererConfig : function() {
		var ret = {
				registdate : Module.Soul.group.Renderer.translateCtime,
				updatedate : Module.Soul.group.Renderer.translateCtime,
				status : Module.Soul.group.Renderer.translateIsStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
