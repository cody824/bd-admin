Ext.define('Module.Account.terrace.store.TerraceStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Account.terrace.model.TerraceModel',
    ],
    
    model     : 'Module.Account.terrace.model.TerraceModel',
    storeId   : 'Module.Account.terrace.store.TerraceStore',
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
        	read: '/account/terrace/'
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
				var terrace = record.data;
				Module.Account.terrace.Operation.getOperationForTerrace(terrace);
			});
        }
    }
});