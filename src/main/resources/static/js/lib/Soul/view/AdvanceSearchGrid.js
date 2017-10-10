Ext.define('Soul.view.AdvanceSearchGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.souladvancesearchgrid',

	requires : [ 'Soul.ux.grid.feature.AdvanceSearching' ],
	
	minChars : 2,
	
	minLength : 2,
	
	checkIndexes : [], // 默认选择的列
	
	disableIndexes : [], // 禁止那些列参与查询
	
	contextMenu : null, //右键菜单

	doubleClick : null, //双击事件
	
	initFilter : [],//初始过滤器
	
	itemcontextmenuFunction : function(view,record,htmlElement,index,event,eopts){
		event.preventDefault();
		var me = this;
		if (me.contextMenu != null)
			me.contextMenu.showAt(event.getXY());
	},

	itemdblclickFunction : function(view, record, item, index, e, eOpts){
		var me = this;
		if(typeof me.doubleClick === 'function'){
			me.doubleClick(view, record, item, index, e, eOpts);
		}
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
				itemdblclick : me.itemdblclickFunction,
				itemcontextmenu : me.itemcontextmenuFunction
			}
		});
		this.callParent(arguments);
	},

	initSearchFeatures : function(){
		var searching = {
			ftype : 'souladvancesearching',
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
		me.pagingBar.doRefresh();
	}
});
