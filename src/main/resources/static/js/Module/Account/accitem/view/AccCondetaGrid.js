Ext.define('Module.Account.accitem.view.AccCondetaGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.acccondetagrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.accitem.store.AccCondetaStore',
	],
    
	checkIndexes : [], // 默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.accitem.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ACCCONDETA_LABEL.terraceCode, dataIndex:'terraceCode', searchType:'string', align:'center', flex:1
			},{
				text: ACCCONDETA_LABEL.condetaMoney, dataIndex:'condetaMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCCONDETA_LABEL.condetaType, dataIndex:'condetaType', searchType:'string', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateAccCondetaType(val);
				}
			},{
				text: ACCCONDETA_LABEL.condetaState, dataIndex:'condetaState', searchType:'string', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateAccCondetaState(val);
				}
			},{
				text: ACCCONDETA_LABEL.condetaTime, dataIndex:'condetaTime', searchType:'string', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val);
				}
			},{
				text: ACCCONDETA_LABEL.condetaDoTime, dataIndex:'condetaDoTime', searchType:'string', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val);
				}
			},{
				text: ACCCONDETA_LABEL.condetaNote, dataIndex:'condetaNote', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		// me.contextMenu = Module.Account.accitem.Tools.buildAccCondetaOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : ACCCONDETA_MESSAGE.noAccCondeta
			},
			store : Ext.data.StoreManager.lookup("Module.Account.accitem.store.AccCondetaStore"),
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
		};
    }
});