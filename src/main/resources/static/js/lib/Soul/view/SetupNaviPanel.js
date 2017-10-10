Ext.define('Soul.view.SetupNaviPanel', {
	extend : 'Ext.panel.Panel',

	requires : [],

	HELPMESSAGE : {},

	ICONCLS : {},

	HELPKEY : {},

	autoDestroy : true,

	labelWidth : 120,

	bodyStyle : 'padding: 10px;overflow-y: auto;',

	initComponent : function() {
		Ext.apply(this, {
			layout : {
				type : 'hbox'
			},
			defaults : {
				margins : '5 0 5 5'
			},
			items : this.getButtonGroup()
		});
		this.callParent(arguments);
	},

	afterRender : function() {
		var me = this;
		me.callParent(arguments);
	},

	getButtonGroup : function() {
		var me = this, items = new Array();
		Ext.each(me.portlet.supportView, function(view, index, itself) {
			if (index > 0)
				items.push(me.getConfigButton(view));
		});
		return items;
	},

	getConfigButton : function(view) {
		var me = this;

		var moduleButton = Ext.create('Ext.Button', {
			text : me.portlet.VIEW[view],
			iconCls : me.portlet.ICONCLS[view],
			scale : 'large',
			autoHeight : true,
			handler : function(btn, pressed, eObj) {
				me.portlet.down('toolbar').down('menuitem[view=' + view + ']')
						.setChecked(true);
			}
		});

		return {
			xtype : 'container',
			items : [ moduleButton, {
				xtype : 'component',
				width : 120,
				html : '',
				cls : 'x-form-check-group-label'
			}, {
				xtype : 'component',
				width : 120,
				html : me.HELPMESSAGE[me.HELPKEY[view]]
			} ]

		};
	},

	updateView : function(scope) {
		var me = scope || this;
		me.portlet.down('toolbar').child('button[name=navi]').hide();
		me.portlet.down('toolbar').child('button[name=submit]').hide();
		me.portlet.down('toolbar').child('button[name=reset]').hide();
		me.portlet.down('toolbar').child('button[name=update]').hide();
	}
});
