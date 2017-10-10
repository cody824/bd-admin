Ext.define('Module.Account.sysRunPara.store.SysRunParaStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Account.sysRunPara.model.SysRunParaModel',
    ],
    
    model     : 'Module.Account.sysRunPara.model.SysRunParaModel',
    storeId   : 'Module.Account.sysRunPara.store.SysRunParaStore',
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
        	read: '/account/SysRunParas/'
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
                var sysRunPara = record.data;
                Module.Account.sysRunPara.Operation.getOperationForSysRunPara(sysRunPara);
            });
        }
    }
});