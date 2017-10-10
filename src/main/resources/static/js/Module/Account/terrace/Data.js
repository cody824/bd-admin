Ext.define('Module.Account.terrace.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getTerraceById : function(id){
   		var store = Ext.data.StoreManager.lookup("Module.Account.terrace.store.TerraceStore");
   		var rs = store.data.items;
   		var terrace = null;
   		Ext.each(rs, function(r, i, s){
   			if(r.data.terraceId == id){
   				terrace = r.data;
   				return false;
   			}
   		});
   		
   		return terrace;
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