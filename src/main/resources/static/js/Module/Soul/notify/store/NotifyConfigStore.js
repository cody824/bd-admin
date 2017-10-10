Ext.define('Module.Soul.notify.store.NotifyConfigStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Soul.notify.model.NotifyConfigModel',
    ],
    
    model     : 'Module.Soul.notify.model.NotifyConfigModel',
    storeId   : 'Module.Soul.notify.store.NotifyConfigStore',
    proxy: {
        type: 'rest',
        appendId : true,
        idParam : 'notifyType',
        headers : {
        	"Content-Type": "application/json; charset=utf-8", 
        	Accept : 'application/json'
        },
        extraParams : {
        	filter : {}
        },
        api: {
        	create: '/notifyConfig/',
        	read: '/notifyConfig/',
        	update : '/notifyConfig/',
        	destroy : '/notifyConfig/'
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
    }
});

