/*global plupload */
/*global qiniu */
$.cachedScript("/js/uploader/uploader.js");
$.cachedScript("/js/lib/jquery/percentageloader/jquery.percentageloader-0.1.js");
$.loadStyle("/js/lib/jquery/percentageloader/jquery.percentageloader-0.1.css", "1");
function FileProgress(file, targetID, up) {
    this.fileProgressID = file.id;
    this.file = file;
    this.loadingBar = null;

    this.opacity = 100;
    this.height = 0;
    this.fileProgressWrapper = $('#' + this.fileProgressID);
    if (!this.fileProgressWrapper.length) {
        this.fileProgressWrapper = $('<div></div>');
        var Wrappeer = this.fileProgressWrapper;
        Wrappeer.attr('id', this.fileProgressID).addClass('list');
        var ulWrapper = $('<ul></ul>');
        
        var progressImg = $('<li style="width:130px; text-align:center;"/>');
        progressImg.addClass('progressPreview');
        var previewImg = $("<img/>");
        previewImg[0].onerror = function(){
        	SureMsg.alert("童鞋，要上传图片，你传的是什么？我不认识……");
        	up.removeFile(file);
        	Wrappeer.remove();
        };
        var ie = Qiniu.detectIEVersion();
        if (!(ie && ie <= 9)){
             previewImg.attr("src", getObjectURL(file.getNative()));
        }else{
        	 previewImg.attr("src", "/img/icons/defaultView.png");
        }
        previewImg.attr("width", 100);
        previewImg.attr("height", 100);
        progressImg.append(previewImg);
        
        

        var progressText = $('<li style="width:180px; text-align:center;"/>');
        progressText.addClass('progressName').text(file.name);


        var fileSize = plupload.formatSize(file.size).toUpperCase();
        var progressSize = $('<li style="width:130px; text-align:center;"/>');
        progressSize.addClass("progressFileSize").text(fileSize);

        var progressBarInfo = $('<li style="width:130px; text-align:center;"/>');
        progressBarInfo.addClass("info");
        progressBarInfo.empty();
        this.loadingBar = progressBarInfo.percentageLoader({width: 64, height: 64, controllable : false, progress : 0, margin : '0px auto', onProgressUpdate : function(val) {
        	me.loadingBar.setValue(Math.round(val * 100.0));
        }});
        
        var progressOperation = $('<li style="width:130px; text-align:center;"/>');
        progressOperation.addClass("operation");
        var progressCancel = $("<a  href=\"javascript: imgUploader.remove('"+this.fileProgressID+"');\" />");
        progressCancel.addClass(this.fileProgressID).text('移除');
        progressCancel.attr('flag',1);
       
      /*  var progressRemove=$('<a href=# />')
        progressRemove.addClass('progressRemove').text('移除');*/
       // progressRemove.
        progressOperation.append(progressCancel);

        ulWrapper.append(progressImg);
        ulWrapper.append(progressText);
        ulWrapper.append(progressSize);
        ulWrapper.append(progressBarInfo);
        ulWrapper.append(progressOperation);
        
        Wrappeer.append(ulWrapper);

        $('#' + targetID).append(Wrappeer);
    } else {
        this.reset();
    }

    this.height = this.fileProgressWrapper.offset().top;
    this.setTimer(null);
}

FileProgress.prototype.setTimer = function(timer) {
    this.fileProgressWrapper.FP_TIMER = timer;
};

FileProgress.prototype.getTimer = function(timer) {
    return this.fileProgressWrapper.FP_TIMER || null;
};

FileProgress.prototype.reset = function() {
	this.loadingBar.setProgress(0);
};

FileProgress.prototype.setProgress = function(percentage, speed) {
    this.fileProgressWrapper.attr('class', "list");

    var file = this.file;
    var uploaded = file.loaded;

    var size = plupload.formatSize(uploaded).toUpperCase();
    var formatSpeed = plupload.formatSize(speed).toUpperCase();
    if(window.console){console.log(percentage);}
    this.loadingBar.setProgress(percentage);
    this.loadingBar.setValue(size);

    this.appear();
};

FileProgress.prototype.setComplete = function(up, info, albumId) {
    var li = this.fileProgressWrapper.find('.info');
    var albumImg = {};
    
    var res = $.parseJSON(info);
    var domain = up.getOption('domain');
    var url = domain + encodeURI(res.key);
    li.html("");
    
    albumImg.name = this.file.name;
    albumImg.src = url;
    albumImg.lastModifiedDate = this.file.lastModifiedDate;
    albumImg.permit = 0;
    
    var progressImgLi = this.fileProgressWrapper.find('	.progressPreview');
    
    var imageView = '?imageView2/1/w/100/h/100';
    var isImage = function(url) {
        var res, suffix = "";
        var imageSuffixes = ["png", "jpg", "jpeg", "bmp"];
        var suffixMatch = /\.([a-zA-Z0-9]+)(\?|\@|$)/;

        if (!url || !suffixMatch.test(url)) {
            return false;
        }
        res = suffixMatch.exec(url);
        suffix = res[1].toLowerCase();
        for (var i = 0, l = imageSuffixes.length; i < l; i++) {
            if (suffix === imageSuffixes[i]) {
                return true;
            }
        }
        return false;
    };

    var isImg = isImage(url);
    var linkWrapper = $('<a class="linkWrapper" target="_blank"/>');
    var showImg = $('<img src="/img/busy.gif"/>');

    progressImgLi.empty();

    if (!isImg) {
    	showImg.attr('src', '/img/upload/default.png');
        Wrapper.addClass('default');

        progressImgLi.append(showImg);
    } else {
    	linkWrapper.append(showImg);
    	progressImgLi.append(linkWrapper);

        var img = new Image();
        $(img).attr('src', url + imageView);
        
        var height_space = 340;
        $(img).on('load', function() {
            showImg.attr('src', url + imageView);

            linkWrapper.attr('href', url).attr('title', '查看原图');
            var ie = Qiniu.detectIEVersion();
            var infoInner = '';
            if (!(ie && ie <= 9)){
            	   var imageInfo = Qiniu.imageInfo(res.key);
                   albumImg.width = imageInfo.width;
                   albumImg.height = imageInfo.height;
                   albumImg.colorModel = imageInfo.colorModel;
                   albumImg.format = imageInfo.format;    	
            }         
            SureAlbum.addImage(albumId, albumImg);
            var infoInner;
           
            if (!(ie && ie <= 9)) {
                infoInner = '<p>格式：' + imageInfo.format + '</p>' +
                    '<p>宽度：' + imageInfo.width + 'px</p>' +
                    '<p>高度：' + imageInfo.height + 'px</p>';
            }else{
            	$('#contentLi').remove();
            }
            li.html(infoInner);
            
           // Wrapper.append(infoWrapper);

        }).on('error', function(xhr) {
        	showImg.attr('src', '/img/upload/default.png');
            Wrapper.addClass('default');
        });
    }
    
    this.fileProgressWrapper.attr('class', 'done');
};
FileProgress.prototype.setError = function() {
    this.fileProgressWrapper.find('td:eq(2)').attr('class', 'text-warning');
    this.fileProgressWrapper.find('td:eq(2) .progress').css('width', 0).hide();
    this.fileProgressWrapper.find('button').hide();
    this.fileProgressWrapper.next('.chunk-status-tr').hide();
};

FileProgress.prototype.setCancelled = function(manual) {
    var progressContainer = 'progressContainer';
    if (!manual) {
        progressContainer += ' red';
    }
    this.fileProgressWrapper.attr('class', progressContainer);
    this.fileProgressWrapper.find('td .progress .progress-bar-info').css('width', 0);
};

FileProgress.prototype.setStatus = function(status, isUploading) {
    if (!isUploading) {
        this.fileProgressWrapper.find('.status').text(status).attr('class', 'status text-left');
    }
};


FileProgress.prototype.appear = function() {
    if (this.getTimer() !== null) {
        clearTimeout(this.getTimer());
        this.setTimer(null);
    }

    if (this.fileProgressWrapper[0].filters) {
        try {
            this.fileProgressWrapper[0].filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100;
        } catch (e) {
            // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
            this.fileProgressWrapper.css('filter', "progid:DXImageTransform.Microsoft.Alpha(opacity=100)");
        }
    } else {
        this.fileProgressWrapper.css('opacity', 1);
    }

    this.fileProgressWrapper.css('height', '');

    this.height = this.fileProgressWrapper.offset().top;
    this.opacity = 100;
    this.fileProgressWrapper.show();

};
