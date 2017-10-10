Ext.define('Module.Voucher.userVoucher.store.UserVoucherStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Voucher.userVoucher.model.UserVoucherModel',
    ],
    
    model     : 'Module.Voucher.userVoucher.model.UserVoucherModel',
    storeId   : 'Module.Voucher.userVoucher.store.UserVoucherStore',
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
        	read: '/voucher/userVoucher'
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
				var userVoucher = record.data;
				Module.Voucher.userVoucher.Operation.getOperationForUserVoucher(userVoucher);
			});
        }
    }
});