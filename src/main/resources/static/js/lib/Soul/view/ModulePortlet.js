Ext.define('Soul.view.ModulePortlet', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.soulmoduleportlet',
	
	requires  : [],
 		
 	VIEW : {},

 	defaultView : null,
	
    supportView :[],
    
    currentView : '',
    
    moduleName : '',
    
    moduleSessionView : '',
    
    dataObj : null,
    
    configObj : null,

    closable: true,
    
	initComponent : function() {
 		var me = this;
		me.initModule();
		if(me.configObj)
			me.configObj.initConfig();
		
		if(me.currentView == '')
    		me.currentView = me.defaultView;

        if (!me.icon && !me.iconCls) {
            var name = me.moduleName.substr(me.moduleName.lastIndexOf(".") + 1).toLowerCase();
            me.icon = "/img/module/16/" + name + ".png";
        }
		
		Ext.apply(this, {
			frame : true,
			autoScroll : true,
			stateful : false,
			tools : me.initTools(),
			dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: me.initToolbar()
            }],
            layout: 'card',
            listeners: {
                close: function () {
                    var soulviewportal = me.up('soulviewportal');
                    if (soulviewportal) {
                        soulviewportal.gotoWeclome();
                    }
                }
            },
			id: this.moduleName
		});
    	this.callParent(arguments);
	},
	
	initUI : function(config){
    	var me = this,
    		item = me.getComponent(me.id + '-' + me.currentView);
		sessionStorage.setItem("currentModule", me.moduleName);
		config = config || {};
		if(item == null) {
			Ext.apply(config, {id : me.id + '-' + me.currentView, anchor : '100% 100%', portlet : me});
            item = Ext.create(me.currentView, config);
            me.add(item);
        }
        if (item != null) {
            sessionStorage.setItem(me.moduleSessionView, me.currentView);
            me.layout.setActiveItem(me.id + '-' + me.currentView);
            if (typeof(item.updateView) == 'function') {
                Ext.apply(item, config);
                item.updateView(item);
            }
		}
    },
    
    initModule : function(){
    	var me = this;
    	if(sessionStorage.getItem(me.moduleSessionView) != null)
    		me.currentView = sessionStorage.getItem(me.moduleSessionView);
    },
    
    havUpdateButton : true,
    
   	initToolbar : function(){
    	var me = this,
            toolbar = [],
			viewSelect = me.getViewSelectMenu(),
			updateButton = me.getUpdateButton();
    	toolbar.push(viewSelect);
		toolbar.push('-');
		if(me.havUpdateButton){
			toolbar.push(updateButton);
			toolbar.push('-');
		}
		return toolbar;
    },
    
    initTools : function(){
        var tools = [];
		
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
    
    getViewSelectMenu : function(){
    	var me = this,
            viewItems = [];
    	
		for(var i = 0; i < me.supportView.length; i++){
			var menu = {
            	text: me.VIEW[me.supportView[i]],
            	view : me.supportView[i],
            	checked : me.currentView == me.supportView[i]? true : false,
				group: me.moduleName + '-viewgroup',
				checkHandler: function(item, checked) {
					if (checked == true) {
						me.currentView = item.view;
						me.initUI();
					}
				}
            };
			viewItems.push(menu);
		}
		var viewSelect = {
			xtype:'splitbutton',
            text: LABEL.viewSelect,
            iconCls: 'view',
            menu: viewItems
		};
		return viewSelect;
	},
	
	gotoView : function(view, config,scope){
		var me = scope || this;
		var vb = me.down('menucheckitem[view=' + view + ']');
		vb.setChecked(true, true);
		me.currentView = view;
		me.initUI(config);
	},
	
	getUpdateButton : function() {
		var me = this,
			updateButton = {
				text : LABEL.updateData,
				iconCls : 'update',
                handler: me.dataObj ? me.dataObj.updateCallbackFn : Ext.emptyFn
			};
		return updateButton;
	},
	
	 updateView : function(scope){
    	 var me = scope || this;
    	 me.initUI();
     }
});




