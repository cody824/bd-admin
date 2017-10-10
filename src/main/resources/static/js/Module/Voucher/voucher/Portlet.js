Ext.define('Module.Voucher.voucher.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Voucher.voucher.Operation',
		'Module.Voucher.voucher.Data',
		'Module.Voucher.voucher.store.VoucherStore'
 	],
 		
 	VIEW : {
		'Module.Voucher.voucher.view.Grid' : LABEL.grid
	},
    
	title: VOUCHER_VOUCHER_LABEL.voucherInfo,
			
	iconCls : 'md-voucher',
	
	moduleName : 'Module.Voucher.voucher',
    
    moduleSessionView : 'Module.Voucher.voucherCurrentView',
    
    dataObj : Module.Voucher.voucher.Data,
    
    configObj : Module.Voucher.voucher.Config,
	
    defaultView : 'Module.Voucher.voucher.view.Grid',
	
    supportView :['Module.Voucher.voucher.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	buildVoucherOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'voucheroperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: VOUCHER_VOUCHER_LABEL.addVoucher,
					disabled: false,
					name: 'addVoucher',
					iconCls: 'x-add-icon'
				},{
	        		text: VOUCHER_VOUCHER_LABEL.editVoucher,
					disabled: true,
					name: 'editVoucher',
					iconCls: 'extensive-edit'
				},{
	        		text: VOUCHER_VOUCHER_LABEL.stopVoucher,
					disabled: true,
					name: 'stoppedVoucher',
					iconCls: 'x-del-icon'
				},{
	        		text: VOUCHER_VOUCHER_LABEL.forcestopVoucher,
					disabled: true,
					name: 'forcestoppedVoucher',
					iconCls: 'x-del-icon'
				},{
	        		text: VOUCHER_VOUCHER_LABEL.manageVoucherBill,
					disabled: true,
					name: 'manageVoucherBill',
					iconCls: 'extensive-edit'
				},{
	        		text: VOUCHER_VOUCHER_LABEL.voucherToUser,
					disabled: true,
					name: 'voucherToUser',
					iconCls: 'x-add-icon'
				},{
	        		text: VOUCHER_VOUCHER_LABEL.voucherToAll,
					disabled: true,
					name: 'voucherToAll',
					iconCls: 'x-add-icon'
				}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		voucherMenu = {
			text: VOUCHER_VOUCHER_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildVoucherOptMenu()
		};
		toolbar.push(voucherMenu);
		return toolbar;
    }
});