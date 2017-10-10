Ext.define('Module.Account.terrace.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Account.terrace.Tools'
	],
	
	getOperationForTerrace : function(terrace){
		terrace.httpParams = new Object();
		terrace.httpMethod = new Object();
		terrace.requestBody = new Object();
		terrace.methodConfirm = new Object();
		terrace.methodConfirm["lockedTerrace"] = {
			"put" : {
				msg : Ext.String.format(ACCOUNT_TERRACE_MESSAGE.confirmLockTerrace, terrace.terraceName)
			},
			"delete" : {
				msg : Ext.String.format(ACCOUNT_TERRACE_MESSAGE.confirmUnLockTerrace, terrace.terraceName)
			}	
		};
		if (terrace.terraceState == Module.Account.terrace.model.TerraceModel.LOCKED) {
			terrace.httpMethod["lockedTerrace"] = "delete";
		} else  {
			terrace.httpMethod["lockedTerrace"] = "put";
		}
	},
	
	doLockTerraceFunction : function(records, callbackFn){
		var requestBody = [];
		var confirmBody = [];
		Ext.each(records, function(r, i, rs){
			confirmBody.push(r.data.terraceName);
			requestBody.push(r.data.terraceId);
		});
		var method = "put";
		var terrace = records[0].data;
		var confirm = {
			"put" : {
				msg : Ext.String.format(ACCOUNT_TERRACE_MESSAGE.confirmLockTerrace, confirmBody)
			},
			"delete" : {
				msg : Ext.String.format(ACCOUNT_TERRACE_MESSAGE.confirmUnLockTerrace, confirmBody)
			}
		};
		if (terrace.terraceState == Module.Account.terrace.model.TerraceModel.LOCKED) {
			method = "delete";
		};
		
		Soul.Ajax.confirmRestAction(terrace.links.lockedTerraces, method, null, requestBody,  callbackFn, null, null, confirm);
	},

	doAddTerraceFunction : function(callbackFun) {
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 280,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 250
			},
			items: [{
				name: 'terraceName',
				fieldLabel: ACCOUNT_TERRACE_LABEL.terraceName,
				allowBlank: false,
				blankText: ACCOUNT_TERRACE_LABEL.terraceName_blankText
			},{
				name: 'terraceCode',
				fieldLabel: ACCOUNT_TERRACE_LABEL.terraceCode,
				allowBlank: false,
				blankText: ACCOUNT_TERRACE_LABEL.terraceCode_blankText
			},
			Module.Account.terrace.Tools.getTerraceStateCombo(null),
			Module.Account.terrace.Tools.getTerraceLevelCombo(null)
			]
		});

		var win = new Ext.Window({
			title: ACCOUNT_TERRACE_LABEL.addTerrace,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.apply,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();
					params.creatName = 'admin';

					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/account/terrace', 'post', Ext.encode(params), null, callbackFun, null, null);
					win.close();
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

	doEditTerraceFunction : function(data, callbackFun) {
		console.log(data);
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 280,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 250
			},
			items: [{
				name: 'terraceName',
				fieldLabel: ACCOUNT_TERRACE_LABEL.terraceName,
				readOnly: true,
				disabled: true,
				value: data.terraceName,
				allowBlank: false,
				blankText: ACCOUNT_TERRACE_LABEL.terraceName_blankText
			},{
				name: 'terraceCode',
				fieldLabel: ACCOUNT_TERRACE_LABEL.terraceCode,
				readOnly: true,
				disabled: true,
				value: data.terraceCode,
				allowBlank: false,
				blankText: ACCOUNT_TERRACE_LABEL.terraceCode_blankText
			},
			Module.Account.terrace.Tools.getTerraceStateCombo(data.terraceState),
			Module.Account.terrace.Tools.getTerraceLevelCombo(data.accItemLevel),
			{
				name: 'accItemCode',
				fieldLabel: ACCOUNT_TERRACE_LABEL.accItemCode,
				value: data.accItemCode
			},{
				name: 'accItemCodeGuarantee',
				fieldLabel: ACCOUNT_TERRACE_LABEL.accItemCodeGuarantee,
				value: data.accItemCodeGuarantee
			},{
				name: 'accItemCode01',
				fieldLabel: ACCOUNT_TERRACE_LABEL.accItemCode01,
				value: data.accItemCode01
			},{
				name: 'accItemCode02',
				fieldLabel: ACCOUNT_TERRACE_LABEL.accItemCode02,
				value: data.accItemCode02
			},{
				name: 'accItemCode03',
				fieldLabel: ACCOUNT_TERRACE_LABEL.accItemCode03,
				value: data.accItemCode03
			}]
		});

		var win = new Ext.Window({
			title: ACCOUNT_TERRACE_LABEL.editTerrace,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.apply,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();
					params.terraceId = data.terraceId;
					params.terraceDate = data.terraceDate;
					params.creatName = data.creatName;

					Soul.Ajax.restAction(data.links.update, 'put', Ext.encode(params), null, callbackFun, null, null);
					win.close();
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	}
});
