Ext.define('Module.Soul.shortUrl.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['code'],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
		this.COMBO_DATA.status = Soul.util.RendererUtil.buildComBo(SHORTURL_DATA.status);
		this.COMBO_DATA.mode = Soul.util.RendererUtil.buildComBo(SHORTURL_DATA.mode);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});