Ext.define('Module.Soul.MassTask.Tools', {
	singleton: true, 
	
	requires : [
		'Soul.util.ObjectView'
	],

	getMassTaskTypeCombo : function( value){
		var disabled = false;
		var data =MASS_TASK_COMBO.taskType;
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : MASS_TASK_PROPERTY.type,
			labelAlign : 'right',
			name : 'type',
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