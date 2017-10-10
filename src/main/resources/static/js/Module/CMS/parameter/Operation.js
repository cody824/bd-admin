Ext.define('Module.CMS.parameter.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.CMS.parameter.Tools',
		
	],

	views : [
		
	],
	
	doEditParamFunction : function(record, store) {
		var configType = Module.CMS.parameter.Tools.getCurrentConfigType('paramtype');
		var currentTab = Module.CMS.parameter.Tools.getCurrentTab('param-panel');
		var settingName = currentTab.title;

		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'key',
				fieldLabel: PARAMETER_MANAGE_LABEL.paramKey,
				value: record.data.key,
				xtype: 'displayfield',
				submitValue: true,
			},{
				name: 'value',
				fieldLabel: PARAMETER_MANAGE_LABEL.paramValue,
				value: record.data.value,
			},{
				name: 'paramName',
				fieldLabel: PARAMETER_MANAGE_LABEL.paramName,
				value: record.data.paramName,
			}]
		});

		var win = new Ext.Window({
			title: PARAMETER_MANAGE_LABEL.editparam,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.save,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

					var nameConfig = {};
					nameConfig['key'] = params['key'];
					nameConfig['paramName'] = params['paramName'];
					Soul.Ajax.restAction('/globalconfig/nameConfig', 'put', nameConfig, nameConfig, function(ret){
					}, null, null);

					var paramConfig = {};
					paramConfig['key'] = params['key'];
					paramConfig['value'] = params['value'];
					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/globalconfig/'+configType+'/'+settingName, 
						'put', paramConfig, paramConfig, function(ret){
							var idx = store.indexOf(record);
							store.remove(store.getAt(idx));
							store.insert(idx, params);
							
							win.close();
						}, null, null);
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	},

	doAddParamFunction : function(store) {
		var configType = Module.CMS.parameter.Tools.getCurrentConfigType('paramtype');
		var currentTab = Module.CMS.parameter.Tools.getCurrentTab('param-panel');
		var settingName = currentTab.title;

		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'key',
				fieldLabel: PARAMETER_MANAGE_LABEL.paramKey,
			},{
				name: 'value',
				fieldLabel: PARAMETER_MANAGE_LABEL.paramValue,
			},{
				name: 'paramName',
				fieldLabel: PARAMETER_MANAGE_LABEL.paramName,
			}]
		});

		var win = new Ext.Window({
			title: PARAMETER_MANAGE_LABEL.addparam,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.save,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

					var nameConfig = {};
					nameConfig['key'] = params['key'];
					nameConfig['paramName'] = params['paramName'];
					Soul.Ajax.restAction('/globalconfig/nameConfig', 'put', nameConfig, nameConfig, function(ret){
					}, null, null);

					var paramConfig = {};
					paramConfig['key'] = params['key'];
					paramConfig['value'] = params['value'];
					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/globalconfig/'+configType+'/'+settingName, 
						'put', paramConfig, paramConfig, function(ret){
							var idx = store.getCount();
							for (var i = 0; i < idx; i++) {
								if (store.getAt(i).get('key') == params['key']) {
									Ext.Msg.alert(Ext.String.format(PARAMETER_MESSAGE.isExist, params['key']));
									return;
								}
							}
							store.insert(idx, params);
							
							win.close();
						}, null, null);
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	},

	doDelParamFunction : function(record, store) {
		var configType = Module.CMS.parameter.Tools.getCurrentConfigType('paramtype');
		var currentTab = Module.CMS.parameter.Tools.getCurrentTab('param-panel');
		var settingName = currentTab.title;

		var nameConfig = {};
		nameConfig['key'] = record.data.key;
		Soul.Ajax.restAction('/globalconfig/nameConfig', 'delete', nameConfig, nameConfig, function(ret){
		}, null, null);

		var paramConfig = {};
		paramConfig['key'] = record.data.key;
		paramConfig['value'] = record.data.value;

		Ext.Msg.confirm('', Ext.String.format(PARAMETER_MESSAGE.sureDelete, record.data.key), function(button, text) {
			if (button == "yes") {
				Soul.Ajax.restAction('/globalconfig/'+configType+'/'+settingName, 
						'delete', paramConfig, paramConfig, function(ret){
					var idx = store.indexOf(record);
					store.remove(store.getAt(idx));
				
				}, null, null);
			}
		});
	},
});