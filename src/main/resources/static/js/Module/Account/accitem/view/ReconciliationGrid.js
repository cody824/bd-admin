Ext.define('Module.Account.accitem.view.ReconciliationGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.reconciliationgrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.accitem.Data',
		'Module.Account.accitem.Renderer',
		'Module.Account.accitem.Portlet',
		'Module.Account.accitem.store.ReconciliationStore',
	],
    
	checkIndexes : [], // 默认选择的列
	disableIndexes : ['accItemChangeBalna', 'accItemChangeBalna', 'accItemAllBalna'],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.accitem.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: RECONCILIATION_LABEL.reconciliationTime, dataIndex:'reconciliationTime', searchType:'date', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val);
				},
			},{
				text: RECONCILIATION_LABEL.reconciliationChange, dataIndex:'reconciliationChange', searchType:'string', align:'center', flex:1
			},{
				text: RECONCILIATION_LABEL.reconciliationMode, dataIndex:'reconciliationMode', searchType:'combo', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateReconciliationMode(val);
				},
				comboData : [['00','入金'],['10','出金'],['20','交易转出'],['30','交易转入']]
			},{
				text: RECONCILIATION_LABEL.accItemChangeBalna_in, dataIndex:'accItemChangeBalna', searchType:'string', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateChangeBalna('in', val, r);
				}
			},{
				text: RECONCILIATION_LABEL.accItemChangeBalna_out, dataIndex:'accItemChangeBalna', searchType:'string', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateChangeBalna('out', val, r);
				}
			},{
				text: RECONCILIATION_LABEL.accItemAllBalna, dataIndex:'accItemAllBalna', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		Ext.apply(this, {
			columns : columns,
			viewConfig : {
				emptyText : RECONCILIATION_MESSAGE.noReconciliation
			},
			store : Ext.data.StoreManager.lookup("Module.Account.accitem.store.ReconciliationStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
		var me = this;
		me.updateView(me);
		me.callParent(arguments);
    }
});