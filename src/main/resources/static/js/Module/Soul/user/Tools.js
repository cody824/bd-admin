Ext.define('Module.Soul.user.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],
	
	showUserInEast : function(name){
		var me = this;
		
		var user = Module.Soul.user.Data.getUserByName(name);
		if (user != null){
			var property = me.getUserPropertyGrid(user);
			Soul.util.ObjectView.showInEast(property, name);
		} 
	},
//	showGroupInEast : function(name){
//		var me = this;
//		
//		var user = Module.Soul.user.Data.getUserByName(name);
//		console.log(user);
//		if (user != null){
//			var property = me.getUserPropertyGrid(user);
//			Soul.util.ObjectView.showInEast(property, name);
//		} 
//	},
	getUserPropertyGrid : function(user){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(user, Module.Soul.user.Config.getRendererConfig(), 
				USER_PROPERTY, Module.Soul.user.Config.showProperties, {
				iconCls : 'md-user'
		});
//		property.on("beforeshow", function(c, eOpts){
//			var source = Module.Soul.user.Data.getUserByName(user.name);
//			alert(source.id);
//			c.setSource(source);
//		});
		return property;
	},
	getAppIDCombo : function(value){
		var data = [['yearbook','忆尔'],['cookbook','菜谱易']];
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : '平台',
			labelAlign : 'right',

			name : 'appId',
			displayField: 'name',
			valueField: 'value',

			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 250,

			typeAhead: true,
			selectOnFocus: true,
			indent: true,
			allowBlank : false,
			editable : false,

			store : store
		});

		if(value != null){
			combo.setValue(value);
		}
		return combo;
	},
	constructor : function() {
        this.callParent(arguments);
    }
	
});
