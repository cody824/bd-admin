Ext.define('Module.Voucher.userVoucher.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Voucher.userVoucher.Operation',
		'Module.Voucher.userVoucher.Data',
		'Module.Voucher.userVoucher.store.UserVoucherStore'
 	],
 		
 	VIEW : {
		'Module.Voucher.userVoucher.view.Grid' : LABEL.grid
	},
    
	title: VOUCHER_USERVOUCHER_LABEL.userVoucherInfo,
			
	iconCls : 'md-userVoucher',
	
	moduleName : 'Module.Voucher.userVoucher',
    
    moduleSessionView : 'Module.Voucher.userVoucherCurrentView',
    
    dataObj : Module.Voucher.userVoucher.Data,
    
    configObj : Module.Voucher.userVoucher.Config,
	
    defaultView : 'Module.Voucher.userVoucher.view.Grid',
	
    supportView :['Module.Voucher.userVoucher.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	buildUserVoucherOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'userVoucheroperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: VOUCHER_USERVOUCHER_LABEL.lockUserVoucher,
					disabled: true,
					name: 'forceStoppedUserVoucher',
					iconCls: 'x-del-icon'
				}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		userVoucherMenu = {
			text: VOUCHER_USERVOUCHER_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildUserVoucherOptMenu()
		};
		toolbar.push(userVoucherMenu);
		return toolbar;
    }
});