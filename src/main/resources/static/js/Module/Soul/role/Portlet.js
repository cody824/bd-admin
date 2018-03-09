Ext.define('Module.Soul.role.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [//需要的类列表（数组）    实例化类之前必须加载的类列表
		'Module.Soul.role.Operation',
		'Module.Soul.role.Data',
		'Module.Soul.role.store.RoleStore'
 	],
 		
 	VIEW : {
		'Module.Soul.role.view.Grid' : LABEL.grid
	},
    
	title: ROLE_LABEL.roleInfo,//logo下面的table表头
			
	moduleName : 'Module.Soul.role',
    
    moduleSessionView : 'Module.Soul.roleCurrentView',
    
    dataObj : Module.Soul.role.Data,
    
    configObj : Module.Soul.role.Config,
	
    defaultView : 'Module.Soul.role.view.Grid',
	
    supportView :['Module.Soul.role.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

    buildRoleOptMenu: function () {
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'roleoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [//渲染相关菜单-----
		                {
							text: ROLE_LABEL.addRole,
							disabled:false,
                            hidden: Module.Soul.role.Config.supportAdd ? false : true,
							name : 'toAddRole',
							iconCls : 'x-add-icon'
		                },
		                {
							text: ROLE_LABEL.delRole,
                            hidden: Module.Soul.role.Config.supportDel ? false : true,
							disabled:true,
							name : 'deleteRole',
							iconCls : 'x-del-icon'
		                },
		                {
		                	text: ROLE_LABEL.updateRole,
		                	disabled:true,
		                	name : 'toUpdateRole',
		                	iconCls : 'update'
		                }
	             ]
	    });
		return menu;
    },
     		//初始化主菜单callParent为重写父类方法
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			roleMenu = {
                text: "角色操作",
	            iconCls: 'pool_setting',  
	            menu: this.buildRoleOptMenu()//指定子类自己的方法，并进行渲染
	        };
		toolbar.push(roleMenu);
		return toolbar;
    }
});




