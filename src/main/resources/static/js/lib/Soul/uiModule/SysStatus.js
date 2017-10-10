
Ext.define('Soul.uiModule.SysStatus', {
	singleton: true, 

	requires  : ['Soul.util.TipUtil', 'Soul.util.ErrorMsgUtil'],
	
 	failedNum : 0,
 
	runState : false,
 
 	infoStr : new Object(),
 
 	sysStatusUrl : ACTION_URL.SYSSTATUS_URL,
 
 	requestId : "",
	 
	updateSysStatusAction : function () {
		var updateS = uiConfig.sysStatus || false;
		if (updateS == "true" || updateS == true)
			this.updateSysStatus(1, baseConfig.managedIp);
	},
	
	stopUpdateSysStatus : function (){
		if(this.runState) {
			Ext.Ajax.abort(this.requestId);
			this.runState = false;
		}
	},
	
	updateSysStatus : function (isInit, remoteIp) {
		if(this.runState)
			return;
		this.runState = true;
		this.requestId = Ext.Ajax.request( {
			url : this.sysStatusUrl,
			params : {
				requestType : "getSysStatus",
				remoteIp : remoteIp,
				isInit : isInit
			}, // 发送的参数
			timeout : 3000000,
			success : function(response, option) {
				Soul.uiModule.SysStatus.runState = false;
				if ((response.responseText == "" || response.responseText.indexOf("<html>") >= 0) && sysStatus.failedNum++ < 10 ) {
					setTimeout('Soul.uiModule.SysStatus.updateSysStatus(1,"' + remoteIp+'")', 5000);
					return;
				}
				Soul.uiModule.SysStatus.infoStr = Ext.decode(response.responseText); // 返回的信息
				Soul.uiModule.SysStatus.setSysStatusInfo();
				Soul.uiModule.SysStatus.failedNum = 0;
				setTimeout('Soul.uiModule.SysStatus.updateSysStatus(0,"' + remoteIp+'")', 5000);
			//updateSysStatus(0);
			},
			failure : function() {
				this.runState = false;
				if (this.failedNum++ < 10)
					setTimeout('Soul.uiModule.SysStatus.updateSysStatus(1,"' + remoteIp+'")', 5000);
			}
		});
	},

	setSysStatusInfo : function () {
		var statusIcon = Soul.util.CommonUtil.$("statusIcon-td");
//		var statusText = Soul.util.CommonUtil.$("statusText-div");
		if (this.infoStr.state == 2 || this.infoStr.state == 3) {
			statusIcon.innerHTML = '<img src="/img/icon32/symbol_error.png" width="47" height="47" />';
		} else if (this.infoStr.state == 1) {
			statusIcon.innerHTML = '<img src="/img/icon32/symbol_exclamation.png" width="47" height="47" />';
		} else {
			statusIcon.innerHTML = '<img src="/img/icon32/symbol_information.png" width="32" height="32" />';
		}
//		if(baseConfig.mode == PRODUCT_MODE.single ){
//			if(baseConfig.singleIp == "127.0.0.1")
//				statusText.innerHTML = SYS_STATUS_LABEL[this.infoStr.state];
//			else
//				statusText.innerHTML = "[" + baseConfig.managedIp + "]";
//		} else {
//			var productMode = Ext.state.Manager.get('productMode');
//			if(productMode == PRODUCT_MODE.single)
//				statusText.innerHTML = "[" + baseConfig.managedIp + "]";
//			else {
//				statusText.innerHTML = sysModelShow;
//			}
//		}
		this.showSysStatus();
	},
	
	showSysStatus : function (obj, e) {
		var str = LABEL.model + ":" + " " + sysModelShow + "<br>";
//		var str = '';
		if ( this.infoStr != null && this.infoStr.devArray != null) {
			for ( var i = 0; i < this.infoStr.devArray.length; i++) {
				str += Soul.util.ErrorMsgUtil.parseSysStatus(this.infoStr.devArray[i]) + "<br>";
			}
	
		}
		Ext.create("Ext.tip.ToolTip", {
	        target: "statusIcon-td",
	        html: str
 		 });
	},
	
	
	getStatusByKey : function (key) {
		var ret = 0;
		if (this.infoStr == null || this.infoStr.devArray == null)
			return ret;
		for ( var i = 0; i < this.infoStr.devArray.length; i++) {
			if (key == this.infoStr.devArray[i].devName) {
				ret = parseInt(this.infoStr.devArray[i].state);
			}
		}
		return ret;
	}
	 
});








