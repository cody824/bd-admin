Ext.define('Module.Voucher.userVoucher.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.userVouchergrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Voucher.userVoucher.Data',
		'Module.Voucher.userVoucher.Renderer',
		'Module.Voucher.voucher.Renderer'
	],
    
	checkIndexes : [], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Voucher.userVoucher.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:VOUCHER_USERVOUCHER_LABEL.userVoucherName, dataIndex:'voucher.voucherName', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_USERVOUCHER_LABEL.terraceCode, dataIndex:'terraceCode', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return Module.Voucher.voucher.Renderer.translateTerraceCode(v);
				},
				comboData : VOUCHER_VOUCHER_COMBO.terraceCode
			},{
				text:VOUCHER_USERVOUCHER_LABEL.userVoucherCode, dataIndex:'userVoucherCode', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_USERVOUCHER_LABEL.userVoucherType, dataIndex:'voucher.voucherType', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateVoucherType(v);
				},
				comboData : VOUCHER_VOUCHER_COMBO.voucherType
			},{
				text:VOUCHER_USERVOUCHER_LABEL.userVoucherStatus, dataIndex:'userVoucherStatus', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateUserVoucherStatus(v);
				},
				comboData : VOUCHER_USERVOUCHER_COMBO.userVoucherStatus
			},{
				text:VOUCHER_USERVOUCHER_LABEL.userVoucherSource, dataIndex:'userVoucherSource', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateUserVoucherSource(v);
				},
				comboData : VOUCHER_USERVOUCHER_COMBO.userVoucherSource
			},{
				text:VOUCHER_USERVOUCHER_LABEL.money, dataIndex:'voucher.money', searchType:'number', align:'center', flex:1
			},{
				text:VOUCHER_USERVOUCHER_LABEL.limitMoney, dataIndex:'voucher.limitMoney', searchType:'number', align:'center', flex:1
			},{
				text:VOUCHER_USERVOUCHER_LABEL.userName, dataIndex:'userName', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildUserVoucherOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					var statusT = -1;
					
					/*判断所选状态是否一致*/
					Ext.each(records, function(record, index, rs){
						if (statusT == -1) {
							statusT = record.data.userVoucherStatus;
						} else if (statusT != record.data.userVoucherStatus){
							statusT = -1;
							return false;
						}
					});

					/*判断冻结按钮*/
					var	forceStoppedUserVoucherItemTop = me.portlet.down('menuitem[name=forceStoppedUserVoucher]');
					var	forceStoppedUserVoucherItemRight = me.contextMenu.down('menuitem[name=forceStoppedUserVoucher]');
					if(statusT == "00"){
						forceStoppedUserVoucherItemTop.enable();
						forceStoppedUserVoucherItemRight.enable();
					}else{
						forceStoppedUserVoucherItemTop.disable();
						forceStoppedUserVoucherItemRight.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : VOUCHER_USERVOUCHER_MESSAGE.noVoucher
			},
			store : Ext.data.StoreManager.lookup("Module.Voucher.userVoucher.store.UserVoucherStore"),
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

        //冻结
		var	forceStoppedUserVoucherItemTop = me.portlet.down('menuitem[name=forceStoppedUserVoucher]');
		var	forceStoppedUserVoucherItemRight = me.contextMenu.down('menuitem[name=forceStoppedUserVoucher]');
        var lockedUserVoucherFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if (records.length == 1) {
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	} else if (records.length > 1){
        		Module.Voucher.userVoucher.Operation.doLockUserVoucherFunction(records, callbackFun);
        	}
        };
        forceStoppedUserVoucherItemTop.on('click', lockedUserVoucherFunc);
        forceStoppedUserVoucherItemRight.on('click', lockedUserVoucherFunc);
    }
});