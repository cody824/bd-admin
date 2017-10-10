
Ext.define('Module.CMS.advertisement.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.noticegrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.CMS.advertisement.Data',
		'Module.CMS.advertisement.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
    
	checkIndexes : ['adv_site', 'site_desc'], 
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.CMS.advertisement.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ADV_MANAGE_LABEL.adv_code,width: 100, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'adv_code', align : 'center',
				renderer : function(v, u,r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
					return (Soul.util.GridRendererUtil.getLinkName(Module.CMS.advertisement.Renderer.getAdvertisementCode(v, u,r, rowIndex, columnIndex - 1, s)));
				}
			},
			{
				text : ADV_MANAGE_LABEL.adv_site,flex:1, dataIndex:'adv_site',
				menuDisabled:true, searchType : 'string', align : 'center',
			},
			{
				text: ADV_MANAGE_LABEL.site_desc,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'site_desc', align : 'center',
			},
			{
				text: ADV_MANAGE_LABEL.price_desc,width: 100, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'price_desc', align : 'center',
			},{
				text: ADV_MANAGE_LABEL.adv_released,width: 100, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'adv_released', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return Module.CMS.advertisement.Renderer.translateReleasedAdv(val, u,r);
				}
			},{
				text: ADV_MANAGE_LABEL.adv_status,width: 100, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'adv_status', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return Module.CMS.advertisement.Renderer.translateSiteStatus(val, u,r);
				}
			},{
				text: ADV_MANAGE_LABEL.site_width, width: 100,dataIndex: 'site_width', align : 'center',
			},{
				text: ADV_MANAGE_LABEL.site_height, width: 100,dataIndex: 'site_height', align : 'center',
			},{
				text: ADV_MANAGE_LABEL.oper_user, width: 100,dataIndex: 'oper_user_id', align : 'center',
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildSiteOptMenu();

		rightA = me.contextMenu.down('menuitem[name=addsite]');
		rightEI = me.contextMenu.down('menuitem[name=editsite]');
		topEI = me.portlet.down('menuitem[name=editsite]');
		rightDI = me.contextMenu.down('menuitem[name=delsite]');
		topDI = me.portlet.down('menuitem[name=delsite]');
		rightAI = me.contextMenu.down('menuitem[name=addadv]');
		topAI = me.portlet.down('menuitem[name=addadv]');
		rightVI = me.contextMenu.down('menuitem[name=viewadv]');
		topVI = me.portlet.down('menuitem[name=viewadv]');

		rightA.setVisible(false);
		topEI.setVisible(false);
		topDI.setVisible(false);
		topAI.setVisible(false);
		topVI.setVisible(false);

		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					
					if (sm2.getCount() == 1) {
						rightEI.enable();
						topEI.enable();
						rightAI.enable();
						topAI.enable();
						rightVI.enable();
						topVI.enable();
					} else {
						rightEI.disable();
						topEI.disable();
						rightAI.disable();
						topAI.disable();
						rightVI.disable();
						topVI.disable();
					}

					if (sm2.getCount() > 0) {
						rightDI.enable();
						topDI.enable();
					}else {
						rightDI.disable();
						topDI.disable();
					}

				}
			}
		});
		
		Ext.apply(this, {
			store : Ext.data.StoreManager.lookup("Module.CMS.advertisement.store.Adv_siteStore"),
			selModel: sm,
			viewConfig : {
				emptyText : ADV_MESSAGE.noSite
			},
			columns : columns
		});
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};
		if(window.console){console.log("test afterRender");}

		var sm = me.selModel,
			addsiteItem = me.portlet.down('menuitem[name=addsite]');
			editsiteItem = me.portlet.down('menuitem[name=editsite]');
			delsiteItem = me.portlet.down('menuitem[name=delsite]');
			addadvItem = me.portlet.down('menuitem[name=addadv]');
			viewadvItem = me.portlet.down('menuitem[name=viewadv]');
        
		var addsiteFunc = function(e, eOpts){
        	Module.CMS.advertisement.Operation.doAddSiteFunction(callbackFun);
        };
        me.contextMenu.down('menuitem[name=addsite]').on('click', addsiteFunc);
        addsiteItem.on('click', addsiteFunc);

        var editsiteFunc = function(item, e, eOpts){
        	var records = sm.getSelection();

        	Module.CMS.advertisement.Operation.doEditSiteFunction(records[0], callbackFun);

        };
        me.contextMenu.down('menuitem[name=editsite]').on('click', editsiteFunc);
        editsiteItem.on('click', editsiteFunc);

        var delsiteFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	
        	Module.CMS.advertisement.Operation.doDelSiteFunction(records, callbackFun);

        };
        me.contextMenu.down('menuitem[name=delsite]').on('click', delsiteFunc);
        delsiteItem.on('click', delsiteFunc);

        var addadvFunc = function(item, e, eOpts){
        	var records = sm.getSelection();

        	Module.CMS.advertisement.Operation.doAddAdvFunction(records[0], callbackFun);

        };
        me.contextMenu.down('menuitem[name=addadv]').on('click', addadvFunc);
        addadvItem.on('click', addadvFunc);

        var viewAdvFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
   
        	Module.CMS.advertisement.Operation.doViewAdvFunction(records[0], callbackFun);

        };
        me.contextMenu.down('menuitem[name=viewadv]').on('click', viewAdvFunc);
        viewadvItem.on('click', viewAdvFunc);
    }
});