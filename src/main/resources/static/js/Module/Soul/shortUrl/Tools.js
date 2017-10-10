Ext.define('Module.Soul.shortUrl.Tools', {
	singleton: true, 
	
	requires : [
		'Soul.util.ObjectView'
	],
	
	
	getShortUrlStatusCombo : function( value){
		var disabled = false;
		var data =SHORTURL_COMBO.status;
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : SHORTURL_LABEL.status,
			labelAlign : 'right',
			name : 'status',
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
			disabled: disabled,

			store : store
		});

		if(value != null){
			combo.setValue(value);
		}
		return combo;
	},
	
	getShortUrlModeCombo : function( value){
		var disabled = false;
		var data =SHORTURL_COMBO.mode;
	
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : SHORTURL_LABEL.mode,
			labelAlign : 'right',
			name : 'mode',
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
			disabled: disabled,

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