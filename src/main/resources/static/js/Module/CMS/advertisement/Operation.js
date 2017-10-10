Ext.define('Module.CMS.advertisement.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.CMS.advertisement.store.AdvertisementStore',
		'Module.CMS.advertisement.Renderer',
		
	],
	
	getOperationForAdv_site : function(adv_site){
		adv_site.httpParams = new Object();
		adv_site.httpMethod = new Object();
		adv_site.requestBody = new Object();
		adv_site.methodConfirm = new Object();
		if(window.console){console.log("getOperationForAdv_site test");}

	},

	getOperationForAdvertisement : function(advertisement){
		advertisement.httpParams = new Object();
		advertisement.httpMethod = new Object();
		advertisement.requestBody = new Object();
		advertisement.methodConfirm = new Object();
		
		if(window.console){console.log("getOperationForAdvertisement test");}

		advertisement.methodConfirm["release"] = {
			"put" : {
				msg : Ext.String.format(ADV_MESSAGE.confirmReleaseAdvs, advertisement.adv_title)
			},
			"delete" : {
				msg : Ext.String.format(ADV_MESSAGE.confirmUnReleaseAdvs, advertisement.adv_title)
			}
				
		};
		if (advertisement.adv_state == Module.CMS.advertisement.model.AdvertisementModel.RELEASED) {
			advertisement.httpMethod["release"] = "delete";			
		} else  {
			advertisement.httpMethod["release"] = "put";
		}
	},

	doAddSiteFunction : function(callbackFn){
		var loginName = SureAuthInfo.getLoginName();
		if (loginName == 'Guest' || loginName == null || loginName == '') {
			Ext.Msg.alert('提示信息: 请登录管理平台。');
			return;
		}
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'oper_user_id',
				xtype: 'displayfield',
				value: loginName,
				submitValue: true,
				hidden: true
			},{
				name: 'adv_site',
				fieldLabel: ADV_MANAGE_LABEL.adv_site,
				allowBlank: false,
				blankText: ADV_MANAGE_LABEL.title_blankText
			},{
				xtype: 'fieldcontainer',
				defaultType: 'numberfield',  
                defaults: {  
                    flex: 1  
                },  
                layout: 'hbox', 
                items: [{
                	name: 'site_width',
					fieldLabel: ADV_MANAGE_LABEL.site_width,
					allowBlank: false,
					labelAlign: 'right',
				},{
					name: 'site_height',
					fieldLabel: ADV_MANAGE_LABEL.site_height,
					allowBlank: false,
					labelAlign: 'right',
                }]
            },{  
                xtype      : 'fieldcontainer',  
                fieldLabel : ADV_MANAGE_LABEL.enable_tag,  
                defaultType: 'radiofield',  
                defaults: {  
                    flex: 1  
                },  
                layout: 'hbox',  
                items: [  
                    {  
                        boxLabel  : ADV_MANAGE_LABEL.valid,  
                        name      : 'enable_tag',  
                        inputValue: '1',  
                        id        : 'radio3'  
                    }, {  
                        boxLabel  : ADV_MANAGE_LABEL.invalid,  
                        name      : 'enable_tag',  
                        inputValue: '0',  
                        id        : 'radio4'  
                    }  
                ]
			},{
				name: 'site_desc',
				fieldLabel: ADV_MANAGE_LABEL.site_desc,
				allowBlank: false,
				xtype: 'textarea',
				blankText: ADV_MANAGE_LABEL.content_blankText
			},{
				name: 'price_desc',
				fieldLabel: ADV_MANAGE_LABEL.price_desc,
				allowBlank: false,
				xtype: 'textarea',
				blankText: ADV_MANAGE_LABEL.content_blankText
			},
			]
		});

		var win = new Ext.Window({
			title: ADV_MANAGE_LABEL.siteAdd,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.save,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/common/adv_site/', 'post', Ext.encode(params), null, function(ret){
						callbackFn();
						win.close();
					}, null, null);
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	},

	doEditSiteFunction : function(record, callbackFn) {
		var loginName = SureAuthInfo.getLoginName();
		if (loginName == 'Guest' || loginName == null || loginName == '') {
			Ext.Msg.alert('提示信息: 请登录管理平台。');
			return;
		}
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'oper_user_id',
				xtype: 'displayfield',
				value: loginName,
				submitValue: true,
				hidden: true
			},{
				name: 'adv_code',
				fieldLabel: ADV_MANAGE_LABEL.adv_code,
				xtype: 'displayfield',
				allowBlank: false,
				value: record.data.adv_code,
				submitValue: false,
			},{
				name: 'adv_site',
				fieldLabel: ADV_MANAGE_LABEL.adv_site,
				allowBlank: false,
				value: record.data.adv_site,
				blankText: ADV_MANAGE_LABEL.title_blankText
			},{
				xtype: 'fieldcontainer',
				defaultType: 'numberfield',  
                defaults: {  
                    flex: 1  
                },  
                layout: 'hbox', 
                items: [{
                	name: 'site_width',
					fieldLabel: ADV_MANAGE_LABEL.site_width,
					allowBlank: false,
					labelAlign: 'right',
					value: record.data.site_width,
				},{
					name: 'site_height',
					fieldLabel: ADV_MANAGE_LABEL.site_height,
					allowBlank: false,
					labelAlign: 'right',
					value: record.data.site_height,
                }]
			},{  
                xtype      : 'fieldcontainer',  
                fieldLabel : ADV_MANAGE_LABEL.enable_tag,  
                defaultType: 'radiofield',  
                defaults: {  
                    flex: 1  
                },  
                layout: 'hbox',  
                items: [  
                    {  
                    	checked: record.data.enable_tag == 1?true:false,
                        boxLabel  : ADV_MANAGE_LABEL.valid,  
                        name      : 'enable_tag',  
                        inputValue: '1',  
                        id        : 'radio3'  
                    }, {  
                    	checked: record.data.enable_tag == 0?true:false,
                        boxLabel  : ADV_MANAGE_LABEL.invalid,  
                        name      : 'enable_tag',  
                        inputValue: '0',  
                        id        : 'radio4'  
                    }  
                ]
			},{
				name: 'site_desc',
				fieldLabel: ADV_MANAGE_LABEL.site_desc,
				allowBlank: false,
				value: record.data.site_desc,
				xtype: 'textarea',
				blankText: ADV_MANAGE_LABEL.content_blankText
			},{
				name: 'price_desc',
				fieldLabel: ADV_MANAGE_LABEL.price_desc,
				allowBlank: false,
				value: record.data.price_desc,
				xtype: 'textarea',
				blankText: ADV_MANAGE_LABEL.content_blankText
			},
			]
		});

		var win = new Ext.Window({
			title: ADV_MANAGE_LABEL.siteEdit,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.save,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/common/adv_site/'+record.data.trade_id, 'put', Ext.encode(params), null, function(ret){
						callbackFn();
						win.close();
					}, null, null);
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	},

	doDelSiteFunction : function(records, callbackFn) {
		var requestBody = [];
		var adv_sites = [];
		for(var i=0; i<records.length; i++) {
			requestBody.push(records[i].data.trade_id);
			adv_sites.push(records[i].data.adv_site);
		}

		Ext.Msg.confirm('', Ext.String.format(ADV_MESSAGE.confirmDelSites, adv_sites), function(button, text) {
			if (button == "yes") {
				Soul.Ajax.confirmRestAction("/common/adv_site/", "delete", null, requestBody,  function(ret){
						callbackFn();
					}, null, null, null);
			}
		});
	},

	doAddAdvFunction : function(record, callbackFn) {
		var loginName = SureAuthInfo.getLoginName();
		if (loginName == 'Guest' || loginName == null || loginName == '') {
			Ext.Msg.alert('提示信息: 请登录管理平台。');
			return;
		}
		
		var imgView = Ext.create('Ext.Img', {  
			autoHeight: true,
			src: '',
			style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);'
		});
		
		var fixImgBoxSize = function(imgUrl) {
			var boxWidth = 0;
			var boxHeight = 0;
			var boxMaxWidth = 400;
			var boxMaxHeight = 400;
			
			if (imgUrl == null || imgUrl == '')
				return;
			var image = new Image();
			image.src = imgUrl;
			image.onload = function(){
				if (image.width > image.height) {
					boxHeight = image.height * boxMaxWidth / image.width;
					boxWidth = boxMaxWidth;
				}else {
					boxHeight = boxMaxHeight;
					boxWidth = image.width * boxMaxHeight / image.height;
				}
				imgView.setWidth(boxWidth);
				imgView.setHeight(boxHeight);
			};
		};
		
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'oper_user',
				xtype: 'displayfield',
				value: loginName,
				hidden: true,
				submitValue: true,
			},{
				name: 'adv_site',
				xtype: 'displayfield',
				fieldLabel: ADV_MANAGE_LABEL.adv_site,
				value: record.data.adv_site,
				submitValue: false,
			},{
				name: 'adv_type',
				xtype: 'combo',
				displayField: 'name',
				valueField: 'value',
				value: '',
				store: Ext.create('Ext.data.Store', {
						fields: ['value', 'name'],
						data: [{
							name: '文字',
							value: '1'
						}, {
							name: '图片',
							value: '2'
						}, {
							name: '动画',
							value: '3'
						}]
					}),
				fieldLabel: '广告类型',
				listeners: {
					change: function(comb) {
						var form = this.up('form');

						var imgContainer = new Ext.form.FieldContainer({  
            				autoHeight: true,
							name: 'img',
							fieldLabel: ADV_MANAGE_LABEL.adv_file,
							labelAlign: 'right',			 
            				items: [imgView]  
        				});
						
						var fileContainer = new Ext.form.FieldContainer({  
            				 
            				items: [{
            					name: 'adv_content',
            					id: 'adv_content',
                				xtype: "filefield" ,
                				labelAlign: 'right', 
                				fieldLabel: ADV_MANAGE_LABEL.adv_content,
                				buttonText: '选择图片...',
								allowBlank: false,
								width: 400,
                			}]  
        				});

        				var uploadButton = new Ext.Button({
							text: LABEL.upload,
							width: 60,
							margin: '0 0 10 340',
							handler: function(){
								var form = this.up('form');
								if (!form.isValid()) return;

								form.submit({
									url: '/common/advertisement/image',
									method: 'POST',
									waitMsg: '正在上传图片请稍候...',
									success: function(fp, o) {
										Ext.Msg.alert('提示信息: 您的图片已经成功上传。');
										Ext.getCmp('adv_content').setValue(o.result.adv_content);
										Ext.getCmp('adv_content').setRawValue(o.result.adv_content);
										imgView.setSrc(o.result.adv_content);
										fixImgBoxSize(o.result.adv_content);
									}
								});
							}
						});

						var editorItem = new Ext.form.HtmlEditor({
							name: 'adv_content',
							fieldLabel: ADV_MANAGE_LABEL.adv_content,
							labelAlign: 'right',
							height: 200,
							width: 400,
							labelSeparator: ":",
							createLinkText: "创建超链接",
							defaultLinkValue: "http://",
							enableAlignments: true,
							enableColors: true,
							enableFont: true,
							enableFontSize: true,
							enableFormat: true,
							enableLinks: true,
							enableLists: true,
							enableSourceEdit: true,
							fontFamilies: ["宋体", "隶书", "黑体"]
						});

						count = form.items.length;
						if (count > 9) {
							for (var i = count-1; i >= 8; i--) {
								form.remove(i);
							}
						}

						switch(comb.getValue()) {
							case '1':
								form.add(editorItem);
								break;
							case '2':
								form.add(imgContainer);
								form.add(fileContainer);
								form.add(uploadButton);
								break;
						}
					}
				}
            },{
				name: 'adv_title',
				fieldLabel: ADV_MANAGE_LABEL.adv_title,
				allowBlank: false,
			},{
				name: 'adv_publisher',
				fieldLabel: ADV_MANAGE_LABEL.adv_publisher,
				allowBlank: false,
			},{
				name: 'adv_contact',
				fieldLabel: ADV_MANAGE_LABEL.adv_contact,
				allowBlank: false,
			},{
				xtype: 'radiogroup',
				fieldLabel: '是否链接',
				columns: 2,
				vertical: true,
				items:[{
					boxLabel: '是',
					name: 'link',
					inputValue: '1',
					submitValue: false,
					checked: true
				}, {
					boxLabel: '否',
					name: 'link',
					submitValue: false,
					inputValue: '0'
				}],
				listeners: {
					change: function(g, newValue, oldValue){
						if(window.console){
						console.log(newValue);
						console.log(oldValue);
						}
						if (newValue.link == 0) {
							Ext.getCmp('adv_url').setValue("javascript:void(0);");
							Ext.getCmp('adv_url').disable();
						}else {
							Ext.getCmp('adv_url').setValue("");
							Ext.getCmp('adv_url').enable();
						}
					}
				}
			},{
				name: 'adv_url',
				id: 'adv_url',
				fieldLabel: ADV_MANAGE_LABEL.adv_url,
				allowBlank: false,
				vtype : 'checkUrl',
				vtypeText : '格式不正确'
			},{
				xtype: 'fieldcontainer',
				defaultType: 'datefield',  
                defaults: {  
                    flex: 1,
                    format: 'Y-m-d',
                    labelAlign: 'right',
                    allowBlank: false,
                },  
                layout: 'hbox', 
                items: [{
                	name: 'state_date',
					fieldLabel: ADV_MANAGE_LABEL.state_date,
				},{
					name: 'end_date',
					fieldLabel: ADV_MANAGE_LABEL.end_date,
                }]
			}
			]
		});

		Ext.apply(Ext.form.VTypes, {

			checkUrl : function(value, field){
				var re = '^((https|http|ftp|rtsp|mms)?://)'
					+ '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
					+ '|' // 允许IP和DOMAIN（域名） 
					+ '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
					+ '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
					+ '[a-z]{2,6})' // first level domain- .com or .museum 
					+ '(:[0-9]{1,4})?' // 端口- :80 
					+ '((/?)|' // a slash isn't required if there is no file name 
					+ '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'; 
            	var reg = new RegExp(re);
            	isok= reg.test(value);
				if (!isok) {
		            return false;
				} else{
					return true;
				}
			}

		});

		var win = new Ext.Window({
			title: ADV_MANAGE_LABEL.advAdd,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			autoScroll: true,
			maxHeight: 400,
			maxWidth: 540,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.save,
				handler: function(){
					var form = formpanel.getForm();
					if (!form.isValid()) return;

					var params = formpanel.getForm().getValues();
					if (Ext.getCmp('adv_url').isDisabled())
						params['adv_url'] = Ext.getCmp('adv_url').getValue();
					params['adv_content'] = Ext.getCmp('adv_content').getValue();
					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/common/adv_site/'+record.data.trade_id+'/advertisement/', 'post', Ext.encode(params), null, function(ret){
						callbackFn();
						win.close();
					}, null, null);
					
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	},

	doEditAdvFunction : function(record, callbackFn) {
		var loginName = SureAuthInfo.getLoginName();
		if (loginName == 'Guest' || loginName == null || loginName == '') {
			Ext.Msg.alert('提示信息: 请登录管理平台。');
			return;
		}
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'oper_user',
				xtype: 'displayfield',
				value: loginName,
				hidden: true,
				submitValue: true,
			},{
				name: 'adv_site',
				xtype: 'displayfield',
				fieldLabel: ADV_MANAGE_LABEL.adv_site,
				value: record.data.adv_site,
				submitValue: false,
			},{  
				name: 'adv_type',
                xtype: 'displayfield',  
                fieldLabel : ADV_MANAGE_LABEL.adv_type,  
                value: Module.CMS.advertisement.Renderer.translateType(record.data.adv_type),
                submitValue: false,
            },{
				name: 'adv_title',
				fieldLabel: ADV_MANAGE_LABEL.adv_title,
				allowBlank: false,
				value: record.data.adv_title,
			},{
				name: 'adv_publisher',
				fieldLabel: ADV_MANAGE_LABEL.adv_publisher,
				allowBlank: false,
				value: record.data.adv_publisher,
			},{
				name: 'adv_contact',
				fieldLabel: ADV_MANAGE_LABEL.adv_contact,
				allowBlank: false,
				value: record.data.adv_contact,
			},{
				id: 'link',
				xtype: 'radiogroup',
				fieldLabel: '是否链接',
				columns: 2,
				vertical: true,
				items:[{
					boxLabel: '是',
					name: 'link',
					inputValue: '1',
					submitValue: false,
					checked: record.data.adv_url == 'javascript:void(0);'?false:true
				}, {
					boxLabel: '否',
					name: 'link',
					submitValue: false,
					inputValue: '0',
					checked: record.data.adv_url == 'javascript:void(0);'?true:false
				}],
				listeners: {
					change: function(g, newValue, oldValue){
						if(window.console){
						console.log(newValue);
						console.log(oldValue);
						}
						if (newValue.link == 0) {
							Ext.getCmp('adv_url').setValue("javascript:void(0);");
							Ext.getCmp('adv_url').disable();
						}else {
							Ext.getCmp('adv_url').setValue("");
							Ext.getCmp('adv_url').enable();
						}
					}
				}
			},{
				name: 'adv_url',
				id: 'adv_url',
				fieldLabel: ADV_MANAGE_LABEL.adv_url,
				allowBlank: false,
				value: record.data.adv_url,
				submitValue: true,
				vtype : 'checkUrl',
				vtypeText : '格式不正确'
			},{
				xtype: 'fieldcontainer',
				defaultType: 'datefield',  
                defaults: {  
                    flex: 1,
                    format: 'Y-m-d',
                    labelAlign: 'right',
                    allowBlank: false,
                },  
                layout: 'hbox', 
                items: [{
                	name: 'state_date',
					fieldLabel: ADV_MANAGE_LABEL.state_date,
					value: Module.CMS.advertisement.Renderer.translateDate(record.data.state_date),
				},{
					name: 'end_date',
					fieldLabel: ADV_MANAGE_LABEL.end_date,
					value: Module.CMS.advertisement.Renderer.translateDate(record.data.end_date),
                }]
			},{
				name: 'actual_end_date',
				fieldLabel: ADV_MANAGE_LABEL.actual_end_date,
				allowBlank: false,
				xtype: 'displayfield',
				value: Module.CMS.advertisement.Renderer.translateRevokeTime(record.data.actual_end_date, record)
			}
			]
		});
		
		var fixImgBoxSize = function(imgUrl) {
			var boxWidth = 0;
			var boxHeight = 0;
			var boxMaxWidth = 400;
			var boxMaxHeight = 400;
			
			if (imgUrl == null || imgUrl == '')
				return;
			var image = new Image();
			image.src = imgUrl;
			image.onload = function(){
				if (image.width > image.height) {
					boxHeight = image.height * boxMaxWidth / image.width;
					boxWidth = boxMaxWidth;
				}else {
					boxHeight = boxMaxHeight;
					boxWidth = image.width * boxMaxHeight / image.height;
				}
				imgView.setWidth(boxWidth);
				imgView.setHeight(boxHeight);
			};
		};

		var imgView = Ext.create('Ext.Img', {  
			autoHeight: true,
			src: record.data.adv_content,
			style: 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);'
		});
		
		var imgContainer = new Ext.form.FieldContainer({  
            autoHeight: true,
			name: 'img',
			fieldLabel: ADV_MANAGE_LABEL.adv_file,
			labelAlign: 'right',			 
            items: [imgView]  
        });

		//var addFileItem = function(){
		var fileContainer = new Ext.form.FieldContainer({  
            				 
            items: [{
            	id: 'adv_content',
            	name: 'adv_content',
                xtype: "filefield" ,
                labelAlign: 'right', 
                fieldLabel: ADV_MANAGE_LABEL.adv_content,
                buttonText: '选择图片...',
				allowBlank: false,
				width: 400,
			}]  
        });
		//return fileContainer;
		//}

		//var addUploadButtonItem = function(){
		var uploadButton = new Ext.Button({
			text: LABEL.upload,
			width: 60,
			margin: '0 0 10 340',
			handler: function(){
				var form = this.up('form');
				if (!form.isValid()) return;

				form.submit({
					url: '/common/advertisement/image',
					method: 'POST',
					waitMsg: '正在上传图片请稍候...',
					success: function(fp, o) {
						Ext.Msg.alert('提示信息: 您的图片已经成功上传。');
						Ext.getCmp('adv_content').setValue(o.result.adv_content);
						Ext.getCmp('adv_content').setRawValue(o.result.adv_content);
						imgView.setSrc(o.result.adv_content);
						fixImgBoxSize(o.result.adv_content);
					}
				});
			}
		});
		//return uploadButton;
		//}

		var editorItem = new Ext.form.HtmlEditor({
			name: 'adv_content',
			fieldLabel: ADV_MANAGE_LABEL.adv_content,
			labelAlign: 'right',
			value: record.data.adv_content,
			height: 200,
			width: 400,
			labelSeparator: ":",
			createLinkText: "创建超链接",
			defaultLinkValue: "http://",
			enableAlignments: true,
			enableColors: true,
			enableFont: true,
			enableFontSize: true,
			enableFormat: true,
			enableLinks: true,
			enableLists: true,
			enableSourceEdit: true,
			fontFamilies: ["宋体", "隶书", "黑体"]
		});

		changeImgButton = new Ext.Button({
			text: ADV_MANAGE_LABEL.changImg,
			width: 80,
			handler: function(){
				fileContainer.show();
				uploadButton.show();
				//formpanel.add(addFileItem());
				//formpanel.add(addUploadButtonItem());
				this.hide();
				cancelButton.show();
			}
		});
		cancelButton = new Ext.Button({
			text: LABEL.cancel,
			width: 50,
			hidden: true,
			handler: function(){
				fileContainer.hide();
				uploadButton.hide();
				//var len = formpanel.items.length;
				//formpanel.remove(len-1);
				//formpanel.remove(len-2);
				Ext.getCmp('imagebox').getEl().dom.src = record.data.adv_content;
				this.hide();
				changeImgButton.show();
			}
		});

		switch(record.data.adv_type) {
			case '1':
				formpanel.add(editorItem);
				break;
			case '2':
				formpanel.add(imgContainer);
				formpanel.add(changeImgButton);
				formpanel.add(cancelButton);
				formpanel.add(fileContainer);
				formpanel.add(uploadButton);
				
				Ext.getCmp('adv_content').setValue(record.data.adv_content);
				Ext.getCmp('adv_content').setRawValue(record.data.adv_content);
				fileContainer.hide();
				uploadButton.hide();
				break;
		}

		Ext.apply(Ext.form.VTypes, {
			checkUrl : function(value, field){
				var re = '^((https|http|ftp|rtsp|mms)?://)'
					+ '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
					+ '|' // 允许IP和DOMAIN（域名） 
					+ '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
					+ '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
					+ '[a-z]{2,6})' // first level domain- .com or .museum 
					+ '(:[0-9]{1,4})?' // 端口- :80 
					+ '((/?)|' // a slash isn't required if there is no file name 
					+ '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'; 
            	var reg = new RegExp(re);
            	isok= reg.test(value);
				if (!isok) {
		            return false;
				} else{
					return true;
				}
			}

		});

		var win = new Ext.Window({
			title: ADV_MANAGE_LABEL.advEdit,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			autoScroll: true,
			maxHeight: 400,
			maxWidth: 540,
			buttons: [{
				text: LABEL.save,
				handler: function(){
					var form = formpanel.getForm();
					if (!form.isValid()) return;

					var params = formpanel.getForm().getValues();
					if (Ext.getCmp('adv_url').isDisabled())
						params['adv_url'] = Ext.getCmp('adv_url').getValue();
					params['adv_content'] = Ext.getCmp('adv_content').getValue();
					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/common/advertisement/' + record.data.trade_id, 'put', Ext.encode(params), null, function(ret){
						callbackFn();
						win.close();
					}, null, null);
					
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
		
		fixImgBoxSize(record.data.adv_content);
		
		if (record.data.adv_url == 'javascript:void(0);') {
			Ext.getCmp('adv_url').disable();
		}
	},

	doDelAdvFunction: function(records, callbackFn) {
		var requestBody = [];
		var adv_titles = [];
		for(var i=0; i<records.length; i++) {
			Ext.Msg.confirm('', Ext.String.format(ADV_MESSAGE.confirmDelReleasedAdv, records[i].data.adv_title), function(button, text) {
				if (button == "yes") {
					requestBody.push(records[i].data.trade_id);
					adv_titles.push(records[i].data.adv_title);
				}
			});
			requestBody.push(records[i].data.trade_id);
			adv_titles.push(records[i].data.adv_title);
		}

		Ext.Msg.confirm('', Ext.String.format(ADV_MESSAGE.confirmDelAdvs, adv_titles), function(button, text) {
			if (button == "yes") {
				Soul.Ajax.confirmRestAction("/common/advertisement/", "delete", null, requestBody,  function(ret){
						callbackFn();
					}, null, null, null);
			}
		});
	},

	doViewAdvFunction: function(record, callbackFn) {
		var menu = Module.CMS.advertisement.Tools.buildAdvertisementOptMenu();
        var initToolbar = function(){
        	var toolbar = new Array();
			advMenu = {
				text: ADV_MANAGE_LABEL.operation,
            	iconCls: 'pool_setting',
	           	menu: menu
	       	};
			toolbar.push(advMenu);
			return toolbar;
		};

		var advStore = Ext.data.StoreManager.lookup("Module.CMS.advertisement.store.AdvertisementStore");
		advStore.getProxy().url = '/common/adv_site/'+record.data.trade_id+'/advertisement/';
		
		var advGrid = Ext.create('Module.CMS.advertisement.view.AdvertisementGrid',{
       		id : 'advGrid',
       		anchor : '100% 100%',
       		advRecord : record,
       		dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: initToolbar()
           	}],

        });

        var win = new Ext.Window({
			title: ADV_MANAGE_LABEL.advGrid,
			items: advGrid,
			width: 1000,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		
		win.showAt(30,30);
	},

});