Ext.define('Module.Account.sysAccCheck.store.CheckingStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Account.sysAccCheck.model.CheckingModel',
    ],
    
    model     : 'Module.Account.sysAccCheck.model.CheckingModel',
    storeId   : 'Module.Account.sysAccCheck.store.CheckingStore',
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
        	read: '/account/sysAccCheck/'
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
				var checking = record.data;
				Module.Account.sysAccCheck.Operation.getOperationForChecking(checking);
			});
        }
    }
});