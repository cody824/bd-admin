Ext.define('Module.Account.accitem.view.RelationUserGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.relationusergrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.accitem.Data',
		'Module.Account.accitem.Renderer',
		'Module.Account.accitem.Portlet',
		'Module.Account.accitem.store.RelationUserStore',
	],
    
	checkIndexes : [], // 默认选择的列
	disableIndexes : ['relationUseBalna', 'relationHasUseBalna', 'relationTakeBalna', 'relationHasTakeBalna'],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.accitem.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: RELATIONUSER_LABEL.relationName, dataIndex:'relationName', searchType:'string', align:'center', flex:1
			},{
				text: RELATIONUSER_LABEL.relationBoundType, dataIndex:'relationBoundType', searchType:'combo', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateRelationBoundType(val);
				},
				comboData:[['00','手机'],['10','邮箱'],['99','未绑定']]
			},{
				text: RELATIONUSER_LABEL.relationBoundValue, dataIndex:'relationBoundValue', searchType:'string', align:'center', flex:1
			},{
				text: RELATIONUSER_LABEL.relationDate, dataIndex:'relationDate', searchType:'date', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateCdate(val);
				}
			},{
				text: RELATIONUSER_LABEL.terrace, dataIndex:'terrace', searchType:'string', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return val.terraceName;
				}
			},{
				text: RELATIONUSER_LABEL.relationState, dataIndex:'relationState', searchType:'combo', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateRelationUserState(val);
				},
				comboData: [['00','开通'],['20','锁定'],['99','注销']]
			},{
				text: RELATIONUSER_LABEL.relationRemark, dataIndex:'relationRemark', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		me.contextMenu = Module.Account.accitem.Tools.buildRelationUserOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					var statusT = -1;
					
					/*判断所选状态是否一致*/
					Ext.each(records, function(record, index, rs){
						if (statusT == -1) {
							statusT = record.data.relationState;
						} else if (statusT != record.data.relationState){
							statusT = -1;
							return false;
						}
					});
					
					rightMI = me.contextMenu.down('menuitem[name=lockedRelationUser]');
					topMI = me.down('menuitem[name=lockedRelationUser]');
					if (sm2.getCount() > 0 && statusT != -1) {
						if (statusT == Module.Account.accitem.model.AccitemModel.LOCKED){
							rightMI.setText("解锁用户");
							topMI.setText("解锁用户");
						} else {
							rightMI.setText("锁定用户");
							topMI.setText("锁定用户");
						}
						rightMI.enable();
						topMI.enable();
					} else {
						rightMI.disable();
						topMI.disable();
					}

					/*当选中数据大于等于1条时，可以 注销关联账户*/
					rightCancelItem = me.contextMenu.down('menuitem[name=canceledRelationUser]');
					topCancelItem = me.down('menuitem[name=canceledRelationUser]');
					if(records.length >= 1){
						rightCancelItem.enable();
						topCancelItem.enable();
					}else{
						rightCancelItem.disable();
						topCancelItem.disable();
					}

					/* 当选中数据为1条时，可以 查看对账列表 */
        			var listReconciliationItemTop = me.down('menuitem[name=listReconciliation]');
					var listReconciliationItemRight = me.contextMenu.down('menuitem[name=listReconciliation]');
					if(records.length == 1){
						listReconciliationItemTop.enable();
						listReconciliationItemRight.enable();
					}else{
						listReconciliationItemTop.disable();
						listReconciliationItemRight.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : RELATIONUSER_MESSAGE.noRelationUser
			},
			store : Ext.data.StoreManager.lookup("Module.Account.accitem.store.RelationUserStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
		var me = this;
		var sm = me.selModel;
		me.callParent(arguments);
		me.updateView(me);
        
        var callbackFun = function(){
			me.updateView(me);
		};
        
		//lock relationUser
        var topLockItem = me.down('menuitem[name=lockedRelationUser]');
        var rightLockItem = me.contextMenu.down('menuitem[name=lockedRelationUser]');
        var lockRelationUserFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if (records.length == 1) {
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	} else if (records.length > 1){
        		Module.Account.accitem.Operation.doLockRelationUserFunction(records, callbackFun);
        	}
        };
        topLockItem.on('click', lockRelationUserFunc);
        rightLockItem.on('click', lockRelationUserFunc);
        
        //cancel relationUser
        var topCancelItem = me.down('menuitem[name=canceledRelationUser]');
        var rightCancelItem = me.contextMenu.down('menuitem[name=canceledRelationUser]');
        var cancelRelationUserFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if (records.length == 1) {
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	} else if (records.length > 1){
        		Module.Account.accitem.Operation.doCancelRelationUserFunction(records, callbackFun);
        	}
        };
        topCancelItem.on('click', cancelRelationUserFunc);
        rightCancelItem.on('click', cancelRelationUserFunc);

        //查看对账明细
        var listReconciliationItemTop = me.down('menuitem[name=listReconciliation]');
		var listReconciliationItemRight = me.contextMenu.down('menuitem[name=listReconciliation]');
		var listReconciliationFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length == 1){
				Module.Account.accitem.Operation.doListReconciliation('relationId', records[0].data.relationId);
			}
		};
		listReconciliationItemTop.on('click', listReconciliationFunc);
		listReconciliationItemRight.on('click', listReconciliationFunc);
    }
});