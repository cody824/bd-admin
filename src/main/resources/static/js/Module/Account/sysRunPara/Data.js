Ext.define('Module.Account.sysRunPara.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getSysRunParaById : function(id){
   		var store = Ext.data.StoreManager.lookup("Module.Account.sysRunPara.store.SysRunParaStore");
   		var rs = store.data.items;
   		var sysRunPara = null;
   		Ext.each(rs, function(r, i, s){
   			if(r.data.sysRunParaId == id){
   				sysRunPara = r.data;
   				return false;
   			}
   		});
   		
   		return sysRunPara;
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