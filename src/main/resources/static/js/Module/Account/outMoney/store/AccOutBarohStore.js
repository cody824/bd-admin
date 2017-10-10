Ext.define('Module.Account.outMoney.store.AccOutBarohStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Account.outMoney.model.AccOutBarohModel',
    ],
    
    model     : 'Module.Account.outMoney.model.AccOutBarohModel',
    storeId   : 'Module.Account.outMoney.store.AccOutBarohStore',
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
        	read: '/account/withdraw/'
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
});