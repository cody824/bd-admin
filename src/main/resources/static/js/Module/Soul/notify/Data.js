Ext.define('Module.Soul.notify.Data', {
	singleton : true,

	requires : [ 'Soul.Ajax', 'Soul.util.ObjectView' ],

	statusCombo : [ [ 1, "使用中" ], [ 0, "停用" ] ],
	
	modeCombo : [[ 1, "站内信" ], [ 2, "邮件" ], [ 4, "短信" ], [ 8, "微信" ]],
	
	loadData : function() {
		return;
	},

	updateAll : function(fn) {
		var callbackFn = function() {
			Soul.Ajax.executeFnAfterLoad(fn);
		};
		callbackFn();
	},

	constructor : function() {
		this.callParent(arguments);
	}

});
