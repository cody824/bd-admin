Ext.define('Module.Soul.MassTask.Renderer', {
	singleton: true,

	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.Soul.MassTask.Tools',
		'Module.Soul.MassTask.model.MassTaskModel'
	],
	translateTaskStatus : function(v) {
		var status = MASS_TASK_DATA.taskStatus[v];
		if(status){
			return status;
		}
		return v;
	},
	translateTaskType : function(v) {
		var mode = MASS_TASK_DATA.taskType[v];
		if(mode){
			return mode;
		}
		return v;
	},
	translateMessageStatus : function(v) {
		var status = MASS_MESSAGE_DATA.status[v];
		if(status){
			return status;
		}
		return v;
	}
});