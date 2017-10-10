Ext.define('Soul.uiModule.Plupload', {

	requires : [ 'Soul.util.RendererUtil' ],

	config : {
		runtimes : 'html5,flash,silverlight,html4',

		showPanel : null,

		container : document.body,

		max_file_size : '100mb',
		
		chunk_size : '1mb',

		url : 'fileupload',

		flash_swf_url : '../js/Moxie.swf',

		silverlight_xap_url : '../js/Moxie.xap',

		filters : [ {
			title : "Image files",
			extensions : "jpg,gif,png"
		}, {
			title : "Zip files",
			extensions : "zip"
		} ],

		headers : {
			Accept : 'application/json'
		},

		store : null,
		
		method : 'POST',
		
		send_chunk_number : false,

		browse_button : 'pickfiles',
	},

	data : new Array(),

	constructor : function(cfg) {
		var me = this;
		me.initConfig(cfg);
		
		var authorization = SureAuthTool.buildAuthrization(me.url, me.method, me.headers);
        Ext.apply(me.headers ,{Authorization: authorization});
		
		me.uploader = new plupload.Uploader({
			runtimes : me.runtimes,
			browse_button : me.browse_button, // you can pass in id...
			container : me.container, // ... or DOM Element itself
			max_file_size : me.max_file_size,
			url : me.url,
			flash_swf_url : me.flash_swf_url,
			silverlight_xap_url : me.silverlight_xap_url,
			filters : me.filters,
			chunk_size : me.chunk_size,
			send_chunk_number : me.send_chunk_number,
			headers : me.headers,

			init : {
				PostInit : function() {

				},

				FilesAdded : function(up, files) {
					plupload.each(files, function(file) {
						me.showPanel.addFile(file, up);
					});
				},

				UploadProgress : function(up, file) {
					if (me.showPanel != null)
						me.showPanel.updateFile(file, up);

				},

				QueueChanged : function(up) {

				},

				UploadComplete : function(up, files) {
					plupload.each(files, function(file) {
						if (me.showPanel != null)
							me.showPanel.updateFile(file, up);
					});

				},
				
				Error: function(up, err) {
					Soul.uiModule.Message.errorMsg(err.code, err.message);
				},

				FileUploaded : function(up, file, response) {
					me.showPanel.updateFile(file, up);
				}
			}
		});
	},

	uploader : null,

	init : function() {
		var me = this;
		if (me.uploader != null)
			me.uploader.init();
	},

	start : function() {
		var me = this;
		if (me.uploader != null)
			me.uploader.start();
	}

});