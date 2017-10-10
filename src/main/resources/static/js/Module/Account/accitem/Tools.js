Ext.define('Module.Account.accitem.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	showAccitemInEast : function(accitemId){
		var me = this;
		
		var accitem = Module.Account.accitem.Data.getAccitemById(accitemId);
		console.log("accitem");
		console.log(accitem);
		if (accitem != null){
			var property = me.getAccitemPropertyGrid(accitem);
			Soul.util.ObjectView.showInEast(property, accitem.data.accMenAcc.memAccName);
		} 
	},

	getAccitemPropertyGrid : function(accitem){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(accitem, Module.Account.accitem.Config.getRendererConfig(), 
				ACCITEM_PROPERTY, Module.Account.accitem.Config.showProperties, {
				iconCls : 'md-user'
		});
		// property.on("beforeshow", function(c, eOpts){
		// 	var source = Module.Account.accitem.Data.getAccitemById(accitem.accItemId);
		// 	c.setSource(source);
		// });
		return property;
	},

	buildRelationUserOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'relationuseroperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: RELATIONUSER_LABEL.lockRelationUser,
					disabled: true,
					name : 'lockedRelationUser',
					iconCls : 'lock'
				},{
					text: RELATIONUSER_LABEL.cancelRelationUser,
					disabled: true,
					name : 'canceledRelationUser',
					iconCls : 'lock'
				},{
					text: RELATIONUSER_LABEL.listReconciliation,
					disabled: true,
					name : 'listReconciliation',
					iconCls : 'view'
				}]
	    });
		return menu;
    },
	
	constructor : function() {
        this.callParent(arguments);
    }
});