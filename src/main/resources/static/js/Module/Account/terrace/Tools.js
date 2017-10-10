Ext.define('Module.Account.terrace.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	getTerraceStateCombo : function(value){
		var data = [['00','开通'],['10','锁定'],['99','注销']];
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ACCOUNT_TERRACE_LABEL.terraceState,
			labelAlign : 'right',

			name : 'terraceState',
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

	getTerraceLevelCombo : function(value){
		var data = [[1,'全部']];
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ACCOUNT_TERRACE_LABEL.accItemLevel,
			labelAlign : 'right',

			name : 'accItemLevel',
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

	showTerraceInEast : function(terraceId){
		var me = this;
		
		var terrace = Module.Account.terrace.Data.getTerraceById(terraceId);
		console.log(terrace);
		if (terrace != null){
			var property = me.getTerracePropertyGrid(terrace);
			Soul.util.ObjectView.showInEast(property, terrace.terraceName);
		}
	},

	getTerracePropertyGrid : function(terrace){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(
				terrace,
				Module.Account.terrace.Config.getRendererConfig(), 
				ACCOUNT_TERRACE_PROPERTY,
				Module.Account.terrace.Config.showProperties,
				{iconCls : 'md-user'});
		
		// property.on("beforeshow", function(c, eOpts){
		// 	var source = Module.Account.terrace.Data.getTerraceById(terrace.accItemId);
		// 	c.setSource(source);
		// });
		
		return property;
	},
	
	constructor : function() {
        this.callParent(arguments);
    }
});