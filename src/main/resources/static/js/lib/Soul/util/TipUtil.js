Ext.define('Soul.util.TipUtil', {
	singleton : true,

	requires : [ 'Soul.util.CommonUtil' ],

	t : 0, // 超时时间变量
	isSetPosition : 0, // 是否设置位置

	/*
	 * 获取事件发生时鼠标位置
	 * 
	 */
	getEventPoint : function(e) {
		var posX, posY;
		if (document.all) {
			if (window.event == null)
				return;
			posX = window.event.clientX + document.documentElement.scrollLeft
					+ document.body.scrollLeft;
			posY = window.event.clientY + document.documentElement.scrollTop
					+ document.body.scrollTop;
		} else if (e) {
			var x, y;
			if (e.pageX != null)
				x = e.pageX;
			else
				x = e.getPageX();
			if (e.pageY != null)
				y = e.pageY;
			else
				y = e.getPageY();
			posX = document.body.scrollLeft + x;
			posY = document.body.scrollTop + y;
		} else {
			posX = 5;
			posY = 5;
		}
		var top = posY + 5;
		var left = posX + 10;
		return [ left, top ];
	},

	/*
	 * 设置tip窗口位置
	 * 
	 */
	setTipPosition : function(e) {
		var fm = Soul.util.CommonUtil.$("mytip");
		var posX, posY;
		if (document.all) {
			if (window.event == null)
				return;
			posX = window.event.clientX + document.documentElement.scrollLeft
					+ document.body.scrollLeft;
			posY = window.event.clientY + document.documentElement.scrollTop
					+ document.body.scrollTop;
		} else if (e) {
			var x, y;
			if (e.pageX != null)
				x = e.pageX;
			else
				x = e.getPageX();
			if (e.pageY != null)
				y = e.pageY;
			else
				y = e.getPageY();
			posX = document.body.scrollLeft + x;
			posY = document.body.scrollTop + y;
		} else {
			posX = 5;
			posY = 5;
		}

		var px = 0;
		// if(!Ext.isIE)
		// px = (document.documentElement.scrollWidth - displayWidth) / 2;
		var top = posY + 5;
		var left = posX + 10 - px;
		fm.style.left = left + "px";
		fm.style.top = top + "px";
		this.isSetPosition = 1;
	},

	/*
	 * 显示str在Tip窗口中
	 * 
	 */
	tip : function(str, e) {
		if (this.isSetPosition == 0)
			this.setTipPosition(e);
		// Ext.create("Ext.tip.ToolTip", {
		//
		// target: "tip2",
		//	
		// html: str
		//
		// });

		var fm = Soul.util.CommonUtil.$("mytip");
		fm.style.width = 180 + "px";
		fm.style.display = "block";
		var infm = Soul.util.CommonUtil.$("tip_info");
		infm.style.width = "100%";
		infm.style.height = "100%";
		infm.innerHTML = str;
		this.isSetPosition = 0;
	},

	/*
	 * 隐藏Tip窗口
	 * 
	 */
	hideTip : function() {
		clearTimeout(this.t);
		var fm = Soul.util.CommonUtil.$("mytip");
		if (fm != undefined) {
			fm.style.display = "none";
		}
	},

	getObjectTipStr : function(propertyArray, obj, localeObj, renderConfig) {
		// var tmpobj=obj;
		var str = "";
		for ( var i = 0; i < propertyArray.length; i++) {
			var renderFn;
			if (renderConfig != null
					&& renderConfig.hasOwnProperty(propertyArray[i]))
				renderFn = renderConfig[propertyArray[i]];
			else
				renderFn = function(val) {
					return val;
				};
			var propertyName = localeObj[propertyArray[i]];
			if (!propertyName)
				propertyName = propertyArray[i];
			var value = renderFn(obj[propertyArray[i]]);
			if (value != "" && propertyName != "") {
				str = str + propertyName + ":" + value + "<br>";
			}
		}
		return str;
	}
});
