Ext.define('Module.Account.InMoney.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['inbarohId', 'inbarohType', 'inbarohMoney', 'inbarohOrgan', 'inbarohBackSeq',
	                  'inbarohBackCode', 'inbarohDate', 'inbarohTime', 'inbarohRemark'],

	getRendererConfig : function() {
		var ret = {
				accInBarohDate : Module.Account.InMoney.Renderer.translateAccInBarohDate,
				accInBarohTime : Module.Account.InMoney.Renderer.translateAccInBarohTime,
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
