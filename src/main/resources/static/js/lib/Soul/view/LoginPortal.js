Ext.define('Soul.view.LoginPortal', {
	alias: 'widget.soulviewportal',
    extend: 'Ext.container.Viewport',
    
    requires  : [
    	'Soul.util.RendererUtil',
    	'Soul.uiModule.SysStatus',
    	'Soul.uiModule.Message', 
    	'Soul.Module'
    ],
    
    topPanel : "",
    leftPanel : "",
    centerPanel : "",
    bottomPanel : "",
    rightPanel : "",
    
    headerHtml : "/innerHtml/loginHeader.html",
    mainHtml: "/innerHtml/loginMain.html",
    
    useLoginWin : false,
    loginWin : null,
    baseConfig : {},
    
    
    initComponent: function(){
        this.topPanel = this.newLoginHeader();
        this.centerPanel = this.newMain();

        if (this.useLoginWin && this.loginWin == null)
        	this.loginWin = new Object();
        
        Ext.apply(this, {
            id: 'login-viewport',
            layout: {
                type: 'border',
                padding: '0 0 0 0' // pad the layout from the window edges
            },
            items: [
            	this.topPanel,this.centerPanel]
        });
        this.callParent(arguments);
    },
	
	initLoginWin : function(){
		var me = this, right = 50,
			html = Soul.Ajax.getSyncText(me.mainHtml),
			w = document.body.clientWidth;
		if (me.useLoginWin) {
			x = w - right - me.loginWin.width;
			me.loginWin.showAt(x);
		}
		
		 
		var el=Ext.get('loginMainPanel'); 
		me.appHtml = el.dom.innerHTML;
		el.dom.innerHTML = html;  
	},
	
	newLoginHeader : function(){
		var me = this;
		var data = Soul.Ajax.getSyncText(me.headerHtml);
		
		var html = Ext.util.Format.format(data, me.baseConfig.yytUrl, me.baseConfig.loginLogo, me.baseConfig.indexTitle || '.');
		var header = new Ext.Panel({ 
			region: 'north',
			id: 'login-header',
			margins:'0 0 0 0',
			border: false,
			html: html
	    });
		return header;
	},
		
	newMain : function (){
		return new Ext.panel.Panel({
	        id: 'loginMainPanel',
	        region: 'center',
	        border: false
		});
	}
});
