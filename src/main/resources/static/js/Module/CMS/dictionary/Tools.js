Ext.define('Module.CMS.dictionary.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],
	
	getSubArea : function(areaId) {
		var subAreaData = [];
		var areaInfo = Soul.Ajax.getSyncData('/common/dictionaryItem/yyt/area', '');
		var areaData = areaInfo.data;
		var subAreaIdLen = areaId.length + 3;
		
		for (var i=0; i<areaInfo.total; i++) {
			if (areaData[i].obj.key.length == subAreaIdLen && 
				areaData[i].obj.key.indexOf(areaId) == 0) {
				var areaParam = {};
				areaParam['key'] = areaData[i].obj.key;
				areaParam['value'] = areaData[i].obj.value;
				subAreaData.push(areaParam);
			}
		}

		return subAreaData;
	},

	getSubAreaId : function(areaId) {
		var subAreaData = this.getSubArea(areaId);
		var count = subAreaData.length;
		var code = "";
		
		if (count.toString().length < 3) {
			var m = 3 - count.toString().length;
			var c1 = "";
			for (var i = 0; i < m; i++) {
				c1 += "0"; 
			}
			code = c1 + count.toString();
		}else {
			code = count.toString();
		}
		subAreaId = areaId + code;
		
		return subAreaId;
	},

	getDictionaryDomain : function() {
		var ConfigUrl = '/config/appId';
		var obj = Soul.Ajax.getSyncData(ConfigUrl, '');
		return obj.appId;
	},
	
	getDictDomainCombo : function(value){

		var data = [];

		data = DICTIONARY_COMBO.domain;
	

		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : "字典域",
			labelAlign : 'right',

			name : 'domain',
			displayField: 'name',
			valueField: 'value',
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 250,

			typeAhead: true,
			selectOnFocus: true,
			indent: true,
			allowBlank : false,
			editable : false,
		
			store : store
		});

		if(value != null){
			combo.setValue(value);
		}
		return combo;
	},

	
    buildItemOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'itemoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: DICT_MANAGE_LABEL.additem,
					disabled:false,
					name : 'additem',
					iconCls : 'x-add-icon'
				},{
					text: DICT_MANAGE_LABEL.edititem,
					disabled:true,
					name : 'edititem',
					iconCls : 'extensive-edit',
					hidden: true
				},{
					text: DICT_MANAGE_LABEL.delitem,
					disabled:true,
					name : 'delitem',
					iconCls : 'x-del-icon',
					hidden: true
				},{
					text: DICT_MANAGE_LABEL.importitem,
					disabled:false,
					name : 'importitem',
					iconCls : 'import'
				},{
					text: DICT_MANAGE_LABEL.exportitem,
					disabled:false,
					name : 'exportitem',
					iconCls : 'export'
				}]
	    });
		return menu;
    },
     	
	constructor : function() {
        this.callParent(arguments);
    }
});