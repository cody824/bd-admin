Ext.define('Module.Voucher.scopeCode.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sascopdecodeportlet',
	
	requires  : [
		'Module.Voucher.scopeCode.Operation',
		'Module.Voucher.scopeCode.Data',
		'Module.Voucher.scopeCode.store.ScopeCodeStore'
 	],
 		
 	VIEW : {
		'Module.Voucher.scopeCode.view.Grid' : LABEL.grid
	},
    
	title: VOUCHER_SCOPE_CODE_LABEL.scopeCodeInfo,
			
	iconCls : 'md-scopeCode',
	
	moduleName : 'Module.Voucher.scopeCode',
    
    moduleSessionView : 'Module.Voucher.scopeCodeCurrentView',
    
    dataObj : Module.Voucher.scopeCode.Data,
    
    configObj : Module.Voucher.scopeCode.Config,
	
    defaultView : 'Module.Voucher.scopeCode.view.Grid',
	
    supportView :['Module.Voucher.scopeCode.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	buildVoucherScopeCodeOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'scopecodeoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: VOUCHER_SCOPE_CODE_LABEL.addScopeCode,
					disabled: false,
					name: 'addScopeCode',
					iconCls: 'x-add-icon'
				},{
	        		text: VOUCHER_SCOPE_CODE_LABEL.updateScopeCode,
					disabled: true,
					name: 'updateScopeCode',
					iconCls: 'extensive-edit'
				},{
	        		text: VOUCHER_SCOPE_CODE_LABEL.enableScopeCode,
					disabled: true,
					name: 'enableScopeCode',
					iconCls: 'x-active-icon'
				},{
					text: VOUCHER_SCOPE_CODE_LABEL.disableScopeCode,
					disabled: true,
					name: 'disableScopeCode',
					iconCls: 'unsupport'
				},{
	        		text: VOUCHER_SCOPE_CODE_LABEL.delScopeCode,
					disabled: true,
					name: 'delScopeCode',
					iconCls: 'x-del-icon'
				}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		scopeCodeMenu = {
			text: VOUCHER_SCOPE_CODE_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildVoucherScopeCodeOptMenu()
		};
		selectTerrace = Module.Voucher.scopeCode.Tools.getToolbarTerraceMenu('yearbook');
		toolbar.push(scopeCodeMenu);
		toolbar.push(selectTerrace);
		return toolbar;
    }
});