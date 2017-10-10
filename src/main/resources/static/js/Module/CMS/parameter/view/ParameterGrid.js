Ext.define('Module.CMS.parameter.view.ParameterGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.noticegrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.CMS.parameter.Data',
		'Module.CMS.parameter.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.CMS.parameter.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: PARAMETER_MANAGE_LABEL.paramKey,flex:1, sortable: false, 
				menuDisabled:true, dataIndex: 'key', align : 'center',
			},
			{
				text: PARAMETER_MANAGE_LABEL.paramValue, flex:1, dataIndex:'value', 
				menuDisabled:true, align : 'center',
			},
			{
				text: PARAMETER_MANAGE_LABEL.paramName, flex:1, sortable: false, 
				menuDisabled:true, dataIndex: 'paramName', align : 'center',
				
			}
		);
		
		var me = this;
		me.contextMenu = Module.CMS.parameter.Tools.buildParamOptMenu();
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					
					rightEI = me.contextMenu.down('menuitem[name=editparam]');
					rightDI = me.contextMenu.down('menuitem[name=delparam]');
					if (sm2.getCount() == 1) {
						rightEI.enable();
						rightDI.enable();
					} else {
						rightEI.disable();
						rightDI.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			viewConfig : {
				emptyText : PARAMETER_MESSAGE.noParameter
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

		var sm = me.selModel;
		var editparamItem = me.contextMenu.down('menuitem[name=editparam]');
		var addparamItem = me.contextMenu.down('menuitem[name=addparam]');
		var delparamItem = me.contextMenu.down('menuitem[name=delparam]');
        
		var editparamFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			var store = me.getStore();

        	Module.CMS.parameter.Operation.doEditParamFunction(records[0], store);
        };
        editparamItem.on('click', editparamFunc);

        var addparamFunc = function(e, eOpts){
        	var store = me.getStore();

        	Module.CMS.parameter.Operation.doAddParamFunction(store);
        };
        addparamItem.on('click', addparamFunc);

        var delparamFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	var store = me.getStore();

        	Module.CMS.parameter.Operation.doDelParamFunction(records[0], store);
        };
        delparamItem.on('click', delparamFunc);
    }
});
