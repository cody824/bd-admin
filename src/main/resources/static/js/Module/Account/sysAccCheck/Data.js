Ext.define('Module.Account.sysAccCheck.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getCheckingById : function(id){
   		var store = Ext.data.StoreManager.lookup("Module.Account.sysAccCheck.store.CheckingStore");
   		var rs = store.data.items;
   		var checking = null;
   		Ext.each(rs, function(r, i, s){
   			if(r.data.checkingId == id){
   				checking = r.data;
   				return false;
   			}
   		});
   		
   		return checking;
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