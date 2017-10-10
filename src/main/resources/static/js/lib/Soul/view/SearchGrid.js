Ext.define('Soul.view.SearchGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.soulsearchgrid',

	requires : [ 'Soul.ux.grid.feature.Searching' ],
	
	minChars : 2,
	
	minLength : 2,
	
	checkIndexes : [], // 默认选择的列
	
	disableIndexes : [], // 禁止那些列参与查询
	
	
	contextMenu : null, //右键菜单
	
	itemcontextmenuFunction : function(view,record,htmlElement,index,event,eopts){
		event.preventDefault();
		var me = this;
		if (me.contextMenu != null)
			me.contextMenu.showAt(event.getXY());
	},

	initComponent : function() {
		var me = this;
		var	searching = this.initSearchFeatures();
		Ext.apply(this, {
			features : [ searching ],
			listeners : {
				afterlayout : function(container, layout, eOpts ){
					if (me.autoPageSize) {
						var size = parseInt((container.getHeight()-20) / 30);
						container.store.pageSize = size;
					}
				},
				scrollershow: function(scroller) {
					if (scroller && scroller.scrollEl) {
						scroller.clearManagedListeners(); 
						scroller.mon(scroller.scrollEl, 'scroll', scroller.onElScroll, scroller); 
					}
				},
				cellclick : me.cellClickFunction,
				itemcontextmenu : me.itemcontextmenuFunction
			}
		});
		this.callParent(arguments);
	},
	
	cellClickFunction : function(view, cell, columnIndex, record, row, rowIndex, e, obj) {
    	if (columnIndex == 0)
    		return;
		var operation = view.panel.columns[columnIndex - 1].operation;
		var ccScope = view.panel.columns[columnIndex - 1].ccScope;
		if (!operation)
			return;
		var data = record.data;
		var me = this;
		var callbackFun = function(){
			me.updateView(me);
		};
		if (data == null)
			return;
		if (ccScope && ccScope == 'local')
			return;
		Soul.Ajax.objectRestAction(data, operation, callbackFun);
	},

	initSearchFeatures : function(){
		var searching = {
			ftype : 'soulsearching',
			minChars : this.minChars,
			minLength : this.minLength,
			width : 150,
			mode : 'remote',// 远程还是本地store
			align : 'first',
			position : 'top',// 状态栏还是工具栏
			iconCls : 'search',// 图标
			menuStyle : 'checkbox',// 单选还是多选
			showSelectAll : true, // 是否显示全选按钮
			checkIndexes : this.checkIndexes,
			disableIndexes : this.disableIndexes
		};
		return searching;
	},
	
	afterRender : function() {
		var me = this;
		me.callParent(arguments);
	},

	updateView : function(scope) {
		var me = scope || this;
		if (me.isPaging)
			me.pagingBar.doRefresh();
		else
			me.pagingBar.moveFirst();;
	}
});
