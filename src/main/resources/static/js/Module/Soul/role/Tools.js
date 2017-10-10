Ext.define('Module.Soul.role.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],
	//该方法为右侧的侧边栏，显示详细信息
	showRoleInEast : function(name){
		var me = this;
		var role = Module.Soul.role.Data.getRoleByName(name);
		//console.log(role);
		if (role != null){
			var property = me.getRolePropertyGrid(role);
			Soul.util.ObjectView.showInEast(property, name);
		} 
	},
	
	getRolePropertyGrid : function(role){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(role, Module.Soul.role.Config.getRendererConfig(), 
				ROLE_PROPERTY, Module.Soul.role.Config.showProperties, {
				iconCls : 'md-role'
		});
		//郁闷的是这里竟然显示id，，原因是因为重新加载了一次对象的数据，所以把id也加载出来了
//		property.on("beforeshow", function(c, eOpts){
//			var source = Module.Soul.role.Data.getRoleByName(role.name);
//			c.setSource(source);
//		});
		return property;
	},
	
	constructor : function() {
        this.callParent(arguments);
    }
	
});
