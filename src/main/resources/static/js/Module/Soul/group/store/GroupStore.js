Ext.define('Module.Soul.group.store.GroupStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Soul.group.model.GroupModel',
    ],
    
    model     : 'Module.Soul.group.model.GroupModel',
    storeId   : 'Module.Soul.group.store.GroupStore',
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
        	read: '/suresecurity/group/'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty : 'total'
        },
        listeners:{
            exception:function( theproxy, response, operation, options ){
            	if(window.console){console.log(operation);}
            	Soul.util.MessageUtil.parseResponse(response);
            }
        }
    }, 
    remoteSort: true,
    listeners:{
        load : function(store, records, successful, operation, eOpts){
        	Ext.each(records, function(record, index, itself){
				var group = record.data;
				Module.Soul.group.Operation.getOperationForGroup(group);
			});
        }
    }
});

