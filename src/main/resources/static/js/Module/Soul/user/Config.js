Ext.define('Module.Soul.user.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : [ 'name', 'email', 'status', 'registAppId',
	               			'registdate', 'updatedate', 'field1', 'field2', 'field3', 'type',
	               			'source'],

	getRendererConfig : function() {
		var ret = {
				registdate : Module.Soul.user.Renderer.translateCtime,
				updatedate : Module.Soul.user.Renderer.translateCtime,
				status : Module.Soul.user.Renderer.translateIsStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
