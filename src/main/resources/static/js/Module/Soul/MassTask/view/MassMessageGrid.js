Ext.define('Module.Soul.MassTask.view.MassMessageGrid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.MassMessageGrid',
	config : {
		massTaskRecord : undefined
	},
	
	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Soul.MassTask.store.MassMessageStore'
	],
    
	checkIndexes : ['userName'], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
	    var renders = Module.Soul.MassTask.Renderer;
	    var comboData = Module.Soul.MassTask.Config.COMBO_DATA;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:MASS_MESSAGE_PROPERTY.id, dataIndex:'id', searchType:'number', align:'center'
			},{
				text:MASS_MESSAGE_PROPERTY.userName, dataIndex:'userName', searchType:'string', align:'center'
			},{
	                text: MASS_MESSAGE_PROPERTY.type,
	                dataIndex: 'type',
	                searchType: 'combo',
	                align: 'center',
	                width: 100,
	                renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                    return renders.translateTaskType(v);
	                },
	                comboData: comboData.taskType
	                
			  },{
	                text: MASS_TASK_PROPERTY.status,
	                dataIndex: 'status',
	                searchType: 'combo',
	                align: 'center',
	                width: 100,
	                renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                    return renders.translateTaskStatus(v);
	                },
	               comboData: comboData.messStatus
			},{
				text:MASS_MESSAGE_PROPERTY.phone, dataIndex:'phone', searchType:'string', align:'center'
			},{
				text:MASS_MESSAGE_PROPERTY.email, dataIndex:'email', searchType:'string', align:'center'
			},{
				text:MASS_MESSAGE_PROPERTY.wechat, dataIndex:'wechat', searchType:'string', align:'center'
		    }, {
	                text: MASS_TASK_PROPERTY.ctime,
	                dataIndex: 'ctime',
	                searchType: 'date',
	                align: 'center',
	                width: 150,
	                renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                    var val = new Date(v);
	                    return Ext.util.Format.date(val, 'Y-m-d H:i:s');
	                }
		    }, {
                text: MASS_TASK_PROPERTY.utime,
                dataIndex: 'utime',
                searchType: 'date',
                align: 'center',
                width: 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    var val = new Date(v);
                    return Ext.util.Format.date(val, 'Y-m-d H:i:s');
                }
			},{
				text:MASS_MESSAGE_PROPERTY.content, dataIndex:'content', searchType:'string', align:'center'
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
					text: "删除",
					disabled: false,
					name: 'delMessage',
					iconCls: 'x-del-icon'
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
			store : Ext.data.StoreManager.lookup("Module.Soul.MassTask.store.MassMessageStore")
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
        var callbackFun = function(isSingle){
			var taskStore = Ext.data.StoreManager.lookup("Module.Soul.MassTask.store.MassTaskStore");
			taskStore.load();
			
			var current=1;
			if(isSingle)
			{			
				current = me.store.currentPage;
				var lm =(me.store.totalCount-1)%me.store.trailingBufferZone;
				if(lm==0)
				{
					current=current-1;			
				}
			}

	        if (me.fireEvent('beforechange', me, current) !== false) {
	            me.store.loadPage(current);
	        }
			
		};
		var masstask = me.getMassTaskRecord();
		
		var sm = me.selModel;
	
        var delMessageButton = me.down('button[name=delMessageTop]');
        var rightdelMessagerButton = me.contextMenu.down('menuitem[name=delMessage]');
        
        
        var delMessagerFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length < 1) {
        		Ext.Msg.alert('系统提示','请选择您要删除的消息！');
        		return;
        	}	
        	var isSingle=false;
        	if(records.length==1)
        		isSingle=true;
        	
        	var backFun = function(){
        		callbackFun(isSingle)
    		};
        	
        	Module.Soul.MassTask.Operation.doDelMessageFunction(records,masstask,backFun);
        };
        delMessageButton.on('click', delMessagerFunc);
        rightdelMessagerButton.on('click', delMessagerFunc);
	
    }
});