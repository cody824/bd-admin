Ext.define('Module.CMS.dictionary.store.DictionaryItemStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.CMS.dictionary.model.DictionaryItemModel',
    ],
    
    model     : 'Module.CMS.dictionary.model.DictionaryItemModel',
    storeId   : 'Module.CMS.dictionary.store.DictionaryItemStore',
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
        	read: ''
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
				var DictionaryItem = record.data;
				Module.CMS.dictionary.Operation.getOperationForDictionaryItem(DictionaryItem);
			});
        }
    }
});