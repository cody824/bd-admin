Ext.define('Module.Voucher.scopeCode.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.voucherScopeCodeGrid',
	
	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Voucher.scopeCode.Data',
		'Module.Voucher.scopeCode.Renderer'
	],

	checkIndexes : ['key','name','description'],
	disableIndexes : ['status','ctime','mtime'],
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Voucher.scopeCode.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeEnName, dataIndex:'key', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeChName, dataIndex:'name', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeStatus, dataIndex:'status', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateScopeCodeStatus(v);
				}
			},{
				text:VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeCTime, dataIndex:'ctime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			},{
				text:VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeUTime, dataIndex:'mtime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			},{
				text:VOUCHER_SCOPE_CODE_PROPERTY.scopeCodeDescription, dataIndex:'description', searchType:'string', align:'center', flex:2
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildVoucherScopeCodeOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

					/* 编辑，删除，启用&停用功能，一次只能操作一条记录 */
					var updateItemTop = me.portlet.down('menuitem[name=updateScopeCode]');
					var delItemTop = me.portlet.down('menuitem[name=delScopeCode]');
					var enableItemTop = me.portlet.down('menuitem[name=enableScopeCode]');
					var disableItemTop = me.portlet.down('menuitem[name=disableScopeCode]');
					var updateItemRight = me.contextMenu.down('menuitem[name=updateScopeCode]');
					var delItemRight = me.contextMenu.down('menuitem[name=delScopeCode]');
					var enableItemRight = me.contextMenu.down('menuitem[name=enableScopeCode]');
					var disableItemRight = me.contextMenu.down('menuitem[name=disableScopeCode]');
					if(records.length == 1){
						updateItemTop.enable();
						updateItemRight.enable();
						delItemTop.enable();
						delItemRight.enable();
						if(records[0].data.status == Module.Voucher.scopeCode.model.ScopeCodeModel.INUSE){
							enableItemTop.disable();
							enableItemRight.disable();
							disableItemTop.enable();
							disableItemRight.enable();
						}else{
							enableItemTop.enable();
							enableItemRight.enable();
							disableItemTop.disable();
							disableItemRight.disable();
						}
					}else{
						updateItemTop.disable();
						updateItemRight.disable();
						delItemTop.disable();
						delItemRight.disable();
						enableItemTop.disable();
						enableItemRight.disable();
						disableItemTop.disable();
						disableItemRight.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : VOUCHER_SCOPE_CODE_MESSAGE.noScopeCode
			},
			store : Ext.data.StoreManager.lookup("Module.Voucher.scopeCode.store.ScopeCodeStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
		var sm = me.selModel;

        me.callParent(arguments);
        me.updateView(me);

        var callbackFun = function(){
			me.updateView(me);
			sm.clearSelections();
		};

		var addScopeCodeFunc = function(item, e, eOpts){
			Module.Voucher.scopeCode.Operation.doAddScopeCodeFunction(callbackFun);
		}
		var updateScopeCodeFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){
				Module.Voucher.scopeCode.Operation.doUpdateScopeCodeFunction(records[0].data, callbackFun);
			}
		}
		var delScopeCodeFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){
				Module.Voucher.scopeCode.Operation.doDelScopeCodeFunction(records[0].data, callbackFun);
			}
		}
		var enableScopeCodeFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){
				if(records[0].data.status == Module.Voucher.scopeCode.model.ScopeCodeModel.NOTUSE){
					Module.Voucher.scopeCode.Operation.doEnableScopeCodeFunction(records[0].data, callbackFun);
				}
			}
		}
		var disableScopeCodeFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){
				if(records[0].data.status != Module.Voucher.scopeCode.model.ScopeCodeModel.NOTUSE){
					Module.Voucher.scopeCode.Operation.doDisableScopeCodeFunction(records[0].data, callbackFun);
				}
			}
		}

		me.portlet.down('menuitem[name=addScopeCode]').on('click', addScopeCodeFunc);
		me.portlet.down('menuitem[name=updateScopeCode]').on('click', updateScopeCodeFunc);
		me.portlet.down('menuitem[name=delScopeCode]').on('click', delScopeCodeFunc);
		me.portlet.down('menuitem[name=enableScopeCode]').on('click', enableScopeCodeFunc);
		me.portlet.down('menuitem[name=disableScopeCode]').on('click', disableScopeCodeFunc);
		me.contextMenu.down('menuitem[name=addScopeCode]').on('click', addScopeCodeFunc);
		me.contextMenu.down('menuitem[name=updateScopeCode]').on('click', updateScopeCodeFunc);
		me.contextMenu.down('menuitem[name=delScopeCode]').on('click', delScopeCodeFunc);
		me.contextMenu.down('menuitem[name=enableScopeCode]').on('click', enableScopeCodeFunc);
		me.contextMenu.down('menuitem[name=disableScopeCode]').on('click', disableScopeCodeFunc);
    }
});