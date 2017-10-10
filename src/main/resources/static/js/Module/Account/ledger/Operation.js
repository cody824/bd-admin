Ext.define('Module.Account.ledger.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox'
	],

	doViewFundHistoryFunction : function(callbackFun) {
		var fundHistoryGrid = Ext.create('Module.Account.ledger.view.FundHistoryGrid',{
       		id : 'fundHistoryGrid',
       		anchor : '100% 100%'
        });

        var win = new Ext.Window({
			title: ACCOUNT_LEDGER_LABEL.viewFundHistory,
			items: fundHistoryGrid,
			width: 1230,
			height: 560,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.showAt(10,10);
	},

	doViewRoutingDetailFunc : function(terraceId, callbackFun) {
		var routingDetailGrid = Ext.create('Module.Account.ledger.view.RoutingDetailGrid',{
       		id : 'routingDetailGrid',
       		anchor : '100% 100%'
        });

        //设置相关的terraceId
        var store = Ext.data.StoreManager.lookup("Module.Account.ledger.store.RoutingDetailStore");
       	params = {};
       	params['terrace.terraceId'] = terraceId;
       	store.proxy.extraParams = {
			searchMap : Ext.encode(params)
		};

        var win = new Ext.Window({
			title: ACCOUNT_LEDGER_LABEL.viewRoutingDetail,
			items: routingDetailGrid,
			width: 1230,
			height: 560,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.showAt(10,10);
	}
});