Ext.define('Module.Account.ledger.store.LedgerStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Account.ledger.model.LedgerModel',
    ],
    
    model     : 'Module.Account.ledger.model.LedgerModel',
    storeId   : 'Module.Account.ledger.store.LedgerStore',
    sorters: [{
        property: 'terraceId',
        direction: 'ASC'
    }],
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
        	read: '/account/ledger/'
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
//    remoteSort: true,
//    listeners:{
//        load : function(store, records, successful, operation, eOpts){
//        	Ext.each(records, function(record, index, itself){
//				var ledger = record.data;
//				Module.Account.ledger.Operation.getOperationForLedger(ledger);
//			});
//        }
//    }
});