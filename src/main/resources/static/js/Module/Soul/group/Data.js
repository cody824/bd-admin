Ext.define('Module.Soul.group.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getGroupById  : function(gid){
   		var store = Ext.data.StoreManager.lookup("Module.Soul.group.store.GroupStore");
   		var rs = store.data.items;
   		var group = null;
   		Ext.each(rs, function(r, i, s){
   			if (r.data.id == gid) {
   				group = r.data;
   				return false;
   			}
   		});
   		return group;
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
