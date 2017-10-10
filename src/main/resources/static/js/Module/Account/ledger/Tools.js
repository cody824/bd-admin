Ext.define('Module.Account.ledger.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	showLedgerInEast : function(ledgerId){
		var me = this;
		
		var ledger = Module.Account.ledger.Data.getLedgerById(ledgerId);
		if (ledger != null){
			var property = me.getLedgerPropertyGrid(ledger);
			Soul.util.ObjectView.showInEast(property, ledger.terraceName);
		}
	},

	getLedgerPropertyGrid : function(ledger){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(
				ledger,
				Module.Account.ledger.Config.getRendererConfig(), 
				ACCOUNT_LEDGER_PROPERTY,
				Module.Account.ledger.Config.showProperties,
				{iconCls : 'md-user'});
		
		// property.on("beforeshow", function(c, eOpts){
		// 	var source = Module.Account.ledger.Data.getLedgerById(ledger.accItemId);
		// 	c.setSource(source);
		// });
		
		return property;
	},
	
	constructor : function() {
        this.callParent(arguments);
    }
});