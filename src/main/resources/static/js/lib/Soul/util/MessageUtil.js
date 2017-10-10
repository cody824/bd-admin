Ext.define('Soul.util.MessageUtil', {
    singleton: true, 
    alias : 'util.messageutil',
    
    errorReportMail : 'noknown@163.com',
    
    logoutErrorCode : [15004, 15005, -10009],
    
    showSysFaultInfo : function (title, msg){	
		var win = Ext.getCmp("faultInfo-win");
		var html = "";
		if (win != null) {
			var panel = win.getComponent(0);
			var oldData = panel.data;
			html += oldData;
			win.destroy();
			win = null;
		}
		html += msg;
		var reportLink = '<a id="report_action" href="mailto:' + this.errorReportMail + '?subject=Client Error Report">report</a>';
		html += reportLink;
		var faultPanel = new Ext.Panel( {
			width : 800,
			height : 400,
			autoScroll : true,
			plain : true,
			data : html,
			html:html
		});
		var faultWin = new Ext.Window( {
			title:title,
			width : 800,
			autoHeight : true,
//			frame : true,
			id : "faultInfo-win",
			layout : 'fit',
			items : faultPanel,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.report_error,
				handler : function(){
					var obj = document.getElementById("report_action");
					obj.click();
				}
			}, {
				text: LABEL.copy_error,
				handler : function(){
					copyToClipboard(html);
				}
			}],
			modal : true
		});
		var left = document.body.clientWidth / 2 - 400;
		faultWin.setPosition(left);
		faultWin.show();
	},

	showErrorInfo : function (title, msg, callbackFn){
		var me = this;
		
		Ext.Msg.show({
	   		title: title,
	  		msg: msg,
	  		width: 300,
	  		closable: false,
	   		buttons: Ext.MessageBox.OK,
	   		fn : function(buttonId, text, opt){
	   			var isLogout = false;
	   			Ext.each(me.logoutErrorCode, function(errorCode){
	   				if(msg.indexOf(ERROR_INFO[errorCode]) > 0) {
	   					isLogout = true;
						SureAuthInfo.logout();
						return false;
					}
	   			});
	   			if (!isLogout && callbackFn)
	   				callbackFn();
	   		},
	   		icon: Ext.MessageBox.WARNING
		});
	},

	showNormalInfo : function (title, msg){
		var args = "String.format(msg,";
		for(var i = 2; i < arguments.length; i++) {
			if(i == arguments.length - 1)
				args += 'arguments[' + i + ']';
			else
				args += 'arguments[' + i + '],';
		}
		args +=")";
		var showStr = '';
		try{
			showStr = eval(args);
		}catch(error){
			showStr = msg;
		}
		Ext.Msg.show({
	   		title: title,
	  		msg: showStr,
	  		width: 300,
	  		closable: false,
	   		buttons: Ext.MessageBox.OK,
	   		icon: Ext.MessageBox.INFO
		});
	},

	parseResponse: function(response) {
		var me = this,
			contentType = response.getResponseHeader('Content-Type');
		if (contentType == null && response.responseText.length > 0) {
			me.showSysFaultInfo(LABEL.error, response.responseText);
		} else if (contentType == null && response.responseText.length == 0){
			me.showErrorInfo(response.status, response.statusText);
		} else if (contentType != null && contentType.indexOf("application/json") >=0){
			var errorMsg = Ext.decode(response.responseText);
			me.showErrorInfo(LABEL.error, Soul.util.ErrorMsgUtil
					.parseErrorMsg(errorMsg));
		} 
	}

});



