Ext.define('Module.Voucher.voucher.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.vouchergrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Voucher.voucher.Data',
		'Module.Voucher.voucher.Renderer'
	],
    
	checkIndexes : [], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Voucher.voucher.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:VOUCHER_VOUCHER_LABEL.voucherName, dataIndex:'voucherName', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_VOUCHER_LABEL.terraceCode, dataIndex:'terraceCode', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateTerraceCode(v);
				},
				comboData : VOUCHER_VOUCHER_COMBO.terraceCode
			},{
				text:VOUCHER_VOUCHER_LABEL.voucherCode, dataIndex:'voucherCode', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_VOUCHER_LABEL.voucherType, dataIndex:'voucherType', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateVoucherType(v);
				},
				comboData : VOUCHER_VOUCHER_COMBO.voucherType
			},{
				text:VOUCHER_VOUCHER_LABEL.voucherStatus, dataIndex:'voucherStatus', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateVoucherStatus(v);
				},
				comboData : VOUCHER_VOUCHER_COMBO.voucherStatus
			},{
				text:VOUCHER_VOUCHER_LABEL.voucherCount, dataIndex:'voucherCount', searchType:'number', align:'center', flex:1
			},{
				text:VOUCHER_VOUCHER_LABEL.voucherActivateCount, dataIndex:'voucherActivateCount', searchType:'number', align:'center', flex:1
			},{
				text:VOUCHER_VOUCHER_LABEL.voucherUseCount, dataIndex:'voucherUseCount', searchType:'number', align:'center', flex:1
			},{
				text:VOUCHER_VOUCHER_LABEL.voucherScopeNote, dataIndex:'voucherScopeNote', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_VOUCHER_LABEL.money, dataIndex:'money', searchType:'number', align:'center', flex:1
			},{
				text:VOUCHER_VOUCHER_LABEL.limitMoney, dataIndex:'limitMoney', searchType:'number', align:'center', flex:1
			},{
				text:VOUCHER_VOUCHER_LABEL.isAutoGet, dataIndex:'isAutoGet', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_VOUCHER_LABEL.userName, dataIndex:'userName', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildVoucherOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					var statusT = -1;
					
					/*判断所选状态是否一致*/
					Ext.each(records, function(record, index, rs){
						if (statusT == -1) {
							statusT = record.data.voucherStatus;
						} else if (statusT != record.data.voucherStatus){
							statusT = -1;
							return false;
						}
					});

					/*判断编辑按钮是否可用；不可同时编辑两条以上数据*/
					/*判断代金券票据管理按钮是否可用；不可同时管理两条以上数据*/
					/*判断给指定用户发放按钮是否可用；不可同时管理两条以上数据*/
					/*判断给全部用户发放按钮是否可用；不可同时管理两条以上数据*/
					var rightEditItem = me.contextMenu.down('menuitem[name=editVoucher]');
					var topEditItem = me.portlet.down('menuitem[name=editVoucher]');
					var manageVoucherBillRight = me.contextMenu.down('menuitem[name=manageVoucherBill]');
					var manageVoucherBillTop = me.portlet.down('menuitem[name=manageVoucherBill]');
					var giveVoucherToUserRight = me.contextMenu.down('menuitem[name=voucherToUser]');
					var giveVoucherToUserTop = me.portlet.down('menuitem[name=voucherToUser]');
					var giveVoucherToAllRight = me.contextMenu.down('menuitem[name=voucherToAll]');
					var giveVoucherToAllTop = me.portlet.down('menuitem[name=voucherToAll]');
					if(records.length == 1){
						rightEditItem.enable();
						topEditItem.enable();
						manageVoucherBillTop.enable();
						manageVoucherBillRight.enable();
						giveVoucherToUserRight.enable();
						giveVoucherToUserTop.enable();
						giveVoucherToAllRight.enable();
						giveVoucherToAllTop.enable();
					}else{
						rightEditItem.disable();
						topEditItem.disable();
						manageVoucherBillTop.disable();
						manageVoucherBillRight.disable();
						giveVoucherToUserRight.disable();
						giveVoucherToUserTop.disable();
						giveVoucherToAllRight.disable();
						giveVoucherToAllTop.disable();
					}

					/*判断暂停&强制停止按钮*/
					var stopVoucherRight = me.contextMenu.down('menuitem[name=stoppedVoucher]');
					var stopVoucherTop = me.portlet.down('menuitem[name=stoppedVoucher]');
					var forcestopVoucherRight = me.contextMenu.down('menuitem[name=forcestoppedVoucher]');
					var forcestopVoucherTop = me.portlet.down('menuitem[name=forcestoppedVoucher]');
					if(records.length == 1){
						stopVoucherRight.enable();
						stopVoucherTop.enable();
						forcestopVoucherRight.enable();
						forcestopVoucherTop.enable();

						if(statusT == "30"){
							stopVoucherRight.setText(VOUCHER_VOUCHER_LABEL.unstopVoucher);
							stopVoucherTop.setText(VOUCHER_VOUCHER_LABEL.unstopVoucher);
						}else{
							stopVoucherRight.setText(VOUCHER_VOUCHER_LABEL.stopVoucher);
							stopVoucherTop.setText(VOUCHER_VOUCHER_LABEL.stopVoucher);
						}
					}else{
						stopVoucherRight.disable();
						stopVoucherTop.disable();
						forcestopVoucherRight.disable();
						forcestopVoucherTop.disable();
					}

					//失效判断
					if(statusT == "99"){
						stopVoucherRight.disable();
						stopVoucherTop.disable();
						forcestopVoucherRight.disable();
						forcestopVoucherTop.disable();
						rightEditItem.disable();
						topEditItem.disable();
						giveVoucherToUserRight.disable();
						giveVoucherToUserTop.disable();
						giveVoucherToAllRight.disable();
						giveVoucherToAllTop.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : VOUCHER_VOUCHER_MESSAGE.noVoucher
			},
			store : Ext.data.StoreManager.lookup("Module.Voucher.voucher.store.VoucherStore"),
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
        var	addVoucherItem = me.portlet.down('menuitem[name=addVoucher]');
        var	editVoucherItem = me.portlet.down('menuitem[name=editVoucher]');

        //新增
        var addVoucherFunc = function(){
        	Module.Voucher.voucher.Operation.doAddVoucherFunction(callbackFun);
        };
        me.contextMenu.down('menuitem[name=addVoucher]').on('click', addVoucherFunc);
        addVoucherItem.on('click', addVoucherFunc);

        //编辑
        var editVoucherFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length == 1) {
        		Module.Voucher.voucher.Operation.doEditVoucherFunction(records[0].data, callbackFun);
        	}
        };
        me.contextMenu.down('menuitem[name=editVoucher]').on('click', editVoucherFunc);
        editVoucherItem.on('click', editVoucherFunc);

        //暂停 & 继续发放
        var stopVoucherRight = me.contextMenu.down('menuitem[name=stoppedVoucher]');
		var stopVoucherTop = me.portlet.down('menuitem[name=stoppedVoucher]');
        var stopVoucherFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length == 1){
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	}
        }
        stopVoucherRight.on('click', stopVoucherFunc);
        stopVoucherTop.on('click', stopVoucherFunc);

        //强制暂停
        var forcestopVoucherRight = me.contextMenu.down('menuitem[name=forcestoppedVoucher]');
		var forcestopVoucherTop = me.portlet.down('menuitem[name=forcestoppedVoucher]');
        var forcestopVoucherFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length == 1){
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	}
        }
        forcestopVoucherRight.on('click', forcestopVoucherFunc);
        forcestopVoucherTop.on('click', forcestopVoucherFunc);

        //代金券 票据管理
        var manageVoucherBillRight = me.contextMenu.down('menuitem[name=manageVoucherBill]');
		var manageVoucherBillTop = me.portlet.down('menuitem[name=manageVoucherBill]');
		var manageVoucherBillFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){
				Module.Voucher.voucher.Operation.doManageVoucherBillFunction(records[0].data, callbackFun);
			}
		}
		manageVoucherBillRight.on('click', manageVoucherBillFunc);
		manageVoucherBillTop.on('click', manageVoucherBillFunc);
		
		//给用户发放代金券
		var giveVoucherToUserRight = me.contextMenu.down('menuitem[name=voucherToUser]');
		var giveVoucherToUserTop = me.portlet.down('menuitem[name=voucherToUser]');
		var giveVoucherToAllRight = me.contextMenu.down('menuitem[name=voucherToAll]');
		var giveVoucherToAllTop = me.portlet.down('menuitem[name=voucherToAll]');
		//type: 0表示全部用户，1代表指定用户
		var giveVoucherToUserFunc = function(){
			var records = sm.getSelection();
			if(records.length == 1){
				Module.Voucher.voucher.Operation.doGiveVoucherToUserFunction(records[0].data, 1, callbackFun);
			}
		};
		var giveVoucherToAllFunc = function(){
			var records = sm.getSelection();
			if(records.length == 1){
				Module.Voucher.voucher.Operation.doGiveVoucherToUserFunction(records[0].data, 0, callbackFun);
			}
		};
		giveVoucherToUserRight.on('click', giveVoucherToUserFunc);
		giveVoucherToUserTop.on('click', giveVoucherToUserFunc);
		giveVoucherToAllRight.on('click', giveVoucherToAllFunc);
		giveVoucherToAllTop.on('click', giveVoucherToAllFunc);
    }
});