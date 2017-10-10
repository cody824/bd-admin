Ext.define('Soul.util.RendererUtil', {
	singleton : true,
	
	buildComBo : function(obj, array){
		var a = new Array();
		if (Array.isArray(array)){
			Ext.each(array, function(v){
				a.push([v, obj[v]]);
			});
		} else {
			for (key in obj) {
				a.push([key, obj[key]]);
			}
		}
		return a;
	},

	getEnclosureName : function(val) {
		var str = val;
		if (val == "master") {
			str = LABEL.masterEnc;
		} else if (val == "master2") {
			str = LABEL.masterEnc2;
		} else if (val == "unSupport") {
			str = LABEL.unSupport;
		} else
			str = LABEL.slaveEnc + "(" + val + ")";
		return str;
	},

	/* 保留小数，位数不足则补零 */
	formatNumber : function(value, num) {
		var a, b, c, i;
		a = value.toString();
		b = a.indexOf(".");
		c = a.length;
		if (num == 0) {
			if (b != -1) {
				a = a.substring(0, b);
			}
		} else {
			if (b == -1) {
				a = a + ".";
				for (i = 1; i <= num; i++) {
					a = a + "0";
				}
			} else {
				a = a.substring(0, b + num + 1);
				for (i = c; i <= b + num; i++) {
					a = a + "0";
				}
			}
		}
		return a;
	},

	/*
	 * 解析容量数字（K为单位），返回数字+单位的字符串
	 */
	getCapacityStrByNum : function(val) {
		var retStr;
		if (val > 10240) {
			retStr = val / 1024;
			if (retStr > 10240) {
				retStr = retStr / 1024;
				if (retStr > 10240) {
					retStr = retStr / 1024;
					retStr = parseFloat(retStr).toFixed(2) + "T";
				} else
					retStr = parseFloat(retStr).toFixed(2) + "G";
			} else
				retStr = parseFloat(retStr).toFixed(2) + "M";
		} else
			retStr = val + "K";
		return retStr;
	},

	/*
	 * 解析容量数字（bytes为单位），返回数字+单位的字符串
	 */
	getCapacityStrFormBytes : function(val) {
		var retStr;
		if (val > 10240) {
			retStr = val / 1024;
			if (retStr > 10240) {
				retStr = retStr / 1024;
				if (retStr > 10240) {
					retStr = retStr / 1024;
					if (retStr > 10240) {
						retStr = retStr / 1024;
						retStr = Math.round(parseFloat(retStr)) + "T";
					} else
						retStr = Math.round(parseFloat(retStr)) + "G";
				} else
					retStr = Math.round(parseFloat(retStr)) + "M";
			} else
				retStr = Math.round(parseFloat(retStr)) + "K";
		} else
			retStr = val + "";
		return retStr;
	},

	/*
	 * 解析容量数字（KB为单位），返回GB为单位的数字
	 */
	getCapacityGB : function(val) {
		return parseFloat(val / 1024);
	},

	/*
	 * 解析1、0，返回yes，no
	 */
	getBooleanStr : function(val) {
		if (val > 0) {
			return LABEL.yes;
		} else if (val == 0) {
			return LABEL.no;
		}
		return val;
	},

	/*
	 * 解析1、0，返回yes，no
	 */
	getBoolean : function(val) {
		if (val) {
			return LABEL.yes;
		} else {
			return LABEL.no;
		}
	},

	/*
	 * 解析1、0，返回yes，no
	 */
	getOpenCloseStr : function(val) {
		if (val > 0) {
			return LABEL.open;
		} else if (val == 0) {
			return LABEL.close;
		}
		return val;
	},

	/*
	 * 解析time类型，返回格式化好的时间字符串
	 */
	getTimeStr : function(val) {
		var timeStr = Ext.util.Format.date(val, LABEL.time_format);
		return timeStr;
	},

	/*
	 * 解析java date类型，返回格式化好的时间字符串
	 */
	getJavaDateInfo : function(val) {
		var t;
		if (typeof (val.time) == 'string') {
			t = parseInt(val.time);
		} else {
			t = val.time;
		}
		var time = new Date(t * 1000);
		return this.getTimeStr(time);
	},

	/*
	 * 解析java date类型，返回格式化好的时间字符串
	 */
	getJavaDateInfo2 : function(val) {
		var t;
		if (typeof (val.time) == 'string') {
			t = parseInt(val.time);
		} else {
			t = val.time;
		}
		var time = new Date(t);
		return this.getTimeStr(time);
	},

	/*
	 * 解析long，返回格式化好的时间字符串
	 */
	getDateInfo : function(val) {
		if (val > 0) {
			val = new Date(val * 1000);
			return Soul.util.RendererUtil.getTimeStr(val);
		} else {
			return "";
		}
	},
	
	/*
	 * 解析long，返回格式化好的时间字符串
	 */
	getDateInfo2 : function(val) {
		if (val > 0) {
			val = new Date(val);
			return Soul.util.RendererUtil.getTimeStr(val);
		} else {
			return "";
		}
	},

	/*
	 * 解析double类型，返回时间长度
	 */
	getTimeLongStr : function(val) {
		var updays, uphours, upminutes, retStr = "";
		val = val.toFixed(0);
		updays = val / (60 * 60 * 24);
		if (updays > 1)
			retStr += (parseInt(updays) + LABEL.day);
		upminutes = val / 60;
		uphours = upminutes / 60;
		uphours = uphours % 24;
		if (uphours > 1)
			retStr += (parseInt(uphours) + LABEL.hour);
		upminutes = upminutes % 60;
		retStr += (upminutes.toFixed(0) + LABEL.minute);

		return retStr;
	},

	getTemperatureStr : function(val) {
		return val + "°C";
	},

	getRotatingSpeedStr : function(val) {
		return val + " rpm";
	},

	getBooleanStatusStr : function(val) {
		if (val > 0) {
			return LABEL.normal;
		} else if (val == 0) {
			return LABEL.abnormal;
		}
		return val;
	},

	parseSizeStrToNum : function(sizeStr) {
		var num, unit;
		num = parseFloat(sizeStr.substring(0, sizeStr.indexOf(" ")));
		unit = sizeStr.substring(sizeStr.indexOf(" ") + 1);
		if (unit == "KiB")
			num = num * 1;
		if (unit == "MiB")
			num = num * 1024;
		else if (unit == "GiB")
			num = num * 1024 * 1024;
		else if (unit == "TiB")
			num = num * 1024 * 1024 * 1024;
		return num;
	},

	parseSizeStrToBytes : function(sizeStr) {
		if (sizeStr.length == 1)
			return parseFloat(sizeStr);
		var num, unit;
		unit = sizeStr.substring(sizeStr.length - 1);
		num = parseFloat(sizeStr.substring(0, sizeStr.length - 1));
		if (unit == "K" || unit == "k")
			num = num * 1024;
		else if (unit == "M" || unit == "m")
			num = num * 1024 * 1024;
		else if (unit == "G" || unit == "g")
			num = num * 1024 * 1024 * 1024;
		else if (unit == "T" || unit == "t")
			num = num * 1024 * 1024 * 1024 * 1024;
		else
			num = parseFloat(sizeStr);
		return num;
	},

	parseCapacityStrToNum : function(sizeStr) {
		if (sizeStr == 0) {
			return parseFloat(sizeStr);
		}
		// if(sizeStr.indexOf('iB') > 0){
		// sizeStr = convertNoib(sizeStr);
		// }
		var num, unit;
		num = parseFloat(sizeStr.substring(0, sizeStr.length - 1));
		unit = sizeStr.substring(sizeStr.length - 1);
		if (unit == "K" || unit == 'k')
			num = num * 1;
		else if (unit == "M" || unit == 'm')
			num = num * 1024;
		else if (unit == "G" || unit == 'g')
			num = num * 1024 * 1024;
		else if (unit == "T" || unit == 't')
			num = num * 1024 * 1024 * 1024;
		return num;
	},

	FILE_SMALL_PATH : 'img/filetype/',

	FILE_DEFAULT_TYPE : 'unknown',

	getDep : function(path) {
		var num = 0, cur = 0;
		for ( var i = 0; i < path.length; i++) {
			if (path.charAt(i) == "/" || path.charAt(i) == "\\") {
				if (cur == 0 && i == 0)
					num++;
				else if (i == (cur + 1)) {
					cur = i;
				} else if (i > (cur + 1)) {
					cur = i;
					num++;
				}
			}
		}
		return num;
	},

	getImgeType : function(file) {
		var type;
		if (file.type == Soul.model.FileModel.FILE_DIR)
			type = "folder";
		else {
			if (file.name.lastIndexOf(".") > 0)
				type = file.name.substring(file.name.lastIndexOf(".") + 1);
			else
				type = "unkonwn";
		}
		return type.toLowerCase();
	},

	fileStateLib : {},

	isFileExist : function(path) {
		var me = this;
		if (me.fileStateLib[path] == false)
			return false;
		else if (me.fileStateLib[path] == true)
			return true;

		var request = false;
		try {
			request = new XMLHttpRequest();
		} catch (trymicrosoft) {
			try {
				request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (othermicrosoft) {
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (failed) {
					request = false;
				}
			}
		}
		if (!request)
			return false;
		request.open("GET", path, false);
		request.send(); // 提交请求
		if (request.status == 200) { // 如果xmlhttp.status值是200，说明文件存在。
			me.fileStateLib[path] = true;
			return true;
		} else { // 如果xmlhttp.status不是200，说明文件不存在。事实上此时request.status的值是404。
			me.fileStateLib[path] = false;
			return false;
		}
	}
});
