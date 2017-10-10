Ext.define('Module.Account.sysRunPara.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.sysRunParagrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.sysRunPara.Data',
		'Module.Account.sysRunPara.Renderer'
	],
    
	checkIndexes : ['sysRunParaName'], // 默认选择的列
	disableIndexes : [],	//禁止选择的列
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.sysRunPara.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaName, dataIndex:'sysRunParaName', align:'center', flex:1
			},{
				text: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaCode, dataIndex:'sysRunParaCode', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaValue, dataIndex:'sysRunParaValue', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaType, dataIndex:'sysRunParaType', searchType:'combo', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateSysRunParaType(val);
				},
				comboData: [['00','整数'],['10','浮点数'],['20','字符串'],['30','枚举']]
			},{
				text: ACCOUNT_SYSRUNPARA_LABEL.sysRunParaNote, dataIndex:'sysRunParaNote', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildSysRunParaOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

					/*判断编辑按钮是否可用；不可同时编辑两条以上数据*/
					rightEditItem = me.contextMenu.down('menuitem[name=editSysRunPara]');
					topEditItem = me.portlet.down('menuitem[name=editSysRunPara]');
					if(records.length == 1){
						rightEditItem.enable();
						topEditItem.enable();
					}else{
						rightEditItem.disable();
						topEditItem.disable();
					}

					/* 判断删除按钮 */
					topDeleteItem = me.portlet.down('menuitem[name=deletedPara]');
					rightDeleteItem = me.contextMenu.down('menuitem[name=deletedPara]');
					if(records.length >= 1){
						topDeleteItem.enable();
						rightDeleteItem.enable();
					}else{
						topDeleteItem.disable();
						rightDeleteItem.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			columns : columns,
			selModel : sm,
			viewConfig : {
				emptyText : ACCOUNT_SYSRUNPARA_MESSAGE.noSysRunPara
			},
			store : Ext.data.StoreManager.lookup("Module.Account.sysRunPara.store.SysRunParaStore"),
		});
		
		this.callParent(arguments);
	},

	afterRender : function() {
		var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};
        
        var sm = me.selModel;
        var	addSysRunParaItemTop = me.portlet.down('menuitem[name=addSysRunPara]');
        var	addSysRunParaItemRight = me.contextMenu.down('menuitem[name=addSysRunPara]');
        var	editSysRunParaItemTop = me.portlet.down('menuitem[name=editSysRunPara]');
        var	editSysRunParaItemRight = me.contextMenu.down('menuitem[name=editSysRunPara]');
        var deleteSysRunParaItemTop = me.portlet.down('menuitem[name=deletedPara]');
        var	deleteSysRunParaItemRight = me.contextMenu.down('menuitem[name=deletedPara]');

        //新增系统参数
        var addSysRunParaFunc = function() {
        	Module.Account.sysRunPara.Operation.doAddSysRunParaFunction(callbackFun);
        }
        addSysRunParaItemTop.on('click', addSysRunParaFunc);
        addSysRunParaItemRight.on('click', addSysRunParaFunc);

        //编辑系统参数
        var editSysRunParaFunc = function() {
        	var records = sm.getSelection();
        	if(records.length == 1){
        		Module.Account.sysRunPara.Operation.doEditSysRunParaFunction(records[0].data, callbackFun);
        	}
        }
        editSysRunParaItemTop.on('click', editSysRunParaFunc);
        editSysRunParaItemRight.on('click', editSysRunParaFunc);

        //删除系统参数
        var deleteSysRunParaFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length == 1){
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	} else if(records.length > 1){
        		Module.Account.sysRunPara.Operation.doDeleteSysRunParaFunction(records, callbackFun);
        	}
        }
        deleteSysRunParaItemTop.on('click', deleteSysRunParaFunc);
        deleteSysRunParaItemRight.on('click', deleteSysRunParaFunc);
	}
});