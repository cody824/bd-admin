Ext.define('Module.CMS.advertisement.view.AdvertisementGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.noticegrid',
	config : {
		advRecord : undefined,
	},
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.CMS.advertisement.Data',
		'Module.CMS.advertisement.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
    
	checkIndexes : ['adv_title', 'adv_site'], 
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.CMS.advertisement.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ADV_MANAGE_LABEL.adv_title,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'adv_title', align : 'center',
				
			},
			{
				text: ADV_MANAGE_LABEL.adv_type,width: 100,
				sortable: false, menuDisabled:true, dataIndex: 'adv_type', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateType(val);
				}
			},
			{
				text: ADV_MANAGE_LABEL.adv_site, flex:1,dataIndex:'adv_site', 
				menuDisabled:true, searchType : 'string', align : 'center',
			},
			{
				text : ADV_MANAGE_LABEL.adv_state,width : 100, dataIndex:'adv_state',
				menuDisabled:true, searchType : 'string', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateAdvStatus(val);
				}
			},
			{
				text: ADV_MANAGE_LABEL.state_date,flex:1, searchType : 'date',
				sortable: false, menuDisabled:true, dataIndex: 'state_date', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},
			{
				text: ADV_MANAGE_LABEL.end_date,flex:1, searchType : 'date',
				sortable: false, menuDisabled:true, dataIndex: 'end_date', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},{
				text: ADV_MANAGE_LABEL.actual_end_date,flex:1, dataIndex: 'actual_end_date',
				sortable: false, menuDisabled:true, align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateRevokeTime(val, r);
				}
			},{
				text: ADV_MANAGE_LABEL.oper_user, width: 100,dataIndex: 'oper_user', align : 'center',
			},{
				text : ADV_MANAGE_LABEL.operation, sortable: false, menuDisabled:true,
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateLockIcon(val, u,r, rowIndex, columnIndex - 1, s, v);
				},
				width : 60,
				align : 'center',
				operation : 'release'
			}
		);
		
		var me = this;
		me.contextMenu = Module.CMS.advertisement.Tools.buildAdvertisementOptMenu();

		rightAI = me.contextMenu.down('menuitem[name=addadv]');
		rightEI = me.contextMenu.down('menuitem[name=editadv]');
		rightDI = me.contextMenu.down('menuitem[name=deladv]');
		
		rightAI.setVisible(false);
		rightEI.setVisible(true);
		rightDI.setVisible(true);

		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					
					topEI = me.down('menuitem[name=editadv]');
					
					if (sm2.getCount() == 1) {
						rightEI.enable();
						topEI.enable();
					} else {
						rightEI.disable();
						topEI.disable();
					}

					topDI = me.down('menuitem[name=deladv]');
					
					if (sm2.getCount() > 0) {
						rightDI.enable();
						topDI.enable();
					} else {
						rightDI.disable();
						topDI.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			store : Ext.data.StoreManager.lookup("Module.CMS.advertisement.store.AdvertisementStore"),
			selModel: sm,
			viewConfig : {
				emptyText : ADV_MESSAGE.noAdvertisement
			},
			columns : columns
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
		if(window.console){console.log("test afterRender");}

		var sm = me.selModel,
		addadvItem = me.down('menuitem[name=addadv]');
			editadvItem = me.down('menuitem[name=editadv]');
			deladvItem = me.down('menuitem[name=deladv]');

		var addadvFunc = function(item, e, eOpts){
        	var records = sm.getSelection();

        	Module.CMS.advertisement.Operation.doAddAdvFunction(me.getAdvRecord(), callbackFun);

        };
        me.contextMenu.down('menuitem[name=addadv]').on('click', addadvFunc);
        addadvItem.on('click', addadvFunc);

        var editadvFunc = function(item, e, eOpts){
        	var records = sm.getSelection();

        	Module.CMS.advertisement.Operation.doEditAdvFunction(records[0], callbackFun);

        };
        me.contextMenu.down('menuitem[name=editadv]').on('click', editadvFunc);
        me.down('menuitem[name=editadv]').on('click', editadvFunc);
        editsiteItem.on('click', editadvFunc);

        var deladvFunc = function(item, e, eOpts){
        	var records = sm.getSelection();

        	Module.CMS.advertisement.Operation.doDelAdvFunction(records, callbackFun);

        };
        me.contextMenu.down('menuitem[name=deladv]').on('click', deladvFunc);
        me.down('menuitem[name=deladv]').on('click', deladvFunc);
        delsiteItem.on('click', deladvFunc);

    }
});