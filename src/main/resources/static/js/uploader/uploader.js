/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */
$.cachedScript("/js/lib/qiniu/qiniu.js");

/**
 * 相册上传控件
 * @param options
 * 		albumId ： 相册ID，必需
 * 		images  ： 相册中照片
 * 		bucket  ： 7牛空间，默认yearbook-album
 *      uptoken_url ： 7牛上传token，默认'/qiniu/upToken?scope=' + bucket
 *      domain  :  7牛空间域，默认'http://' + bucket + '.qiniudn.com/'
 *      browse_button: 上传文件选择按钮ID，默认'pickfiles',
 *      container: 上传文件容器，默认'uploader',
 *      drop_element: 拖动容器，默认'uploader',
 *      max_file_size: 最大容许文件大小，默认'20mb',
 *      dragdrop: 是否支持拖动，默认true,
 *      chunk_size: 上传分块大小，默认'4mb',
 * 
 * 
 * @returns
 */
function ImgUploader(options){
	var me = this;
	
	/**
	 * 相册ID，必需
	 */
	this.albumId = options.albumId;
	
	/**
	 * 相片
	 */
	this.images = options.images;
	
	this.album = options.album;
	
	this.bucket = options.bucket || 'yearbook-album';
	
	this.currentFile = null;
	
	me.defaults = {
		runtimes:'html5,flash',
	    browse_button: 'loaclFile',
	    container: 'upload',
	    drop_element: 'upload',
	    max_file_size: '20mb',
	    flash_swf_url: '/js/lib/plupload/Moxie.swf',
	    silverlight_xap_url: '/js/lib/plupload/Moxie.xap',
	    dragdrop: true,
	    chunk_size: '4mb',
	    uptoken_url: '/qiniu/upToken?scope=' + me.bucket,
	    domain: 'http://' + me.bucket + '.qiniudn.com/',
    };
	
	options = $.extend({}, me.defaults, options, {
	    auto_start: false,
	    init: {
	        'FilesAdded': function(up, files) {
	        	var imageLengthErrorNum = 0;
	        	var sameNameErrorNum = 0;
	        	var typeErrorNum = 0;
	            plupload.each(files, function(file) {
	            	me.currentFile = file;
	            	var name_len = file.name.length;
	            	if (name_len > 23) {
	            		imageLengthErrorNum ++;
	                	up.removeFile(file);
	                } else {
	                	var contain = me.isInAlbum(file);
	 	                var qiniu= new QiniuJsSDK();
	 	                if (contain) {
	 	                	sameNameErrorNum ++;
	 	                	up.removeFile(file);
	 	                }else if(!(qiniu.isImage(file.name))){
	 	                	typeErrorNum ++;
	 	                	up.removeFile(file);
	 	                }  else {
	 	                	me.currentFile.loadingBar = new FileProgress(file, 'fsUploadProgress', up);
	 	                }
	                }
	               
	            });
	            
	            if(imageLengthErrorNum > 0){
	            	SureMsg.alert("有"+imageLengthErrorNum+"张图片名称过长, 请不要超过23个字符","warn")
            	}
	            
	            if(sameNameErrorNum > 0){
	            	SureMsg.alert("注意,相册中已经有"+sameNameErrorNum+"个同名文件","warn")
            	}
	            
	            if(typeErrorNum > 0){
	            	SureMsg.alert("注意,上传的文件中有"+typeErrorNum+"个不是图片类型","warn")
            	}
	            
	            if (up.files.length > 0) {
	            	if($(".con").is(":hidden")){$('.con').show();} 
	            	if($(".start").is(":hidden")){$('.start').show();} 
	            	if($(".empty").is(":hidden")){$('.empty').show();} 
	 	            $('.cancel').hide();
	 	            $('#success').hide();
	            } 
	        },
	        'BeforeUpload': function(up, file) {
	            $("#albumSelect").prop("disabled",true); 
	        },
	        'UploadProgress': function(up, file) {
	        	var progress = file.loadingBar;
	        	console.log(file.percent);
	            progress.setProgress(file.percent/100, up.total.bytesPerSec);

	        },
	        'UploadComplete': function() {
	            $('#success').show();
	            $('.start').hide();
	            $('.cancel').hide();
	            $('.empty').show();
	            $("#albumSelect").prop("disabled",false); 
	        },
	        'FileUploaded': function(up, file, info) {
	        	var progress = file.loadingBar;
	            progress.setComplete(up, info, me.albumId);
	            me.imageNames.push(file.name);
	        },
	        'Error': function(up, err, errTip) {
	            $('.con').show();
	            var progress = file.loadingBar;
	            progress.setError();
	            progress.setStatus(errTip);
	        },
	        'Key': function(up, file) {
	             var key = "album/" + me.albumId + "/";
	             return key + file.name;
	        }
	    }
	});
	
	this.qiniuUploader = Qiniu.uploader(options);
	
	this.qiniuUploader.bind('FileUploaded', function() {
	    console.log('hello man,a file is uploaded');
	});
	

	this.startUpload = function(){
		this.qiniuUploader.start();
		//console.log(this.qiniuUploader);
		$('.start').hide();
	    $('.cancel').show();
	    $('.empty').hide();
	};

	this.stopUpload = function(){
		this.qiniuUploader.stop();
		$('.start').show();
	    $('.cancel').hide();
	    $('.empty').show();
	};
	
	this.emptyList = function(){
		var me = this;
		var files=[];
		$("#fsUploadProgress").empty();
		$('.con').hide();
		$('#success').hide();
		$('.start').hide();
	    $('.cancel').hide();
	    $('.empty').hide();
	    $.each(this.qiniuUploader.files, function(index,  file) {
	    	files.push(file);
        });
    	for(var i=0;i<files.length;i++){
    		file=files[i];
    		me.qiniuUploader.removeFile(file);
    	}
	};
	this.remove=function(fileid){
		$.each(this.qiniuUploader.files, function(index,  file) {		
			var fileId=file.id;
			if(fileid==fileId){
				me.qiniuUploader.removeFile(file);
				$('#'+file.id).hide();
			}		
        });
	};
	
	this.imageNames = new Array();
	
	$.each(me.images, function(n, value){
		me.imageNames.push(value.name);
    });
	
	this.isInAlbum = function(file){
		var contain = false;
		var index = $.inArray(file.name, me.imageNames);
		if (index >= 0)
			contain = true;
		return contain;
	};
	
	this.destroy = function(){
		this.qiniuUploader.destroy();
		$("#fsUploadProgress").empty();
		$('.start').hide();
        $('.cancel').hide();
        $('.empty').hide();
        $('#success').hide();
        $('.con').hide();
	};
	
};


//建立一個可存取到該file的url
function getObjectURL(file) {
	var url = null ; 
	if (window.createObjectURL!=undefined) { // basic
		url = window.createObjectURL(file) ;
	} else if (window.URL!=undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file) ;
	} else if (window.webkitURL!=undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file) ;
	}
	return url ;
}

$(function() {
    $('#container').on(
        'dragenter',
        function(e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        }
    ).on('drop', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragleave', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragover', function(e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
    });


    $('body').on('click', 'table button.btn', function() {
        $(this).parents('tr').next().toggle();
    });


    var getRotate = function(url) {
        if (!url) {
            return 0;
        }
        var arr = url.split('/');
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === 'rotate') {
                return parseInt(arr[i + 1], 10);
            }
        }
        return 0;
    };

    $('#myModal-img .modal-body-footer').find('a').on('click', function() {
        var img = $('#myModal-img').find('.modal-body img');
        var key = img.data('key');
        var oldUrl = img.attr('src');
        var originHeight = parseInt(img.data('h'), 10);
        var fopArr = [];
        var rotate = getRotate(oldUrl);
        if (!$(this).hasClass('no-disable-click')) {
            $(this).addClass('disabled').siblings().removeClass('disabled');
            if ($(this).data('imagemogr') !== 'no-rotate') {
                fopArr.push({
                    'fop': 'imageMogr2',
                    'auto-orient': true,
                    'strip': true,
                    'rotate': rotate,
                    'format': 'png'
                });
            }
        } else {
            $(this).siblings().removeClass('disabled');
            var imageMogr = $(this).data('imagemogr');
            if (imageMogr === 'left') {
                rotate = rotate - 90 < 0 ? rotate + 270 : rotate - 90;
            } else if (imageMogr === 'right') {
                rotate = rotate + 90 > 360 ? rotate - 270 : rotate + 90;
            }
            fopArr.push({
                'fop': 'imageMogr2',
                'auto-orient': true,
                'strip': true,
                'rotate': rotate,
                'format': 'png'
            });
        }

        $('#myModal-img .modal-body-footer').find('a.disabled').each(function() {

            var watermark = $(this).data('watermark');
            var imageView = $(this).data('imageview');
            var imageMogr = $(this).data('imagemogr');

            if (watermark) {
                fopArr.push({
                    fop: 'watermark',
                    mode: 1,
                    image: 'http://www.b1.qiniudn.com/images/logo-2.png',
                    dissolve: 100,
                    gravity: watermark,
                    dx: 100,
                    dy: 100
                });
            }

            if (imageView) {
                var height;
                switch (imageView) {
                    case 'large':
                        height = originHeight;
                        break;
                    case 'middle':
                        height = originHeight * 0.5;
                        break;
                    case 'small':
                        height = originHeight * 0.1;
                        break;
                    default:
                        height = originHeight;
                        break;
                }
                fopArr.push({
                    fop: 'imageView2',
                    mode: 3,
                    h: parseInt(height, 10),
                    q: 100,
                    format: 'png'
                });
            }

            if (imageMogr === 'no-rotate') {
                fopArr.push({
                    'fop': 'imageMogr2',
                    'auto-orient': true,
                    'strip': true,
                    'rotate': 0,
                    'format': 'png'
                });
            }
        });

        var newUrl = Qiniu.pipeline(fopArr, key);

        var newImg = new Image();
        img.attr('src', '/img/busy.gif');
        newImg.onload = function() {
            img.attr('src', newUrl);
            img.parent('a').attr('href', newUrl);
        };
        newImg.src = newUrl;
        return false;
    });

});
