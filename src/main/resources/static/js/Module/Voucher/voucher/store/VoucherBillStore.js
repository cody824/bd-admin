Ext.define('Module.Voucher.voucher.store.VoucherBillStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Voucher.voucher.model.VoucherBillModel',
    ],
    
    model     : 'Module.Voucher.voucher.model.VoucherBillModel',
    storeId   : 'Module.Voucher.voucher.store.VoucherBillStore',
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
        	read: '/voucher/voucherBill'
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
				var voucherBill = record.data;
				Module.Voucher.voucher.Operation.getOperationForVoucherBill(voucherBill);
			});
        }
    }
});