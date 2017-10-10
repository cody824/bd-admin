Ext.define('Module.Voucher.voucher.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	showVoucherInEast : function(voucherId){
		var me = this;
		
		var voucher = Module.Voucher.voucher.Data.getVoucherById(voucherId);
		if(window.console){console.log(voucher);}
		if (voucher != null){
			var property = me.getVoucherPropertyGrid(voucher);
			Soul.util.ObjectView.showInEast(property, voucher.voucherName);
		}
	},

	getVoucherPropertyGrid : function(voucher){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(
				voucher,
				Module.Voucher.voucher.Config.getRendererConfig(), 
				VOUCHER_VOUCHER_PROPERTY,
				Module.Voucher.voucher.Config.showProperties,
				{iconCls : 'md-user'});
		
		return property;
	},

	getTerraceCodeCombo : function(action, value){
		var disabled = false;
		if(action == "edit"){
			disabled = true;
		}

		var data = VOUCHER_VOUCHER_COMBO.terraceCode;
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : VOUCHER_VOUCHER_LABEL.terraceCode,
			labelAlign : 'right',

			name : 'terraceCode',
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

			store : store,

			listeners : {
				'select' : function(combo, record, index){
					var value = record[0].data.value;
					VOUCHER_VOUCHER_GLOBAL.currentDomain = value;
					VOUCHER_VOUCHER_GLOBAL.currentScopeData = Module.Voucher.voucher.Operation.scopeCodeDataFunction();

					var data = [];
			        if(VOUCHER_VOUCHER_GLOBAL.currentScopeData != null){
				        $.each(VOUCHER_VOUCHER_GLOBAL.currentScopeData.dictItems, function(key, obj){
				        	var ar = [key, obj.name];
				        	data.push(ar);
				        });
			        }

					var voucherScopeComboItem = this.up('panel').down('combo[name=voucherScopeCode]');
					var voucherScopeNoteItem = this.up('panel').down('textarea[name=voucherScopeNote]');
					voucherScopeComboItem.setValue(null);
					voucherScopeNoteItem.setValue(null);
					voucherScopeComboItem.store.removeAll();
					voucherScopeComboItem.store.add(data);
				}
			}
		});

		if(value != null){
			combo.setValue(value);
			VOUCHER_VOUCHER_GLOBAL.currentDomain = value;
			VOUCHER_VOUCHER_GLOBAL.currentScopeData = Module.Voucher.voucher.Operation.scopeCodeDataFunction();

			var data = [];
	        if(VOUCHER_VOUCHER_GLOBAL.currentScopeData != null){
		        $.each(VOUCHER_VOUCHER_GLOBAL.currentScopeData.dictItems, function(key, obj){
		        	var ar = [key, obj.name];
		        	data.push(ar);
		        });
	        }
	        VOUCHER_VOUCHER_GLOBAL.currentScopeComboData = data;
		}
		return combo;
	},

	getVoucherTypeCombo : function(action, value){
		var disabled = false;
		if(action == "edit"){
			disabled = true;
		}

		var data = [];
		if(action == 'add'){
			data = VOUCHER_VOUCHER_COMBO.voucherType_add;
		}else if(action == 'edit'){
			data = VOUCHER_VOUCHER_COMBO.voucherType;
		}else{
			data = VOUCHER_VOUCHER_COMBO.voucherType;
		}

		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : VOUCHER_VOUCHER_LABEL.voucherType,
			labelAlign : 'right',

			name : 'voucherType',
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


	getVoucherIsautoGetCombo : function(value){
		var disabled = true;
		var data = VOUCHER_VOUCHER_COMBO.isAutoGet;

		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : VOUCHER_VOUCHER_PROPERTY.isAutoGet,
			labelAlign : 'right',
			name : 'isAutoGet',
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





	getVoucherStatusCombo : function(action, value){
		var disabled = false;
		if(action == "edit"){
			disabled = true;
		}

		var data = [];
		if(action == 'add'){
			data = VOUCHER_VOUCHER_COMBO.voucherStatus_add;
		}else if(action == 'edit'){
			data = VOUCHER_VOUCHER_COMBO.voucherStatus;
		}else{
			data = VOUCHER_VOUCHER_COMBO.voucherStatus;
		}

		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : VOUCHER_VOUCHER_LABEL.voucherStatus,
			labelAlign : 'right',

			name : 'voucherStatus',
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

	getVoucherScopeCodeCombo : function(value){
		// var data = VOUCHER_VOUCHER_COMBO.voucherScopeCode;
		var data = VOUCHER_VOUCHER_GLOBAL.currentScopeComboData;
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : VOUCHER_VOUCHER_LABEL.voucherScopeCode,
			labelAlign : 'right',

			name : 'voucherScopeCode',
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
			disabled: false,

			store : store,

			listeners : {
				'select' : function(combo, record, index){
					var value = record[0].data.value;
					var scope = VOUCHER_VOUCHER_GLOBAL.currentScopeData;
					if(scope != null){
						var voucherScopeNoteItem = this.up('panel').down('textarea[name=voucherScopeNote]');
						var note = scope.dictItems[value].description;
						voucherScopeNoteItem.setValue(note);
					}
				},
				'selectbak' : function(combo, record, index){
					var value = record[0].data.value;
					var voucherScopeNoteItem = this.up('panel').down('textfield[name=voucherScopeNote]');
					var voucherScopeNoteSItem = this.up('panel').down('textarea[name=voucherScopeNoteS]');
					var note = VOUCHER_VOUCHER_COMBO.voucherScopeNoteS[value];
					voucherScopeNoteItem.setValue(record[0].data.name);
					voucherScopeNoteSItem.setValue(note);
				}
			}
		});

		if(value != null){
			combo.setValue(value);
		}
		return combo;
	},

	getVoucherBillHasPasswdCombo : function(value){
		var data = [['Y','是'],['N','否']];
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : VOUCHER_BILL_LABEL.voucherBillHasPasswd,
			labelAlign : 'right',

			name : 'voucherBillHasPasswd',
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