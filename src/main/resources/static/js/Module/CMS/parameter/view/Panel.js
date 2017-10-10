
Ext.define('Module.CMS.parameter.view.Panel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.noticegrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.CMS.parameter.Data',
		'Module.CMS.parameter.Renderer',
		'Soul.util.ObjectView',
		'Module.CMS.parameter.Tools',
	],
	
	initComponent : function() {
		
		var me = this;
		
		Ext.apply(this, {
			title: LABEL.infoPanel,
			id : 'param-panel',
			stateful : false,
			iconCls : 'info',
			frame : true,
			collapsed : true,
			animCollapse: false,
			//collapsible: true,
			split: true,
			plugins: [{
				ptype: 'tabscrollermenu',
				maxText  : 12,
				pageSize : 3
			}],
			items: []
		});

		this.initParameterConfig();
		
		this.callParent(arguments);
	},

	initParameterConfig : function() {
		var configUrl = '/globalconfig/';
		// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
		Soul.Ajax.restAction(configUrl, 'get', null, null, function(ret){
			var configObj = ret;
			var configTypes = configObj['supportConfigTypes'];
			var configRepos = configObj['configRepos'];

			Module.CMS.parameter.Tools.clearSubTypeMenu('paramtype');

			Ext.each(configTypes, function(ct, i, rs){
				Module.CMS.parameter.Tools.buildSubTypeMenu('paramtype', configRepos, ct);
			});

			Module.CMS.parameter.Tools.showFirstSubTypeMenu('paramtype', configRepos);

		}, null, null);
	},

	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};

    },

	
});