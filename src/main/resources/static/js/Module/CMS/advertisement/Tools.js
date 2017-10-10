Ext.define('Module.CMS.advertisement.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],
	
	showAdvSiteInEast : function(id) {
		var me = this;

		var site = Module.CMS.advertisement.Data.getSiteById(id);
		if (site != null){
			var property = me.getSitePropertyGrid(site);
			Soul.util.ObjectView.showInEast(property, site.adv_code);
		} 
	},

	getSitePropertyGrid : function(site){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(site, Module.CMS.advertisement.Config.getRendererConfig(), 
				ADV_PROPERTY, Module.CMS.advertisement.Config.showProperties, {
				iconCls : 'md-user'
		});
/*		property.on("beforeshow", function(c, eOpts){
			var source = Module.Soul.user.Data.getUserByName(user.name);
			c.setSource(source);
		});
*/
		return property;
	},
	
    buildAdvertisementOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'advoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: ADV_MANAGE_LABEL.advAdd,
					disabled:false,
					name : 'addadv',
					iconCls : 'x-add-icon'
				},{
					text: ADV_MANAGE_LABEL.advEdit,
					disabled:true,
					name : 'editadv',
					iconCls : 'extensive-edit',
					hidden: true
				},{
					text: ADV_MANAGE_LABEL.advDel,
					disabled:true,
					name : 'deladv',
					iconCls : 'x-del-icon',
					hidden: true
				}]
	    });
		return menu;
    },
     	
	constructor : function() {
        this.callParent(arguments);
    }
});