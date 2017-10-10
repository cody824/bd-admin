Ext.define('Soul.util.HelpUtil', {
	 singleton: true, 

	getHelpInfo : function (module, form, fieldName) {
		var str = eval(module.toUpperCase()+"_"+form.toUpperCase()+"_HELP."+fieldName);
		if(str == null || str == undefined)
			str = "";
		return str;
	},

	showHelpInfo : function (module, form, field){
		var str = this.getHelpInfo(module, form, field.name);
		Ext.create("Ext.tip.ToolTip", {
            anchor: 'right',
			target: field.id,
		    html: str
	 	});
	},
	
	showHelpInfoCus : function (module, form, field, name){
		var str = this.getHelpInfo(module, form, name);
		Ext.create("Ext.tip.ToolTip", {
			anchor: 'right',
			target: field.id,
		    html: str
	 	});
	},
	
	showHelpInfoMsg : function (field, str){
		Ext.create("Ext.tip.ToolTip", {
			anchor: 'right',
			target: field.id,
		    html: str
	 	});
	}
});
