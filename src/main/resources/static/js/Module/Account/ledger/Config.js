Ext.define('Module.Account.ledger.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties :  ['terraceId', 'terraceName', 'inuseAccItemCount', 'terraceTotalMoney', 'terraceOwnMoney',
	                   'time', 'lastTerraceTotalMoney', 'lastTerraceOwnMoney', 'lastTime', 'changeMoney'],
	                   
	getRendererConfig : function() {
		var ret = {
				time : Module.Account.ledger.Renderer.translateLedgerTime,
				lastTime : Module.Account.ledger.Renderer.translateLedgerTime,
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
