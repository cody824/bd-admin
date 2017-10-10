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
 
Ext.define('Soul.ux.grid.feature.Searching', {  
    extend: 'Ext.grid.feature.Feature',  
    alias: 'feature.soulsearching',  
 
    /**  
     * cfg {Boolean} autoFocus true to try to focus the input field on each store load (defaults to undefined)  
     */ 
 
    /**  
     * @cfg {String} searchText Text to display on menu button  
     */ 
    searchText:'查询',  
    
    /**  
     * @cfg {String} searchText Text to display on menu button  
     */ 
    advanceSearchText:'高级查询', 
 
    /**  
     * @cfg {String} searchTipText Text to display as input tooltip. Set to '' for no tooltip  
     */   
    searchTipText:'输入关键字回车查询',  
 
    /**  
     * @cfg {String} selectAllText Text to display on menu item that selects all fields  
     */ 
    selectAllText:'所有列',  
 
    /**  
     * @cfg {String} position Where to display the search controls. Valid values are top and bottom (defaults to bottom)  
     * Corresponding toolbar has to exist at least with mimimum configuration tbar:[] for position:top or bbar:[]  
     * for position bottom. Plugin does NOT create any toolbar.  
     */ 
    position:'top',  
 
    /**  
     * @cfg {String} iconCls Icon class for menu button (defaults to icon-magnifier)  
     */ 
    iconCls: 'Zoom',  
    
    /**  
     * @cfg {String} iconCls Icon class for menu button (defaults to icon-magnifier)  
     */ 
    advanceIconCls: 'Zoom',  
 
    /**  
     * @cfg {String/Array} checkIndexes Which indexes to check by default. Can be either 'all' for all indexes  
     * or array of dataIndex names, e.g. ['persFirstName', 'persLastName']  
     */ 
    checkIndexes:'all',  
    
    /**  
     * @cfg {Array} 用户选择的
     */ 
    userCheckIndexes:[],  
 
    /**  
     * @cfg {Array} disableIndexes Array of index names to disable (not show in the menu), e.g. ['persTitle', 'persTitle2']  
     */ 
    disableIndexes:[],  
 
    /**  
     * @cfg {String} dateFormat how to format date values. If undefined (the default)   
     * date is formatted as configured in colummn model  
     */ 
    dateFormat:undefined,  
 
    /**  
     * @cfg {Boolean} showSelectAll Select All item is shown in menu if true (defaults to true)  
     */ 
    showSelectAll:true,  
 
    /**  
     * @cfg {String} menuStyle Valid values are 'checkbox' and 'radio'. If menuStyle is radio  
     * then only one field can be searched at a time and selectAll is automatically switched off.  
     */ 
    menuStyle:'checkbox',  
 
    /**  
     * @cfg {Number} minChars minimum characters to type before the request is made. If undefined (the default)  
     * the trigger field shows magnifier icon and you need to click it or press enter for search to start. If it  
     * is defined and greater than 0 then maginfier is not shown and search starts after minChars are typed.  
     */ 
    minChars: 2,  
    /**  
     * @cfg {String} minCharsTipText Tooltip to display if minChars is > 0  
     */ 
    minCharsTipText:'至少输入{0}个字符',  
 
    /**  
     * @cfg {String} mode Use 'remote' for remote stores or 'local' for local stores. If mode is local  
     * no data requests are sent to server the grid's store is filtered instead (defaults to 'remote')  
     */ 
    mode:'remote',  
 
    /**  
     * @cfg {Array} readonlyIndexes Array of index names to disable (show in menu disabled), e.g. ['persTitle', 'persTitle2']  
     */ 
 
    /**  
     * @cfg {Number} width Width of input field in pixels (defaults to 100)  
     */ 
    width:100,  
 
    /**  
     * @cfg {Object} paramNames Params name map (defaults to {fields:'fields', query:'query'}  
     */ 
    paramNames: {  
         fields:'fields' 
        ,query:'query' 
    },  
 
    /**  
     * @cfg {String} shortcutKey Key to fucus the input field (defaults to r = Sea_r_ch). Empty string disables shortcut  
     */ 
    shortcutKey:'r',  
 
    /**  
     * @cfg {String} shortcutModifier Modifier for shortcutKey. Valid values: alt, ctrl, shift (defaults to alt)  
     */ 
    shortcutModifier:'alt',  
 
    /**  
     * @cfg {String} align 'left' or 'right' (defaults to 'left')  
     */ 
    align:'left',  
    /**  
     * @cfg {Number} minLength force user to type this many character before he can make a search  
     */ 
    minLength: 2,  
    /**  
     * @cfg {Ext.Panel/String} toolbarContainer Panel (or id of the panel) which contains toolbar we want to render  
     * search controls to (defaults to this.grid, the grid this plugin is plugged-in into)  
     */ 
              
    //attachEvents: function() {  
    //    this.grid = this.view.up('gridpanel');  
    //    if(this.grid.rendered)  
    //        this.onRender();  
    //    else  
    //        this.grid.on('render', this.onRender, this);  
    //},  
    /**
     * @private
     * Case sensitive mode.
     */
    caseSensitive: false,
    
    /**
     * @private
     * Regular expression mode.
     */
    regExpMode: false,
    
    /**  
     * @cfg {String} 状态栏默认的文字  
     */ 
    defaultStatusText: LABEL.noMatchs,
    
    /**  
     * @cfg {Boolean} 是否显示搜索栏  
     */ 
    showSearchBar : true,
    
    /**  
     * @cfg {Boolean} 是否显示高级搜索Bar  
     */ 
    showAdvanceSearchBar : false,
    
    /**  
     * @cfg {Boolean} 是否自动分页 
     */
    autoPageSize : true,
    
    /**  
     * @cfg {Boolean} 是否分页
     */
    isPaging : true,
    
    /**  
     * @cfg {Boolean} 是否支持分页
     */
    supportPaging : true,
    
    /**  
     * @cfg {Boolean} 是否高亮显示
     */
    searchHighlight : true,
    
    
    init: function (grid) {  
        this.grid = grid;  
        if (this.grid.rendered)  
            this.onRender();  
        else 
            this.grid.on('render', this.onRender, this);  
    },  
 
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
        
        var searchBar = this.initToolBar();
        
        me.searchTb = Ext.create("Ext.toolbar.Toolbar", {
        	 dock: 'top',
             name : 'baseSearchBar',
             enableOverflow  : true,
             items: searchBar
        });
        
        panel.addDocked(me.searchTb);
        
        var advanceSearchBar = this.initAdvanceSearchBar();
        
        me.advanceSearchTb = Ext.create("Soul.ux.toolbar.SQLExpressionSetToolBar", {
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
    // }}}  
    // {{{  
    
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
	         minLength:this.minLength,
	         minChars:this.minChars
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
            	text: this.searchText, 
            	iconCls:this.iconCls,
            	handler : this.pbMoveFirst,
	            scope:this 
            }
		);
   	 	return searchBar;
   },
   
   buildBaseSearchItem : function(item, scope){
//    	var me = scope || this;
    	var searchTb = [];
    	if (item.searchType == 'string') {
    		searchTb.push({
    			text : item.text
    		}, {
    			xtype : "textfield"
    		});
    	} else if (item.searchType == 'number'){
    		searchTb.push({
    			text : item.text
    		}, {
    			xtype : "numberfield"
    		});
    		
    	} else if (item.searchType == 'date'){
    		
    	} else {
    		searchTb.push({
    			text : item.text
    		}, {
    			xtype : "textfield"
    		});
    	}
    	return searchTb;
    	
    },
    
    initAdvanceSearchBar : function(scope){
    	 var advanceSearchBar = new Array();
         return advanceSearchBar;
    },
    
    initToolBar : function(baseBar){
    	var me = this,
    		searchBar = me.initSearchBar(), 
    		toolbar = Ext.Array.merge(searchBar, []);
    	;
    	toolbar.push(searchBar, '->' , {
				iconCls : 'settings',
				xtype:'splitbutton',
            	menu: Ext.create('Ext.menu.Menu', {
            		style: {
           				overflow: 'visible'     // For the Combo popup
        			},
            		items : [ 
            		{
            			text : me.advanceSearchText,
            			width : 100,
//            			hidden : true,
            			checked : me.showAdvanceSearchBar,
            			checkHandler : me.advanceBarToggle,
            			scope: me 
            		}, /*{
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
    
    onKeyUp:function() {  
        var length = this.field.getValue().toString().length; 
        if(0 === length || this.minChars <= length) {  
        	this.pbMoveFirst();  
        }  
    }, // eo function onKeyUp  
    // }}}  
    // {{{  
    /**  
     * private Clear Trigger click handler  
     */ 
    onTriggerClear:function() {  
        if (this.field.getValue()) {  
            //if (this.field.getValue().length < this.minChars) {  
            //    this.field.setValue('');  
            //    return;  
            //}  
            this.field.setValue('');  
            this.field.focus();              
            this.pbMoveFirst();  
        }  
    }, // eo function onTriggerClear  
    // }}}  
    // {{{  
  
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
            
            if (!me.showAdvanceSearchBar && val != null && val !== "" && val.length > 0) {
            // get fields to search array  
            	var sel = [];
	            me.menu.items.each(function(item) {  
	                if(item.checked && item.dataIndex ) { 
	                	
	                    if (item.searchType == 'string') {
	                    	var se = new SQLException("or", item.dataIndex, "like",  "%25" + val + "%25",  !me.caseSensitive);
	    					sel.push(se);
	                    } else if (item.searchType == 'number'){
                            var number_value = parseInt(val);
                            // if(number_value != null && !isNaN(number_value)){
                            if(number_value){
                                var se = new SQLException("or", item.dataIndex, "=",  number_value,  !me.caseSensitive);
                                sel.push(se);
                            }
	                    }else if (item.searchType == 'combo'){
                            if(item.comboData){
                                var comboDataDict = {};
                                Ext.Array.forEach(item.comboData,function(comboDataItem,index,array){
                                    comboDataDict[comboDataItem[1]] = comboDataItem[0];
                                });
                                if(comboDataDict[val] != null){
                                    var se = new SQLException("or", item.dataIndex, '=',  comboDataDict[val],  !me.caseSensitive);
                                    sel.push(se);
                                }else{
                                    var se = new SQLException("or", item.dataIndex, '=',  val,  !me.caseSensitive);
                                    sel.push(se);
                                }
                            }
                        }
	                }  
	            });
	            if (sel.length > 0)
                	filter.buildBySe(sel);
            } else if (me.showAdvanceSearchBar){
            	var advanceBar = panel.down('sestoolbar');
            	
            	var sel = [];
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
// 	                    	var se = new SQLException(relationOp, item.dataIndex, logicalOp,  value,  !me.caseSensitive);
// 	 	    				sel.push(se);
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
 	            if (sel.length > 0)
                 	filter.buildBySe(sel);
            }
 
        	var f = filter.getFilter();
        	proxy.extraParams.filter = Ext.encode(f);
        }  
 
    }, // eo function buildFilter 
    
    
    // }}}  
    // {{{  
    /**  
     * @param {Boolean} true to disable search (TwinTriggerField), false to enable  
     */ 
    setDisabled:function() {  
        this.field.setDisabled.apply(this.field, arguments);  
    }, // eo function setDisabled  
    // }}}  
    // {{{  
    /**  
     * Enable search (TwinTriggerField)  
     */ 
    enable:function() {  
        this.setDisabled(false);  
    }, // eo function enable  
    // }}}  
    // {{{  
    /**  
     * Enable search (TwinTriggerField)  
     */ 
    disable:function() {  
        this.setDisabled(true);  
    }, // eo function disable  
    // }}}  
    // {{{  
    /**  
     * private (re)configures the plugin, creates menu items from column model  
     */ 
    reconfigure:function() {  
        // {{{  
        // remove old items  
        var menu = this.menu;  
        var advanceTb = this.advanceSearchTb;
        var me = this;
        
        menu.removeAll();  
 
        // add Select All item plus separator  
        if(this.showSelectAll && 'radio' !== this.menuStyle) {  
            menu.add({  
                xtype: 'menucheckitem',  
                text:this.selectAllText,  
                checked:!(this.checkIndexes instanceof Array),  
                hideOnClick:false,  
                handler:function(item) {  
                    var checked = item.checked;  
                    item.parentMenu.items.each(function(i) {  
                        if(item !== i && i.setChecked && !i.disabled) {  
                            i.setChecked(checked);  
                        }  
                    });  
                }  
            },'-');  
        }  
 
        // }}}  
        // {{{  
        // add new items  
        var columns = this.grid.headerCt.items.items;  
        var group = undefined;  
        if('radio' === this.menuStyle) {  
            group = 'g' + (new Date).getTime();      
        }  
          
        Ext.each(columns, function(column) {  
            var disable = false;  
            if(column.text && column.dataIndex && column.dataIndex != '') {  
                Ext.each(this.disableIndexes, function(item) {  
                    disable = disable ? disable : item === column.dataIndex;  
                });  
                if(!disable) {  
                	advanceTb.addSQLExpression(column, advanceTb);
                    menu.add({  
                        xtype: 'menucheckitem',  
                        text: column.text,  
                        hideOnClick: false,  
                        group:group,  
                        checked: 'all' === this.checkIndexes,  
                        dataIndex: column.dataIndex, 
                        comboData: column.comboData,
                        checkHandler : function(menuItem ,checked){
                        	if (checked) {
                        		advanceTb.showQueryCondition(column, advanceTb);
                        		me.userCheckIndexes.push(column.dataIndex);
                        	} else {
                        		advanceTb.hideQueryCondition(column, advanceTb);
                        		Ext.Array.remove(me.userCheckIndexes, column.dataIndex);
                        	}
                        	me.updateParams();
                        },
                        searchType : column.searchType || 'string'
                    });  
                }  
            }  
        }, this);  
        
        // hide search item
        Ext.each(menu.items.items, function(item, i){
    		if (i > 1)
    			advanceTb.hideQueryCondition(item, advanceTb);
    	}, this);
        
        
        // }}}  
        // {{{  
           // check items  
        if(this.checkIndexes instanceof Array) {  
            Ext.each(this.checkIndexes, function(di) {
                var item = menu.items.findBy(function(itm) {  
                    return itm.dataIndex === di;  
                });  
                if(item) {  
                    item.setChecked(true, false);  
                }  
            }, this);  
        } 
        
            // check items  
        if(this.userCheckIndexes instanceof Array) {  
            Ext.each(this.userCheckIndexes, function(di) {
                var item = menu.items.findBy(function(itm) {  
                    return itm.dataIndex === di;  
                });  
                if(item) {  
                    item.setChecked(true, false);  
                }  
            }, this);  
        } 

        // }}}  
        // {{{  
        // disable items  
        if(this.readonlyIndexes instanceof Array) {  
            Ext.each(this.readonlyIndexes, function(di) {  
                var item = menu.items.findBy(function(itm) {  
                    return itm.dataIndex === di;  
                });  
                if(item) {  
                    item.disable();  
                }  
            }, this);  
        }  
        // }}}  
 
    },
    
	
	pbMoveFirst : function(){
		var me = this;
		if (me.showAdvanceSearchBar) {
			
		} else if(!me.field.isValid()) {  
			return;  
	    } 
		me.pagingBar.moveFirst();
	},
	
	updateParams : function(opt){
		var tag = this.id || this.grid.id || "default";
		
		var configObj = Ext.JSON.decode(localStorage.getItem(tag + '-config')) || new Object();
		
		if (opt === 'load') {
			this.searchHighlight = configObj.searchHighlight == null ? this.searchHighlight : configObj.searchHighlight;
			this.showSearchBar = configObj.showSearchBar == null ? this.showSearchBar : configObj.showSearchBar;
			this.showAdvanceSearchBar = configObj.showAdvanceSearchBar == null ? this.showAdvanceSearchBar : configObj.showAdvanceSearchBar;
			this.isPaging = configObj.isPaging == null ? this.isPaging : configObj.isPaging;
			this.autoPageSize = configObj.autoPageSize == null ? this.autoPageSize : configObj.autoPageSize;
			this.store.pageSize = configObj.pageSize == null ? this.store.pageSize : configObj.pageSize ;
			this.regExpMode = configObj.regExpMode == null ? this.regExpMode : configObj.regExpMode;
			this.caseSensitive = configObj.caseSensitive == null ? this.caseSensitive : configObj.caseSensitive;
			this.userCheckIndexes = configObj.userCheckIndexes == null ? this.userCheckIndexes : configObj.userCheckIndexes;
		}
		configObj.searchHighlight = this.searchHighlight;
		configObj.showSearchBar = this.showSearchBar;
		configObj.showAdvanceSearchBar = this.showAdvanceSearchBar;
		configObj.isPaging = this.isPaging;
		configObj.autoPageSize = this.autoPageSize;
		configObj.pageSize = this.store.pageSize;
		configObj.regExpMode = this.regExpMode;
		configObj.caseSensitive = this.caseSensitive;
		configObj.userCheckIndexes = this.userCheckIndexes;
		localStorage.setItem(tag + '-config', Ext.JSON.encode(configObj));
	},
	
	searchClear : function(){
		this.textField.setValue('');
	},
	
	   /**
     * Switch to case sensitive mode.
     * @private
     */    
    caseSensitiveToggle: function(checkbox, checked) {
        this.caseSensitive = checked;
        this.updateParams();
    },
    
    /**
     * Switch to search bar model.
     * @private
     */    
    advanceBarToggle: function(checkbox, checked) {
    	this.changeSearchBar(checked);
        this.updateParams();
    },
    
    /**
     * Switch to regular expression mode
     * @private
     */
    regExpToggle: function(checkbox, checked) {
        this.regExpMode = checked;
        this.updateParams();
    },
     
    searchHighlightToggle : function(checkbox, checked){
    	this.searchHighlight = checked;
        this.updateParams();
    },
    	
	changePageStatus : function(isPaging){
		this.isPaging = isPaging;
		if (isPaging) {
			this.grid.removeDocked(this.statusBar, false);
			this.grid.addDocked(this.pagingBar);
//			this.statusBar.setVisible(!isPaging);
//			this.pagingBar.setVisible(isPaging);
		} else {
			this.grid.removeDocked(this.pagingBar, false);
			this.grid.addDocked(this.statusBar);
			
//			this.pagingBar.setVisible(isPaging);
//			this.statusBar.setVisible(!isPaging);
		}
		
	},
	
	
	changeSearchBar : function(showAdvanceSearchBar){
		 var panel = this.toolbarContainer || this.grid;
    	 var baseBar = panel.down("toolbar[name='baseSearchBar']");
    	 var advanceBar =  panel.down("toolbar[name='advanceSearchBar']");
		
		
		this.showAdvanceSearchBar = showAdvanceSearchBar;
		 if (this.showAdvanceSearchBar) {
    		 baseBar.down('triggerfield').hide();
    		 advanceBar.show();
    	 } else {
    		 baseBar.down('triggerfield').show();
    		 advanceBar.hide();
    	 }
	},
	
    isPagingToggle : function(checkbox, checked){
        var autoPSItem = this.grid.down('menuitem[text=' + LABEL.autoPageSize + ']');
        var pageSizeNF = this.grid.down('numberfield[name=pageSize]');
        
        autoPSItem.setDisabled(!checked);
        pageSizeNF.setDisabled(!checked);
        
        var pageSize = pageSizeNF.getValue();
    	
        this.changePageStatus(checked);
        if (checked) {
        	this.store.pageSize = pageSize;
        } else {
        	autoPSItem.setChecked(false);
        	this.autoPageSize = false;
        	this.store.pageSize = 65535;
        }
        this.updateParams();
        this.pbMoveFirst();
    },
    
    autoPageSizeToggle : function(checkbox, checked){
    	var pageSizeNF = this.grid.down('numberfield[name=pageSize]');
        var pageSize = pageSizeNF.getValue();
        
        pageSizeNF.setDisabled(checked);
    	this.autoPageSize = checked;
        if (checked) {
        	this.store.pageSize = parseInt((this.grid.getHeight() - 30) / 30);
        } else {
        	this.store.pageSize = pageSize;
        }
        this.updateParams();
        this.pbMoveFirst();
    },
    
    /**
    * show/hide search bar
    * @private
    */
    showSearchBarToggle: function(checkbox, checked) {
        this.showSearchBar = checked;
        var t = this.grid.down('menuitem[text=' + LABEL.regExp + ']');
        if(t != null){
        	t.setDisabled(!checked);
        }
        var t = this.grid.down('menuitem[text=' + LABEL.caseSensitive + ']');
        if(t != null){
        	t.setDisabled(!checked);
        }
        var t = this.grid.down('menuitem[text=' + LABEL.searchHighlight + ']');
        if(t != null){
        	t.setDisabled(!checked);
        }
        
        var t = this.grid.down('tbitem[text=' + LABEL.keyword + ']');
        if(t != null){
        	t.setVisible(checked);
        }
        if(this.textField != null){
        	this.textField.setVisible(checked);
        }
        var t = this.down('button[name=searchButton]');
        if(t != null){
        	t.setVisible(checked);
        }
        var t = this.down('button[name=resetButton]');
        if(t != null){
        	t.setVisible(checked);
        }
        
        this.updateParams();
    }
    
    
    
    
    // eo function reconfigure  
    // }}}  
 
}); // eo extend  
 
// eof 