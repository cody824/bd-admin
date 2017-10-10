Ext.define('Module.Account.accitem.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.accitemgrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.accitem.Data',
		'Module.Account.accitem.Renderer'
	],
    
	checkIndexes : ['accMenAcc.memAccName'], // 默认选择的列
	disableIndexes : ['accItemAllBalna', 'accItemUseBalna', 'accItemBailBalna'],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.accitem.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ACCITEM_LABEL.memAccName, dataIndex:'accMenAcc.memAccName', searchType:'string', align:'left', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"';
					return (Soul.util.GridRendererUtil.getLinkName(renders.getAccitemName(v, u, r, rowIndex, columnIndex - 1, s)));
				}
			},{
				text: ACCITEM_LABEL.accItemCode, dataIndex:'accItemCode', searchType:'string', align:'center', flex:1
			},{
				text: ACCITEM_LABEL.accItemAllBalna, dataIndex:'accItemAllBalna', searchType:'string', align:'center', flex:1
			},{
				text: ACCITEM_LABEL.accItemUseBalna, dataIndex:'accItemUseBalna', searchType:'string', align:'center', flex:1
			},{
			// 	text: ACCITEM_LABEL.accItemBailBalna, dataIndex:'accItemBailBalna', searchType:'string', align:'center', flex:1
			// },{
				text: ACCITEM_LABEL.accItemState, dataIndex:'accItemState', searchType:'combo', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateAccitemState(val);
				},
				comboData:[['00','开通'],['20','锁定'],['30','注销']]
			},{
				text: ACCITEM_LABEL.accItemDate, dataIndex:'accItemDate', searchType:'string', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateCdate(val);
				}
			},{
				text : ACCITEM_LABEL.lockAccitem, sortable: false, menuDisabled:true,
				width : 60,
				align : 'center',
				operation : 'lockedAccitem',
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateAccitemLockIcon(val, u, r, rowIndex, columnIndex - 1, s, v);
				}
			},{
				text : ACCITEM_LABEL.cancelAccitem, sortable: false, menuDisabled:true,
				width : 60,
				align : 'center',
				operation : 'canceledAccitem',
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateAccitemCancelIcon(val, u, r, rowIndex, columnIndex - 1, s, v);
				}
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildAccitemOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					var statusT = -1;	//判断锁定&解锁
					var statusT2 = -1;	//判断注销
					
					/*判断所选状态是否一致*/
					Ext.each(records, function(record, index, rs){
						if(record.data.accItemState == Module.Account.accitem.model.AccitemModel.CANCELLED){
							statusT2 = Module.Account.accitem.model.AccitemModel.CANCELLED;
						}

						if (statusT == -1) {
							statusT = record.data.accItemState;
						} else if (statusT != record.data.accItemState){
							statusT = -1;
							return false;
						}
					});
					
					var topLockItem = me.portlet.down('menuitem[name=lockedAccitem]');
					var rightLockItem = me.contextMenu.down('menuitem[name=lockedAccitem]');
					if (sm2.getCount() > 0 && statusT != -1) {
						if (statusT == Module.Account.accitem.model.AccitemModel.LOCKED){
							rightLockItem.setText("解锁用户");
							topLockItem.setText("解锁用户");

							rightLockItem.enable();
							topLockItem.enable();
						} else if(statusT == Module.Account.accitem.model.AccitemModel.ACTIVE){
							rightLockItem.setText("锁定用户");
							topLockItem.setText("锁定用户");

							rightLockItem.enable();
							topLockItem.enable();
						} else {
							rightLockItem.disable();
							topLockItem.disable();
						}
					} else {
						rightLockItem.disable();
						topLockItem.disable();
					}


					/* 当数据中有已经注销的条目时，注销按钮不可用，其他情况下都可以使用 */
					var topCancelItem = me.portlet.down('menuitem[name=canceledAccitem]');
        			var rightCancelItem = me.contextMenu.down('menuitem[name=canceledAccitem]');
        			if (sm2.getCount() > 0 && statusT2 == -1) {
        				topCancelItem.enable();
        				rightCancelItem.enable();
        			} else {
        				topCancelItem.disable();
        				rightCancelItem.disable();
        			}

					/* 当选中一条数据的时候，能够查看账户明细 和 对账明细 */
					var listRelationUserItemTop = me.portlet.down('menuitem[name=listRelationUser]');
					var listRelationUserItemRight = me.contextMenu.down('menuitem[name=listRelationUser]');
					var listReconciliationItemTop = me.portlet.down('menuitem[name=listReconciliation]');
					var listReconciliationItemRight = me.contextMenu.down('menuitem[name=listReconciliation]');
					var listAccCondetaItemTop = me.portlet.down('menuitem[name=listAccCondeta]');
					var listAccCondetaItemRight = me.contextMenu.down('menuitem[name=listAccCondeta]');
										
					var doTransferTop = me.portlet.down('menuitem[name=doTransfer]');
					var doTransferRight = me.contextMenu.down('menuitem[name=doTransfer]');
							
					if(records.length == 1){
						listRelationUserItemTop.enable();
						listRelationUserItemRight.enable();
						listReconciliationItemTop.enable();
						listReconciliationItemRight.enable();
						listAccCondetaItemTop.enable();
						listAccCondetaItemRight.enable();		
						doTransferTop.enable();
						doTransferRight.enable();
						
					}else{
						listRelationUserItemTop.disable();
						listRelationUserItemRight.disable();
						listReconciliationItemTop.disable();
						listReconciliationItemRight.disable();
						listAccCondetaItemTop.disable();
						listAccCondetaItemRight.disable();
						doTransferTop.disable();
						doTransferRight.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : ACCITEM_MESSAGE.noAccitem
			},
			store : Ext.data.StoreManager.lookup("Module.Account.accitem.store.AccitemStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
		var me = this;
		var sm = me.selModel;
		me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};
        
		//锁定&解锁账户
        var topLockItem = me.portlet.down('menuitem[name=lockedAccitem]');
        var rightLockItem = me.contextMenu.down('menuitem[name=lockedAccitem]');
        var lockAccitemFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if (records.length == 1) {
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	} else if (records.length > 1){
        		Module.Account.accitem.Operation.doLockAccitemFunction(records, callbackFun);
        	}
        };
        topLockItem.on('click', lockAccitemFunc);
        rightLockItem.on('click', lockAccitemFunc);
        
        //注销账户
        var topCancelItem = me.portlet.down('menuitem[name=canceledAccitem]');
        var rightCancelItem = me.contextMenu.down('menuitem[name=canceledAccitem]');
        var cancelAccitemFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if (records.length == 1) {
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	} else if (records.length > 1){
        		Module.Account.accitem.Operation.doCancelAccitemFunction(records, callbackFun);
        	}
        };
        topCancelItem.on('click', cancelAccitemFunc);
        rightCancelItem.on('click', cancelAccitemFunc);

        //查看用户明细
		var listRelationUserItemTop = me.portlet.down('menuitem[name=listRelationUser]');
		var listRelationUserItemRight = me.contextMenu.down('menuitem[name=listRelationUser]');
		var listRelationUserFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){
				Module.Account.accitem.Operation.doListRelationUser(records[0].data.accItemId);
			}
		};
        listRelationUserItemTop.on('click', listRelationUserFunc);
        listRelationUserItemRight.on('click', listRelationUserFunc);

        //查看对账明细
        var listReconciliationItemTop = me.portlet.down('menuitem[name=listReconciliation]');
		var listReconciliationItemRight = me.contextMenu.down('menuitem[name=listReconciliation]');
		var listReconciliationFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){
				Module.Account.accitem.Operation.doListReconciliation('accItemId', records[0].data.accItemId);
			}
		};
		listReconciliationItemTop.on('click', listReconciliationFunc);
		listReconciliationItemRight.on('click', listReconciliationFunc);

		//查看冻结明细
		var listAccCondetaItemTop = me.portlet.down('menuitem[name=listAccCondeta]');
		var listAccCondetaItemRight = me.contextMenu.down('menuitem[name=listAccCondeta]');
		var listAccCondetaFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){
				Module.Account.accitem.Operation.doListAccCondetaFunction('accItemId', records[0].data.accItemId);
			}
		}
		listAccCondetaItemTop.on('click', listAccCondetaFunc);
		listAccCondetaItemRight.on('click', listAccCondetaFunc);
		
		
		var doTransferTop = me.portlet.down('menuitem[name=doTransfer]');
		var doTransferRight = me.contextMenu.down('menuitem[name=doTransfer]');
		var doTransferFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){	
				Module.Account.accitem.Operation.doTransferFunction(records[0], callbackFun);			
			}
		}
		doTransferTop.on('click', doTransferFunc);
		doTransferRight.on('click', doTransferFunc);
		
    }
});