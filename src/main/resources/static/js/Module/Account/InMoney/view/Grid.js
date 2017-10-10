Ext.define('Module.Account.InMoney.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.AccInBarohgrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.InMoney.Data',
		'Module.Account.InMoney.Renderer'
	],
    
	checkIndexes : ['relationUser.relationName'], // 默认选择的列
	disableIndexes : ['relationUser.terrace.terraceName', 'inbarohMoney', 'inbarohBackSeq', 'inbarohBackCode'],	//禁止选择的列
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.InMoney.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ACCOUNT_ACCINBARON_LABEL.terraceName, dataIndex:'relationUser.terrace.terraceName', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ACCINBARON_LABEL.relationName, dataIndex:'relationUser.relationName', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ACCINBARON_LABEL.inbarohCode, dataIndex:'inbarohCode', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ACCINBARON_LABEL.inbarohType, dataIndex:'inbarohType', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateAccInBarohType(v);
				},
				comboData:[['00','线下汇款'],['10','第三方法支付'],['20','企业网银'],['30','银企直连']]
			},{
				text: ACCOUNT_ACCINBARON_LABEL.inbarohMoney, dataIndex:'inbarohMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_ACCINBARON_LABEL.inbarohOrgan, dataIndex:'inbarohOrgan', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateAccInBarohOrgan(v);
				},
				comboData:[['F','机构端'],['B','银行']]
			},{
			// 	text: ACCOUNT_ACCINBARON_LABEL.inbarohBackSeq, dataIndex:'inbarohBackSeq', searchType:'string', align:'center', flex:1
			// },{
			// 	text: ACCOUNT_ACCINBARON_LABEL.inbarohBackCode, dataIndex:'inbarohBackCode', searchType:'string', align:'center', flex:1
			// },{
				text: ACCOUNT_ACCINBARON_LABEL.inbarohTime, dataIndex:'inbarohTime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					if(v == null) {
						return ACCOUNT_ACCINBARON_LABEL.unknown;
					}
					return renders.translateCtime(v);
				}
			},{
				text: ACCOUNT_ACCINBARON_LABEL.inbarohRemark, dataIndex:'inbarohRemark', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		
		Ext.apply(this, {
			columns : columns,
			viewConfig : {
				emptyText : ACCOUNT_ACCINBARON_MESSAGE.noAccInBaron
			},
			store : Ext.data.StoreManager.lookup("Module.Account.InMoney.store.AccInBarohStore"),
		});
		
		this.callParent(arguments);
	},
});