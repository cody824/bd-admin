Ext.define('Module.Voucher.scopeCode.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	//生成工具栏平台选择下拉框
	getToolbarTerraceMenu : function(value) {
		var data = VOUCHER_VOUCHER_COMBO.terraceCode;
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : "平台",
			labelAlign : 'right',

			name : 'terraceCode',
			displayField: 'name',
			valueField: 'value',

			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 200,

			typeAhead: true,
			selectOnFocus: true,
			indent: true,
			allowBlank : false,
			editable : false,

			store : store,

			listeners : {
				'select' : function(combo, record, index){
					var data = record[0].data;
					
					VOUCHER_SCOPE_CODE_GLOBAL.currentDomain = data.value;
					var url = '/admin/voucher/' + VOUCHER_SCOPE_CODE_GLOBAL.currentDomain + '/scopeCode';
					var store = Ext.data.StoreManager.lookup("Module.Voucher.scopeCode.store.ScopeCodeStore");
					store.proxy.api = {
						read : url
					};
					store.reload();
				}
			}
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