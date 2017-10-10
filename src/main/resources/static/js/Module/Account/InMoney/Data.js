Ext.define('Module.Account.InMoney.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getAccInBarohById : function(id){
   		var store = Ext.data.StoreManager.lookup("Module.Account.InMoney.store.AccInBarohStore");
   		var rs = store.data.items;
   		var inbaroh = null;
   		Ext.each(rs, function(r, i, s){
   			if(r.data.inbarohId == id){
   				inbaroh = r.data;
   				return false;
   			}
   		});
   		
   		return inbaroh;
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