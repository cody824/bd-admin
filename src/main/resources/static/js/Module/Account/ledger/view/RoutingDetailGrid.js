Ext.define('Module.Account.ledger.view.RoutingDetailGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.ledgergrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.ledger.Data',
		'Module.Account.ledger.Renderer',
		'Module.Account.ledger.store.RoutingDetailStore'
	],
    
	checkIndexes : [], // 默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.ledger.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ACCOUNT_ROUTINGDETAIL_LABEL.routingAllMoney, dataIndex:'routingAllMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ROUTINGDETAIL_LABEL.routingChangeMoney, dataIndex:'routingChangeMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ROUTINGDETAIL_LABEL.routingIncomeMoney, dataIndex:'routingIncomeMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ROUTINGDETAIL_LABEL.routingUseMoney, dataIndex:'routingUseMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ROUTINGDETAIL_LABEL.routingBailMoney, dataIndex:'routingBailMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ROUTINGDETAIL_LABEL.routingConMoney, dataIndex:'routingConMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ROUTINGDETAIL_LABEL.routingDbMoney, dataIndex:'routingDbMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ROUTINGDETAIL_LABEL.routingtime, dataIndex:'routingtime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			},{
				text: ACCOUNT_ROUTINGDETAIL_LABEL.routingLastTime, dataIndex:'routingLastTime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			}
		);
		
		var me = this;
		
		Ext.apply(this, {
			columns : columns,
			viewConfig : {
				emptyText : ACCOUNT_ROUTINGDETAIL_MESSAGE.noDetail
			},
			store : Ext.data.StoreManager.lookup("Module.Account.ledger.store.RoutingDetailStore"),
		});
		
		this.callParent(arguments);
	},

	afterRender : function() {
		var me = this;
		me.updateView(me);
		me.callParent(arguments);
	}
});