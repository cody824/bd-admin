Ext.define('Module.Account.sysRunPara.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	getSysRunParaTypeCombo : function(value) {
		// var data = [['00','整数'],['10','浮点数'],['20','字符串'],['30','枚举']];
		var data = [['00','整数'],['10','浮点数'],['20','字符串']];
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ACCOUNT_SYSRUNPARA_LABEL.sysRunParaType,
			labelAlign : 'right',

			name : 'sysRunParaType',
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
	
	constructor : function() {
        this.callParent(arguments);
    }
});