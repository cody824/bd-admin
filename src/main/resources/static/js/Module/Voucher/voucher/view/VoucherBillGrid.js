Ext.define('Module.Voucher.voucher.view.VoucherBillGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.voucherbillgrid',
	
	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Voucher.voucher.Data',
		'Module.Voucher.voucher.Renderer',
		'Module.Voucher.voucher.store.VoucherBillStore'
	],
    
	checkIndexes : [], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Voucher.voucher.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:VOUCHER_BILL_LABEL.voucherBillCode, dataIndex:'voucherBillCode', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_BILL_LABEL.voucherBillPassword, dataIndex:'voucherBillPassword', searchType:'string', align:'center', flex:1
			},{
				text:VOUCHER_BILL_LABEL.voucherBillStatus, dataIndex:'voucherBillStatus', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateVoucherBillStatus(v);
				},
				comboData : VOUCHER_BILL_COMBO.voucherBillStatus
			},{
				text:VOUCHER_BILL_LABEL.voucherBillActivateTime, dataIndex:'voucherBillActivateTime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			},{
				text:VOUCHER_BILL_LABEL.voucherBillCreator, dataIndex:'voucherBillCreator', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					var statusT = -1;
					
					/*判断所选状态是否一致*/
					Ext.each(records, function(record, index, rs){
						if (statusT == -1) {
							statusT = record.data.voucherBillStatus;
						} else if (statusT != record.data.voucherBillStatus){
							statusT = -1;
							return false;
						}
					});
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : VOUCHER_BILL_MESSAGE.noVoucherBill
			},
			store : Ext.data.StoreManager.lookup("Module.Voucher.voucher.store.VoucherBillStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
        
        var callbackFun = function(){
			me.updateView(me);
		};

		var sm = me.selModel;
        var addVoucherBillItem = me.down('button[name=addVoucherBillButton]');
        var doAddVoucherBillFunc = function(item, e, eOpts){
        	Module.Voucher.voucher.Operation.doAddVoucherBillFunction(me.voucherId, me.voucherName, callbackFun);
        }
        addVoucherBillItem.on('click', doAddVoucherBillFunc);

		var exportVoucherBillItem = me.down('button[name=exportVoucherBillButton]');
		var doExportVoucherBillFunc = function(item, e, eOpts){
			var exportUrl = '/voucher/voucherBill/' + me.voucherId+'/download';
			location.href = exportUrl;
		}
		exportVoucherBillItem.on('click', doExportVoucherBillFunc);
    }
});