Ext.define('Module.Account.ledger.store.RoutingDetailStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Account.ledger.model.RoutingDetailModel',
    ],
    
    model     : 'Module.Account.ledger.model.RoutingDetailModel',
    storeId   : 'Module.Account.ledger.store.RoutingDetailStore',
    sorters: [{
        property: 'routingtime',
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
        	read: '/account/routingDetail'
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