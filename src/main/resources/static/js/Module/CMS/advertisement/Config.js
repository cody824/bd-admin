Ext.define('Module.CMS.advertisement.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : [ 'adv_code', 'adv_type', 'adv_site', 'site_desc', 'price_desc', 'enable_tag', 'oper_user_id', 'oper_time', 'add_date', 'adv_released', 'adv_status'],
	               			
	getRendererConfig : function() {
		var ret = {
				oper_time : Module.CMS.advertisement.Renderer.translateCtime,
				add_date : Module.CMS.advertisement.Renderer.translateCtime,
				enable_tag : Module.CMS.advertisement.Renderer.translateIsValid,
				adv_type : Module.CMS.advertisement.Renderer.translateType,
				adv_status : Module.CMS.advertisement.Renderer.translateSiteStatus,
				adv_released : Module.CMS.advertisement.Renderer.translateReleasedAdv,
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});