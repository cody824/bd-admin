/*global plupload */
/*global qiniu */

$.cachedScript("/js/lib/jquery/percentageloader/jquery.percentageloader-0.1.min.js");
$.loadStyle("/js/lib/jquery/percentageloader/jquery.percentageloader-0.1.css", "1");

/**
 * 单个图片上传进度显示
 * 
 * @param up			plupload对象
 * @param file			上传的file对象
 * @param target		plupload container对象
 * 							完成后隐藏上传按钮（container中class = 'upaction'子元素）
 * @param showImg		img对象，上传完后更新该img的src
 * @param progressBar	进度显示的bar
 * @returns
 */
function ImgProgress(up, file, target, showImg, progressBar, callback) {
	var me = this;
	
	this.fileProgressID = file.id;
    this.file = file;

    this.container = target;
    this.loadImg = showImg;
    this.fileProgressWrapper = progressBar;
    this.callback = callback || function(){};
    
    this.fileProgressWrapper.empty();
    this.loadingBar = this.fileProgressWrapper.percentageLoader({width: 64, height: 64, controllable : false, progress : 0, onProgressUpdate : function(val) {
    	me.loadingBar.setValue(Math.round(val * 100.0));
    }});
    
    this.loadingBar.children().children().eq(1).html("确定");
    
    this.loadingBar.unbind('click');
    this.loadingBar.bind('click', function(e){
    	up.start();
    	e.stopPropagation();
    });
}

ImgProgress.prototype.setTimer = function(timer) {
    this.fileProgressWrapper.FP_TIMER = timer;
};

ImgProgress.prototype.getTimer = function(timer) {
    return this.fileProgressWrapper.FP_TIMER || null;
};

ImgProgress.prototype.reset = function() {
};

ImgProgress.prototype.setProgress = function(percentage, speed) {

    var file = this.file;
    var uploaded = file.loaded;

    var size = plupload.formatSize(uploaded).toUpperCase();
    //var formatSpeed = plupload.formatSize(speed).toUpperCase();
    
    this.loadingBar.setProgress(percentage);
    this.loadingBar.setValue(size);
    
};

ImgProgress.prototype.setComplete = function(up, info) {
    var albumImg = {};
    
    var res = $.parseJSON(info);
    var domain = up.getOption('domain');
    var url = domain + encodeURI(res.key);
    
    albumImg.name = this.file.name;
    albumImg.src = url;
    albumImg.lastModifiedDate = this.file.lastModifiedDate;
    albumImg.permit = 0;
    albumImg.key = res.key;
    
    this.container.find('.upaction').hide();
    this.loadingBar.empty();

    if (typeof(this.callback) === 'function') {
    	this.callback(albumImg);
    }
};

ImgProgress.prototype.setError = function() {
    
};

ImgProgress.prototype.setCancelled = function(manual) {
   
};

ImgProgress.prototype.setStatus = function(status, isUploading) {
    
};

