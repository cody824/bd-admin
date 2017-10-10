Ext.define('Module.Soul.MassTask.store.UserStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Soul.MassTask.model.UserModel',
    ],
    
    model     : 'Module.Soul.MassTask.model.UserModel',
    storeId   : 'Module.Soul.MassTask.store.UserStore',
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
        	read: '/admin/user/all/'
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
    remoteSort: true,
    listeners:{
        load : function(store, records, successful, operation, eOpts){
        }
    }
});

