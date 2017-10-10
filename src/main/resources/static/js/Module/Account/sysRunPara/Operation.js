Ext.define('Module.Account.sysRunPara.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox'
	],

	getOperationForSysRunPara : function(sysRunPara){
		sysRunPara.httpParams = new Object();
		sysRunPara.httpMethod = new Object();
		sysRunPara.requestBody = new Object();
		sysRunPara.methodConfirm = new Object();
		sysRunPara.methodConfirm["deletedPara"] = {
			"put" : {
				msg : Ext.String.format(ACCOUNT_SYSRUNPARA_MESSAGE.confirmDeleteSysRunPara, sysRunPara.data.sysRunParaName)
			}
		};
		
		sysRunPara.httpMethod["deletedPara"] = "put";
	},

	doAddSysRunParaFunction : function(callbackFun) {
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
				name: 'sysRunParaName',
				fieldLabel: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaName,
				allowBlank: false,
				blankText: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaName_blankText
			},{
				name: 'sysRunParaCode',
				fieldLabel: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaCode,
				allowBlank: false,
				blankText: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaCode_blankText
			},
			Module.Account.sysRunPara.Tools.getSysRunParaTypeCombo(null),
			{
				name: 'sysRunParaValue',
				fieldLabel: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaValue,
				allowBlank: false,
				blankText: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaValue_blankText,
				vtype : 'sysRunParaValue',
				vtypeText : '格式不正确'
			},{
				name: 'sysRunParaNote',
				xtype: 'textarea',
				fieldLabel: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaNote
			}]
		});

		Ext.apply(Ext.form.VTypes, {
			sysRunParaValue: function (value, field) {
				var type = field.up('form').down('field[name=sysRunParaType]').getValue();
				if(type == '00'){	//整数
					if (/^(0|[1-9][0-9]*)$/.test(value)){
						return true;
					}else{
						return false;
					}
				}else if(type == '10'){		//浮点数
					if(/^(0|[1-9][0-9]*)(\.\d+)?$/.test(value)){
						return true;
					}else{
						return false;
					}
				}else if(type == '20'){		//字符串
					return true;
				}
			}
		});

		var win = new Ext.Window({
			title: ACCOUNT_SYSRUNPARA_LABEL.addSysRunPara,
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
					Soul.Ajax.restAction('/account/SysRunPara', 'post', Ext.encode(params), null, callbackFun, null, null);
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

	doEditSysRunParaFunction : function(data, callbackFun) {
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
				name: 'sysRunParaName',
				fieldLabel: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaName,
				value: data.sysRunParaName,
				allowBlank: false,
				blankText: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaName_blankText
			},{
				name: 'sysRunParaCode',
				fieldLabel: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaCode,
				value: data.sysRunParaCode,
				readOnly: true,
				disabled: true,
				allowBlank: false,
				blankText: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaCode_blankText
			},
			Module.Account.sysRunPara.Tools.getSysRunParaTypeCombo(null),
			{
				name: 'sysRunParaValue',
				fieldLabel: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaValue,
				value: data.sysRunParaValue,
				allowBlank: false,
				blankText: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaValue_blankText,
				vtype : 'sysRunParaValue',
				vtypeText : '格式不正确'
			},{
				name: 'sysRunParaNote',
				xtype: 'textarea',
				fieldLabel: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaNote,
				value: data.sysRunParaName,
			}]
		});

		Ext.apply(Ext.form.VTypes, {
			sysRunParaValue: function (value, field) {
				var type = field.up('form').down('field[name=sysRunParaType]').getValue();
				if(type == '00'){	//整数
					if (/^(0|[1-9][0-9]*)$/.test(value)){
						return true;
					}else{
						return false;
					}
				}else if(type == '10'){		//浮点数
					if(/^(0|[1-9][0-9]*)(\.\d+)?$/.test(value)){
						return true;
					}else{
						return false;
					}
				}else if(type == '20'){		//字符串
					return true;
				}
			}
		});

		var win = new Ext.Window({
			title: ACCOUNT_SYSRUNPARA_LABEL.addSysRunPara,
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
					// Soul.Ajax.restAction('account/sysRunPara/'+data.sysRunParaId, 'put', Ext.encode(params), null, callbackFun, null, null);
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
	},

	doDeleteSysRunParaFunction : function(records, callbackFn){
		var requestBody = [];
		var confirmBody = [];
		Ext.each(records, function(r, i, rs){
			requestBody.push(r.data.sysRunParaId);
			confirmBody.push(r.data.sysRunParaName);
		});
		var method = "put";
		var sysRunPara = records[0].data;
		var confirm = {
			"put" : {
				msg : Ext.String.format(ACCOUNT_SYSRUNPARA_MESSAGE.confirmDeleteSysRunPara, confirmBody)
			}
		};
		
		Soul.Ajax.confirmRestAction(sysRunPara.links.deletedParas, method, {}, requestBody,  callbackFn, null, null, confirm);
	}
});