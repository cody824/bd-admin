Ext.define('Soul.ux.toolbar.AdvanceSearchToolBar', {
	extend: 'Ext.toolbar.Toolbar',
	
	alias: 'widget.advstoolbar',
	alternateClassName: 'Soul.AdvSToolbar',
	
	initComponent : function(){
		var me = this;
		
		me.numberStore = Ext.create('Ext.data.ArrayStore', {
	        fields: ['name', 'value'],
	        data : [
	                ["=", "="],
	                [">", ">"],
	                [">=", ">="],
	                ["<", "<"],
	                ["<=", "<="]
	                ]
	    });
		
		me.relationStore = Ext.create('Ext.data.ArrayStore', {
	        fields: ['name', 'value'],
	        data : [
	                ["and", "and"],
	                ["or", "or"],
	                ["not", "not"]
	                ]
	    });
		
		me.callParent();
	},
	
	addSQLExpression : function(column, scope){
		var me = scope || this;
		var searchType = column.searchType || 'string';		
		me.add({
			name : column.text,
			text : column.text
		});
		var stateId = column.id + "_searchStatus";
		
		if (searchType == 'number') {
			var logicalOpCombo = Ext.create('Ext.form.field.ComboBox', {
		        hideLabel: true,
		        store: me.numberStore,
		        displayField: 'name',
		        name : 'logical' + column.text,
		        typeAhead: true,
		        stateId : stateId + "logical",
		        stateful : true,
//		        hidden : true,
		        queryMode: 'local',
		        triggerAction: 'all',
		        emptyText: '选择表达式...',
		        selectOnFocus: true,
		        value : '=',
		        width: 50,
		        indent: true
		    });
			me.add(logicalOpCombo);
			var numberField = Ext.create('Ext.form.field.Number', {
				stateId : stateId,
				stateful : true,
				name : "value" + column.text, 
				stateful : true,
				width: 50
			});
			var grid = me.up('grid');
			numberField.on('render', function() {  
				// install key map  
				var map = new Ext.KeyMap(numberField.el, [{  
				     key:Ext.EventObject.ENTER  
				    ,scope:grid 
				    ,fn:function(){
				    	grid.updateView(grid);
				    }  
				}]);  
				map.stopEvent = true;  
				}, grid, {single:true}); 
			me.add(numberField);
		} else if (searchType == 'date'){
			me.addDateSearchItem(column, me);
		} else if (searchType == 'time'){
			me.addTimeSearchItem(column, me);
		} else if(searchType == 'combo'){
			me.addComboSearchItem(column, me);
		} else if(searchType == 'boolean'){
			me.add ({
				stateId : stateId,
				stateful : true,
				name : "value" + column.text, 
				xtype : "checkbox"
			});
		} else {
			
			var textField = Ext.create('Ext.form.field.Text', {
				stateId : stateId,
				stateful : true,
				name : "value" + column.text, 
			});
			var grid = me.up('grid');
			textField.on('render', function() {  
				// install key map  
				var map = new Ext.KeyMap(textField.el, [{  
				     key:Ext.EventObject.ENTER  
				    ,scope:grid 
				    ,fn:function(){
				    	grid.updateView(grid);
				    }  
				}]);  
				map.stopEvent = true;  
				}, grid, {single:true}); 
			me.add(textField);
		}
	},
	
	removeSQLExpression : function(column, scope){
		var me = scope || this;
		var array = me.query('*[name$=' + column.text + ']');
		Ext.each(array, function(item){
			me.remove(item);
		});
	},
	
	hideQueryCondition : function(column, scope){
		var me = scope || this;
		var array = me.query('*[name$=' + column.text + ']');
		Ext.each(array, function(item){
			item.hide();
		});
	},
	
	showQueryCondition : function(column, scope){
		var me = scope || this;
		var array = me.query('*[name$=' + column.text + ']');
		Ext.each(array, function(item){
			item.show();
		});
		me.doAutoRender();
	},
	
	getRelationOp : function(column, scope){
		var me = scope || this;
		var ret = "and";
		if (me.down('combobox[name=relation' + column.text + ']') != null)
			ret = me.down('combobox[name=relation' + column.text + ']').getValue();
		return ret;
	},
	
	getLogicalOp : function(column, scope){
		var me = scope || this;
		var ret = "like";
		if (me.down('combobox[name=logical' + column.text + ']') != null)
			ret = me.down('combobox[name=logical' + column.text + ']').getValue();
		return ret;
	},
	
	getQueryValue : function(column, scope){
		var me = scope || this;
		var ret = null;
		if (column.searchType != null && column.searchType == 'date') {
			ret = me.getDateQueryValue(column, me);
		} else if (column.searchType != null && column.searchType == 'time') {
			ret = me.getTimeQueryValue(column, me);
		} else {
			if (me.down('field[name=value' + column.text + ']') != null)
				ret = me.down('field[name=value' + column.text + ']').getValue();
		}
		return ret;
	},
	
	addComboSearchItem : function(column, scope){
		var me = scope || this;
	    var xdata = column.comboData;
	    var combo = null;
	    var stateId = column.id + "_searchStatus";
	    
	    if (xdata != null) {
	    	var xstore = Ext.create('Ext.data.ArrayStore',{
		        fields:['value', 'name'],
		        data: xdata
		    });
	    	combo = new Ext.form.ComboBox({
	   	        hideLabel: true,
		    	stateId : stateId,
				stateful : true,
	   	        store: xstore,
	   	        displayField: 'name',
	   	        name : 'value' + column.text,
	   	        typeAhead: true,
	   	        queryMode: 'local',
	   	        triggerAction: 'all',
	   	        emptyText: '请选择...',
	   	        selectOnFocus: true,
	   	        multiSelect: true,
	   	        valueField: 'value',
	   	        width: 100,
	   	        editable: false,
	   	        indent: true
	   	    });
	   	    
	    } else  {
	    	column.comboCfg.name = 'value' + column.text,
	    	column.comboCfg.stateId = stateId;
	    	column.comboCfg.stateful = true;
	    	combo = Ext.create('Ext.form.field.ComboBox',column.comboCfg);
	    }
	    me.add(combo);
	},
	
	addDateSearchItem : function(column, scope){
		var me = scope || this;
		var stateId = column.id + "_searchStatus";
		
		me.add([
			{
				hidden : true,
				name : LABEL.startTime + column.text,
				text : LABEL.startTime
			}, {
				xtype : 'datefield',
				width : 110,
				stateId : stateId + "_beginTime",
				stateful : true,
	//			hidden : true,
				name: 'beginTime' + column.text,
				endDateField: 'endTime'+ column.text,
				vtype: 'daterange'
			}, {
	//			hidden : true,
				name : LABEL.stopTime + column.text,
				text : LABEL.stopTime
			}, {
				xtype : 'datefield',
				width : 110,
				stateId : stateId + "_endTime",
				stateful : true,
	//			hidden : true,
				name : 'endTime' + column.text,
				startDateField: 'beginTime'+ column.text,
				vtype: 'daterange'
			}]);
	},


	addTimeSearchItem : function(column, scope){
		var me = scope || this;
		var stateId = column.id + "_searchStatus";
		me.add([
			{
				hidden : true,
				name : LABEL.startTime + column.text,
				text : LABEL.startTime
			}, {
				xtype : 'datefield',
				width : 110,
				stateId : stateId + "_beginTime",
				stateful : true,
//				hidden : true,
				name: 'beginTime' + column.text,
				endDateField: 'endTime'+ column.text,
				vtype: 'daterange'
			}, {
				xtype: 'numberfield',
				name: 'bthour' + column.text,
				stateId : stateId + "_bthour",
				stateful : true,
//				hidden : true,
				minValue: 0,
				maxValue: 23,
				width: 40,
				value: 0,
				accelerate: true
			}, {
				xtype: 'numberfield',
//				hidden : true,
				name: 'btminute' + column.text,
				stateId : stateId + "_btminute",
				stateful : true,
				minValue: 0,
				maxValue: 59,
				value: 0,
				width: 40,
				accelerate: true
			}, {
//				hidden : true,
				name : LABEL.stopTime + column.text,
				text : LABEL.stopTime
			}, {
				xtype : 'datefield',
				width : 110,
//				hidden : true,
				stateId : stateId + "_endTime",
				stateful : true,
				name : 'endTime' + column.text,
				startDateField: 'beginTime'+ column.text,
				vtype: 'daterange'
			},  {
				xtype: 'numberfield',
//				hidden : true,
				name: 'ethour' + column.text,
				stateId : stateId + "_ethour",
				stateful : true,
				minValue: 0,
				maxValue: 23,
				width: 40,
				value: 0,
				accelerate: true
			}, {
				xtype: 'numberfield',
				stateId : stateId + "_etminute",
				stateful : true,
				name: 'etminute' + column.text,
				minValue: 0,
				maxValue: 59,
				value: 0,
				width: 40,
				accelerate: true
			}]);
	},
	
	getDateQueryValue : function(column, scope){
		var me = scope || this;
		
        var beginDateField = me.down('datefield[name=beginTime' + column.text + ']');
	    var endDateField = me.down('datefield[name=endTime' + column.text + ']');
	    
	    var beginDate = beginDateField.getValue(),
        	bh = 0,
        	bm = 0,
        	beginTime = new Date(beginDate),
        	endDate = endDateField.getValue(),
        	eh = 23,
        	em = 59,
        	endTime = new Date(endDate);
	    
	    if (endDate == null)
	    	endTime = new Date();
        
        beginTime.setHours(bh);
        beginTime.setMinutes(bm);
        beginTime.setSeconds(0);
        	
        if (endDate != null) {
        	endTime.setHours(eh);
            endTime.setMinutes(em);
            endTime.setSeconds(59);
        }
        
        return [beginTime, endTime];
	},
	
	getTimeQueryValue : function(column, scope){
		var me = scope || this;
		
	    var beginDateField = me.down('datefield[name=beginTime' + column.text + ']');
	    var bhField = me.down('spinnerfield[name=bthour' + column.text + ']');
	    var bmField = me.down('spinnerfield[name=btminute' + column.text + ']');;
	    var endDateField = me.down('datefield[name=endTime' + column.text + ']');
	    var ehField = me.down('spinnerfield[name=ethour' + column.text + ']');
	    var emField = me.down('spinnerfield[name=etminute' + column.text + ']');
	    
	    var beginDate = beginDateField.getValue(),
	    	bh = bhField.getValue(),
	    	bm = bmField.getValue(),
	    	beginTime = new Date(beginDate),
	    	endDate = endDateField.getValue(),
	    	eh = ehField.getValue(),
	    	em = emField.getValue(),
	    	endTime = new Date(endDate);
	    
	    if (endDate == null)
	    	endTime = new Date();
	    
	    beginTime.setHours(bh);
	    beginTime.setMinutes(bm);
	    beginTime.setSeconds(0);
	    	
	    if (endDate != null) {
	    	endTime.setHours(eh);
	        endTime.setMinutes(em);
	        endTime.setSeconds(59);
	    }
	    
	    
	    return [beginTime, endTime];
	}

	
	
	
});