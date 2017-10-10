Ext.define('SureAdmin.controller.Login', {

	extend : 'Ext.app.Controller',

	views : [
	         'app.LoginWindow'
	],

	init : function() {
		var me = this;
		
		SureAuthInfo.logout = me.logout;
		
		this.control({
			'sureadminloginwindow button[name=loginButton]' : {
				click : this.onLogin
			},
			'sureadminloginwindow textfield[name=authcode]' : {
				focus : function(field) {
					var imgField = field.up('fieldcontainer').down('image[name="state"]');
					imgField.setSrc("/img/icon22/onFocus.gif");
				}, blur : function(field) {
					var imgField = field.up('fieldcontainer').down('image[name="state"]');
					var fn = function(isMatch){
						if (isMatch) {
							imgField.setSrc("/img/icon22/onCorrect.gif");
						} else {
							imgField.setSrc("/img/icon22/onError.gif");
						}
					};
					me.validateAuthcode(field.getValue(), fn);
				}
			},
			
			'sureadminloginwindow checkbox[name=rememberMe]' : {
				change: me.changeRememberMe
			},
			
			'sureadminloginwindow checkbox[name=avoidLogin]' : {
				change: me.changeAvoidLogin
			}
		});
	},

	validateAuthcode : function(authcode, fn) {
		Ext.Ajax.request({
			url : ACTION_URL.AUTHCODE_URL,
			method : 'POST',
			headers : {
				Accept : 'application/json',
			},
			params : {
				authcode : authcode,
				clientId : browserClientId
			},
			success : function(res) {
				fn(true);
			},
			failure : function(res) {
				fn(false);
			}
		});
	},

	login : function(name, passwd, authcode) {
		Soul.Ajax.showLoadBar(LABEL.logining);
		passwd = calcMD5(passwd);
		Ext.Ajax.request({
			url : ACTION_URL.LOGIN_URL + "/" + name,
			method : 'POST',
			headers : {
				Accept : 'application/json',
			},
			params : {
				password : passwd,
				authcode : authcode,
				requestType : 'login',
				clientId : browserClientId
			},
			success : function(res) {
				Soul.Ajax.hideLoadBar();
				var loginInfo = Ext.decode(res.responseText);
				SureAuthInfo.saveLoginName(loginInfo.userName);
				SureAuthInfo.saveAccessKeyID(loginInfo.accessKeyId);
				SureAuthInfo.saveSecretAccessKeyID(loginInfo.secretAccessKeyId);
				
				Soul.uiModule.Message.msg(LABEL.login, LABEL.success);
				window.location.reload();
			},
			failure : function(res) {
				Soul.Ajax.hideLoadBar();
				Soul.util.MessageUtil.parseResponse(res);
			}
		});
	},

	logout : function() {
		Ext.Ajax.request({
			url : ACTION_URL.LOGIN_URL + "/" + SureAuthInfo.getLoginName(), // 请求的地址
			params : {
				userName : SureAuthInfo.getLoginName(),
				requestType : "logout"
			},
			method : 'DELETE',
			success : function(response, option) {
				SureAuthInfo.clearLoginInfo();
				Soul.uiModule.Message.msg(LABEL.logout, LABEL.success);
				window.location.reload();
			},
			failure : function() {
				SureAuthInfo.clearLoginInfo();
			}
		});

	},
	
	//登录处理
	onLogin : function( button, e, eOpts) {
		var me = this, 
			f = button.up('form').getForm(), 
			lw = button.up("window");
		
		if (f.isValid()) {
			var isRememberMe = lw.rememberMe.getValue();
			if (isRememberMe) {
				localStorage.setItem("Soul.rememberMe", f.getFieldValues().userName);
			} else {
				localStorage.removeItem("Soul.rememberMe");
			}
			me.login(f.getFieldValues().userName, f.getFieldValues().password, f.getFieldValues().authcode);
		} 
	},
	
	//改变记住用户名状态，取消记录直接删除记录状态
	changeRememberMe : function(checkbox, newValue, oldValue, eOpts) {
		if (!newValue) {
			localStorage.removeItem("Soul.rememberMe");
		}
	},

	//是否开启自动登录
	changeAvoidLogin : function(checkbox, newValue, oldValue, eOpts) {
		SureAuthInfo.changeSaki(newValue);
	},

});
