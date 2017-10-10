Ext.define('Module.Account.ledger.view.FundHistoryGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.ledgergrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.ledger.Data',
		'Module.Account.ledger.Renderer',
		'Module.Account.ledger.store.FundHistoryStore'
	],
    
	checkIndexes : [], // 默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.ledger.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
			// 	text: ACCOUNT_FUNDHISTORY_LABEL.fundId, dataIndex:'fundId', searchType:'string', align:'left', flex:1
			// },{
				text: ACCOUNT_FUNDHISTORY_LABEL.fundtime, dataIndex:'fundtime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			},{
				text: ACCOUNT_FUNDHISTORY_LABEL.fundTolMoney, dataIndex:'fundTolMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_FUNDHISTORY_LABEL.fundChangeMoney, dataIndex:'fundChangeMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_FUNDHISTORY_LABEL.fundIncomeMoney, dataIndex:'fundIncomeMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_FUNDHISTORY_LABEL.fundDbMoney, dataIndex:'fundDbMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_FUNDHISTORY_LABEL.fundLastTime, dataIndex:'fundLastTime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			}
		);
		
		var me = this;
		
		Ext.apply(this, {
			columns : columns,
			viewConfig : {
				emptyText : ACCOUNT_FUNDHISTORY_MESSAGE.noHistory
			},
			store : Ext.data.StoreManager.lookup("Module.Account.ledger.store.FundHistoryStore"),
		});
		
		this.callParent(arguments);
	},

	afterRender : function() {
		var me = this;
		me.updateView(me);
		me.callParent(arguments);
	}
});