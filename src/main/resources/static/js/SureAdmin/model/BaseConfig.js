Ext.define('SureAdmin.model.BaseConfig', {

    extend: 'Ext.data.Model',

    fields: [
		{name: 'testMode',  type: 'boolean', defaultValue: false},
		{name: 'loginLogo',   type: 'string', defaultValue: 'defaultLogo.png'},
		{name: 'loginTitle',   type: 'string', defaultValue: 'NOKNOWN'},
		{name: 'yytUrl',   type: 'string', defaultValue: '/'},
		{name: 'language',   type: 'string', defaultValue: 'zh_CN'},
		{name: 'mode',   type: 'string', defaultValue: 'NOKNOWN'},
		{name: 'headerTitle',   type: 'string', defaultValue: 'NOKNOWN'},
		{name: 'headerLogo',   type: 'string', defaultValue: 'defaultLogo.png'},
		{name: 'indexTitle', type: 'string', defaultValue: 'NOKNOWN'},
		{name: 'appId', type: 'string', defaultValue: 'noknown'}
		],
		
	proxy: {
        type: 'rest',
        url : '/globalconfig/baseConfig/sureAdmin',
        headers : {
        	Accept : 'application/json'
        }
    },
    
    getLanguageFile :function (lang){
		var url = Ext.util.Format.format("/js/lib/extlib4/locale/ext-lang-{0}.js", lang);
		if (!Soul.Ajax.loadUrlJs(url))
			Soul.Ajax.loadUrlJs(Ext.util.Format.format("/js/lib/extlib4/locale/ext-lang-{0}.js", this.defaultLanguage));
		var url1 = Ext.util.Format.format("/locale/{0}/locale.js", lang);
		if (!Soul.Ajax.loadUrlJs(url1))
			Soul.Ajax.loadUrlJs(Ext.util.Format.format("/locale/{0}/locale.js", this.defaultLanguage));
		var url2 = Ext.util.Format.format("/locale/{0}/error.js", lang);
		if (!Soul.Ajax.loadUrlJs(url2))
			Soul.Ajax.loadUrlJs(Ext.util.Format.format("/locale/{0}/error.js", this.defaultLanguage));
	}
});
