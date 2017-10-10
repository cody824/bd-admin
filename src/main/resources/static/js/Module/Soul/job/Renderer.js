Ext.define('Module.Soul.job.Renderer', {
	singleton: true,

	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.Soul.job.Tools',
		'Module.Soul.job.model.JobModel'
	],
	translateJobStatus : function(v) {
		var status = JOB_DATA.jobStatus[v];
		if(status){
			return status;
		}
		return v;
	},
	translateJobMode : function(v) {
		var mode = JOB_DATA.jobMode[v];
		if(mode){
			return mode;
		}
		return v;
	},
	translateJobType : function(v) {
		var type = JOB_DATA.jobType[v];
		if(type){
			return type;
		}
		return v;
	},
	translateJobConcurrent : function(v) {
		var type = JOB_DATA.jobConcurrent[v];
		if(type){
			return type;
		}
		return v;
	}
});