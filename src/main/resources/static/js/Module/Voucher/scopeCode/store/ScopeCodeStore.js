Ext.define('Module.Voucher.scopeCode.store.ScopeCodeStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Voucher.scopeCode.model.ScopeCodeModel'
    ],
    model     : 'Module.Voucher.scopeCode.model.ScopeCodeModel',
    storeId   : 'Module.Voucher.scopeCode.store.ScopeCodeStore',
    domain : 'yearbook',
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
            // read: '/common/dictionaryItem/' + VOUCHER_SCOPE_CODE_GLOBAL.currentDomain + '/VoucherScopeCode'
            read: '/admin/voucher/' + VOUCHER_SCOPE_CODE_GLOBAL.currentDomain + '/scopeCode'
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