Ext.define('Module.CMS.dictionary.view.DictionaryItemGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.noticegrid',
	config : {
		dictRecord : undefined,
	},
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.CMS.dictionary.Data',
		'Module.CMS.dictionary.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],

	checkIndexes : ['key', 'value'], 
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.CMS.dictionary.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: DICT_MANAGE_LABEL.item_key, flex:1,dataIndex:'key', 
				menuDisabled:true, searchType : 'string', align : 'center', sortable:true
			},
			{
				text : DICT_MANAGE_LABEL.item_val,flex:1, dataIndex:'value',
				menuDisabled:true, searchType : 'string', align : 'center',
			},
			{
				text : DICT_MANAGE_LABEL.domain,width : 60, dataIndex:'domain',
				menuDisabled:true, searchType : 'string', align : 'center',
			},
			{
				text: DICT_MANAGE_LABEL.item_name,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'name', align : 'center',
				
			},
			{
				text: DICT_MANAGE_LABEL.item_desc,flex:1,
				sortable: false, menuDisabled:true, dataIndex: 'description', align : 'center',
			},
			{
				text : DICT_MANAGE_LABEL.item_status,flex:1, dataIndex:'status',
				menuDisabled:true, searchType : 'string', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateStatus(val);
				}
			},
			{
				text: DICT_MANAGE_LABEL.ctime,flex:1, searchType : 'date',
				sortable: false, menuDisabled:true, dataIndex: 'ctime', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},
			{
				text: DICT_MANAGE_LABEL.mtime,flex:1, searchType : 'date',
				sortable: false, menuDisabled:true, dataIndex: 'mtime', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},
			{
				text: DICT_MANAGE_LABEL.item_seqnum,flex:1,
				sortable: false, menuDisabled:true, dataIndex: 'seqnum', align : 'center',
				
			},{
				text : DICT_MANAGE_LABEL.operation, sortable: false, menuDisabled:true,
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateDictItemIcon(val, u,r, rowIndex, columnIndex - 1, s, v);
				},
				width : 60,
				align : 'center',
				operation : 'usedictitem'
			}
		);
		
		var me = this;
		me.contextMenu = Module.CMS.dictionary.Tools.buildItemOptMenu();

		rightAI = me.contextMenu.down('menuitem[name=additem]');
		rightEI = me.contextMenu.down('menuitem[name=edititem]');
		rightDI = me.contextMenu.down('menuitem[name=delitem]');
		rightIMI = me.contextMenu.down('menuitem[name=importitem]');
		rightEXI = me.contextMenu.down('menuitem[name=exportitem]');

		rightAI.setVisible(false);
		rightEI.setVisible(true);
		rightDI.setVisible(true);
		rightIMI.setVisible(false);
		rightEXI.setVisible(false);

		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

					if (sm2.getCount() == 1) {
						rightEI.enable();
						topEI.enable();
					} else {
						rightEI.disable();
						topEI.disable();
					}

					if (sm2.getCount() > 0) {
						rightDI.enable();
						topDI.enable();
					} else {
						rightDI.disable();
						topDI.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			store : Ext.data.StoreManager.lookup("Module.CMS.dictionary.store.DictionaryItemStore"),
			selModel: sm,
			viewConfig : {
				emptyText : DICTIONARY_MESSAGE.noDictionaryItem
			},
			columns : columns
		});
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
        
        var callbackFun = function(){
			me.updateView(me);
		};

		var sm = me.selModel,
		additemItem = me.down('menuitem[name=additem]');
			edititemItem = me.down('menuitem[name=edititem]');
			delitemItem = me.down('menuitem[name=delitem]');
			importItem = me.down('menuitem[name=importitem]');
			exportItem = me.down('menuitem[name=exportitem]');

		var additemFunc = function(item, e, eOpts){
        	Module.CMS.dictionary.Operation.doAddItemFunction(me.getDictRecord(), callbackFun);

        };
        me.contextMenu.down('menuitem[name=additem]').on('click', additemFunc);
        additemItem.on('click', additemFunc);

        var edititemFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	var record = records[0];
        	var store = me.getStore();
        	var idx = store.indexOf(record);
        	record = store.getAt(idx);

        	Module.CMS.dictionary.Operation.doEditItemFunction(record, callbackFun);

        };
        me.contextMenu.down('menuitem[name=edititem]').on('click', edititemFunc);
        me.down('menuitem[name=edititem]').on('click', edititemFunc);
        edititemItem.on('click', edititemFunc);

        var delitemFunc = function(item, e, eOpts){
        	var records = sm.getSelection();

        	Module.CMS.dictionary.Operation.doDelItemFunction(records, callbackFun);

        };
        me.contextMenu.down('menuitem[name=delitem]').on('click', delitemFunc);
        me.down('menuitem[name=delitem]').on('click', delitemFunc);
        delitemItem.on('click', delitemFunc);

        var importitemFunc = function(item, e, eOpts){
        	Module.CMS.dictionary.Operation.doImportDictFunction(callbackFun);
        };
        importItem.on('click', importitemFunc);

		var exportitemFunc = function(item, e, eOpts){
			Module.CMS.dictionary.Operation.doExportDictFunction(me.getDictRecord());
        };
        exportItem.on('click', exportitemFunc);

    }
});