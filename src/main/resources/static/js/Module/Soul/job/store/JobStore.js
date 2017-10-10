Ext.define('Module.Soul.job.store.JobStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Soul.job.model.JobModel'
    ],
    
    model     : 'Module.Soul.job.model.JobModel',
    storeId   : 'Module.Soul.job.store.JobStore',
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
        	read: '/api/admin/job/'
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

