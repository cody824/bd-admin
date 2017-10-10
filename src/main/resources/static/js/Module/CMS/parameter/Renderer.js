Ext.define('Module.CMS.parameter.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.CMS.parameter.Tools'
  	],
  	
	translateCtime : function(v){
		if (v == null || v == '')
			return '';
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},

	constructor : function() {
        this.callParent(arguments);
   	}
});