Ext.application({

	requires : [],

	name : 'Soul',
	
	controllers : [
	               ],

	appFolder : '/js/lib/Soul',

	launch : function() {
		var cfg = Ext.Loader.getConfig();
		cfg.enabled = true;
		Ext.Loader.setConfig(cfg);
		Ext.Loader.setPath('Ext.ux', '/js/lib/extlib4/js/ux');
		Ext.Loader.setPath('Ext.app', '/js/lib/extlib4/js/classes');
	}

});
