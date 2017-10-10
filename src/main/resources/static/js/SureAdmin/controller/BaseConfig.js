Ext.define('SureAdmin.controller.BaseConfig', {

	extend : 'Ext.app.Controller',

	stores : [
	],

	models : [ 'BaseConfig' ],

	defaultLanguage : 'zh_CN',

	supportLanguage : [ {
		code : 'zh_CN',
		language : "简体中文",
		charset : "utf-8"
	} ],

	init : function() {
		
	},

	onBaseConfigLoad : function(bc, scope) {
		var me = scope || this;
		document.title = bc.headerTitle;
		me.getLanguageFile(bc.language);
	},

	getLanguageFile : function(lang) {
		var url = Ext.util.Format.format(
				"/js/lib/extlib4/locale/ext-lang-{0}.js", lang);
		if (!Soul.Ajax.loadUrlJs(url))
			Soul.Ajax.loadUrlJs(Ext.util.Format.format(
					"/js/lib/extlib4/locale/ext-lang-{0}.js",
					this.defaultLanguage));
		var url1 = Ext.util.Format.format("/locale/{0}/locale.js", lang);
		if (!Soul.Ajax.loadUrlJs(url1))
			Soul.Ajax.loadUrlJs(Ext.util.Format.format("/locale/{0}/locale.js",
					this.defaultLanguage));
		var url2 = Ext.util.Format.format("/locale/{0}/error.js", lang);
		if (!Soul.Ajax.loadUrlJs(url2))
			Soul.Ajax.loadUrlJs(Ext.util.Format.format("/locale/{0}/error.js",
					this.defaultLanguage));
	},

	getCharset : function(language) {
		for ( var i = 0; i < this.supportLanguage.length; i++) {
			if (this.supportLanguage[i].code == language)
				return this.supportLanguage[i].charset;
		}
		return 'utf-8';
	},

});