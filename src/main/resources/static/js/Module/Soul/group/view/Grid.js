
Ext.define('Module.Soul.group.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.usergrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Soul.group.Data',
		'Module.Soul.group.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Soul.group.Operation'
	],
    
	checkIndexes : ['name'], // 默认选择的列	
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Soul.group.Renderer;
		var me = this;
	       var callbackFun = function(){
	    	   me.updateView(me);
	       };
	       var keyupFunc = function(){
	        	var name = Ext.getCmp("groName").getValue(),
	        		  cname = Ext.getCmp("groCName").getValue(),
	        		  comm = Ext.getCmp("groComment").getValue();
	        	var saveBtn = Ext.getCmp("saveBtn");
	        	if(name == '' || cname == ''  || comm == '' ){
	        		saveBtn.disable();
	        	}else{
	        		saveBtn.enable();
	        	}
	        }
		columns.push(
			new Ext.grid.RowNumberer(),
			{text: GROUP_PROPERTY.name,sortable: true,dataIndex: 'name', searchType : 'string',
				renderer : function(v, u,r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
					return (Soul.util.GridRendererUtil.getLinkName(Module.Soul.group.Renderer.geGroupName(v, u,r, rowIndex, columnIndex - 1, s)));
				},
				flex : 1},
			{
					text: GROUP_PROPERTY.cName, width: 200, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'cName'
			}, {
				text : GROUP_PROPERTY.status,width : 60, dataIndex:'status',  menuDisabled:true, searchType : 'number',
				renderer: function(val, u,r, rowIndex, columnIndex, s){
					return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
				},
				align : 'center'
			}, {
				text : GROUP_PROPERTY.comment, width : 200, dataIndex:'comment',  menuDisabled:true, searchType : 'string',
				align : 'center'
			},
			{
				text : GROUP_LABEL.showUser, sortable: false, menuDisabled:true,
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateAddToGroupIcon(val, u,r, rowIndex, columnIndex -1 , s, v);
				},
				width : 60,
				align : 'center',
				listeners:{
					click:function(){
						Module.Soul.group.Operation.operUserByGroupIdFunction(me,callbackFun);
					}
				}
			} ,
			{
				text : GROUP_LABEL.showRole, sortable: false, menuDisabled:true,
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateAddToGroupIcon(val, u,r, rowIndex, columnIndex -1 , s, v);
				},
				width : 60,
				align : 'center',
				listeners:{
					click:function(){
						Module.Soul.group.Operation.removeRoleByGroupIdFunction(me,callbackFun);
					}
				}
			} ,{
				   text:GROUP_LABEL.operation,  
				   menuDisabled: true,  
				   sortable: false,  
				   align:'center',  
				   xtype: 'actioncolumn',  
				   width: 60,  
				   items: [{  
					   iconCls   :'x-add-icon',  
				       id: 'upArraw',  
				       tooltip: GROUP_LABEL.newGroup,  
				       handler: function() { 
				    	   Module.Soul.group.Operation.doAddGroupFunction(me,keyupFunc,callbackFun);
				       }  
				   },{  
					   iconCls   :'x-del-icon',
				       id: 'delArraw',
				       tooltip: GROUP_LABEL.delGroup,
				       handler: function(grid, rowIdx, colIdx) {
				    		var sm = me.selModel;
				    		sm.deselectAll();
				    		sm.select(rowIdx);
				    	    Module.Soul.group.Operation.doDeleteGroupFunction(me,callbackFun);
				       }  
				   },{  
					   iconCls   :'update',  
				       tooltip: GROUP_LABEL.upGroup,  
				       id: 'downArraw',  
				       handler: function(grid, rowIdx, colIdx, e) { 
				    		var sm = me.selModel;
				    		sm.deselectAll();
				    		sm.select(rowIdx);
				    	   Module.Soul.group.Operation.doUpdateGroupFunction(me,keyupFunc,callbackFun);
				       }  
				   }]  
			}
		);
		var me = this;
		me.contextMenu = me.portlet.addGroupOptMenu();
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
			        var updateItem = me.portlet.down('menuitem[name=upGroup]');
			        var updateItemUp = me.contextMenu.down('menuitem[name=upGroup]');
			        var delItem = me.portlet.down('menuitem[name=delGroup]');
			        var delItemUp = me.contextMenu.down('menuitem[name=delGroup]');
			        var operUser = me.portlet.down('menuitem[name=operUser]');
			        var operUserUp = me.contextMenu.down('menuitem[name=operUser]');
			        var operRole = me.portlet.down('menuitem[name=operRole]');
			        var operRoleUp = me.contextMenu.down('menuitem[name=operRole]');
			        var removeRole = me.portlet.down('menuitem[name=removeRole]');
			        var removeRoleUp = me.contextMenu.down('menuitem[name=removeRole]');

					var sm = me.selModel;
					var records = sm.getSelection();   
					if(records.length == 1){
						updateItem.enable();
						updateItemUp.enable();
						delItem.enable();
						delItemUp.enable();
						operUser.enable();
						operUserUp.enable();
						operRole.enable();
						operRoleUp.enable();
						removeRole.enable();
						removeRoleUp.enable();
			    	}else if(records.length > 1){
			    		updateItem.disable();
						updateItemUp.disable();
						delItem.enable();
						delItemUp.enable();
						operUser.disable();
						operUserUp.disable();
						operRole.disable();
						operRoleUp.disable();
						removeRole.disable();
						removeRoleUp.disable();
			    	}else{
			    		updateItem.disable();
						updateItemUp.disable();
						delItem.disable();
						delItemUp.disable();
						operUser.disable();
						operUserUp.disable();
						operRole.disable();
						operRoleUp.disable();
						removeRole.disable();
						removeRoleUp.disable();
			    	}
				}
			}
		});
		
		Ext.apply(this, {
			store : Ext.data.StoreManager.lookup("Module.Soul.group.store.GroupStore"),
			selModel: sm,
			viewConfig : {
				emptyText : GROUP_MESSAGE.noGroup
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
        var addItem = me.portlet.down('menuitem[name=addGroup]');
        var addItemUp = me.contextMenu.down('menuitem[name=addGroup]');
        var updateItem = me.portlet.down('menuitem[name=upGroup]');
        var updateItemUp = me.contextMenu.down('menuitem[name=upGroup]');
        var delItem = me.portlet.down('menuitem[name=delGroup]');
        var delItemUp = me.contextMenu.down('menuitem[name=delGroup]');
        var operUser = me.portlet.down('menuitem[name=operUser]');
        var operUserUp = me.contextMenu.down('menuitem[name=operUser]');
        var operRole = me.portlet.down('menuitem[name=operRole]');
        var operRoleUp = me.contextMenu.down('menuitem[name=operRole]');
        var removeRole = me.portlet.down('menuitem[name=removeRole]');
        var removeRoleUp = me.contextMenu.down('menuitem[name=removeRole]');

        var keyupFunc = function(){
        	var name = Ext.getCmp("groName").getValue(),
        		  cname = Ext.getCmp("groCName").getValue(),
        		  comm = Ext.getCmp("groComment").getValue();
        	var saveBtn = Ext.getCmp("saveBtn");
        	if(name == '' || cname == ''  || comm == '' ){
        		saveBtn.disable();
        	}else{
        		saveBtn.enable();
        	}
        }
        var addOptFunc = function(){
        	Module.Soul.group.Operation.doAddGroupFunction(me,keyupFunc,callbackFun);
        }
        addItem.on('click', addOptFunc);
        addItemUp.on('click', addOptFunc);
        
        
        var updateOptFunc = function(){
        	Module.Soul.group.Operation.doUpdateGroupFunction(me,keyupFunc,callbackFun);
        }
        updateItem.on('click',updateOptFunc );
        updateItemUp.on('click',updateOptFunc );

        var deleteOptFunc = function(){
        	Module.Soul.group.Operation.doDeleteGroupFunction(me,callbackFun);
        }
        delItem.on('click',deleteOptFunc);
        delItemUp.on('click',deleteOptFunc);
        

        var operUserOptFunc = function(){
        	Module.Soul.group.Operation.operUserByGroupIdFunction(me,callbackFun);
        }
        operUser.on('click',operUserOptFunc);
        operUserUp.on('click',operUserOptFunc);

        var operRoleOptFunc = function(){
        	Module.Soul.group.Operation.operRoleByGroupIdFunction(me,callbackFun);
        }
        operRole.on('click',operRoleOptFunc);
        operRoleUp.on('click',operRoleOptFunc);
        //
        var removeRoleOptFunc = function(){
        	Module.Soul.group.Operation.removeRoleByGroupIdFunction(me,callbackFun);
        }
        removeRole.on('click',removeRoleOptFunc);
        removeRoleUp.on('click',removeRoleOptFunc);
    }
});
