Ext.define('Module.Soul.role.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getRoleByName : function(name){
   	//装载相关数据，此类相当于model----通过id来获取一个注册的Store
   		var store = Ext.data.StoreManager.lookup("Module.Soul.role.store.RoleStore"); 
   		var rs = store.data.items;
   		var role = null;
   		Ext.each(rs, function(r, i, s){
   			if (r.data.name == name) {
   				role = r.data;
   				return false;
   			}
   		});
   		return role;
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
