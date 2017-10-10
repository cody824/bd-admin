Ext.define('Module.Account.accitem.store.ReconciliationStore', {
    singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
        'Module.Account.accitem.model.ReconciliationModel',
    ],
    
    model     : 'Module.Account.accitem.model.ReconciliationModel',
    storeId   : 'Module.Account.accitem.store.ReconciliationStore',
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
            read: '/account/reconciliation'
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
    autoload: true
});