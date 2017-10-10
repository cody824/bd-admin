Ext.define('Module.Account.outMoney.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.outMoneygrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.outMoney.Data',
		'Module.Account.outMoney.Renderer'
	],
    
	checkIndexes : ['relationUser.relationName'], // 默认选择的列
	disableIndexes : ['relationUser.terrace.terraceName', 'outbarohMoney', 'outbarohBackSeq', 'outbarohBackCode'],	//禁止选择的列
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.outMoney.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ACCOUNT_ACCOUTBARON_LABEL.terraceName, dataIndex:'relationUser.terrace.terraceName', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ACCOUTBARON_LABEL.relationName, dataIndex:'relationUser.relationName', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ACCOUTBARON_LABEL.outbarohCode, dataIndex:'outbarohCode', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ACCOUTBARON_LABEL.outbarohType, dataIndex:'outbarohType', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateAccOutBarohType(v);
				},
				comboData:[['00','申请出金-线下汇款'],['01','申请出金-第三方支付'],['02','申请出金-网银转账'],['10','实时出金-第三方支付'],['11','实时出金-银企直连']]
			},{
				text: ACCOUNT_ACCOUTBARON_LABEL.outbarohMoney, dataIndex:'outbarohMoney', searchType:'string', align:'center', flex:1
			},{
			// 	text: ACCOUNT_ACCOUTBARON_LABEL.outbarohBackSeq, dataIndex:'outbarohBackSeq', searchType:'string', align:'center', flex:1
			// },{
			// 	text: ACCOUNT_ACCOUTBARON_LABEL.outbarohBackCode, dataIndex:'outbarohBackCode', searchType:'string', align:'center', flex:1
			// },{
				text: ACCOUNT_ACCOUTBARON_LABEL.outbarohTime, dataIndex:'outbarohTime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					if(v == null) {
						return ACCOUNT_ACCOUTBARON_LABEL.unknown;
					}
					return renders.translateCtime(v);
				}
			},{
				text: ACCOUNT_ACCOUTBARON_LABEL.outbarohRemark, dataIndex:'outbarohRemark', searchType:'string', align:'center', flex:1
			}			
		);

		Ext.apply(this, {
			columns : columns,
			viewConfig : {
				emptyText : ACCOUNT_ACCOUTBARON_MESSAGE.noAccOutBaron
			},
			store : Ext.data.StoreManager.lookup("Module.Account.outMoney.store.AccOutBarohStore"),
		});
		
		this.callParent(arguments);
	}
});
