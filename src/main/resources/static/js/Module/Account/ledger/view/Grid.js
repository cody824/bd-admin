Ext.define('Module.Account.ledger.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.ledgergrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.ledger.Data',
		'Module.Account.ledger.Renderer'
	],
    
	checkIndexes : ['ledgerName', 'ledgerCode'], // 默认选择的列
	disableIndexes : ['inuseAccItemCount', 'terraceTotalMoney', 'terraceOwnMoney',
					'lastTerraceTotalMoney', 'lastTerraceOwnMoney', 'changeMoney'],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.ledger.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ACCOUNT_LEDGER_LABEL.terraceName, dataIndex:'terraceName', searchType:'string', align:'left', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"';
					return (Soul.util.GridRendererUtil.getLinkName(renders.getLedgerName(v, u, r, rowIndex, columnIndex - 1, s)));
				}
			},{
				text: ACCOUNT_LEDGER_LABEL.inuseAccItemCount, dataIndex:'inuseAccItemCount', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_LEDGER_LABEL.terraceTotalMoney, dataIndex:'terraceTotalMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_LEDGER_LABEL.terraceOwnMoney, dataIndex:'terraceOwnMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_LEDGER_LABEL.time, dataIndex:'time', searchType:'string', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			},{
				text: ACCOUNT_LEDGER_LABEL.lastTerraceTotalMoney, dataIndex:'lastTerraceTotalMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_LEDGER_LABEL.lastTerraceOwnMoney, dataIndex:'lastTerraceOwnMoney', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_LEDGER_LABEL.lastTime, dataIndex:'lastTime', searchType:'string', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			},{
				text: ACCOUNT_LEDGER_LABEL.changeMoney, dataIndex:'changeMoney', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildLedgerOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

					/* 当选中的代码为一条时，可以查看 总账明细 & 分账明细 */
					var topViewMoreDetailItem = me.portlet.down('menuitem[name=viewMoreDetail]');
					var rightViewMoreDetailItem = me.contextMenu.down('menuitem[name=viewMoreDetail]');
					if(records.length == 1){
						topViewMoreDetailItem.enable();
						rightViewMoreDetailItem.enable();
					}else{
						topViewMoreDetailItem.disable();
						rightViewMoreDetailItem.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			columns : columns,
			selModel : sm,
			viewConfig : {
				emptyText : ACCOUNT_LEDGER_MESSAGE.noLedger
			},
			store : Ext.data.StoreManager.lookup("Module.Account.ledger.store.LedgerStore"),
		});
		
		this.callParent(arguments);
	},

	afterRender: function() {
		var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};
        
        var sm = me.selModel;

        //查看更多明细
		var topViewMoreDetailItem = me.portlet.down('menuitem[name=viewMoreDetail]');
		var rightViewMoreDetailItem = me.contextMenu.down('menuitem[name=viewMoreDetail]');
		var viewMoreDetailFunc = function(item, e, eOpts){
			var records = sm.getSelection();
        	if(records.length == 1) {
        		if(records[0].data.terraceId == null){
        			Module.Account.ledger.Operation.doViewFundHistoryFunction(callbackFun);
        		}else{
        			ACCOUNT_LEDGER_LABEL.viewRoutingDetail = records[0].data.terraceName + ' 明细';
        			Module.Account.ledger.Operation.doViewRoutingDetailFunc(records[0].data.terraceId, callbackFun);
        		}
        	}
		}
		topViewMoreDetailItem.on('click', viewMoreDetailFunc);
		rightViewMoreDetailItem.on('click', viewMoreDetailFunc);

/**
        //查看总账明细
		var topFundHistoryItem = me.portlet.down('menuitem[name=viewFundHistory]');
		var rightFundHistoryItem = me.contextMenu.down('menuitem[name=viewFundHistory]');
		var viewFundHistoryFunc = function(item, e, eOpts){
			var records = sm.getSelection();
        	if(records.length == 1) {
        		Module.Account.ledger.Operation.doViewFundHistoryFunction(callbackFun);
        	}
		}
		topFundHistoryItem.on('click', viewFundHistoryFunc);
		rightFundHistoryItem.on('click', viewFundHistoryFunc);

        //查看分账明细
		var topRoutingDetailItem = me.portlet.down('menuitem[name=viewRoutingDetail]');
		var rightRoutingDetailItem = me.contextMenu.down('menuitem[name=viewRoutingDetail]');
		var viewRoutingDetailFunc = function(item, e, eOpts){
			var records = sm.getSelection();
        	if(records.length == 1) {
        		Module.Account.ledger.Operation.doViewRoutingDetailFunc(records[0].data.terraceId, callbackFun);
        	}
		}
		topRoutingDetailItem.on('click', viewRoutingDetailFunc);
		rightRoutingDetailItem.on('click', viewRoutingDetailFunc);
**/
	}
});