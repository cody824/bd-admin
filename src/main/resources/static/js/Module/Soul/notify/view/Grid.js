Ext.define('Module.Soul.notify.view.Grid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.bptlgrid',

	requires : [ 'Soul.util.RendererUtil', 'Soul.util.GridRendererUtil',
			'Module.Soul.notify.Data',
			'Module.Soul.notify.Renderer',
			'Soul.ux.grid.column.ComboColumn',
			'Module.Soul.notify.Operation'],

	initComponent : function() {
		var columns = new Array();
		var dict = Module.Soul.notify.Data;
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit : 1,
			listeners:{
				edit : function( editor, e, eOpts ){
					console.log( editor, e, eOpts);
					if (e.field == "supportNodifyMode") {
						vs = e.value;
						var value = 0;
						vs.forEach(function(el, index, array){
							value += el;
						});
						e.value = value;
						e.record.data.supportNodifyMode = value;
					}
				}
			}
		});
		
		this.opt = Module.Soul.notify.Operation;

		columns.push(new Ext.grid.RowNumberer(),{
			text : "通知类型",
			sortable : true,
			dataIndex : 'notifyType',
			editor : {
				allowBlank : false
			}
		}, {
			text : "事件名称",
			width : 100,
			dataIndex : 'notifyName',
			flex : 1,
			editor : {
				allowBlank : false
			}
		}, {
			text : "支持通知方式 ",
			width : 200,
			dataIndex : 'supportNodifyMode',
			renderer :function(val){
				var value = "";
				if (Array.isArray(val)){
					val.forEach(function(el){
						if (el == 1)
							value += "站内信";
						else if (el  == 2)
							value += " 邮件";
						else if (el == 4)
							value += " 短信";
						else if (el == 8)
							value += " 微信";
					});
				} else  {
					if ((val & 1) == 1)
						value += "站内信";
					if ((val & 2) == 2)
						value += " 邮件";
					if ((val & 4) == 4)
						value += " 短信";
					if ((val & 8) == 8)
						value += " 微信";
				}
				return value;
			},
			editor : {
				xtype : 'combo',
				name : 'supportNodifyMode',
				queryMode : 'local',
				store : dict.modeCombo,
				multiSelect : true,
				editable : false,
				allowBlank : false,
				triggerAction : 'all'
			},
		}, {
			text : "状态",
			width : 50,
			dataIndex : 'status',
			xtype : 'combocolumn',
			searchType : 'combo',
			comboData : dict.statusCombo,
			editor : {
				xtype : 'combo',
				name : 'status',
				queryMode : 'local',
				store : dict.statusCombo,
				editable : false,
				allowBlank : false,
				triggerAction : 'all'
			},
			
		},  {
			text : "系统通知",
			width : 100,
			/*xtype : 'numberfield',*/
			/*searchType : 'number',*/
			dataIndex : 'roleNodify',
			xtype: 'booleancolumn', 
            trueText: '开启',
            falseText: '关闭', 
            editor : true
		},  {
			text : "用户通知",
			width : 100,
			/*xtype : 'numberfield',*/
			/*searchType : 'number',*/
			dataIndex : 'userNodify',
			xtype: 'booleancolumn', 
            trueText: '开启',
            falseText: '关闭',
            editor : true
		},{
			text : "操作",
			xtype : 'actioncolumn',
			width : 30,
			sortable : false,
			menuDisabled : true,
			items : [ {
				icon : '/img/icon/del.png',
				tooltip : '删除模板',
				scope : this,
				handler : this.onRemoveClick
			} ]
		});
		var sm = new Ext.selection.CheckboxModel({
			listeners : {
				selectionchange : function(sm2) {
				}
			}
		});
		Ext.apply(this, {
			store : Ext.data.StoreManager
					.lookup("Module.Soul.notify.store.NotifyConfigStore"),
			selModel : sm,
			viewConfig : {
				emptyText : "没有通知配置"
			},
			plugins : [ this.cellEditing ],
			columns : {
				items : columns,
				defaults : {
					searchType : 'string',
					sortable : false,
					menuDisabled : true,
					align : 'center'
				}
			}
		});
		this.callParent(arguments);
	},
	
	onRemoveClick : function(grid, rowIndex) {
		var me = this;
		console.log(this.getStore().getAt(rowIndex));
		Soul.Ajax.request({
			url : '/notifyConfig/' + this.getStore().getAt(rowIndex).data.notifyType,
			method :'delete',
			success : function(){
				me.saveMask.hide();
				me.updateView(me);
			}
			
		});
	},

	onAddClick : function() {

		var nc = Ext.create('Module.Soul.notify.model.NotifyConfigModel', {
			notifyType : "通知类型",
			notifyName : "通知名称",
			status : 1,
			supportNodifyMode : 1,
			roleNodify : true,
			userNodify : true
		});
		this.getStore().insert(0, nc);
		this.cellEditing.startEditByPosition({
			row : 0,
			column : 2
		});
	},

	onSaveClick : function(btn) {
		var me = this;
		this.getStore().sync({
			callback : function() {
				me.saveMask.hide();
				me.updateView(me);
			}
		});
	},

	afterRender : function() {
		var me = this;
		me.callParent(arguments);
		var createNCItem = me.portlet.down('button[name=createNC]');
		var saveNCItem = me.portlet.down('button[name=updateNC]');
		
		me.getStore().on('add', function(store, eOpts) {
			saveNCItem.enable();
		});
		me.getStore().on('update', function(store, eOpts) {
			saveNCItem.enable();
		});
		me.getStore().on('remove', function(store, eOpts) {
			saveNCItem.enable();
		});
		me.getStore().on('write', function(store, eOpts) {
			saveNCItem.disable();
		});
		me.saveMask = new Ext.LoadMask(Ext.getBody(), {
			msg : "保存中"
		});
		me.getStore().on('beforesync', function(){
			me.saveMask.show();
		});

		createNCItem.enable();
		saveNCItem.disable();	
		
		createNCItem.setHandler(function(){
			me.onAddClick();
		});
		saveNCItem.setHandler(function(){
			me.onSaveClick(saveNCItem);
		});
	}

});
