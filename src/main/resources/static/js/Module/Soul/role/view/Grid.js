Ext.define('Module.Soul.role.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.rolegrid',
	//需要的类列表（数组） 实例化类之前必须加载的类列表
	requires  : [    
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Soul.role.Data',
		'Module.Soul.role.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
    
	checkIndexes : ['name'], // 查询时默认选择的列	
	
	initComponent : function() {//此处为相关字段的展示
        console.log(Module.Soul.role.Config);
		var columns = new Array();
		var renders = Module.Soul.role.Renderer;
		var me = this;
        var callbackFun = function(){
			me.updateView(me);
		};
		columns.push(
			new Ext.grid.RowNumberer(),//行数
            {
                text: "角色KEY", sortable: true, dataIndex: 'name', searchType: 'string',
				renderer : function(v, u,r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
					return (Soul.util.GridRendererUtil.getLinkName(Module.Soul.role.Renderer.getRoleName(v, u,r, rowIndex, columnIndex - 1, s)));
				},
                width: 200
            },
			{
                text: "角色名称", width: 200, dataIndex: 'comment',
				menuDisabled:true,
                flex: 1,
				searchType : 'string',
				align : 'center'
			},{
                text: '查看用户',
                menuDisabled: true,
                sortable: false,
                align: 'center',
                xtype: 'actioncolumn',
                width: 100,
                items: [{
                    icon: '/img/icon/user.png',
                    tooltip: '角色用户',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        Module.Soul.role.Operation.showUsers(record.data, callbackFun);
                    }
                }]
            }
        );
        if (Module.Soul.role.Config.supportGroup) {
            columns.push(
                {
                    text: "查看组", sortable: false, menuDisabled: true,
                    renderer: function (val, u, r, rowIndex, columnIndex, s, v) {
                        return renders.translateAddToGroupIcon(val, u, r, rowIndex, columnIndex - 1, s, v);
                    },
                    width: 60,
                    align: 'center',
                    listeners: {
                        click: function (grid, rowIdx, colIdx, e) {
                            var sm = me.selModel;
                            var records = sm.getSelection();
                            Module.Soul.role.Operation.OperRoleGroup(records, callbackFun);
                        }
                    }
                }
            );
        }
        ;

        var opts = [];
        if (Module.Soul.role.Config.supportAdd) {
            opts.push({
                iconCls: 'x-add-icon',
                id: 'upArraw',
                tooltip: '增加',
                handler: function () {
                    Module.Soul.role.Operation.toAddRoleFunction(callbackFun);
                }
            });
        }
        if (Module.Soul.role.Config.supportDel) {
            opts.push({
                iconCls: 'x-del-icon',
                id: 'delArraw',
                tooltip: '删除',
                handler: function (grid, rowIdx, colIdx) {
                    var sm = me.selModel;
                    sm.deselectAll();
                    sm.select(rowIdx);
                    var records = sm.getSelection();
                    Module.Soul.role.Operation.dodeleteRolesByIdFunction(records, callbackFun);//执行操作，调用删除
                }
            });
        }
        opts.push({
            iconCls: 'update',
            tooltip: '修改',
            id: 'downArraw',
            handler: function (view, rowIndex, colIndex, item, e, record, row) {   //rowIndex，colIndex均从0开始
                Module.Soul.role.Operation.updateRole(record.data, callbackFun);//执行修改
            }
        });

        columns.push(
            {
                text: '操作',
                menuDisabled: true,
                sortable: false,
                align: 'center',
                xtype: 'actioncolumn',
                width: 60,
                items: opts
            }
        );

		me.contextMenu = me.portlet.buildRoleOptMenu();//此处是得到用户操作的相关菜单
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {//设定菜单是否可以操作
					var records = sm2.getSelection();

					var updateRoleRightMI = me.contextMenu.down('menuitem[name=toUpdateRole]');
					var updateRoleTopMI = me.portlet.down('menuitem[name=toUpdateRole]');

					var deleteRoleRightMI = me.contextMenu.down('menuitem[name=deleteRole]');
					var deleteRoleTopMI = me.portlet.down('menuitem[name=deleteRole]');

                    if (sm2.getCount() == 1) {
						updateRoleRightMI.enable();
						updateRoleTopMI.enable();
						deleteRoleRightMI.enable();
						deleteRoleTopMI.enable();
					}else{
						updateRoleRightMI.disable();
						updateRoleTopMI.disable();
						deleteRoleRightMI.disable();
						deleteRoleTopMI.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {//请求查询没有数据时的提示
			store : Ext.data.StoreManager.lookup("Module.Soul.role.store.RoleStore"),
			selModel: sm,
			viewConfig : {
				emptyText : ROLE_MESSAGE.noRole
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
        var sm = me.selModel,
			addItem = me.portlet.down('menuitem[name=toAddRole]'),
        	updateItem = me.portlet.down('menuitem[name=toUpdateRole]'),
            deleteItem = me.portlet.down('menuitem[name=deleteRole]');

        var toAddroleFunc = function(item, e, eOpts){//定义相关操作事件
        	Module.Soul.role.Operation.toAddRoleFunction(callbackFun);
        };
        var doDeleteRoleFunc = function(item, e, eOpts){//定义相关操作事件
        	var records = sm.getSelection();
        	if (records.length >= 1) {
        		Module.Soul.role.Operation.dodeleteRolesByIdFunction(records, callbackFun);//执行操作，调用删除
        	} else{
        		Ext.Msg.alert('请选择角色');
        	}
        };
        var toUpdateItemFnc= function(item, e, eOpts){//定义相关操作事件
        	var records = sm.getSelection();
        	if(records.length == 1){
                Module.Soul.role.Operation.updateRole(records[0].data, callbackFun);//执行修改
        	}else{
        		Ext.Msg.alert("请选择一条数据进行修改!");
        	}
        };


        me.contextMenu.down('menuitem[name=toAddRole]').on('click', toAddroleFunc);//进行菜单点击事件的绑定--增加
        me.contextMenu.down('menuitem[name=toUpdateRole]').on('click', toUpdateItemFnc);//进行菜单点击事件的绑定--修改
        me.contextMenu.down('menuitem[name=deleteRole]').on('click', doDeleteRoleFunc);//进行菜单点击事件的绑定--删除

        updateItem.on('click', toUpdateItemFnc);//执行点击事件-----修改
        deleteItem.on('click', doDeleteRoleFunc);//执行点击事件-----删除
        addItem.on('click', toAddroleFunc);//执行点击事件-----增加
    }
});
