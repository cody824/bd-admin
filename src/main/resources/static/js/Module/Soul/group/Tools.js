Ext.define('Module.Soul.group.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],
	
	showGroupInEast : function(id){
		var me = this;
		
		var group = Module.Soul.group.Data.getGroupById(id);
		if (group != null){
			Ext.Ajax.request({
				url : group.links['role'],
				timeout : 180000,
				method: 'GET',
				headers : {
					Accept : 'application/json'
				},
				success : function(response, option) {
					var names = '';
					var data = Ext.decode(response.responseText);
		      		Ext.each(data, function(r, i, rs){
		    			names += r.obj.name+',';
		    		});
	 	        	group.roles = names.substring(0,names.length-1);
	    			var property = me.getGroupPropertyGrid(group);
	    			Soul.util.ObjectView.showInEast(property, group.name);
				}
			});
		} 
	},
	
	getGroupPropertyGrid : function(group){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(group, Module.Soul.group.Config.getRendererConfig(), 
				GROUP_PROPERTY, Module.Soul.group.Config.showProperties, {
				iconCls : 'md-group'
		});
//		property.on("beforeshow", function(c, eOpts){
//			var source = Module.Soul.group.Data.getGroupById(group.id);
//			c.setSource(source);
//		});
		return property;
	},
	
	constructor : function() {
        this.callParent(arguments);
    }
	
});
