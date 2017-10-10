Ext.define('Module.Account.sysAccCheck.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.checkinggrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.sysAccCheck.Data',
		'Module.Account.sysAccCheck.Renderer'
	],
    
	checkIndexes : ['checkingName', 'checkingCode'], // 默认选择的列
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.sysAccCheck.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
			// 	text: ACCOUNT_CHECKING_LABEL.checkingId, dataIndex:'checkingId', searchType:'string', align:'left', flex:1,
			// 	renderer : function(v, u, r, rowIndex, columnIndex, s){
			// 		u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"';
			// 		return (Soul.util.GridRendererUtil.getLinkName(renders.getCheckingName(v, u, r, rowIndex, columnIndex - 1, s)));
			// 	}
			// },{
				text: ACCOUNT_CHECKING_LABEL.checkingType, dataIndex:'checkingType', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCheckingType(v);
				},
				comboData: [['00','人工对账'],['10','系统对账']]
			},{
				text: ACCOUNT_CHECKING_LABEL.checkingIsOk, dataIndex:'checkingIsOk', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCheckingIsOK(v);
				},
				comboData: [['Y','是'],['N','否']]
			},{
				text: ACCOUNT_CHECKING_LABEL.checkingState, dataIndex:'checkingState', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCheckingState(v);
				},
				comboData: [['00','无需处理'],['10','待处理'],['20','已处理']]
			},{
				text: ACCOUNT_CHECKING_LABEL.checkingDis, dataIndex:'checkingDis', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_CHECKING_LABEL.checkingDoDis, dataIndex:'checkingDoDis', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_CHECKING_LABEL.checkingName, dataIndex:'checkingName', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_CHECKING_LABEL.checkingTime, dataIndex:'checkingTime', searchType:'string', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildCheckingOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

					var processSysAccCheckRight = me.contextMenu.down('menuitem[name=processSysAccCheck]');
					var processSysAccCheckTop = me.portlet.down('menuitem[name=processSysAccCheck]');
					if(records.length == 1){
						var record = records[0];
						if(record.data.checkingState == Module.Account.sysAccCheck.model.CheckingModel.TOPROCESS){
							processSysAccCheckRight.enable();
							processSysAccCheckTop.enable();
						}else{
							processSysAccCheckRight.disable();
							processSysAccCheckTop.disable();
						}
					}else{
						processSysAccCheckRight.disable();
						processSysAccCheckTop.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : ACCOUNT_CHECKING_MESSAGE.noChecking
			},
			store : Ext.data.StoreManager.lookup("Module.Account.sysAccCheck.store.CheckingStore"),
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
        var addSysAccCheckTop = me.portlet.down('menuitem[name=addSysAccCheck]');
        var addSysAccCheckRight = me.contextMenu.down('menuitem[name=addSysAccCheck]');
        var processSysAccCheckTop = me.portlet.down('menuitem[name=processSysAccCheck]');
		var processSysAccCheckRight = me.contextMenu.down('menuitem[name=processSysAccCheck]');

		//新增人工对账
        var addSysAccCheckFunc = function(item, e, eOpts){
			Module.Account.sysAccCheck.Operation.doAddSysAccCheckFunc(callbackFun);
        };
        addSysAccCheckTop.on('click', addSysAccCheckFunc);
        addSysAccCheckRight.on('click', addSysAccCheckFunc);


        //处理对账
        var processSysAccCheckFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length == 1) {
        		Module.Account.sysAccCheck.Operation.doProcessSysAccCheckFunc(records[0].data, callbackFun);
        	}
        };
        processSysAccCheckTop.on('click', processSysAccCheckFunc);
        processSysAccCheckRight.on('click', processSysAccCheckFunc);
    }
});