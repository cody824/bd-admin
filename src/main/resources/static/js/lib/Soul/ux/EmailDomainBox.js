Ext.define('Soul.ux.EmailDomainBox', {
	extend:'Ext.form.ComboBox',
    alias: ['widget.emaildomainbox'],
    
    initComponent: function() {
    	var me = this;
    	Ext.apply(me,{
    		hideTrigger: true,
    		triggerAction: 'all',
    	    queryMode : 'local',
			mode: 'local',
			valueField: 'value',
			displayField: 'display',
			store : Ext.create('Ext.data.ArrayStore',{
				fields : ['value','display'],
				data : [['soulinfo.com','soulinfo.com'],
				        ['126.com','126.com'],
				        ['163.com','163.com'],
						['yahoo.com.cn','yahoo.com.cn'],
						['yahoo.cn','yahoo.cn'],
						['gmail.com','gmail.com'],
						['qq.com','qq.com']]
			})
		});
    	me.callParent(arguments);
    },
    
    enableKeyEvents : false,
    
    onKeyUp: function(e, t) {
        var me = this,
            key = e.getKey();
        if (!me.readOnly && !me.disabled && me.editable) {
            me.lastKey = key;
            if (!e.isSpecialKey() || key == e.BACKSPACE || key == e.DELETE
            		|| key == 50) {
            	if(me.getValue() != null && me.getValue().indexOf('@') >= 0){
            		me.doQueryTask.delay(me.queryDelay);
            	}else{
            		setTimeout(function(){
            			me.collapse();
            		},100);
            	}
            }
        }

        if (me.enableKeyEvents) {
            me.callParent(arguments);
        }
    },
    
    doRawQuery: function() {
    	var rawValue = this.getRawValue();
    	if(rawValue != null){
    		rawValue = rawValue.substring(rawValue.indexOf('@')+1);
    	}else{
    		rawValue = '';
    	}
        this.doQuery(rawValue, false, true);
    },
    
    onItemClick: function(picker, record){
        
    	var me = this,
            lastSelection = me.lastSelection,
            valueField = me.valueField,
            selected;

        if (!me.multiSelect && lastSelection) {
            selected = lastSelection[0];
            if (selected && (record.get(valueField) === selected.get(valueField))) {
                me.displayTplData = [record.data];
                var displayValue = me.getDisplayValue();
                var rvalue = me.getValue();
                if (rvalue == null){
                	rvalue = '';
                }
            	if(rvalue.indexOf('@')>=0){
            		rvalue = rvalue.substring(0,rvalue.indexOf('@')+1);
            	}
                me.setRawValue(rvalue+displayValue);
                me.collapse();
            }
        }
    },
    
    setValue: function(value, doSelect) {
        var me = this,
            valueNotFoundText = me.valueNotFoundText,
            inputEl = me.inputEl,
            i, len, record,
            models = [],
            displayTplData = [],
            processedValue = [];
        if (me.store.loading) {
            me.value = value;
            me.setHiddenValue(me.value);
            return me;
        }

        
        value = Ext.Array.from(value);

        var rvalue = me.getValue();
        if (rvalue == null){
        	rvalue = '';
        }
    	if(rvalue.indexOf('@')>=0){
    		rvalue = rvalue.substring(0,rvalue.indexOf('@')+1);
    	}
        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            if (!record || !record.isModel) {
                record = me.findRecordByValue(record);
            }
            
            if (record) {
                models.push(record);
                if(me.getValue() == null){
                	displayTplData.push(record.get(me.displayField));
                    processedValue.push(record.get(me.valueField));
                }else{
                	displayTplData.push(rvalue+record.get(me.displayField));
                    processedValue.push(rvalue+record.get(me.valueField));
                }
            }
            
            
            else {
                
                if (!me.forceSelection) {
                	if(me.getValue() == null){
                		displayTplData.push(value[i]);
                        processedValue.push(value[i]);
                	}else{
                		displayTplData.push(rvalue+value[i]);
                        processedValue.push(rvalue+value[i]);
                	}
                }
                
                else if (Ext.isDefined(valueNotFoundText)) {
                    displayTplData.push(valueNotFoundText);
                }
            }
        }

        
        me.setHiddenValue(processedValue);
        me.value = me.multiSelect ? processedValue : processedValue[0];
        if (!Ext.isDefined(me.value)) {
            me.value = null;
        }
        me.displayTplData = displayTplData; 
        me.lastSelection = me.valueModels = models;

        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
            inputEl.removeCls(me.emptyCls);
        }
        
        me.setRawValue(me.getDisplayValue());
        me.checkChange();

        if (doSelect !== false) {
            me.syncSelection();
        }
        me.applyEmptyText();

        return me;
    }
});