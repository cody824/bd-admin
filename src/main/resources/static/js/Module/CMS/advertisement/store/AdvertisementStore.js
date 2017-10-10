Ext.define('Module.CMS.advertisement.store.AdvertisementStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.CMS.advertisement.model.AdvertisementModel',
    ],
    
    model     : 'Module.CMS.advertisement.model.AdvertisementModel',
    storeId   : 'Module.CMS.advertisement.store.AdvertisementStore',
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
				var Advertisement = record.data;
				Module.CMS.advertisement.Operation.getOperationForAdvertisement(Advertisement);
			});
        }
    }
});