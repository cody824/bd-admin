
Ext.define('Soul.util.ObjectConfig', {
	 singleton: true, 
	 
	 getConfigFromPanel : function (configItems, setUrl, params, cbFn, config){
		var submitButton = Ext.create('Ext.button.Button', {
			text:LABEL.submit,
			width:40,
			disabled : true,
			handler : function(btn) {
				var obj = Soul.Ajax.getCommonFromSubmitObj(
						setUrl, params, null, cbFn);
				btn.up("form").getForm().submit(obj);
			}
		});
		
		var resetButton = Ext.create('Ext.button.Button', {
			text : LABEL.reset,
			width:40,
			handler : function(btn) {
				btn.up("form").getForm().reset();
			}
		});
	
		var configurable_properties = new Ext.form.Panel( {
			labelWidth : 100,
			margin: '10 10 10 10',
			frame:true,
			bodyStyle:'padding:5px',
			autoDestroy : true,
			defaults : {
				width : 230
			},
			autoHeight:true,
			defaultType : 'textfield',
			items : configItems,
			buttonAlign:'center',
			buttons : [
				submitButton,
				resetButton
			]
		});
		configurable_properties.form.trackResetOnLoad = true,
		configurable_properties.form.on('dirtychange', function(form, isDirty, eOpts){
			if(isDirty)
				configurable_properties.submitButton.setDisabled(false);
			else
				configurable_properties.submitButton.setDisabled(true);
		});
		configurable_properties.submitButton = submitButton;
		configurable_properties.resetButton = resetButton;
		if(config)
			Ext.apply(configurable_properties, config);
		
		return configurable_properties;
	}
});