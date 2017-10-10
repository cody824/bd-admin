Ext.define('Module.Soul.shortUrl.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.shortUrlPortlet',
	
	requires  : [
		'Module.Soul.shortUrl.Operation',
		'Module.Soul.shortUrl.Data',
		'Module.Soul.shortUrl.store.ShortUrlStore'
	],
		
	VIEW : {
		'Module.Soul.shortUrl.view.Grid' : LABEL.grid
	},
	
	title: SHORTURL_LABEL.title,

	iconCls : 'md-user',
	
	moduleName : 'Module.Soul.shortUrl',
	
	moduleSessionView : 'Module.Soul.shortUrlCurrentView',
	
	dataObj : Module.Soul.shortUrl.Data,
	
	configObj : Module.Soul.shortUrl.Config,
	
	defaultView : 'Module.Soul.shortUrl.view.Grid',
	
	supportView :['Module.Soul.shortUrl.view.Grid'],
	
	havUpdateButton : false,
	
	initComponent : function() {
		this.callParent(arguments);
	},
	
	
	
	buildShortUrlOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'shortUrloperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{        		
	        		text: SHORTURL_LABEL.del,
					disabled: true,
					name: 'delShortUrl',
					iconCls: 'x-del-icon'		
				},{
	        		text: SHORTURL_LABEL.open,
					disabled: true,
					name: 'openShortUrl',
					iconCls: 'extensive-edit'
				},{
	        		text: SHORTURL_LABEL.close,
					disabled: true,
					name: 'closeShortUrl',
					iconCls: 'extensive-edit'
				}]
	    });
		return menu;
    },
	
    
    createShortUrlBtn : function() {
    	var button = new Ext.Button({
    		iconCls : 'x-add-icon',
    		text: "创建短地址",
			width: 100,
			name: 'addShortUrl',
			handler: function(){
				/**
				 * 
				var configUrl = '/api/shorturl';
				Soul.Ajax.restAction(configUrl, 'post', {'mode' : '1','srcUrl' : 'srcUrl'}, 
					null, function(){
					  var handleStaticUrl = '/handleStatic/';			   
						Soul.Ajax.restAction(handleStaticUrl, 'post', {'path' : 'all'}, 
								{'fetch' : 'True'}, function(){
								}, null, null);
					}, null, null);
				 */
			}
		});
		return button;
    },
    
    initToolbar : function(){
		var toolbar = this.callParent(arguments);
		toolbar.push(this.createShortUrlBtn());
		return toolbar;
    }
	
	
});