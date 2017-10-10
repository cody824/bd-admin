Ext.define('Module.Account.InMoney.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	showInbarohInEast : function(inbarohId){
		var me = this;
		
		var inbaroh = Module.Account.InMoney.Data.getAccInBarohById(inbarohId);
		console.log(inbaroh);
		if (inbaroh != null){
			var property = me.getInbarohPropertyGrid(inbaroh);
			Soul.util.ObjectView.showInEast(property, inbaroh.inbarohCode);
		}
	},


	getInbarohPropertyGrid : function(inbaroh){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(
				inbaroh,
				Module.Account.InMoney.Config.getRendererConfig(), 
				ACCOUNT_ACCINBARON_PROPERTY,
				Module.Account.InMoney.Config.showProperties,
				{iconCls : 'md-user'});
		return property;
	},
	
	constructor : function() {
        this.callParent(arguments);
    }
});