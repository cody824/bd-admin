Ext.define('SureAdmin.view.app.LoginWindow', {
	extend : 'Ext.window.Window',
	
	alias: 'widget.sureadminloginwindow',
	
	requires : ["Soul.util.HelpUtil", "SureAdmin.util.Common"],
	width : 340,
	height : 388,

	modal : false,
	closable : false,
	resizable : false,
	closeAction : 'hide',
	header:false,
	hideMode : 'offsets',
	bodyStyle:"background-image:url('/img/login_kuang.jpg');padding:55px 30px 0",

	initComponent : function() {
		var me = this;
		
		me.loginTitle = Ext.create(Ext.Component, {
			autoEl: {
		        tag: 'div',
		        html:'<div class="login_title"><div class="user_login_p">用户登录</div></div>',
		    }
		});
		
		var random_number = parseInt(Math.random() * 10);
		me.image = Ext.create(Ext.Img, {
			width : 50,
			style : "cursor:pointer ",
			src : "/suresecurity/authcode?clientId=" + browserClientId + "&_r=" + random_number,
			listeners : {
				click : me.onRefrehImage,
				element : "el",
				scope : me
			}
		});
		
		me.rememberMe = Ext.create("Ext.form.field.Checkbox", {
			id : 'rememberMeCheckbox',
            boxLabel  : " " + LABEL.rememberMe,
            name      : 'rememberMe',
            cls : 'login_fieldLabel',
            inputValue: '2'
         });

		me.avoidLogin = Ext.create("Ext.form.field.Checkbox", {
            boxLabel  : " " + LABEL.avoidLogin,
            name      : 'avoidLogin',
            cls : 'login_fieldLabel',
            inputValue: '2'
         });
		
		me.form = Ext.create(Ext.form.Panel, {
			border : false,
			split : false,
			baseCls :'x-plain',
			width : 280,
			bodyStyle:'padding:55px 10px 0',
			margins: '0 0 0 0',
			columnWidth: .45,
			url : "login/login",
			defaultType : "textfield",
			fieldDefaults : {
				labelWidth : 60,
				labelSeparator : "：",
//				anchor : "0",
				allowBlank : false
			},
			items : [ {
				fieldLabel : LABEL.userName,
				labelCls : 'login_fieldLabel',
				width : 240,
				name : 'userName',
				vtype : 'loginName',
				listeners : {
					afterrender : function(field) {
						Soul.util.HelpUtil.showHelpInfo("LOGIN", "SELF", field);
					}
				}
			}, {
				fieldLabel : LABEL.password,
				labelCls : 'login_fieldLabel',
				width : 240,
				name : 'password',
				inputType : 'password'
			}, {
				xtype : 'fieldcontainer',
				fieldLabel : LABEL.authcode,
				hidden : false,
				labelCls : 'login_fieldLabel',
				msgTarget : 'side',
				defaultType : "textfield",
				width : 300,
				layout : 'hbox',
				defaults : {
					margins : '0 0 0 5'
				},
				items : [ {
					width : 60,
					margins : '0 0 0 0',
					name : 'authcode',
					allowBlank : true
				}, {
					name : 'state',
					xtype: 'image',
					src : "/img/icon22/onShow.gif"
				}, me.image, {
					text : LABEL.another,
					xtype: 'label',
					style: 'cursor: pointer;text-decoration:underline;color:blue',
					width : 50,
					listeners : {
						click : me.onRefrehImage,
						element : "el",
						scope : me
					}
				} ]
			}, {
				xtype : 'fieldcontainer',
				labelCls : 'login_fieldLabel',
				msgTarget : 'side',
				layout : 'hbox',
				defaults : {
					margins : '0 0 0 5'
				},
				items : [me.rememberMe,
				me.avoidLogin]}
			// languageCombo
			],
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
				ui : 'footer',
				layout : {
					pack : "center"
				},
				items : [ {
					text : LABEL.login,
					width : 80,
					disabled : false,
//					formBind : true,
					iconCls : 'login',
					name : 'loginButton',
					scope : me
				}, {
					text : LABEL.reset,
					width : 80,
					iconCls : 'reset',
					handler : me.onReset,
					scope : me
				} ]
			} ]
		});
		
		var rememberMe = me.isRememberMe();
		if (rememberMe != 'none') {
			me.rememberMe.setValue(true);
			me.form.down('textfield[name=userName]').setValue(rememberMe);
		}
		var avoidLogin = me.isAvoidLogin();
		if (avoidLogin == 'localStorage') {
			me.avoidLogin.setValue(true);
		}
		
		me.items = [ me.loginTitle, me.form ];
		
		Ext.apply(this, {
            items: [ me.loginTitle, me.form ]
        });
		
		this.callParent(arguments);
	},
	
	
	isRememberMe : function() {
		var rememberMe = localStorage.getItem("Soul.rememberMe") || 'none';
		return rememberMe;
	},
	
	isAvoidLogin : function(scope) {
		var avoidLogin = SureAuthInfo.getSakiPos();
		return avoidLogin;
	},
	
	onRefrehImage : function() {
		var random_number = parseInt(Math.random() * 10);
		this.image.setSrc("/suresecurity/authcode?clientId=" + browserClientId + "&_r=" + random_number);
	},
	
	onReset : function() {
		var me = this;
		me.form.getForm().reset();
		if (me.form.items.items[0]) {
			me.form.items.items[0].focus(true, 10);
		}
		me.onRefrehImage();
	},

});
