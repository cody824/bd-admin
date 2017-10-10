Ext.define('Module.Account.ledger.store.FundHistoryStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Account.ledger.model.FundHistoryModel',
    ],
    
    model     : 'Module.Account.ledger.model.FundHistoryModel',
    storeId   : 'Module.Account.ledger.store.FundHistoryStore',
    sorters: [{
        property: 'fundtime',
        direction: 'DESC'
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
        	read: '/account/fundHistory'
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
    }
});