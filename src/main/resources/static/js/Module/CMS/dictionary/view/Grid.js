
Ext.define('Module.CMS.dictionary.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.noticegrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.CMS.dictionary.Data',
		'Module.CMS.dictionary.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
    
	checkIndexes : ['key', 'name'], 
	
	initComponent : function() {

		var columns = new Array();
		var renders = Module.CMS.dictionary.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: DICT_MANAGE_LABEL.key,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'key', align : 'center',
			},
			{
				text : DICT_MANAGE_LABEL.name,flex:1, dataIndex:'name',
				menuDisabled:true, searchType : 'string', align : 'center',
			},
			{
				text : DICT_MANAGE_LABEL.domain,width : 60, dataIndex:'domain',
				menuDisabled:true, searchType : 'string', align : 'center',
			},
			{
				text: DICT_MANAGE_LABEL.description,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'description', align : 'center',
			},
			{
				text: DICT_MANAGE_LABEL.status,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'status', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateStatus(val);
				}
			},{
				text: DICT_MANAGE_LABEL.ctime,flex:1, searchType : 'date',
				sortable: false, menuDisabled:true, dataIndex: 'ctime', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},{
				text: DICT_MANAGE_LABEL.mtime,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'mtime', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},{
				text : DICT_MANAGE_LABEL.operation, sortable: false, menuDisabled:true,
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateDictIcon(val, u,r, rowIndex, columnIndex - 1, s, v);
				},
				width : 60,
				align : 'center',
				operation : 'usedict'
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildDictionaryOptMenu();

		rightAD = me.contextMenu.down('menuitem[name=add]');
		topAD = me.portlet.down('menuitem[name=add]');
		rightEI = me.contextMenu.down('menuitem[name=edit]');
		topEI = me.portlet.down('menuitem[name=edit]');
		rightDI = me.contextMenu.down('menuitem[name=delete]');
		topDI = me.portlet.down('menuitem[name=delete]');
		rightAI = me.contextMenu.down('menuitem[name=additem]');
		topAI = me.portlet.down('menuitem[name=additem]');
		rightVI = me.contextMenu.down('menuitem[name=viewitem]');
		topVI = me.portlet.down('menuitem[name=viewitem]');
		rightIMI = me.contextMenu.down('menuitem[name=import]');
		topIMI = me.portlet.down('menuitem[name=import]');
		rightEXI = me.contextMenu.down('menuitem[name=export]');
		topEXI = me.portlet.down('menuitem[name=export]');

		rightAD.setVisible(false);
		topEI.setVisible(false);
		topDI.setVisible(false);
		topAI.setVisible(false);
		topVI.setVisible(false);

		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

					if (sm2.getCount() == 1) {
						rightEI.enable();
						topEI.enable();
						rightAI.enable();
						topAI.enable();
						rightVI.enable();
						topVI.enable();
					} else {
						rightEI.disable();
						topEI.disable();
						rightAI.disable();
						topAI.disable();
						rightVI.disable();
						topVI.disable();
					}

					if (sm2.getCount() > 0) {
						rightDI.enable();
						topDI.enable();
						rightEXI.enable();
						topEXI.enable();
						
					}else {
						rightDI.disable();
						topDI.disable();
						rightEXI.disable();
						topEXI.disable();
						
					}

				}
			}
		});

		dictStore = Ext.data.StoreManager.lookup("Module.CMS.dictionary.store.DictionaryStore");
		dictStore.getProxy().url = '/common/dictionary/';
		
		Ext.apply(this, {
			store : dictStore,
			selModel: sm,
			viewConfig : {
				emptyText : DICTIONARY_MESSAGE.noDictionary
			},
			columns : columns
		});
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};

		var sm = me.selModel,
			addItem = me.portlet.down('menuitem[name=add]');
			editItem = me.portlet.down('menuitem[name=edit]');
			deleteItem = me.portlet.down('menuitem[name=delete]');
			additemItem = me.portlet.down('menuitem[name=additem]');
			viewitemItem = me.portlet.down('menuitem[name=viewitem]');
			importItem = me.portlet.down('menuitem[name=import]');
			exportItem = me.portlet.down('menuitem[name=export]');
        
		var adddictionaryFunc = function(e, eOpts){
        	Module.CMS.dictionary.Operation.doAddDictionaryFunction(callbackFun);
        };
        me.contextMenu.down('menuitem[name=add]').on('click', adddictionaryFunc);
        addItem.on('click', adddictionaryFunc);

        var editdictionaryFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	var record = records[0];
        	var store = me.getStore();
        	var idx = store.indexOf(record);
        	record = store.getAt(idx);

        	Module.CMS.dictionary.Operation.doEditDictionaryFunction(record, callbackFun);

        };
        me.contextMenu.down('menuitem[name=edit]').on('click', editdictionaryFunc);
        editItem.on('click', editdictionaryFunc);

        var deldictionaryFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	
        	Module.CMS.dictionary.Operation.doDelDictionaryFunction(records, callbackFun);

        };
        me.contextMenu.down('menuitem[name=delete]').on('click', deldictionaryFunc);
        deleteItem.on('click', deldictionaryFunc);

        var addItemFunc = function(item, e, eOpts){
        	var records = sm.getSelection();

        	Module.CMS.dictionary.Operation.doAddItemFunction(records[0], callbackFun);

        };
        me.contextMenu.down('menuitem[name=additem]').on('click', addItemFunc);
        additemItem.on('click', addItemFunc);

        var viewItemFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
   
        	Module.CMS.dictionary.Operation.doViewItemFunction(records[0], callbackFun);

        };
        me.contextMenu.down('menuitem[name=viewitem]').on('click', viewItemFunc);
        viewitemItem.on('click', viewItemFunc);

        var importItemFunc = function(item, e, eOpts){
   
        	Module.CMS.dictionary.Operation.doImportDictFunction(callbackFun);

        };
        me.contextMenu.down('menuitem[name=import]').on('click', importItemFunc);
        importItem.on('click', importItemFunc);

        var exportItemFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
   
        	Module.CMS.dictionary.Operation.doExportDictFunction(records);

        };
        me.contextMenu.down('menuitem[name=export]').on('click', exportItemFunc);
        exportItem.on('click', exportItemFunc);
    }
});