Ext.define('Module.Soul.role.store.RoleStore', {//此类为ajax请求后台取得数据，并进行装载
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Soul.role.model.RoleModel',
    ],
    
    model     : 'Module.Soul.role.model.RoleModel',
    storeId   : 'Module.Soul.role.store.RoleStore',
    proxy: {
        type: 'rest',
        headers : {
        	"Content-Type": "application/json; charset=utf-8", 
        	Accept : 'application/json'
        },
        extraParams : {
        	filter : {}
        },
        api: {
        	read: '/suresecurity/role/'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty : 'total'
        },
        listeners:{
            exception:function( theproxy, response, operation, options ){
            	Soul.util.MessageUtil.parseResponse(response);
            }
        }
    }, 
    remoteSort: true
//    listeners:{//操作监听
//        load : function(store, records, successful, operation, eOpts){
//        	Ext.each(records, function(record, index, itself){
//				var role = record.data;
//				Module.Soul.role.Operation.getOperationForRole(role);//此方法类是用来执行相关操作      增删改查
//			});
//        }
//    }
});

