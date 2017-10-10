Ext.define('Module.Soul.shortUrl.Renderer', {
	singleton: true,

	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.Soul.shortUrl.Tools',
		'Module.Soul.shortUrl.model.ShortUrlModel'
	],
	translateShortUrlStatus : function(v) {
		var status = SHORTURL_DATA.status[v];
		if(status){
			return status;
		}
		return v;
	},
	translateShortUrlMode : function(v) {
		var status = SHORTURL_DATA.mode[v];
		if(status){
			return status;
		}
		return v;
	},
});