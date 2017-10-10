Ext.define('Module.Soul.MassTask.view.UserInfoGrid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.userinfogrid',
	config : {
		massTaskRecord : undefined,
	},
	
	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Soul.MassTask.store.UserStore'
	],
    
	checkIndexes : ['fullName'], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:MASS_USER_PROPERTY.id, dataIndex:'id', searchType:'number', align:'center'
			},{
				text:MASS_USER_PROPERTY.fullName, dataIndex:'fullName', searchType:'string', align:'center'
			},{
				text:MASS_USER_PROPERTY.email, dataIndex:'email', searchType:'string', align:'center'
			},{
				text:MASS_USER_PROPERTY.mobile, dataIndex:'mobile', searchType:'string', align:'center'
			}
		);
		
		// 右击
		var me = this;
		me.contextMenu = Ext.create('Ext.menu.Menu', {
			name : 'taskUseroperationmenu',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: "添加",
					disabled: false,
					name: 'userToTask',
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
				emptyText : ""
			},
			store : Ext.data.StoreManager.lookup("Module.Soul.MassTask.store.UserStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
        
        var callbackFun = function(){
			var taskStore = Ext.data.StoreManager.lookup("Module.Soul.MassTask.store.MassTaskStore");
			taskStore.load();
		};
		

		var masstask = me.getMassTaskRecord();

		var sm = me.selModel;
	
        var addUserButton = me.down('button[name=addUserButton]');
        var rightaddUserButton = me.contextMenu.down('menuitem[name=userToTask]');
        
        
        var doGiveToUserFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length < 1) {
        		Ext.Msg.alert('系统提示','请选择您要发送的用户');
        		return;
        	}	
        	Module.Soul.MassTask.Operation.doAddUserToTaskFunction(masstask, records, callbackFun);
        };
        addUserButton.on('click', doGiveToUserFunc);
        rightaddUserButton.on('click', doGiveToUserFunc);
    }
});