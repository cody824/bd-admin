Ext.define('Module.Account.log.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getLogById : function(id){
   		var store = Ext.data.StoreManager.lookup("Module.Account.log.store.LogStore");
   		var rs = store.data.items;
   		var log = null;
   		Ext.each(rs, function(r, i, s){
   			if(r.data.id == id){
   				log = r.data;
   				return false;
   			}
   		});
   		
   		return log;
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