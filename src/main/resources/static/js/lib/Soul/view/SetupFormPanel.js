Ext.define('Soul.view.SetupFormPanel', {
	extend : 'Ext.form.Panel',

	requires : [],

	autoDestroy : true,

	labelWidth : 120,

	bodyStyle : 'padding: 10px;overflow-y: auto;',

	initComponent : function() {
		this.callParent(arguments);
	},

	submit : function() {
		var me = this;
		printf(me.form.getValues());
	},

	reset : function() {
		var me = this;
		me.form.reset();
	},

	update : Ext.emptyFn,

	updateView : function(scope) {
		var me = scope || this;
		me.submitButton = me.portlet.down('toolbar')
				.down('button[name=submit]'), me.resetButton = me.portlet.down(
				'toolbar').down('button[name=reset]');
		me.updateButton = me.portlet.down('toolbar')
				.down('button[name=update]');
		me.form.trackResetOnLoad = true, me.form.on('dirtychange', function(
				form, isDirty, eOpts) {
			me.submitButton.setDisabled(!isDirty);
		});
		me.portlet.down('toolbar').down('button[name=navi]').show();
		me.submitButton.show();
		me.submitButton.setDisabled(true);
		me.submitButton.setHandler(me.submit, me);
		me.resetButton.show();
		me.resetButton.setHandler(me.reset, me);
		me.updateButton.show();
		me.updateButton.setHandler(me.update, me);
	}
});
