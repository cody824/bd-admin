Ext.define('Module.Soul.shortUrl.Operation', {
	singleton : true,
	requires : [],
	
	doAddShortUrlFunction: function (callbackFun) {
        var formpanel = new Ext.FormPanel({
            labelWidth: 60,
            width: 400,
            frame: true,
            layout: {
                type: 'column'
            },
            items: [{
                xtype: 'container',
                columnWidth: .50,
                autoHeight: true,
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 250
                },
                items: [{
                    name: 'srcUrl',
                    fieldLabel: SHORTURL_PROPERTY.srcUrl,
                    maxLength: 200,
                    maxLengthText: '最多输入200个字符',
                    allowBlank: false,
                    blankText: SHORTURL_PROPERTY.srcUrl
             
                  },
                  Module.Soul.shortUrl.Tools.getShortUrlStatusCombo(1),
                  Module.Soul.shortUrl.Tools.getShortUrlModeCombo(1),
                    {
                        name: 'description',
                        fieldLabel: SHORTURL_LABEL.description,
                        readOnly: false,
                        allowBlank: false,
                        blankText: SHORTURL_LABEL.description
                    }]
            }]
        });

        var win = null;
		win = new Ext.Window({
            title: SHORTURL_LABEL.create,
            items: formpanel,
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: LABEL.apply,
                handler: function () {
                    if (!formpanel.getForm().isValid()) return;            
                    var importUrl = "/api/shorturl";
                    formpanel.submit({
                        url: importUrl,
                        method: 'POST',
                        waitMsg: '正在创建文章请稍候...',
                        success: function (fp, o) {
                        	callbackFun();
                            win.close();
                        },
                        failure: function (fp, o) {
                        	callbackFun();
                            win.close();
                        }
                    });


                }
            }, {
                text: LABEL.cancel,
                handler: function () {
                    win.close();
                }
            }]
        });

        win.show();
    },
    
    doChangeShorturlStateFunction: function (records, state, callbackFn) {

        if (records.length == 0) {
            Ext.Msg.alert('请选中需要修改的短地址！');
            return false;
        }
        for (var i = 0; i < records.length; i++) {
            var params = records[i].data;
            params.status = state;
            var url = "/api/shorturl/" + params.id + "/state";
            Soul.Ajax.restAction(url, "put", null, Ext.encode(params), function (ret) {
                callbackFn();
            }, null, null, null);
        }
    },
    
    doDelShorturlFunction: function (records, callbackFn) {
        if (records.length == 0) {
            Ext.Msg.alert('请选中需要删除的分类！');
            return false;
        }
        
        Ext.Msg.confirm('', Ext.String.format('确定要删除选中的[{0}]条短地址?', records.length), function (button, text) {
            if (button == "yes") {
                for (var i = 0; i < records.length; i++) {
                    var params = records[i].data;
                    var url = "/api/shorturl/" + params.id;  
                    	 Soul.Ajax.restAction(url, "DELETE", null, Ext.encode(params), function (ret) {
                   		  callbackFn();
                   	  }, null, null, null);  	
                                  
                }
            }
        });
    }
	
});