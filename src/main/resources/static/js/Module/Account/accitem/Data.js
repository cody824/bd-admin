Ext.define('Module.Account.accitem.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getUserByName : function(name){
   		var store = Ext.data.StoreManager.lookup("Module.Account.accitem.store.AccitemStore");
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
   	
   	getAccitemById : function(id){
   		var store = Ext.data.StoreManager.lookup("Module.Account.accitem.store.AccitemStore");
   		var rs = store.data.items;
   		var accitem = null;
   		Ext.each(rs, function(r, i, s){
   			if(r.data.accItemId == id){
   				accitem = r.data;
   				return false;
   			}
   		});
   		
   		console.log("getAccitemById");
   		console.log(accitem);
   		return accitem;
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