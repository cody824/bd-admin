Ext.define('Module.CMS.dictionary.store.DictionaryStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.CMS.dictionary.model.DictionaryModel',
    ],
    
    model     : 'Module.CMS.dictionary.model.DictionaryModel',
    storeId   : 'Module.CMS.dictionary.store.DictionaryStore',
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
				var Dictionary = record.data;
				Module.CMS.dictionary.Operation.getOperationForDictionary(Dictionary);
			});
        }
    }
});