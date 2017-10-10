Ext.define('Module.Account.ledger.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getLedgerById : function(id){
   		var store = Ext.data.StoreManager.lookup("Module.Account.ledger.store.LedgerStore");
   		var rs = store.data.items;
   		var ledger = null;
   		Ext.each(rs, function(r, i, s){
   			if(r.data.terraceId == id){
   				ledger = r.data;
   				return false;
   			}
   		});
   		
   		return ledger;
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