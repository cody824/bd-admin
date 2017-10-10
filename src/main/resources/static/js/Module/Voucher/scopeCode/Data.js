Ext.define('Module.Voucher.scopeCode.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getScopeCodeById : function(id){
      var store = Ext.data.StoreManager.lookup("Module.Voucher.scopeCode.store.ScopeCodeStore");
      var rs = store.data.items;
      var scopeCode = null;
      Ext.each(rs, function(r, i, s){
      	if(r.data.scopeCodeId == id){
      		scopeCode = r.data;
      		return false;
      	}
      });

      return scopeCode;
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