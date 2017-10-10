Ext.define('Module.Soul.shortUrl.store.ShortUrlStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Soul.shortUrl.model.ShortUrlModel'
    ],
    
    model     : 'Module.Soul.shortUrl.model.ShortUrlModel',
    storeId   : 'Module.Soul.shortUrl.store.ShortUrlStore',
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
        	read: '/api/shorturl'
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
    }
});

