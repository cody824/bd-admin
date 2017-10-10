Ext.define('Module.Account.sysAccCheck.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox'
	],
	
	getOperationForChecking : function(checking){
		checking.httpParams = new Object();
		checking.httpMethod = new Object();
		checking.requestBody = new Object();
		checking.methodConfirm = new Object();
		checking.methodConfirm["lockCheckingFunc"] = {
			"put" : {
				msg : Ext.String.format(ACCOUNT_CHECKING_MESSAGE.confirmLockChecking, checking.checkingName)
			},
			"delete" : {
				msg : Ext.String.format(ACCOUNT_CHECKING_MESSAGE.confirmUnLockChecking, checking.checkingName)
			}	
		};
		if (checking.checkingState == Module.Account.sysAccCheck.model.CheckingModel.LOCKED) {
			checking.httpMethod["lockCheckingFunc"] = "delete";
		} else  {
			checking.httpMethod["lockCheckingFunc"] = "put";
		}
	},

	doAddSysAccCheckFunc : function(callbackFun){
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 280,
			defaults: {
				xtype: 'textarea',
				labelAlign: 'right',
				width: 250
			},
			items: [
			Module.Account.sysAccCheck.Tools.getCheckingStateCombo(null),
			Module.Account.sysAccCheck.Tools.getCheckingIsOkCombo(null),
			{
				name: 'checkingDis',
				fieldLabel: ACCOUNT_CHECKING_LABEL.checkingDis
			},{
				name: 'checkingDoDis',
				fieldLabel: ACCOUNT_CHECKING_LABEL.checkingDoDis
			}]
		});

		var win = new Ext.Window({
			title: ACCOUNT_CHECKING_LABEL.addSysAccCheck,
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
					params.checkingType = Module.Account.sysAccCheck.model.CheckingModel.MANUAL;
					Soul.Ajax.restAction('/account/sysAccCheck', 'post', Ext.encode(params), null, callbackFun, null, null);

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

	doProcessSysAccCheckFunc : function(data, callbackFun){
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 280,
			defaults: {
				xtype: 'textarea',
				labelAlign: 'right',
				width: 250
			},
			items: [
			Module.Account.sysAccCheck.Tools.getCheckingStateCombo(data.checkingState),
			{
				name: 'checkingDis',
				fieldLabel: ACCOUNT_CHECKING_LABEL.checkingDis,
				value: data.checkingDis,
				readOnly: true,
				disabled: true,
			},{
				name: 'checkingDoDis',
				fieldLabel: ACCOUNT_CHECKING_LABEL.checkingDoDis,
				value: data.checkingDoDis
			}]
		});

		var win = new Ext.Window({
			title: ACCOUNT_CHECKING_LABEL.processSysAccCheck,
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
