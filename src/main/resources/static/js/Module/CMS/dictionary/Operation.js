Ext.define('Module.CMS.dictionary.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.CMS.dictionary.store.DictionaryStore',
		'Module.CMS.dictionary.store.DictionaryItemStore',
		'Module.CMS.dictionary.model.DictionaryItemModel',
		'Module.CMS.dictionary.Renderer',
		
	],
	
	getOperationForDictionary : function(dictionary){
		dictionary.httpParams = new Object();
		dictionary.httpMethod = new Object();
		dictionary.requestBody = new Object();
		dictionary.methodConfirm = new Object();
		
		dictionary.methodConfirm["usedict"] = {
			"put" : {
				msg : Ext.String.format(DICTIONARY_MESSAGE.confirmEnableDict, dictionary.key)
			},
			"delete" : {
				msg : Ext.String.format(DICTIONARY_MESSAGE.confirmDisableDict, dictionary.key)
			}
				
		};
		if (dictionary.status == Module.CMS.dictionary.model.DictionaryModel.INUSE) {
			dictionary.httpMethod["usedict"] = "delete";			
		} else  {
			dictionary.httpMethod["usedict"] = "put";
		}
	},

	getOperationForDictionaryItem : function(dictionaryItem){
		dictionaryItem.httpParams = new Object();
		dictionaryItem.httpMethod = new Object();
		dictionaryItem.requestBody = new Object();
		dictionaryItem.methodConfirm = new Object();

		dictionaryItem.methodConfirm["usedictitem"] = {
			"put" : {
				msg : Ext.String.format(DICTIONARY_MESSAGE.confirmEnableDictItem, dictionaryItem.key)
			},
			"delete" : {
				msg : Ext.String.format(DICTIONARY_MESSAGE.confirmDisableDictItem, dictionaryItem.key)
			}
				
		};
		if (dictionaryItem.status == Module.CMS.dictionary.model.DictionaryModel.INUSE) {
			dictionaryItem.httpMethod["usedictitem"] = "delete";			
		} else  {
			dictionaryItem.httpMethod["usedictitem"] = "put";
		}
	},

	doAddDictionaryFunction : function(callbackFn){
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
				fieldLabel: DICT_MANAGE_LABEL.key,
				allowBlank: false,
			},{
				name: 'name',
				fieldLabel: DICT_MANAGE_LABEL.name,
				allowBlank: false,
			},{
				name: 'description',
				fieldLabel: DICT_MANAGE_LABEL.description,
				allowBlank: false,
			},{
				name: 'domain',
				value: Module.CMS.dictionary.Tools.getDictionaryDomain(),
				hidden: true,
				submitValue: true,
			},
			]
		});

		var win = new Ext.Window({
			title: DICT_MANAGE_LABEL.add,
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

					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/common/dictionary/', 'post', Ext.encode(params), null, function(ret){
						callbackFn();
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

	doEditDictionaryFunction : function(record, callbackFn) {
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
				xtype: 'displayfield',
				fieldLabel: DICT_MANAGE_LABEL.key,
				value: record.data.key,
				submitValue: true,
			},{
				name: 'name',
				fieldLabel: DICT_MANAGE_LABEL.name,
				allowBlank: false,
				value: record.data.name,
			},{
				name: 'description',
				fieldLabel: DICT_MANAGE_LABEL.description,
				allowBlank: false,
				value: record.data.description,
			},{
				name: 'domain',
				value: record.data.domain,
				hidden: true,
				submitValue: true,
			},
			]
		});

		var win = new Ext.Window({
			title: DICT_MANAGE_LABEL.edit,
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

					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/common/dictionary/', 'put', Ext.encode(params), null, function(ret){
						callbackFn();
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

	doDelDictionaryFunction : function(records, callbackFn) {
		var requestBody = [];
		for(var i=0; i<records.length; i++) {
			requestBody.push(records[i].data.key);
		}

		Ext.Msg.confirm('', Ext.String.format(DICTIONARY_MESSAGE.confirmDelDicts, requestBody), function(button, text) {
			if (button == "yes") {
				Soul.Ajax.confirmRestAction("/common/dictionary/"+records[0].data.domain, "delete", null, requestBody, function(ret){
						callbackFn();
					}, null, null, null);
			}
		});
	},

	doAddItemFunction : function(record, callbackFn) {
		var me = this;
		
		var formpanel = new Ext.FormPanel({
			id: 'item_add',
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'dictId',
				xtype: 'displayfield',
				value: record.data.id,
				submitValue: true,
				hidden: true,
			},{
				name: 'dictKey',
				xtype: 'displayfield',
				fieldLabel: DICT_MANAGE_LABEL.key,
				value: record.data.key,
				submitValue: true,
            },{
				name: 'key',
				id: 'key',
				fieldLabel: DICT_MANAGE_LABEL.item_key,
				submitValue: true,
			},{
				name: 'value',
				fieldLabel: DICT_MANAGE_LABEL.item_val,
				allowBlank: false,
			},{
				name: 'name',
				fieldLabel: DICT_MANAGE_LABEL.item_name,
				allowBlank: false,
			},{
				name: 'description',
				fieldLabel: DICT_MANAGE_LABEL.item_desc,
				allowBlank: false,
			},{
				name: 'seqnum',
				fieldLabel: DICT_MANAGE_LABEL.item_seqnum,
				allowBlank: false,
			},{
				name: 'domain',
				value: record.data.domain,
				hidden: true,
				submitValue: true,
			}
			]
		});

		var win = new Ext.Window({
			title: DICT_MANAGE_LABEL.additem,
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
					params['dictId'] = parseInt(params['dictId']);

					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/common/dictionaryItem/', 'post', Ext.encode(params), null, function(ret){
						callbackFn();
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

	doEditItemFunction : function(record, callbackFn) {
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
				name: 'dictId',
				xtype: 'displayfield',
				value: record.data.dictId,
				submitValue: true,
				hidden: true,
			},{
				name: 'dictKey',
				xtype: 'displayfield',
				fieldLabel: DICT_MANAGE_LABEL.key,
				value: record.data.dictKey,
				submitValue: true,
            },{
				name: 'key',
				xtype: 'displayfield',
				fieldLabel: DICT_MANAGE_LABEL.item_key,
				value: record.data.key,
				allowBlank: false,
				submitValue: true,
			},{
				name: 'value',
				fieldLabel: DICT_MANAGE_LABEL.item_val,
				value: record.data.value,
				allowBlank: false,
			},{
				name: 'name',
				fieldLabel: DICT_MANAGE_LABEL.item_name,
				value: record.data.name,
				allowBlank: false,
			},{
				name: 'description',
				fieldLabel: DICT_MANAGE_LABEL.item_desc,
				value: record.data.description,
				allowBlank: false,
			},{
				name: 'seqnum',
				fieldLabel: DICT_MANAGE_LABEL.item_seqnum,
				value: record.data.seqnum,
				allowBlank: false,
			},{
				name: 'domain',
				value: record.data.domain,
				hidden: true,
				submitValue: true,
			}
			]
		});

		var win = new Ext.Window({
			title: DICT_MANAGE_LABEL.edititem,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			autoScroll: true,
			buttons: [{
				text: LABEL.save,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();
					params['dictId'] = parseInt(params['dictId']);

					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/common/dictionaryItem/', 'put', Ext.encode(params), null, function(ret){
						callbackFn();
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

	doDelItemFunction: function(records, callbackFn) {
		var requestBody = [];
		for(var i=0; i<records.length; i++) {
			requestBody.push(records[i].data.key);
		}
		Ext.Msg.confirm('', Ext.String.format(DICTIONARY_MESSAGE.confirmDelDictItems, requestBody), function(button, text) {
			if (button == "yes") {
				Soul.Ajax.confirmRestAction("/common/dictionaryItem/"+records[0].data.dictId, "delete", null, requestBody,  function(ret){
						callbackFn();
					}, null, null, null);
			}
		});
	},

	doViewItemFunction: function(record, callbackFn) {
		var menu = Module.CMS.dictionary.Tools.buildItemOptMenu();
        var initToolbar = function(){
        	var toolbar = new Array();
			itemMenu = {
				text: DICT_MANAGE_LABEL.dictItemOperation,
            	iconCls: 'pool_setting',
	           	menu: menu
	       	};
			toolbar.push(itemMenu);
			return toolbar;
		};

		var dictItemStore = Ext.data.StoreManager.lookup("Module.CMS.dictionary.store.DictionaryItemStore");
		dictItemStore.getProxy().url = '/common/dictionaryItem/'+record.data.domain+'/'+record.data.key;

		var itemGrid = Ext.create('Module.CMS.dictionary.view.DictionaryItemGrid',{
       		id : 'itemGrid',
       		anchor : '100% 100%',
       		store : dictItemStore,
       		dictRecord : record,
       		dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: initToolbar()
           	}],

        });

        var win = new Ext.Window({
			title: DICT_MANAGE_LABEL.itemGrid,
			items: itemGrid,
			width: 1000,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		
		win.showAt(30,30);
	},

	doImportDictFunction: function(callbackFn) {
//		var domain = Module.CMS.dictionary.Tools.getDictionaryDomain();
//		if (typeof(domain) == 'undefined' && domian == '') {
//			Ext.Msg.alert('提示信息: 配置文件中未添加字典域。');
//			return;
//		}

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
				name: 'file_name',
				id: 'file_name',
                xtype: 'filefield' ,
                fieldLabel: DICT_MANAGE_LABEL.file_name,
                buttonText: '选择文件...',
                submitValue: true,
				allowBlank: false
			},
			Module.CMS.dictionary.Tools.getDictDomainCombo("yearbook")
			]
		});

		var win = new Ext.Window({
			title: DICT_MANAGE_LABEL.importitem,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: DICT_MANAGE_LABEL.import,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;
					var params = formpanel.getForm().getValues();
					var domain= params['domain'];
					var importUrl = '/common/dictionary/' + domain + '/import';
					formpanel.submit({
						url: importUrl,
						method: 'POST',
						waitMsg: '正在导入文件请稍候...',
						success: function(fp, o) {
							Ext.Msg.alert('提示信息: '+o.result.message);
							callbackFn();
							win.close();
						},
						failure: function(fp, o) {
							Ext.Msg.alert('提示信息: '+o.result.message);
							callbackFn();
							win.close();
						}
					});
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

	doExportDictFunction: function(records) {
		var ids = [];

		Ext.each(records, function(r, i, rs){
			ids.push(r.data.id);
		});

		var exportUrl = '/common/dictionary/' + records[0].data.domain + '/export?ids='+ids;

		location.href = exportUrl;
	},

	doImportItemFunction: function(domain, dictKey, callbackFn) {
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
				name: 'file_name',
				id: 'file_name',
                xtype: 'filefield' ,
                fieldLabel: DICT_MANAGE_LABEL.file_name,
                buttonText: '选择文件...',
                submitValue: true,
				allowBlank: false,
			},
			]
		});

		var win = new Ext.Window({
			title: DICT_MANAGE_LABEL.importitem,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: DICT_MANAGE_LABEL.import,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var importUrl = '/common/dictionaryItem/' + domain + '/' + dictKey + '/import';
					formpanel.submit({
						url: importUrl,
						method: 'POST',
						waitMsg: '正在导入文件请稍候...',
						success: function(fp, o) {
							Ext.Msg.alert('提示信息: '+o.result.message);
							callbackFn();
							win.close();
						},
						failure: function(fp, o) {
							Ext.Msg.alert('提示信息: '+o.result.message);
							callbackFn();
							win.close();
						}
					});
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

	doExportItemFunction: function(domain, dictKey) {
		var exportUrl = '/common/dictionaryItem/' + domain + '/' + dictKey + '/export';

		location.href = exportUrl;
	},

});