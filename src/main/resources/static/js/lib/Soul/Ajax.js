String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
Ext.define('Soul.Ajax', {
	singleton : true,

	requires : [ 'Soul.util.MessageUtil', 'Soul.util.ErrorMsgUtil' ],

	loadThreadArray : new Array(),

	addLoadThread : function(msg) {
		Soul.Ajax.loadThreadArray.push(msg);
	},

	removeLoadThread : function(msg) {
		Ext.Array.remove(Soul.Ajax.loadThreadArray, msg);
	},

	myMask : null,

	showLoadBar : function(message) {
		if (this.myMask)
			this.myMask.hide();
		var msg = (this.loadThreadArray.length > 1) ? "("
				+ this.loadThreadArray.length + ")" + message + "……" : message
				+ "……";

		this.myMask = new Ext.LoadMask(Ext.getBody(), {
			nowMsg : message,
			msg : msg
		});
		this.myMask.show();
	},

	hideLoadBar : function() {
		if (this.loadThreadArray.length > 0) {
			if (this.myMask) {
				var msg = this.myMask.nowMsg;
				this.showLoadBar(msg);
			}
			return;
		}
		this.myMask.hide();
	},

	executeFnAfterLoad : function(fn) {
		if (this.loadThreadArray.length > 0)
			return;
		fn();
	},

	doRequest : function(options) {
		var me = this, loadMask = options.loadMask || false;
		loadMsg = options.loadMsg || LABEL.executing, success = options.success
				|| Ext.emptyFn, failure = options.failure || Ext.emptyFn,
				successMsg = options.successMsg || LABEL.executeSuccess;
		var parseFailure = true;
		
		if (options.parseFailure)
			parseFailure = options.parseFailure;
		
		if (loadMask)
			me.showLoadBar(loadMsg);

		if (options.headers == undefined) {
			options.headers = {
				Accept : "application/json"
			}
		}

		Ext.apply(options, {
			success : function(response) {
				if (loadMask)
					me.hideLoadBar();
				var ret = null;
				if (response.responseText != "") {
					ret = Ext.decode(response.responseText); // 返回的信息
				}
				Soul.uiModule.Message.msg("", successMsg);
				success(ret);
			},
			failure : function(response) {
				if (loadMask)
					me.hideLoadBar();
				if (parseFailure)
					Soul.util.MessageUtil.parseResponse(response);
				failure();
			}
		});
		Ext.Ajax.request(options);
	},

	request : function(options) {
		var me = this, confirm = options.confirm || false;

		if (confirm != false) {
			var msg = Ext.create('Ext.window.MessageBox', {
				buttonText : Ext.MessageBox.buttonText
			});
			msg.show({
				title : LABEL.tip,
				msg : confirm,
				width : 280,
				buttons : Ext.MessageBox.OKCANCEL,
				modal : true,
				closable : false,
				fn : function(btn) {
					if (btn == 'ok') {
						me.doRequest(options);
					}
				},
				icon : Ext.MessageBox.QUESTION
			});
		} else {
			me.doRequest(options);
		}
	},

	executeRequestData : function(url, params, callbackFunc, failCallbackFunc,
			message) {
		var me = this;
		me.showLoadBar(message);
		me.addLoadThread(message);
		Ext.Ajax.request({
			url : url,
			params : params,
			timeout : 180000,
			method : 'GET',
			headers : {
				Accept : 'application/json'
			},
			success : function(response, option) {
				me.removeLoadThread(message);
				var data = Ext.decode(response.responseText);
				me.hideLoadBar();
				callbackFunc(data);
			},
			failure : function(response) {
				me.removeLoadThread(message);
				me.hideLoadBar();
				Soul.util.MessageUtil.parseResponse(response);
				failCallbackFunc();
			}
		});
	},

	objectRestAction : function(obj, operation, callbackFn, successMsg,
			failCallbackFn) {
		var me = this;
		var params = obj.httpParams[operation];
		var method = obj.httpMethod[operation] || "get";
		var url = obj.links[operation];
		var jsonData = obj.requestBody[operation];
		var confirm = obj.methodConfirm[operation];

		if (url == null) {
			Soul.uiModule.Message.errorMsg("", "没有权限或无效的操作");
			return;
		}
		me.confirmRestAction(url, method, params, jsonData, callbackFn,
				successMsg, failCallbackFn, confirm);
	},

	confirmRestAction : function(url, method, params, jsonData, callbackFn,
			successMsg, failCallbackFn, confirm) {
		var me = this;
		if (confirm) {
			var msg = Ext.create('Ext.window.MessageBox', {
				buttonText : Ext.MessageBox.buttonText
			});
			msg.show({
				title : LABEL.tip,
				msg : confirm[method].msg,
				width : 280,
				buttons : Ext.MessageBox.OKCANCEL,
				modal : true,
				closable : false,
				fn : function(btn) {
					if (btn == 'ok') {
						me.restAction(url, method, params, jsonData,
								callbackFn, successMsg, failCallbackFn);
					}
				},
				icon : Ext.MessageBox.QUESTION
			});
		} else {
			me.restAction(url, method, params, jsonData, callbackFn,
					successMsg, failCallbackFn);
		}
	},

	restAction : function(url, method, params, jsonData, callbackFn,
			successMsg, failCallbackFn) {
		var me = this;
		me.showLoadBar(successMsg ? successMsg : LABEL.executing);
		Ext.Ajax.request({
			loadMask : true,
			url : url,
			params : params,
			method : method,
			timeout : 360000,
			jsonData : jsonData,
			headers : {
				"Accept" : 'application/json',
				"Content-Type" : 'application/json; charset=UTF-8'
			},
			success : function(response, option) {
				me.hideLoadBar();
				var ret = null;
				if (response.responseText != "") {
					ret = Ext.decode(response.responseText); // 返回的信息
				}
				Soul.uiModule.Message.msg("", successMsg ? successMsg + " "
						+ LABEL.success : LABEL.executeSuccess);
				callbackFn(ret);
			},
			failure : function(response) {
				me.hideLoadBar();
				Soul.util.MessageUtil.parseResponse(response);
				if (failCallbackFn != null) {
					failCallbackFn();
				}
			}
		});
	},

	getSyncData : function(url, params) {
		var data = null;
		Ext.Ajax.request({
			url : url,
			params : params,
			async : false,
			headers : {
				Accept : 'application/json'
			},
			success : function(response, option) {
				if (response.responseText != '') {
					data = Ext.decode(response.responseText);
				}
			},
			failure : function(response) {
				Soul.util.MessageUtil.parseResponse(response);
			}
		});
		return data;
	},

	getSyncText : function(url, params) {
		var data = null;
		Ext.Ajax.request({
			url : url,
			params : params,
			async : false,
			success : function(response, option) {
				data = response.responseText;
			},
			failure : function(response) {
				Soul.util.MessageUtil.parseResponse(response);
			}
		});
		return data;
	},

	loadJs : function(response) {
		if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
			if (response.responseText != null
					&& response.responseText.trim() != "") {
				try {
					window.execScript(response.responseText);
				} catch (err) {
				}
			}
		} else {
			window.eval(response.responseText);
		}
	},

	localeMap : {},

	loadUrlJs : function(url) {
		var me = this;
		if (this.localeMap[url] == true) {
			return true;
		}
		var loadFunc = this.loadJs;
		var loadOk = true;
		Ext.Ajax.request({
			url : url,
			async : false,
			success : function(response, opts) {
				loadFunc(response);
				me.localeMap[url] = true;
			},
			failure : function() {
				loadOk = false;
			}
		});
		return loadOk;
	},

	/*
	 * 构建普通请求的FROM提交配置对象 url:请求任务的url params:请求的参数列表 containerId:FROM所在容器ID
	 * callbackFn:callback函数 successMsg 成功后是提示信息
	 */
	getCommonFromSubmitObj : function(url, params, containerId, callbackFn,
			successMsg) {
		Soul.Ajax.showLoadBar(successMsg ? successMsg : LABEL.executing);
		var obj = {
			clientValidation : true,
			url : url,
			params : params,
			timeout : 360000,
			success : function(form, action) {
				Soul.Ajax.hideLoadBar();
				if (action.result.success == true) {
					Soul.uiModule.Message.msg("", successMsg ? successMsg
							: LABEL.executeSuccess);
				} else {
					showErrorInfo(LABEL.error, Soul.util.ErrorMsgUtil
							.parseError(action.result.msg));
				}
				callbackFn();
				if (containerId != null)
					Ext.getCmp(containerId).destroy();
			},
			failure : function(form, action) {
				Soul.Ajax.hideLoadBar();
				switch (action.failureType) {
				case Ext.form.Action.CLIENT_INVALID:
					if (containerId != null)
						Ext.getCmp(containerId).show();
					break;
				case Ext.form.Action.CONNECT_FAILURE:
					if (action.response.responseText.indexOf("html") > 0)
						Soul.util.MessageUtil.showSysFaultInfo(LABEL.failure,
								action.response.responseText);
					if (containerId != null)
						Ext.getCmp(containerId).destroy();
					break;
				case Ext.form.Action.SERVER_INVALID:
					Soul.util.MessageUtil.showErrorInfo(LABEL.error,
							Soul.util.ErrorMsgUtil
									.parseError(action.result.msg));
					if (containerId != null)
						Ext.getCmp(containerId).destroy();
				}
			}
		};
		return obj;
	}

});
