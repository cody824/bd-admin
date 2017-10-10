Ext.define('Module.Voucher.userVoucher.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getUserVoucherById : function(id){
      var store = Ext.data.StoreManager.lookup("Module.Voucher.userVoucher.store.UserVoucherStore");
      var rs = store.data.items;
      var userVoucher = null;
      Ext.each(rs, function(r, i, s){
      	if(r.data.userVoucherId == id){
      		userVoucher = r.data;
      		return false;
      	}
      });

      return userVoucher;
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