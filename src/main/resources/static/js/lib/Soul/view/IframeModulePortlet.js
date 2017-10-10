Ext.define('Soul.view.IframeModulePortlet', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.soulmoduleportlet',
	
    moduleName : '',
    
    moduleUrl : '/view/admin/',
    
	initComponent : function() {
 		var me = this;
		me.initModule();
		Ext.apply(this, {
			frame : true,
			//autoScroll : true,
			stateful : false,
			tools : me.initTools(),
			layout: 'fit',
			html:' <iframe id="mainIframe" scrolling="auto" frameborder="0" width="100%" height="100%" src="'+ me.moduleUrl+'"> </iframe>',
			id: this.moduleName
		});
    	this.callParent(arguments);
	},
	
	initUI : function(){
		var me = this;
		sessionStorage.setItem("currentModule", me.moduleName);
		
		/*
		if(item == null) {
			 item = Ext.create(me.currentView, {id : me.id + '-' + me.currentView, anchor : '100% 100%', portlet : me});
			 sessionStorage.setItem(me.moduleSessionView, me.currentView);
			 me.removeAll();
			 me.add(item);
		}  
		if (item !== null && typeof(item.updateView) == 'function')
			item.updateView(item);*/
			
    },
    
    initModule : function(){
    	var me = this;
    	if(sessionStorage.getItem(me.moduleSessionView) != null)
    		me.currentView = sessionStorage.getItem(me.moduleSessionView);
    },
    
    initTools : function(){
    	var tools = new Array();
		
    	tools.push(
    		{
		    type:'prev',
		    tooltip: LABEL.prevStep,
		    handler: function(event, toolEl, panel){
		    	var kvp = panel.up('soulviewportal');
		    	if(kvp) {
		    		kvp.gotoPrev();
		    	}
			}
		}, {
		    type:'next',
		    tooltip: LABEL.nextStep,
		    handler: function(event, toolEl, panel){
		    	var kvp = panel.up('soulviewportal');
		    	if(kvp) {
		    		kvp.gotoNext();
		    	}
			}
		}, {
		    type:'collapse',
		    tooltip: LABEL.showWeclome,
		    handler: function(event, toolEl, panel){
		    	var kvp = panel.up('soulviewportal');
		    	if(kvp) {
		    		kvp.gotoWeclome();
		    	}
			}
		});
		return tools;
    },
    
	 updateView : function(scope){
    	 var me = scope || this;
    	 me.initUI();
     }
});




