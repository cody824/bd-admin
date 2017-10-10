Ext.define('Module.Soul.notify.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : [ 'name'],
	
	COMBO_CFG : {},

	getRendererConfig : function() {
		var ret = {
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.buildCOMBOCFG();
		this.callParent(arguments);
	},
	
	buildCOMBOCFG : function(){
		this.COMBO_CFG.sectionType = Soul.util.RendererUtil.buildComBo(BTPL_SECTION_TYPE);
	},
});
