Ext.define('Module.Voucher.voucher.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Voucher.voucher.Tools'
	],

	/**
	 * 获取 使用范围CODE数据
	 * @return {}
	 */
	scopeCodeDataFunction:function(){
		var url = '/admin/voucher/' + VOUCHER_VOUCHER_GLOBAL.currentDomain + '/scopeCode/dictInfo';
		var scopeCodeData = Soul.Ajax.getSyncData(url, null);
		return scopeCodeData;
	},
	
	getOperationForVoucher : function(voucher){
		voucher.httpParams = new Object();
		voucher.httpMethod = new Object();
		voucher.requestBody = new Object();
		voucher.methodConfirm = new Object();

		voucher.methodConfirm["stoppedVoucher"] = {
			"put" : {
				msg : Ext.String.format(VOUCHER_VOUCHER_MESSAGE.confirmStopVoucher, voucher.voucherName)
			},
			"delete" : {
				msg : Ext.String.format(VOUCHER_VOUCHER_MESSAGE.confirmUnstopVoucher, voucher.voucherName)
			}
		};
		voucher.methodConfirm["forcestoppedVoucher"] = {
			"put" : {
				msg : Ext.String.format(VOUCHER_VOUCHER_MESSAGE.confirmForceStopVoucher, voucher.voucherName)
			}
		};
		if (voucher.voucherStatus == "30") {
			voucher.httpMethod["stoppedVoucher"] = "delete";
		} else  {
			voucher.httpMethod["stoppedVoucher"] = "put";
		};
		voucher.httpMethod["forcestoppedVoucher"] = "put";
	},

	getOperationForVoucherBill : function(voucherBill){
		voucherBill.httpParams = new Object();
		voucherBill.httpMethod = new Object();
		voucherBill.requestBody = new Object();
		voucherBill.methodConfirm = new Object();
	},

	doAddVoucherFunction : function(callbackFun) {
		Ext.apply(Ext.form.VTypes, {
			dateValue: function (value, field) {
				var start = field.up('form').down('field[name=voucherStartTime]');
				var end = field.up('form').down('field[name=voucherEndTime]');

				if(start == null || end == null){
					return true;
				}

				if(start.getValue() > end.getValue()){
					return false;
				}else{
					return true;
				}
			}
		});

		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 600,
			frame: true,
			layout: {
				type: 'column'
			},
			items:[{
				xtype: 'container',
				columnWidth : .50,
				autoHeight : true,
				defaults: {
					xtype: 'textfield',
					labelAlign: 'right',
					width: 250
				},
				items:[{
					name: 'voucherName',
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherName,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.voucherName + VOUCHER_VOUCHER_LABEL.blankText
				},
				Module.Voucher.voucher.Tools.getTerraceCodeCombo('add', 'yearbook'),
				Module.Voucher.voucher.Tools.getVoucherTypeCombo('add', '00'),
				Module.Voucher.voucher.Tools.getVoucherIsautoGetCombo('N'),
				Module.Voucher.voucher.Tools.getVoucherStatusCombo('add', '00'),
				{	
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'voucherCount',
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherCount,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.voucherCount + VOUCHER_VOUCHER_LABEL.blankText
				},{
					xtype: 'numberfield',
					allowDecimals: true,
					minValue: 1,
					step: 1,
					name: 'money',
					fieldLabel: VOUCHER_VOUCHER_LABEL.money,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.money + VOUCHER_VOUCHER_LABEL.blankText
				},{
					xtype: 'textarea',
					name: 'note',
					maxLength: 120,
					maxLengthText: '最多输入120个字符',
					fieldLabel: VOUCHER_VOUCHER_LABEL.note,
				}]
			},{
				xtype: 'container',
				columnWidth : .50,
				autoHeight : true,
				defaults: {
					xtype: 'textfield',
					labelAlign: 'right',
					width: 250
				},
				items:[{
					xtype: 'datefield',
					name: 'voucherStartTime',
					format: 'Y-m-d H:i:s',
					minValue: new Date(),
					editable: false,
					allowBlank: false,
					disabled: false,
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherStartTime,
					vtype: 'dateValue',
					vtypeText: '开始时间不能大于截至时间！',
					listeners: {
						change: function(field){
							var end = field.up('form').down('field[name=voucherEndTime]');
							if(end == null) return;
							end.validate();
						}
					}
				},{
					xtype: 'datefield',
					name: 'voucherEndTime',
					format: 'Y-m-d H:i:s',
					minValue: new Date(),
					editable: false,
					allowBlank: false,
					disabled: false,
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherEndTime,
					vtype: 'dateValue',
					vtypeText: '截至时间不能小于开始时间！',
					listeners: {
						change: function(field){
							var start = field.up('form').down('field[name=voucherStartTime]');
							if(start == null) return;
							start.validate();
						},
						select: function(field, value){
							var time = Ext.Date.add(value, Ext.Date.HOUR, 23);
							time = Ext.Date.add(time, Ext.Date.MINUTE, 59);
							time = Ext.Date.add(time, Ext.Date.SECOND, 59);
							field.setValue(time);
						}
					}
				},{
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'days',
					fieldLabel: VOUCHER_VOUCHER_LABEL.days,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.days + VOUCHER_VOUCHER_LABEL.blankText
				},{
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'limitMoney',
					fieldLabel: VOUCHER_VOUCHER_LABEL.limitMoney,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.limitMoney + VOUCHER_VOUCHER_LABEL.blankText
				},{
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'userLimit',
					fieldLabel: VOUCHER_VOUCHER_LABEL.userLimit,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.userLimit + VOUCHER_VOUCHER_LABEL.blankText
				},
				Module.Voucher.voucher.Tools.getVoucherScopeCodeCombo(null),
				{
					xtype: 'textarea',
					name: 'voucherScopeNote',
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherScopeNote,
					readOnly: true,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.voucherScopeNote + VOUCHER_VOUCHER_LABEL.blankText
				}]
			}]
		});

		var win = new Ext.Window({
			title: VOUCHER_VOUCHER_LABEL.addVoucher,
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
					params['note'] = params['note'].replace(new RegExp('%','gm'),'%25');
					params['voucherName'] = params['voucherName'].replace(new RegExp('%','gm'),'%25');
					params['voucherScopeNote'] = params['voucherScopeNote'].replace(new RegExp('%','gm'),'%25');

					Soul.Ajax.restAction('/voucher', 'post', Ext.encode(params), null, callbackFun, null, null);
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

	doEditVoucherFunction : function(data, callbackFun) {
		Ext.apply(Ext.form.VTypes, {
			dateValue: function (value, field) {
				var start = field.up('form').down('field[name=voucherStartTime]');
				var end = field.up('form').down('field[name=voucherEndTime]');

				if(start == null || end == null){
					return true;
				}

				if(start.getValue() > end.getValue()){
					return false;
				}else{
					return true;
				}
			}
		});

		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 600,
			frame: true,
			layout: {
				type: 'column'
			},
			items:[{
				xtype: 'container',
				columnWidth : .50,
				autoHeight : true,
				defaults: {
					xtype: 'textfield',
					labelAlign: 'right',
					width: 250
				},
				items:[{
					name: 'voucherName',
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherName,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.voucherName + VOUCHER_VOUCHER_LABEL.blankText,
					value: data.voucherName
				},
				Module.Voucher.voucher.Tools.getTerraceCodeCombo('edit', data.terraceCode),
				Module.Voucher.voucher.Tools.getVoucherTypeCombo('edit', data.voucherType),
				Module.Voucher.voucher.Tools.getVoucherIsautoGetCombo(data.isAutoGet),
				Module.Voucher.voucher.Tools.getVoucherStatusCombo('edit', data.voucherStatus),
				{	
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'voucherCount',
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherCount,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.voucherCount + VOUCHER_VOUCHER_LABEL.blankText,
					value: data.voucherCount
				},{
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'money',
					fieldLabel: VOUCHER_VOUCHER_LABEL.money,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.money + VOUCHER_VOUCHER_LABEL.blankText,
					value: data.money
				},{
					xtype: 'textarea',
					name: 'note',
					maxLength: 120,
					maxLengthText: '最多输入120个字符',
					fieldLabel: VOUCHER_VOUCHER_LABEL.note,
					value: data.note
				}]
			},{
				xtype: 'container',
				columnWidth : .50,
				autoHeight : true,
				defaults: {
					xtype: 'textfield',
					labelAlign: 'right',
					width: 250
				},
				items:[{
					xtype: 'datefield',
					name: 'voucherStartTime',
					format: 'Y-m-d H:i:s',
					// minValue: new Date(),
					editable: false,
					allowBlank: false,
					disabled: false,
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherStartTime,
					value: Module.Voucher.voucher.Renderer.translateCtime(data.voucherStartTime),
					vtype: 'dateValue',
					vtypeText: '开始时间不能大于截至时间！',
					listeners: {
						change: function(field){
							var end = field.up('form').down('field[name=voucherEndTime]');
							if(end == null) return;
							end.validate();
						}
					}
				},{
					xtype: 'datefield',
					name: 'voucherEndTime',
					format: 'Y-m-d H:i:s',
					// minValue: new Date(),
					editable: false,
					allowBlank: false,
					disabled: false,
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherEndTime,
					value: Module.Voucher.voucher.Renderer.translateCtime(data.voucherEndTime),
					vtype: 'dateValue',
					vtypeText: '截至时间不能小于开始时间！',
					listeners: {
						change: function(field){
							var start = field.up('form').down('field[name=voucherStartTime]');
							if(start == null) return;
							start.validate();
						},
						select: function(field, value){
							var time = Ext.Date.add(value, Ext.Date.HOUR, 23);
							time = Ext.Date.add(time, Ext.Date.MINUTE, 59);
							time = Ext.Date.add(time, Ext.Date.SECOND, 59);
							field.setValue(time);
						}
					}
				},{
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'days',
					fieldLabel: VOUCHER_VOUCHER_LABEL.days,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.days + VOUCHER_VOUCHER_LABEL.blankText,
					value: data.days
				},{
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'limitMoney',
					fieldLabel: VOUCHER_VOUCHER_LABEL.limitMoney,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.limitMoney + VOUCHER_VOUCHER_LABEL.blankText,
					value: data.limitMoney
				},{
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'userLimit',
					fieldLabel: VOUCHER_VOUCHER_LABEL.userLimit,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.userLimit + VOUCHER_VOUCHER_LABEL.blankText,
					value: data.userLimit
				},
				Module.Voucher.voucher.Tools.getVoucherScopeCodeCombo(data.voucherScopeCode),
				{
					xtype: 'textarea',
					name: 'voucherScopeNote',
					fieldLabel: VOUCHER_VOUCHER_LABEL.voucherScopeNote,
					// value: VOUCHER_VOUCHER_COMBO.voucherScopeNoteS[data.voucherScopeCode],
					value: data.voucherScopeNote,
					readOnly: true,
					allowBlank: false,
					blankText: VOUCHER_VOUCHER_LABEL.voucherScopeNote + VOUCHER_VOUCHER_LABEL.blankText
				}]
			}]
		});

		var win = new Ext.Window({
			title: VOUCHER_VOUCHER_LABEL.editVoucher,
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
					params['note'] = params['note'].replace(new RegExp('%','gm'),'%25');
					params['voucherName'] = params['voucherName'].replace(new RegExp('%','gm'),'%25');
					params['voucherScopeNote'] = params['voucherScopeNote'].replace(new RegExp('%','gm'),'%25');

					Soul.Ajax.restAction('/voucher/' + data.voucherId, 'put', Ext.encode(params), null, callbackFun, null, null);
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

	doManageVoucherBillFunction : function(voucher, callbackFun){
		var add_disable = true;
		if(voucher.voucherStatus == '00'){
			add_disable = false;
		}

		var addAction = Ext.create("Ext.Button", {
			text: '新增',
			name: 'addVoucherBillButton',
			iconCls: 'x-add-icon',
			disabled: add_disable
		});

		var exportAction = Ext.create("Ext.Button", {
			text: '导出',
			name: 'exportVoucherBillButton',
			iconCls: 'extensive-edit',
			disabled: false
		});

		var voucherBillGrid = Ext.create('Module.Voucher.voucher.view.VoucherBillGrid',{
       		id : 'manageVoucherBillGrid',
       		anchor : '100% 100%',
       		dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: [addAction, exportAction]
           	}],
           	voucherId : voucher.voucherId,
           	voucherName : voucher.voucherName
        });

        //设置相关的 store api
        var store = Ext.data.StoreManager.lookup("Module.Voucher.voucher.store.VoucherBillStore");
       	store.proxy.api = {
			read : '/voucher/voucherBill/' + voucher.voucherId
		};

		var winTitle = Ext.String.format(VOUCHER_VOUCHER_LABEL.manageVoucherBillTitle, voucher.voucherName);
        var win = new Ext.Window({
			title: winTitle,
			items: voucherBillGrid,
			width: 1020,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.show();
	},

	doAddVoucherBillFunction : function(voucherId, voucherName, callbackFun){
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 280,
			frame: true,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 250
			},
			items:[{
				xtype: 'numberfield',
				allowDecimals: false,
				minValue: 1,
				step: 1,
				name: 'voucherBillCount',
				fieldLabel: VOUCHER_BILL_LABEL.voucherBillCount,
				labelAlign: 'right',
				allowBlank: false,
				blankText: VOUCHER_BILL_LABEL.voucherBillCount + VOUCHER_VOUCHER_LABEL.blankText
			},
			Module.Voucher.voucher.Tools.getVoucherBillHasPasswdCombo('Y')
			]
		});

		var win = new Ext.Window({
			title: VOUCHER_BILL_LABEL.addVoucherBill,
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
					params['voucherId'] = voucherId;

					Soul.Ajax.restAction('/voucher/voucherBill/' + voucherId, 'post', Ext.encode(params), null, callbackFun, null, null);
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
	//给用户发放代金券
	doGiveVoucherToUserFunction : function(voucher, type, callbackFn) {
		if(type == 0){
			//Module.Voucher.voucher.Operation.doAddVoucherToUserFunction(null, type, voucher, callbackFn);
			Ext.Msg.alert('系统提示','此功能尚未实现，后续需要可添加');
			return;
		}
		if(type == 1){
			var addAction = Ext.create("Ext.Button", {
				text: VOUCHER_USER_LABEL.giveVoucher,
				disabled: false,
				name: 'giveVoucherButton',
				iconCls: 'x-add-icon'
			});
			
			var userInfoGrid = Ext.create('Module.Voucher.voucher.view.UserInfoGrid',{
				anchor : '100% 100%',
				voucherRecord : voucher,
				dockedItems: [{
					dock: 'top',
					xtype: 'toolbar',
					items: [addAction]
				}]
			});
			
			 var win = new Ext.Window({
				 	id : 'add_voucher_to_user_show_users',
					title: '选择用户列表',
					items: userInfoGrid,
					width: 1020,
					height: 500,
					layout: 'fit',
					autoDestroy: true,
					modal: true,
				});
				win.show();
		}
	},
	//给用户发放代金券 type:0是全部用户，1是指定用户
	doAddVoucherToUserFunction : function(records, type, voucher, callbackFn) {
		var users = [];
		if(records != null && records.length > 0) {
			Ext.each(records, function(r, i, rs){
				var userInfo = {
						id:r.data.id,
						fullName:r.data.fullName
				};
				users.push(userInfo);
			});
		}
		var voucherParams = {};
		voucherParams['voucherId'] = voucher.voucherId;
		voucherParams['users'] = users;
		voucherParams['type'] = type;

		var url = '/voucher/user';
		Soul.Ajax.restAction(url, 'post', Ext.encode(voucherParams), null, function(data){
			if(data != null && data.length > 0) {
				var message = "";
				Ext.each(data, function(r, i, rs){
					if(i == 0){
						message = r;
					} else{
						message = message + "</br>" + r;
					}
				});
				Ext.Msg.alert('错误提示', message);
			}else{
				Ext.Msg.alert('系统提示', '发放代金券成功');
			}
		}, null, null);
		Ext.getCmp('add_voucher_to_user_show_users').close();
	}
});