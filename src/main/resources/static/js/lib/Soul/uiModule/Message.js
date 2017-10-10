
Ext.define('Soul.uiModule.Message', {
    singleton: true, 
    
    requires  : ['Soul.util.RendererUtil'],
    
    index : 0,
    
    infoStr : new Array(),
    
    failedNum : 0,
    
    msgCt : null,
    
    createBox :  function (t, s, isError){
		if(isError)
			return '<div class="msg"><h3>' + t + '</h3><p><span style="color:red;">' + s + '</span></p></div>';
		else
       		return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    },
    
	msg : function(title, format){
        if(!this.msgCt){
            this.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
        }
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
        var m = Ext.DomHelper.append(this.msgCt, this.createBox(title, s), true);
        m.hide();
        m.slideIn('t').ghost("t", { delay: 2000, remove: true});
    },
    
    errorMsg : function(title, format){
        if(!this.msgCt){
            this.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
        }
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
        var m = Ext.DomHelper.append(this.msgCt, this.createBox(title, s, true), true);
        m.hide();
        m.slideIn('t').ghost("t", { delay: 5000, remove: true});
    },
    
    
    taskGetNewInfo : {
		run: function(){
			Soul.uiModule.Message.getNewInfo(true);
		},
		interval: 2000 //5 second
	},
	
	addMessage : function(msg, levelStr){
		var now = new Date();
		var timeStr = Soul.util.RendererUtil.getTimeStr(now);
		var msgStr = timeStr + "[" + levelStr + "]:" + msg;
		var l = this.infoStr.push(msgStr);
		if(l > msgConfig.msgNum){
			 this.infoStr.shift();
		}
	},
	
	clearMessage : function(){
		this.infoStr = new Array();
	},
	
	goScroll : function (){
		if(msgConfig.msgShow){
			Ext.TaskManager.start(this.taskGetNewInfo);//启动消息循环显示
		}
	}, 
	
	stopScroll : function (){
		Ext.TaskManager.stop(this.taskGetNewInfo);
	},
	
	getNewInfo : function (showLast){
//		if(!Ext.isArray(this.infoStr) || this.infoStr.length == 0 ) return;
//		if(showLast){
//			this.index = this.infoStr.length - 1;
//		} else {
//			if(this.index >= this.infoStr.length) this.index = 0;
//		}
//		var logMsg = $("logMsg-div");
//		if(this.infoStr[this.index].indexOf(LABEL.err) >= 0)
//			logMsg.style.color = "red";
//		else if(this.infoStr[this.index].indexOf(LABEL.warn) >= 0)
//			logMsg.style.color = "yellow";
//		else
//			logMsg.style.color = "black";
//		logMsg.innerHTML = this.infoStr[this.index];
//		this.index++;
	},
	
	initMessageModule : function (){
		Soul.uiModule.Message.infoStr = new Array();//初始化信息显示列表
		Soul.uiModule.Message.index = 0; //message显示index
		Soul.uiModule.Message.failedNum = 0; //初始化信息获取失败次数
		if (uiConfig.msgShow) {
			Ext.TaskManager.start(Soul.uiModule.Message.taskGetNewInfo);//启动消息循环显示
		}
	}
	
});