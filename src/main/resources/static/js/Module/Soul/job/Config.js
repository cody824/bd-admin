Ext.define('Module.Soul.job.Config', {
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
		this.COMBO_DATA.jobStatus = Soul.util.RendererUtil.buildComBo(JOB_DATA.jobStatus);
		this.COMBO_DATA.jobMode = Soul.util.RendererUtil.buildComBo(JOB_DATA.jobMode);
		this.COMBO_DATA.jobType = Soul.util.RendererUtil.buildComBo(JOB_DATA.jobType);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});