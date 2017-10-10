Ext.define('Module.Account.InMoney.model.AccInBarohStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Account.InMoney.model.AccInBarohModel',
    ],
    
    model     : 'Module.Account.InMoney.model.AccInBarohModel',
    storeId   : 'Module.Account.InMoney.store.AccInBarohStore',
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
        	read: '/account/deposit'
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
   
});