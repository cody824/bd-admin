Ext.define('Module.CMS.advertisement.store.Adv_siteStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.CMS.advertisement.model.Adv_siteModel',
    ],
    
    model     : 'Module.CMS.advertisement.model.Adv_siteModel',
    storeId   : 'Module.CMS.advertisement.store.Adv_siteStore',
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
        	read: '/common/adv_site/'
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
				var Adv_site = record.data;
				Module.CMS.advertisement.Operation.getOperationForAdv_site(Adv_site);
			});
        }
    }
});