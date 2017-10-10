Ext.define('SureAdmin.controller.AppConfig', {

    extend: 'Ext.app.Controller',
    
    stores: [], 
         
    models: [],

    views: [
            'app.Portal'
        ], 
        
    actions : {
    	appConfig : "/config/appconfig"
    },
    
    init: function() {

        this.control({
        	"soulviewsportal" : {
        		
        	}

         }); 
        
    },
    
    getCenter : function(){
    	return Ext.get("soulviewsportal").centerPanel;
    },
    
    initSingleWin : function(bc, loginName, scope){
    	var me = scope || this;
    	/*
    	 * load global data
    	 * 
    	**/
		Soul.Ajax.executeRequestData(me.actions.appConfig, {loginName : loginName}, function(data){
			macConfig = data;
			if(macConfig != null) {
				uiConfig = macConfig.uiConfig;
				Soul.uiModule.Message.initMessageModule();
				var viewport = Ext.widget('sureadminviewportal', {baseConfig : bc});
				
				Soul.Module.basePackage = "Module.soul.";
				Soul.Module.loadLocal(macConfig.moduleList, viewport.baseConfig.language);
	    		Soul.Module.initConfig(macConfig.moduleList);
				
				viewport.buildNavigation(macConfig.moduleList);
				viewport.buildWelcomePanel(macConfig.moduleList);
				var currentModule = sessionStorage.getItem('currentModule') || uiConfig.defaultModule;
				setTimeout(function(){
					viewport.gotoModule(currentModule);
				},2000);
				if (sessionStorage.getItem("naviCollapse") == 'true')
					viewport.leftPanel.collapse();
			}
			
		}, function(){
			if(window.console){console.log(me.actions.appConfig + "error");}
		}, LABEL.load + LABEL.macInfo);
	}

});