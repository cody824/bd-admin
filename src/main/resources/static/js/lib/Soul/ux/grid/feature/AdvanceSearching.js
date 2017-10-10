// JavaScript Document// vim: ts=4:sw=4:nu:fdc=4:nospell  
/**  
 * Search plugin for Ext.grid.GridPanel, Ext.grid.EditorGrid ver. 2.x or subclasses of them  
 *  
 * @author    Ing. Jozef Sakalos  
 * @copyright (c) 2008, by Ing. Jozef Sakalos  
 * @date      17. January 2008  
 * @version   $Id: Ext.ux.grid.Search.js 220 2008-04-29 21:46:51Z jozo $  
 *  
 * @license Ext.ux.grid.Search is licensed under the terms of  
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent  
 * that the code/component(s) do NOT become part of another Open Source or Commercially  
 * licensed development library or toolkit without explicit permission.  
 *   
 * License details: http://www.gnu.org/licenses/lgpl.html  
 */ 
 
/*  
    Revised for Ext 4  
    by Nathan LeBlanc  
    on July 8, 2011  
*/ 
 
Ext.define('Soul.ux.grid.feature.AdvanceSearching', {  
    extend: 'Soul.ux.grid.feature.Searching',  
    alias: 'feature.souladvancesearching',  
 
 
    onRender:function() {  
        
        var panel = this.toolbarContainer || this.grid;
        var me = this;

        this.store = this.grid.store;
        
		me.updateParams('load');
		
		me.pagingBar =  Ext.create("Ext.PagingToolbar", {
        	dock: 'bottom',
			store : me.store,
			displayInfo: true,
			emptyMsg: LABEL.emptyMsg
		}),
		
		panel.pagingBar = me.pagingBar;
		
		me.statusBar = Ext.create('Ext.ux.statusbar.StatusBar', {
			dock: 'bottom',
            defaultText: me.defaultStatusText,
            name: 'searchStatusBar'
        });
        
        var searchBar = this.initToolBar(panel.customFilter);
        
        me.searchTb = Ext.create("Ext.toolbar.Toolbar", {
        	 dock: 'top',
             name : 'baseSearchBar',
             enableOverflow  : true,
             items: searchBar
        });
        
        panel.addDocked(me.searchTb);
        
        var advanceSearchBar = this.initAdvanceSearchBar();
        
        me.advanceSearchTb = Ext.create("Soul.ux.toolbar.AdvanceSearchToolBar", {
        	dock: 'top',
            name : 'advanceSearchBar',
            hidden : !me.showAdvanceSearchBar,
            enableOverflow  : true,
            items: advanceSearchBar
        });
        
        panel.addDocked(me.advanceSearchTb);
        
        if (me.isPaging) {
        	panel.addDocked(me.pagingBar);
		} else {
			panel.addDocked(me.statusBar);
		}
 
        // reconfigure  
        this.reconfigure();  
 
        // keyMap  
        if(this.shortcutKey && this.shortcutModifier) {  
            var shortcutEl = this.grid.getEl();  
            var shortcutCfg = [{  
                 key:this.shortcutKey  
                ,scope:this 
                ,stopEvent:true 
                ,fn:function() {  
                    this.field.focus();  
                }  
            }];  
            shortcutCfg[0][this.shortcutModifier] = true;  
            this.keymap = new Ext.KeyMap(shortcutEl, shortcutCfg);  
        }  
 
        if(true === this.autoFocus) {  
            this.grid.store.on({scope:this, load:function(){this.field.focus();}});  
        }  
        me.changeSearchBar(true);
        
        
        me.store.on('load', function (store, records, successful, operation, eOpts ){
        	if (!me.isPaging) {
        		me.statusBar.setStatus({
                    text: Ext.String.format(MESSAGE.matchItem, store.getCount()),
                    iconCls: 'x-status-valid'
               });
        	}
        });
        
        me.store.on('beforeload', function (store, options) {
        	me.buildFilter(store, me);
	    });
    }, // eo function onRender  
    
    initToolBar : function(customFilter){
    	var me = this,
    		searchBar = me.initSearchBar(), 
    		customBar = me.initCustomFilter(customFilter),
    		toolbar = Ext.Array.merge(searchBar, customBar);
    	;
    	toolbar.push(searchBar, '->' , {
				iconCls : 'settings',
				xtype:'splitbutton',
            	menu: Ext.create('Ext.menu.Menu', {
            		style: {
           				overflow: 'visible'     // For the Combo popup
        			},
            		items : [ 
            		/*{
            			text : me.advanceSearchText,
            			width : 100,
//            			hidden : true,
            			checked : me.showAdvanceSearchBar,
            			checkHandler : me.advanceBarToggle,
            			scope: me 
            		},*/ /*{
            			text : LABEL.regExp,
            			disabled : !me.showSearchBar,
		                checked : me.regExpMode,
		                checkHandler: me.regExpToggle,
		                scope: me                
				    },*/ {
				    	text : LABEL.caseSensitive,
		                checked : me.caseSensitive,
		                disabled : !me.showSearchBar,
		                checkHandler: me.caseSensitiveToggle,
		                scope: me
		            }, /*{
				    	text : LABEL.searchHighlight,
		                checked : me.searchHighlight,
		                disabled : !me.showSearchBar,
		                checkHandler: me.searchHighlightToggle,
		                scope: me
		            },*/{
				    	text : LABEL.paging,
		                checked : me.isPaging,
		                hidden : !me.supportPaging,
		                checkHandler: me.isPagingToggle,
		                scope: me
		            }, {
				    	text : LABEL.autoPageSize,
				    	disabled : !me.isPaging,
		                checked : me.autoPageSize,
		                hidden : !me.supportPaging,
		                checkHandler: me.autoPageSizeToggle,
		                scope: me
		            }, {
		            	hidden : !me.supportPaging,
				    	text : LABEL.pageSize
		            }, {
		            	xtype: 'numberfield',
						name: 'pageSize',
						minValue: 5,
						maxValue: 200,
						width : 50,
						editable : false,
						hidden : !me.supportPaging,
						step : 5,
						value: me.store.pageSize > 200 ? 10 : me.store.pageSize,
						accelerate: true,
				    	listeners : {
							change : function(spinner, newValue, oldValue, eOpts){
								if (newValue < 5) {
									spinner.setValue(5);
									return;
								} else if (newValue >200) {
									spinner.setValue(200);
									return;
								}
								me.store.pageSize = newValue;
						        me.updateParams();
						        me.pbMoveFirst();
							} ,
				    	},
				    	disabled : !me.isPaging || me.autoPageSize,
		                scope: me
		            }
            			 
            	]
            	})
			}
		);
    	return toolbar;
     },
     
     initSearchBar : function(){
    		searchBar = new Array();
    	 
    	 	// add menu  
    	 	this.menu = Ext.create('Ext.menu.Menu');  

      // add input field (TwinTriggerField in fact)  
 	     this.field = Ext.create('Ext.form.TwinTriggerField', {  
 	         width:this.width,  
 	         qtip: 'ddd', 
 	         hidden: this.showAdvanceSearchBar,
 	         selectOnFocus:undefined === this.selectOnFocus ? true : this.selectOnFocus,  
 	         triggerCls: 'x-form-clear-trigger',  
 	         //triggerCls: this.minChars ? 'x-hidden' : 'x-form-search-trigger',  
 	         onTrigger1Click: Ext.bind(this.onTriggerClear, this),  
 	         //onTrigger2Click: this.minChars ? Ext.emptyFn : Ext.bind(this.onTriggerSearch, this),  
 	         //onTrigger1Click: this.minChars ? Ext.emptyFn : Ext.bind(this.onTriggerSearch, this),  
 	         minLength:this.minLength  
 	     });  
 	       
 	     // install event handlers on input field  
 	     this.field.on('render', function() {  
            
 	         var qtip = this.minChars ? Ext.String.format(this.minCharsTipText, this.minChars) : this.searchTipText;  
 	         Ext.QuickTips.register({  
 	             target: this.field.inputEl,  
 	             text: qtip  
 	         });  
 	           
 	         if(this.minChars) {  
 	             this.field.el.on({scope:this, buffer:300, keyup:this.onKeyUp});  
 	         }  

 	         // install key map  
 	         var map = new Ext.KeyMap(this.field.el, [{  
 	              key:Ext.EventObject.ENTER  
 	             ,scope:this 
 	             ,fn:this.pbMoveFirst  
 	         },{  
 	              key:Ext.EventObject.ESC  
 	             ,scope:this 
 	             ,fn:this.onTriggerClear  
 	         }]);  
 	         map.stopEvent = true;  
 	     }, this, {single:true});  
 	     searchBar.push({  
             text:'属性',
             menu:this.menu  
         }, this.field, {
         	text: "重置", 
         	iconCls:'reset',
         	handler : this.resetAdvanceBar,
            scope:this 
         }, {
         	text: this.searchText, 
         	iconCls:this.iconCls,
         	handler : this.pbMoveFirst,
            scope:this 
         }, '-');
 	     return searchBar;
    },
    
    initCustomFilter : function(customFilter){
    	var me = this;
    	var cf = [];
    	if (customFilter) {
    		cf.push({
	         	text: "快捷检索：", 
			});
    		if (Array.isArray(customFilter)) {
    			Ext.each(customFilter, function(v, i, self){
    				var sb = me.buildCustomSB(v);
    				cf.push(sb);
    			});
    		} else {
    			var sb = me.buildCustomSB(customFilter);
				cf.push(sb);
    		}
    	}
    
    	return cf;
    },
    
    buildCustomSB : function(cb){
    	var me = this;
    	var sb = {
         	text: cb.searchText, 
         	iconCls:cb.iconCls,
         	icon : cb.icon,
         	enableToggle : true,
         	name : cb.name,
         	toggleGroup : 'customFiler',
         	filter : cb.filter,
         	handler : function(btn){
    			if (btn.pressed) {
    				me.currentCF = btn.filter;
    				Ext.each(this.advanceSearchTb.items.items, function(item){
    		    		if (typeof item.reset == "function")
    		    			item.reset();
    		    	});
					me.pbMoveFirst();
    			} else {
    				me.currentCF = [];
					me.pbMoveFirst();
    			}
    		},
         	scope:me 
		}
		return sb;
    },
    
    resetAdvanceBar: function(){
    	Ext.each(this.advanceSearchTb.items.items, function(item){
    		if (typeof item.reset == "function")
    			item.reset();
    	});
		Ext.each(this.searchTb.items.items,function(item){
    		if(item.enableToggle) {
    			item.toggle(false, false);
    		}
    	});
    	this.currentCF = [];
    },
     
     /**  
      * store 载入前初始化proxy请求参数
      */ 
     buildFilter:function(store, scope) { 
     	var me = scope || this;
     	var panel = this.toolbarContainer || this.grid;
     	
     	if (!me.showAdvanceSearchBar && !me.field.isValid()) {  
             return;  
         }  
         
         var val = me.field.getValue(),  
             proxy = store.getProxy();
         
         // grid's store filter  
         if('local' === me.mode) {  
             store.clearFilter();  
             if(val) {  
                 store.filterBy(function(r) {  
                     var retval = false;  
                     me.menu.items.each(function(item) {  
                         if(!item.checked || retval) {  
                             return;  
                         }  
                         var rv = r.get(item.dataIndex);  
                         rv = rv instanceof Date ? Ext.Date.format(rv, me.dateFormat || r.fields.get(item.dataIndex).dateFormat) : rv;  
                         var re = new RegExp(val, 'gi');  
                         retval = re.test(rv);  
                     }, me);  
                     if(retval) {  
                         return true;  
                     }  
                     return retval;  
                 }, me);  
             }  
             else {  
             }  
         }  
         // ask server to filter records  
         // your proxy must be a Server proxy  
         else if(proxy instanceof Ext.data.proxy.Server) {  
             // clear start (necessary if we have paging)  
             if(store.lastOptions && store.lastOptions.params) {  
                 store.lastOptions.params[store.paramNames.start] = 0;  
             }  
  
             var filter = new SQLFilter();
             var sel = [];
             if (Array.isArray(panel.initFilter)) {
            	Ext.each(panel.initFilter, function(v, i, self){
            		var se = new SQLException(v.relationOp, v.attr, v.logicalOp,  v.value,  !me.caseSensitive);
	    			sel.push(se);
            	}); 
             }
             if (Array.isArray(me.currentCF)){
            	 Ext.each(me.currentCF, function(v, i, self){
             		var se = new SQLException(v.relationOp, v.attr, v.logicalOp,  v.value,  !me.caseSensitive);
 	    			sel.push(se);
             	});
             }
             if (me.showAdvanceSearchBar){
             	var advanceBar = panel.down('advstoolbar');
             	 me.menu.items.each(function(item) {  
  	                if(item.checked && item.dataIndex ) { 
  	                	var relationOp = advanceBar.getRelationOp(item, advanceBar);
  	                	var logicalOp = advanceBar.getLogicalOp(item, advanceBar);
  	                	var value = advanceBar.getQueryValue(item, advanceBar);
  	                   
  	                	if (item.searchType == 'string' && value.length > 0) {
  	                    	var se = new SQLException(relationOp, item.dataIndex, logicalOp,  "%25" + value + "%25",  !me.caseSensitive);
  	 	    				sel.push(se);
  	                    } else if (item.searchType == 'number' && value != null){
  	                    	var se = new SQLException(relationOp, item.dataIndex, logicalOp,  value,  !me.caseSensitive);
  	 	 	    			sel.push(se);
  	                    } else if (item.searchType == 'date'){
  	                    	var se = new SQLException(relationOp, item.dataIndex, "between",  value,  !me.caseSensitive);
  	 	 	    			sel.push(se);
//  	                    	var se = new SQLException(relationOp, item.dataIndex, logicalOp,  value,  !me.caseSensitive);
//  	 	    				sel.push(se);
  	                    } else if (item.searchType == 'combo' && value != null){
  	                    	if (Array.isArray(value)){
  	                    		if (value.length > 0) {
  	                    			var comboSel = [];
  	  	                    		Ext.each(value, function(cv){
  	  	                    			var se = new SQLException("or", item.dataIndex, '=',  cv,  !me.caseSensitive);
  	  	                    			comboSel.push(se);
  	  	                    		});
  	  	                    		var ses = new SQLExpressionSet(relationOp, comboSel);
  	  	                    		filter.addSQLExpressionSet(ses);
  	                    		}
  	                    	} else {
  	                    		var se = new SQLException(relationOp, item.dataIndex, '=',  value,  !me.caseSensitive);
  	  	                    	sel.push(se);
  	                    	}
  	                    } else if (item.searchType == 'boolean' && value != null){
  	                    	var se = new SQLException(relationOp, item.dataIndex, '=',  value,  !me.caseSensitive);
  	                    	sel.push(se);
  	                    }
  	                }  
  	            });
             }
            if (sel.length > 0)
                  	filter.buildBySe(sel);
         	var f = filter.getFilter();
         	proxy.extraParams.filter = Ext.encode(f);
         }  
  
     } // eo function buildFilter 
}); // eo extend  
 
// eof 