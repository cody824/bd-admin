Ext.define('Module.Account.accitem.store.AccitemStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Account.accitem.model.AccitemModel',
    ],
    
    model     : 'Module.Account.accitem.model.AccitemModel',
    storeId   : 'Module.Account.accitem.store.AccitemStore',
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
        	read: '/account/accitem/'
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
        	Ext.each(records, function(record, index, itself){
				var accitem = record.data;
				Module.Account.accitem.Operation.getOperationForAccitem(accitem);
			});
        }
    }
});