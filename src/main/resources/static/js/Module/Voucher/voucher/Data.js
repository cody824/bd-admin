Ext.define('Module.Voucher.voucher.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getVoucherById : function(id){
      var store = Ext.data.StoreManager.lookup("Module.Voucher.voucher.store.VoucherStore");
      var rs = store.data.items;
      var voucher = null;
      Ext.each(rs, function(r, i, s){
      	if(r.data.voucherId == id){
      		voucher = r.data;
      		return false;
      	}
      });

      return voucher;
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