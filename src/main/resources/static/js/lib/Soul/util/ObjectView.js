
Ext.define('Soul.util.ObjectView', {
	singleton: true, 
	
	getObjectTipStr : function (propertyArray,obj,localeObj,renderConfig){
		var str="";
		for(var i=0;i<propertyArray.length;i++)
		{
			var renderFn;
			if(renderConfig!=null && renderConfig.hasOwnProperty(propertyArray[i]))
				renderFn = renderConfig[propertyArray[i]];
			else 
				renderFn = function(val){
					return val;
				};
			var propertyName=localeObj[propertyArray[i]];
			if(!propertyName)
				propertyName = propertyArray[i];
			var value = renderFn(obj[propertyArray[i]]);
			if(value !="" && propertyName != ""){
				str=str+propertyName+":"+value+"<br>";
			}
		}
		return str;
	},
	
	getObjectPropertyGrid : function(obj, rendererConfig, propertyNames, properties, config){
		var c = {
	            title: LABEL.property,
	            iconCls: 'info',
	            frame : true,
	            hideHeaders : true,
	            bodyBorder : false,
	          	stateful : false,
	            border : false,
	            columnLines : false,
	            clicksToEdit : 0,
	            autoScroll : true,
	            propertyNames: propertyNames,
	            customRenderers: rendererConfig,
	            properties : properties,
	            sortableColumns : false,
	            source: obj,
	            listeners: {
					beforeedit: function(e){ 
			      		e.cancel = true; 
						return false; 
			    	}
			   	} };
		
		config = config || {};

		Ext.apply(c,  config);
		
		var property = Ext.create('Soul.view.PropertyGrid',c);
		return property;
	},
	
	showInEast : function(panel, title){
		var infoPanel = Ext.getCmp('info-panel');
		var oldPanel = infoPanel.getComponent(title + "-properties" );
		if (oldPanel == null){
			infoPanel.expand();
			panel.title = title;
			panel.closable = true;
			panel.id = title + "-properties";
			infoPanel.add(panel);
		} else {
			infoPanel.expand();
			oldPanel.fireEvent('beforeshow', oldPanel);
		}
		infoPanel.setActiveTab(title + "-properties");
	},
	
	closeEast : function(){
		var infoPanel = Ext.getCmp('info-panel');
		infoPanel.collapse(Ext.Component.DIRECTION_RIGHT);
	},
	
	updateEast : function(){
    	var infoPanel = Ext.getCmp('info-panel');
    	var child = infoPanel.getActiveTab();
    	if(child != null){
			child.fireEvent('beforeshow', child);
		}
    },
	
	showInNewWin : function(panel, title){
		var win = new Ext.Window( {
			title : title,
			id : title + '-dataInfowin',
			stateful : false,
			items : [ panel],
			modal: true
		});
		win.show();
	}
	
});