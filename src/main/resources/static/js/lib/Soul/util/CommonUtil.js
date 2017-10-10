Ext.define('Soul.util.CommonUtil', {
    singleton: true, 
    
    $ : function (id){
    	return document.getElementById(id);
	},
		
	getStr : function (obj){
	    var str=""; 
	    for(var p in obj){
	        var o = obj[p];
	        if (typeof(o) == "function") {
	            str += "function " + p + "\n";
	        }  else {
	            str += p + "=" + o + "\n";
	        } 
	    } 
	    return str;
	},
    
	filterString : function(keyword, source){
		var me = this;
		var match = false;
		if(Ext.isArray(source)){
			Ext.each(source, function(s, i , itself){
				if(me.filterString(keyword, s)){
					match = true;
					return false;
				}
			});
		} else {
			var keys = keyword.split(' ');
			Ext.each(keys, function(key, i ,itself){
				if(Ext.String.trim(key) != '' && source.indexOf(Ext.String.trim(key)) >= 0){
					match = true;
					return false;
				}
			});
		}
		return match;
	},
	
	matchString : function(regexp, source, caseSensitive){
		var me = this,
			searchRegExp = new RegExp(regexp, 'g' + (caseSensitive ? '' : 'i')),
			match = false;
		if(Ext.isArray(source)){
			Ext.each(source, function(s, i , itself){
				if(me.matchString(regexp, s, caseSensitive)){
					match = true;
					return false;
				}
			});
		} else {
			if (searchRegExp.test(source))
				match = true;
		}
		return match;
	},
	
	getBoolArray : function(){
		return [[true, LABEL.open], [false, LABEL.close]];
	},
	
	getModulesData : function (){
		var modulesArray = new Array();
		Ext.Array.each(macConfig.moduleList, function(moduleGroup, index, itself){
    		Ext.Array.each(moduleGroup.subModules, function(module, i , s){
    			modulesArray.push([module.name,MODULE_NAME[module.name]]);
    		});
    	});
		return modulesArray;
	},
	
	getLanguageData : function (){
		var languageArray = new Array();
		Ext.Array.each(baseConfig.supportLanguage, function(lang, index, itself){
			languageArray.push([lang.code, lang.language]);
    	});
		return languageArray;
	},
	
	getFileSize : function (fileObj) { 
		if (document.all) { 
			window.oldOnError = window.onerror;
			window.onerror = function(err) {
				if (err.indexOf('utomation') != -1) {
					alert('No access to the file permissions.');
					return true; 
				} else 
					return false; 
			}; 
			var fso = new ActiveXObject('Scripting.FileSystemObject'); 
			var file = fso.GetFile(fileName); 
			window.onerror = window.oldOnError; 
			return file.Size; 
		} 
	},
	
	dealDataByModel : function(data,model){
		var reader = new Ext.data.reader.Array({
			model : model
		});
		var tdata = reader.readRecords(data);
		var data = [];
		Ext.each(tdata.records,function(r){
			data.push(r.data);
		});
		return data;
	},
	
	dealPath : function(path) {
		path = path.replace(/\\/g, "/");
		path = path.replace(/(^[\/]*)|([\/]*$)/g, '');
		if (path != '') {
			path = path + '/';
		}
		return path;
	},

	isImageFile : function(filename){
		var ext = "",allow = "";
		var allowed_ext = ['jpg','jpeg', 'png', 'gif'];
		if (filename.lastIndexOf('.') != -1) { // ext exists
			ext = filename.substr((filename.lastIndexOf('.') + 1)).toLowerCase();
		}
		if (ext) {
	        for (var i = 0, len = allowed_ext.length; i < len; i++) {
	            if (ext == allowed_ext[i]) {
	                allow = true;
	                break;
	            }
	        }
	    } else {
	        messageUtil.showErrorInfo(LABEL.error, filename + " is not supported. Please choose an image file.");
	        return false;
	    }
		
	    if (!allow) {
	        var err_msg = filename + " is not supported. File extensions can only be " + allowed_ext.join(', ');
	        messageUtil.showErrorInfo(LABEL.error,err_msg);
	        return false;        
	    }
	    return true;
	}
});

function filterString(keyword, source){
	return Soul.util.CommonUtil.filterString(keyword, source);
}

function matchString(regexp, source, caseSensitive){
	return Soul.util.CommonUtil.matchString(regexp, source, caseSensitive);
}

function printf(obj){
	alert(Soul.util.CommonUtil.getStr(obj));
}

/*
 *    验证ip地址,返回true, false 
 * */

function isIp(ip) {
	if (ip == "") return false;
	var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
	if (re.test(ip)) {
		var ips = ip.split(".");
		if (ips[0] > 0 && ips[0] < 256 && ips[1] < 256 && ips[2] < 256 && ips[3] < 256) return true;
	}
	return false;
}

/*校验整数*/
REGEX = {
	integerOnly:/^(-[1-9]|[1-9])[0-9]*$/,
	naturalIntegerOnly:/^[0-9]+$/,
	noChineseAndSymbol:/^[^：·！￥……（）｛｝【】、；“”‘’《》，,。？——\u4e00-\u9fa5]*$/,
	noChineseAndSymbol1:/^[^：·！￥……（）｛｝【】、；“”‘’《》，。？——\u4e00-\u9fa5]*$/
};

/*字符串中不能含有汉字，首尾不能有空格*/
Ext.apply(Ext.form.VTypes, {
	isIp:function(v,field) {
		field.vtypeText = LABEL.inputRightIP;
		if (v == "") return true;
		else return isIp(v);
	},
	
	noChinese : function(value, field){
		var pattern = REGEX.noChineseAndSymbol;
		if(pattern.exec(value) != null){
			field.vtypeText = LABEL.noChineseAndSymbol;
			return true;
		}
		return false;
	},
	
	noChinese1 : function(value, field){
		var pattern = REGEX.noChineseAndSymbol1;
		if(pattern.exec(value) != null){
			field.vtypeText = LABEL.noChineseAndSymbol;
			return true;
		}
		return false;
	},
		
	daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
        	var panel = field.up('panel');
        	if (panel) {
        		 var start = panel.down('datefield[name=' + field.startDateField + ']');
                 start.setMaxValue(date);
                 start.validate();
                 this.dateRangeMax = date;
        	}
        } else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
        	var panel = field.up('panel');
        	if (panel) {
	        	var end = panel.down('datefield[name=' + field.endDateField + ']');
	            end.setMinValue(date);
	            end.validate();
	            this.dateRangeMin = date;
        	}
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for afteHr the vtype test)
         */
        return true;
    }
});
