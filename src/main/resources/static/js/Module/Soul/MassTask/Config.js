Ext.define('Module.Soul.MassTask.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['appId'],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
		this.COMBO_DATA.taskType = Soul.util.RendererUtil.buildComBo(MASS_TASK_DATA.taskType);
		this.COMBO_DATA.taskStatus = Soul.util.RendererUtil.buildComBo(MASS_TASK_DATA.taskStatus);
		this.COMBO_DATA.messStatus = Soul.util.RendererUtil.buildComBo(MASS_MESSAGE_DATA.status);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});