Ext.define('Module.Account.sysAccCheck.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	getCheckingStateCombo : function(value){
		var data = [['00','无需处理'],['10','待处理'],['20','已处理']];
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ACCOUNT_CHECKING_LABEL.checkingState,
			labelAlign : 'right',

			name : 'checkingState',
			displayField: 'name',
			valueField: 'value',
			
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 250,

			typeAhead: true,
			selectOnFocus: true,
			indent: true,
			allowBlank : false,
			editable : false,

			store : store
		});

		if(value != null){
			combo.setValue(value);
		}
		return combo;
	},

	getCheckingIsOkCombo : function(value){
		var data = [['Y','是'],['N','否']];
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ACCOUNT_CHECKING_LABEL.checkingIsOk,
			labelAlign : 'right',

			name : 'checkingIsOk',
			displayField: 'name',
			valueField: 'value',
			
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 250,

			typeAhead: true,
			selectOnFocus: true,
			indent: true,
			allowBlank : false,
			editable : false,

			store : store
		});

		if(value != null){
			combo.setValue(value);
		}
		return combo;
	},

	showCheckingInEast : function(checkingId){
		var me = this;
		
		var checking = Module.Account.sysAccCheck.Data.getCheckingById(checkingId);
		console.log(checking);
		if (checking != null){
			var property = me.getCheckingPropertyGrid(checking);
			Soul.util.ObjectView.showInEast(property, checking.checkingId);
		}
	},

	getCheckingPropertyGrid : function(checking){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(
				checking,
				Module.Account.sysAccCheck.Config.getRendererConfig(), 
				ACCOUNT_CHECKING_PROPERTY,
				Module.Account.sysAccCheck.Config.showProperties,
				{iconCls : 'md-user'});
		
		// property.on("beforeshow", function(c, eOpts){
		// 	var source = Module.Account.sysAccCheck.Data.getCheckingById(checking.accItemId);
		// 	c.setSource(source);
		// });
		
		return property;
	},
	
	constructor : function() {
        this.callParent(arguments);
    }
});