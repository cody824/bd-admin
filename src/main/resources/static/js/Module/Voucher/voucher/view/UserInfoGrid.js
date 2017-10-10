Ext.define('Module.Voucher.voucher.view.UserInfoGrid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.userinfogrid',
	config : {
		voucherRecord : undefined,
	},
	
	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Voucher.voucher.store.UserStore'
	],
    
	checkIndexes : ['fullName'], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:VOUCHER_USER_PROPERTY.id, dataIndex:'id', searchType:'number', align:'center'
			},{
				text:VOUCHER_USER_PROPERTY.fullName, dataIndex:'fullName', searchType:'string', align:'center'
			}
		);
		
		// 右击
		var me = this;
		me.contextMenu = Ext.create('Ext.menu.Menu', {
			name : 'voucheruseroperationmenu',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: VOUCHER_USER_LABEL.giveVoucher,
					disabled: false,
					name: 'giveVoucherButton',
					iconCls: 'x-add-icon'
				}]
		});
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : VOUCHER_USER_MESSAGE.empty
			},
			store : Ext.data.StoreManager.lookup("Module.Voucher.voucher.store.UserStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
        
        var callbackFun = function(){
			var voucherStore = Ext.data.StoreManager.lookup("Module.Voucher.voucher.store.VoucherStore");
			voucherStore.load();
		};
		
		var voucher = me.getVoucherRecord();

		var sm = me.selModel;
        var topGiveToUserItem = me.down('button[name=giveVoucherButton]');
        var rightGiveToUserItem = me.contextMenu.down('menuitem[name=giveVoucherButton]');
        var doGiveToUserFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length < 1) {
        		Ext.Msg.alert('系统提示','请选择您要发送的用户');
        		return;
        	}
        	Module.Voucher.voucher.Operation.doAddVoucherToUserFunction(records, 1, voucher, callbackFun);
        };
        topGiveToUserItem.on('click', doGiveToUserFunc);
        rightGiveToUserItem.on('click', doGiveToUserFunc);
    }
});