Ext.define('Module.Account.sysRunPara.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['sysRunParaId', 'sysRunParaCode', 'sysRunParaName', 'sysRunParaType', 'sysRunParaValue', 'sysRunParaNote'],

	getRendererConfig : function() {
		var ret = {
//				accItemDate : Module.Account.sysRunPara.Renderer.translateSysRunParaDate,
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});