Ext.define('Module.CMS.advertisement.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getUserByName : function(name){
   		var store = Ext.data.StoreManager.lookup("Module.CMS.advertisement.store.Adv_siteStore");
   		var rs = store.data.items;
   		var user = null;
   		Ext.each(rs, function(r, i, s){
   			if (r.data.name == name) {
   				user = r.data;
   				return false;
   			}
   		});
   		return user;
   	},
   	
   	getSiteById : function(id){
   		var store = Ext.data.StoreManager.lookup("Module.CMS.advertisement.store.Adv_siteStore");
   		var rs = store.data.items;
   		var adv_site = null;
   		Ext.each(rs, function(r, i, s){
   			if (r.data.trade_id == id) {
   				adv_site = r.data;
   				return false;
   			}
   		});
   		return adv_site;
   	},
   	
   	loadData : function(){
   		return;
   	},

   	updateAll : function(fn){
    	var callbackFn = function(){
    		Soul.Ajax.executeFnAfterLoad(fn);
    	};
    	callbackFn();
    },
        
	constructor : function() {
        this.callParent(arguments);
    }
});