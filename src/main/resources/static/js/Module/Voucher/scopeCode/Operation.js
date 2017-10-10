Ext.define('Module.Voucher.scopeCode.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Voucher.scopeCode.Tools'
	],

	/**
	 * 获取 使用范围CODE数据
	 * @return {}
	 */
	scopeCodeDataFunction:function(){
		var url = '/admin/voucher/' + VOUCHER_SCOPE_CODE_GLOBAL.currentDomain + '/scopeCode/dictInfo';
		var scopeCodeData = Soul.Ajax.getSyncData(url, null);
		return scopeCodeData;
	},

	/**
	 * 新增 代金券使用范围CODE
	 * @param {} data 单条记录
	 * @param {} callbackFn 刷新
	 */
	doAddScopeCodeFunction:function(callbackFn){
		var scopeCodeData = Module.Voucher.scopeCode.Operation.scopeCodeDataFunction();
        var scopeCodeKeyDict = {};
        if(scopeCodeData != null){
	        $.each(scopeCodeData.dictItems, function(key, obj){
	            scopeCodeKeyDict[key] = key;
	        });
        }

		Ext.apply(Ext.form.VTypes, {
            scopeCodeEnNameValue: function(value, field){
                var key = scopeCodeKeyDict[value];
                if(key){
                    return false;
                }
                return true;
            }
        });

		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 400,
			frame: true,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 320
			},
			items:[{
				fieldLabel : VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeEnName,
				name : 'scopeCodeEnName',
				allowBlank : false,
				vtype: 'scopeCodeEnNameValue',
				vtypeText: '范围CODE已存在(不可重复)',
			},{
				fieldLabel : VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeChName,
				name : 'scopeCodeChName',
				allowBlank : false
			},{
				xtype:'textarea',
				fieldLabel : VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeDescription,
				name : 'scopeCodeDescription',
				allowBlank : false
			}]
		});

		var win = new Ext.Window({
			title: VOUCHER_SCOPE_CODE_LABEL.addScopeCode,
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
					Soul.Ajax.restAction('/admin/voucher/' + VOUCHER_SCOPE_CODE_GLOBAL.currentDomain + '/scopeCode', 'POST', Ext.encode(params), null, callbackFn, null, null);
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
	/**
	 * 修改 代金券使用范围CODE
	 * @param {} data 单条记录
	 * @param {} callbackFn 刷新
	 */
	doUpdateScopeCodeFunction:function(data, callbackFn){
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 400,
			frame: true,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 320
			},
			items:[{
				xtype: 'displayfield',
				fieldLabel : VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeEnName,
				name : 'scopeCodeEnName',
				value : data.key,
				allowBlank : false,
				submitValue: true,
			},{
				fieldLabel : VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeChName,
				name : 'scopeCodeChName',
				value : data.name,
				allowBlank : false
			},{
				xtype:'textarea',
				fieldLabel : VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeDescription,
				name : 'scopeCodeDescription',
				value : data.description,
				allowBlank : false
			}]
		});

		var win = new Ext.Window({
			title: VOUCHER_SCOPE_CODE_LABEL.updateScopeCode,
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
					Soul.Ajax.restAction('/admin/voucher/' + VOUCHER_SCOPE_CODE_GLOBAL.currentDomain + '/scopeCode/'+params['scopeCodeEnName'], 'PUT', Ext.encode(params), null, callbackFn, null, null);
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
	/**
	 * 删除 代金券使用范围CODE
	 * @param {} data 单条记录
	 * @param {} callbackFn 刷新
	 */
	doDelScopeCodeFunction:function(data, callbackFn){
		var message = Ext.String.format(VOUCHER_SCOPE_CODE_MESSAGE.confirmDelScopeCode, data.key);
		Ext.Msg.confirm('', message, function(button, text) {
			if (button == "yes") {
				var typeKey = data.key;
				var url = '/admin/voucher/' + VOUCHER_SCOPE_CODE_GLOBAL.currentDomain + '/scopeCode/' + typeKey;
				Soul.Ajax.confirmRestAction(url, "delete", null, null, callbackFn, null, null, null);
			}
		});
	},
	/**
	 * 启用  代金券使用范围CODE
	 * @param {} data 单条记录
	 * @param {} callbackFn 刷新
	 */
	doEnableScopeCodeFunction:function(data, callbackFn){
		var message = Ext.String.format(VOUCHER_SCOPE_CODE_MESSAGE.confirmEnableScopeCode, data.key);
		var method = "put";

		Ext.Msg.confirm('', message, function(button, text) {
			if (button == "yes") {
				var typeKey = data.key;
				var url = '/admin/voucher/' + VOUCHER_SCOPE_CODE_GLOBAL.currentDomain + '/scopeCode/' + typeKey + '/enable';
				Soul.Ajax.confirmRestAction(url, method, null, null, callbackFn, null, null, null);
			}
		});
	},
	/**
	 * 停用  代金券使用范围CODE
	 * @param {} data 单条记录
	 * @param {} callbackFn 刷新
	 */
	doDisableScopeCodeFunction:function(data, callbackFn){
		var message = Ext.String.format(VOUCHER_SCOPE_CODE_MESSAGE.confirmDisableScopeCode, data.key);
		var method = "delete";

		Ext.Msg.confirm('', message, function(button, text) {
			if (button == "yes") {
				var typeKey = data.key;
				var url = "/admin/voucher/" + VOUCHER_SCOPE_CODE_GLOBAL.currentDomain + "/scopeCode/" + typeKey + "/enable";
				Soul.Ajax.confirmRestAction(url, method, null, null, callbackFn, null, null, null);
			}
		});
	}
});