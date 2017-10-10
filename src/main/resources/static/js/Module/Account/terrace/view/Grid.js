Ext.define('Module.Account.terrace.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.terracegrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.terrace.Data',
		'Module.Account.terrace.Renderer'
	],
    
	checkIndexes : ['terraceName', 'terraceCode'], // 默认选择的列
	disableIndexes : ['accItemCode', 'accItemCodeGuarantee', 'accItemCode01', 'accItemCode02', 'accItemCode03'],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.terrace.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ACCOUNT_TERRACE_LABEL.terraceName, dataIndex:'terraceName', searchType:'string', align:'left', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"';
					return (Soul.util.GridRendererUtil.getLinkName(renders.getTerraceName(v, u, r, rowIndex, columnIndex - 1, s)));
				}
			},{
				text: ACCOUNT_TERRACE_LABEL.terraceCode, dataIndex:'terraceCode', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_TERRACE_LABEL.terraceDate, dataIndex:'terraceDate', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					if(v == null) {
						return ACCOUNT_TERRACE_LABEL.unknown;
					}
					return renders.translateCdate(v);
				}
			},{
				text: ACCOUNT_TERRACE_LABEL.accItemCode, dataIndex:'accItemCode', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_TERRACE_LABEL.accItemCodeGuarantee, dataIndex:'accItemCodeGuarantee', searchType:'string', align:'center', flex:1
			},{
			// 	text: ACCOUNT_TERRACE_LABEL.accItemCode01, dataIndex:'accItemCode01', searchType:'string', align:'center', flex:1
			// },{
			// 	text: ACCOUNT_TERRACE_LABEL.accItemCode02, dataIndex:'accItemCode02', searchType:'string', align:'center', flex:1
			// },{
			// 	text: ACCOUNT_TERRACE_LABEL.accItemCode03, dataIndex:'accItemCode03', searchType:'string', align:'center', flex:1
			// },{
				text: ACCOUNT_TERRACE_LABEL.accItemLevel, dataIndex:'accItemLevel', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateTerraceLevel(v);
				},
				comboData:[[1,'全部']],
			},{
				text: ACCOUNT_TERRACE_LABEL.terraceState, dataIndex:'terraceState', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateTerraceState(v);
				},
				comboData:[['00','开通'],['10','锁定'],['99','注销']],
			},{
				text: ACCOUNT_TERRACE_LABEL.creatName, dataIndex:'creatName', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildTerraceOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					var statusT = -1;
					
					/*判断所选状态是否一致*/
					Ext.each(records, function(record, index, rs){
						if (statusT == -1) {
							statusT = record.data.terraceState;
						} else if (statusT != record.data.terraceState){
							statusT = -1;
							return false;
						}
					});
					
					rightMI = me.contextMenu.down('menuitem[name=lockedTerrace]');
					topMI = me.portlet.down('menuitem[name=lockedTerrace]');
					if (sm2.getCount() > 0 && statusT != -1) {
						if (statusT == Module.Account.terrace.model.TerraceModel.LOCKED){
							rightMI.setText("解锁平台");
							topMI.setText("解锁平台");
						} else {
							rightMI.setText("锁定平台");
							topMI.setText("锁定平台");
						}
						rightMI.enable();
						topMI.enable();
					} else {
						rightMI.disable();
						topMI.disable();
					}

					/*判断编辑按钮是否可用；不可同时编辑两条以上数据*/
					rightEditItem = me.contextMenu.down('menuitem[name=editTerrace]');
					topEditItem = me.portlet.down('menuitem[name=editTerrace]');
					if(records.length == 1){
						rightEditItem.enable();
						topEditItem.enable();
					}else{
						rightEditItem.disable();
						topEditItem.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : ACCOUNT_TERRACE_MESSAGE.noTerrace
			},
			store : Ext.data.StoreManager.lookup("Module.Account.terrace.store.TerraceStore"),
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
        var	addTerraceItem = me.portlet.down('menuitem[name=addTerrace]');
        var	editTerraceItem = me.portlet.down('menuitem[name=editTerrace]');
        var	lockItem = me.portlet.down('menuitem[name=lockedTerrace]');
        
        //锁定 && 解锁
        var lockTerraceFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if (records.length == 1) {
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	} else if (records.length > 1){
        		Module.Account.terrace.Operation.doLockTerraceFunction(records, callbackFun);
        	}
        };
        me.contextMenu.down('menuitem[name=lockedTerrace]').on('click', lockTerraceFunc);
        lockItem.on('click', lockTerraceFunc);

        //新增
        var addTerraceFunc = function(){
        	Module.Account.terrace.Operation.doAddTerraceFunction(callbackFun);
        };
        me.contextMenu.down('menuitem[name=addTerrace]').on('click', addTerraceFunc);
        addTerraceItem.on('click', addTerraceFunc);

        //编辑
        var editTerraceFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length == 1) {
        		Module.Account.terrace.Operation.doEditTerraceFunction(records[0].data, callbackFun);
        	}
        };
        me.contextMenu.down('menuitem[name=editTerrace]').on('click', editTerraceFunc);
        editTerraceItem.on('click', editTerraceFunc);
    }
});