Ext.define('Soul.store.LanguageStore', {
    extend    : 'Ext.data.Store',
    singleton : true,
    requires  : ['Soul.model.LanguageModel', 'Soul.config.BaseConfig'],

    model     : 'Soul.model.LanguageModel',
//    storeId   : 'MyApp.stores.UserStore',

    proxy: {
        type: 'memory',
        data : Soul.config.BaseConfig.supportLanguage
	},
    
    constructor : function() {
        this.callParent(arguments);
    }
});