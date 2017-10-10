Ext.define('Soul.view.Portal', {
	alias: 'widget.soulviewportal',
    extend: 'Ext.container.Viewport',
    
    requires  : [
    	'Soul.util.RendererUtil',
    	'Soul.uiModule.SysStatus',
    	'Soul.uiModule.Message', 
    	'Soul.Module',
    	'Soul.util.GridRendererUtil',
    	'Soul.util.CommonUtil',
    	'Ext.ux.TabScrollerMenu'
    ],

    topPanel : "",
    leftPanel : "",
    centerPanel : "",
    bottomPanel : "",
    rightPanel : "",
    userInfoPanel:"",
    baseConfig : {},

    initComponent: function(){
        this.topPanel = this.newHeader();
        this.leftPanel = this.newSider();
        this.centerPanel = this.newMain();
        this.bottomPanel = this.newBottom();
        this.rightPanel = this.newEast();
        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0 0 0 0' // pad the layout from the window edges
            },
            items: [
            	this.topPanel,{
                xtype: 'container',
                region: 'center',
                layout: 'border',
                border : false,
                items: [this.leftPanel, this.centerPanel, this.rightPanel,this.bottomPanel]
            }]
        });
        this.callParent(arguments);
    },

    initSingleWin : function(remoteIp){
    	var me = this;
    	
    	var fn = function(){
    		var currentModule = sessionStorage.getItem('currentModule') || uiConfig.defaultModule;
			Soul.Module.loadLocal(macConfig.moduleList, me.baseConfig.language);
    		Soul.Module.initConfig(macConfig.moduleList);
			me.gotoModule(currentModule);
			if (sessionStorage.getItem("naviCollapse") == 'true')
				me.leftPanel.collapse();
    	};
    	
    	var callbackFn = function(){
    		Soul.Ajax.executeFnAfterLoad(fn);
    	};
    	
    	/*
    	 * load global data
    	 * 
    	**/
		Soul.Ajax.executeRequestData(ACTION_URL.GLOBAL_CONFIG_URL, {remoteIp : remoteIp, requestType : 'macConfig'}, function(data){
			macConfig = data;
			if(macConfig != null) {
				uiConfig = macConfig.uiConfig;
				Soul.uiModule.Message.initMessageModule();
				Soul.uiModule.SysStatus.updateSysStatusAction();
				me.buildNavigation(macConfig.moduleList);
				me.buildWelcomePanel(macConfig.moduleList);
				callbackFn();
			}
			
		}, function(){}, LABEL.load + LABEL.macInfo);
	},
	
	buildNavigation : function (data){
		for ( var i = 0; i < data.length; i++){
			var mg = this.buildModuleGroup(data[i]);
			this.leftPanel.add(mg);
//			this.leftPanel.down('panel[name=' + mg.name + ']').expand();
		}
		var currentMg = sessionStorage.getItem('currentMg');
		if(currentMg != null) {
			this.leftPanel.down('panel[name=' + currentMg + ']').expand();
		}
	},
	
	buildModuleGroup : function(data){
		var sumModules = new Array();
		
		for(var i = 0; i < data.subModules.length; i++){
			var md = data.subModules[i];
			if (md.hidden) continue;
			var tn = this.buildSubModule(md, data.name);
			sumModules.push(tn);	
		}
		
		var panel = Ext.create('Ext.panel.Panel', {
			border : false,
			height:768,
            layout:'fit',
            margins: '5 0 5 5',
            items: { 
				border : false,
				layout: {
                   	type:'vbox',
                   	padding:'5',
                 	align:'stretch'
                },
                defaults:{margins:'0 0 5 0'},
				items : sumModules
			}
		});
		
//		var panel = Ext.create('Ext.tree.Panel', {
//			autoScroll: true,
//			autoShow: true,
//			animate: true,
//			rootVisible: false,
//			height:768,
//			containerScroll: true,
//			store : Ext.create('Ext.data.TreeStore', {
//				fields : ['leaf','text','id','md','name'],
//	            root: {
//	                expanded: true, 
//	                text:"",
//	                user:"",
//	                status:"", 
//	                children: sumModules
//	            }
//			})
//		});
//		
//		panel.on('itemclick', function(view, record, item, index, e, eOpts) {
//			Soul.Module.initModule(me.centerPanel, record.get('md').name, record.get('md').config);
//			sessionStorage.setItem("currentMg", data.name);
//    	});
		if (data.config == null)
			data.config = {};
		var item = {
            title: data.config.hideTitle? "" : MODULE_GROUP[data.name],
            closbale : false,
            border: false,
            name : data.name,
            hidden : data.config.hide ? true : false,
//            iconCls: 'md-user',
            iconCls: data.config.cls,
            items : [panel]
        };
		return item;
	},
	
	buildSubModule : function(md, mgName){
		var me = this;
		if (md.functionName != 'none') {
			var moduleButton = Ext.create('Ext.Button', {
			    text: MODULE_NAME[md.fullName],
			    tooltip : MODULE_HELP[md.fullName],
			    iconCls: 'md-' + md.name,
			    toggleGroup : 'moduleSelect',
			    scale: 'medium',
			    name : 'mdButton-' + md.fullName,
			    enableToggle: true,
			    toggleHandler : function(btn , pressed, eObj) {
					if (pressed) {
						me.centerPanel.layout.setActiveItem(0);
						Soul.Module.initModule(me.centerPanel, md.fullName);
					} else {
						me.gotoWeclome();
					}
			    }
			});		
			return moduleButton;
		}
	},
	
	newHeader : function (){	
		var me = this;
		var data = Soul.Ajax.getSyncText("/innerHtml/indexHeader.html");
		
		var html = Ext.util.Format.format(data, me.baseConfig.headerLogo, SureAuthInfo.loginUserName);
		
		var header = new Ext.Panel({ 
			region: 'north',
			height: 85,
			id: 'header',
//			bodyStyle:'background:#000 no-repeat left top;',
			frame : true,
			stateful : false,
			margins:'0 0 5 0',
			border: false,
			html: html
	    });
		return header;
	},
	
	newMain : function (){
		return new Ext.panel.Panel({
	        id: 'app-portal',
	        region: 'center',
	        layout: 'card',
	        border: false,
	        activeItem: 0,
	   	 	items: [
	   	 		{
	   	 			frame : true,
	   	 			title: LABEL.moduleLoading,
	   	 			iconCls: 'loading'
        		}]
	    	});
	},
	
	newBottom : function (){
		var panel = Ext.create("Ext.Panel", {
            region: 'south',
            split: true,
            height: 100,
            minSize: 100,
            maxSize: 200,
            collapsible: true,
            collapsed: true,
            titleAlign : 'right',
            title: '<img class="x-panel-header-icon x-header-icon" src="/img/icon/monitor-info.png">&nbsp;</img><a>您有<font color="red">5</font>条新消息</a>',
            margins: '0 0 0 0'
        });
		
	    return panel;
	},
	
	newSider : function (){
		return new Ext.Panel({
            id: 'app-options',
            title: LABEL.navigation,
            iconCls : 'navigation',
            region: 'west',
            animCollapse: true,
            width: 200,
            frame : true,
            minWidth: 150,
            maxWidth: 400,
            split: true,
            stateful : false,
            collapsible: true,
            layout: 'accordion',
            layoutConfig:{
                animate: true
            },
            listeners : {
            	collapse : function(p, eOpt){
            		sessionStorage.setItem("naviCollapse", true);
            	},
            	expand : function(p, eOpt){
            		sessionStorage.setItem("naviCollapse", false);
            	}
            },
            items : []
        });
	},
	
	newEast : function(){
		return new Ext.tab.Panel({
                region: 'east',
                title: LABEL.infoPanel,
                id : 'info-panel',
                stateful : false,
                iconCls : 'info',
                frame : true,
                collapsed : true,
                animCollapse: false,
                collapsible: true,
                split: true,
                width: 225, // give east and west regions a width
                minSize: 175,
                maxSize: 400,
                margins: '0 0 0 0',
                tabPosition: 'bottom',
                plugins: [{
	                ptype: 'tabscrollermenu',
	                maxText  : 12,
	                pageSize : 3
            	}],
                listeners : {
					remove : function(container, component, eOpts ){
						if (container.items.length == 0 && container.tabPanel != null) {
							container.tabPanel.collapse(Ext.Component.DIRECTION_RIGHT);
						}
					}
                },
                items: []
            });
	 },
	
	buildWelcomePanel : function(data){
		var items = new Array();
		for ( var i = 0; i < data.length; i++){
			var mg = this.buildModuleGroupPanel(data[i]);
			items.push(mg);
		}
		var panel =  Ext.create('Ext.form.Panel', {
			bodyStyle: 'padding:5px',
			items: items
		});
		
		
		this.centerPanel.add({
			title : LABEL.funcModule,
			iconCls : 'navigation',
			id : 'weclome',
			autoScroll : true,
			frame : true,
			bodyStyle: 'padding:15px;border:0;', 
			items : panel
		});
	}, 
	
	buildModuleGroupPanel : function(data){
		var sumModules = new Array();
		
		for(var i = 0; i < data.subModules.length; i++){
			var md = data.subModules[i];
			if (md.hidden) continue;
			var tn = this.buildSubModulePanel(md);
			sumModules.push(tn);	
		}
		
		if (data.config == null)
			data.config = {};
		
		var fc = Ext.create('Ext.form.FieldSet', {
			title : MODULE_GROUP[data.name],
            labelWidth : 90,
            hidden : data.config.hide ? true : false,
            layout: {
				type : 'hbox'
            },
            defaults: {
                margins: '5 0 5 5'
            },
            items: sumModules
        });
        return fc;
	},
	
	buildSubModulePanel : function(md){
		var me = this;
		var moduleButton = Ext.create('Ext.Button', {
		    text: MODULE_NAME[md.fullName],
		    iconCls: 'md-' + md.name + '-32',
		    scale: 'large',
		    autoHeight : true,
		    handler : function(btn , pressed, eObj) {
				me.gotoModule(md.fullName);
		    }
		});		
		
		return {
			xtype : 'container',
			items : [
				moduleButton,
				{xtype: 'component', width : 120, html: '', cls:'x-form-check-group-label'},
				{xtype: 'component', width : 120, html: MODULE_HELP[md.fullName]}
			]
			
		};
	},
	
	gotoWeclome : function(scope){
		var me = scope || this;
		me.centerPanel.layout.setActiveItem('weclome');
		var currentModule = sessionStorage.getItem('currentModule') || uiConfig.defaultModule;
		var mdBtn = me.down('button[name=mdButton-' + currentModule + ']') || me.down('button[name=mdButton-' + uiConfig.defaultModule + ']');
		if (mdBtn != null){
			mdBtn.toggle(false, true);
		} 
		sessionStorage.setItem("currentModule", 'weclome');
	},
	
	gotoPrev : function(scope){
		var me = scope || this,
			prev = me.centerPanel.layout.getPrev();
		(prev) && me.gotoModule(prev.id);
	},
	
	gotoNext : function(scope){
		var me = scope || this,
			next = me.centerPanel.layout.getNext();
		(next) && me.gotoModule(next.id);
	},
	
	gotoModule : function(moduleName, scope){
		var me = scope || this,
			mg = Soul.Module.getModuleGroupByModule(macConfig.moduleList, moduleName),
			mdBtn = me.down('button[name=mdButton-' + moduleName + ']');
		
	   	if (mg) {
	   		sessionStorage.setItem("currentMg", mg.name);
			me.leftPanel.down('panel[name=' + mg.name + ']').expand();
	   	}
		
		if (mdBtn){
			mdBtn.toggle(true);
		} else {
			me.gotoWeclome();
		}
	}
});

var theme = true;

function changeTheme(obj,e) {
	if (theme){
		Ext.util.CSS.swapStyleSheet("theme", "/js/lib/extlib4/resources/css/ext-all.css");
		theme = false;
	} else {
		Ext.util.CSS.swapStyleSheet("theme", "/js/lib/extlib4/resources/css/ext-all-gray.css");
		theme = true;
	}
}

