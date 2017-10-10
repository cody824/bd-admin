Ext.define('Module.Soul.MassTask.Operation', {
    singleton: true,
    requires: [
        'Soul.util.HelpUtil',
        'Soul.util.ObjectView',
        'Soul.view.WizardWindow',
        'Soul.util.ObjectConfig',
        'Soul.ux.EmailDomainBox'
    ],
    doImportOrderMessage: function (record, callbackFun) {
        var taskId = record.data.id;
        var url = "/api/admin/mass/task/" + taskId + "/message/order";
        Soul.Ajax.restAction(url, "POST", null, null, function (ret) {
            callbackFun();
        }, null, null, null);
    },

    doImportEmailBindUser: function (record, callbackFun) {
        var taskId = record.data.id;
        var url = "/api/admin/mass/task/" + taskId + "/message/user?type=email";
        Soul.Ajax.restAction(url, "POST", null, null, function (ret) {
            callbackFun();
        }, null, null, null);
    },

    doImportPhoneBindUser: function (record, callbackFun) {
        var taskId = record.data.id;
        var url = "/api/admin/mass/task/" + taskId + "/message/user?type=phone";
        Soul.Ajax.restAction(url, "POST", null, null, function (ret) {
            callbackFun();
        }, null, null, null);
    },

    doImportMessage: function (record, callbackFn) {

        var taskId = record.data.id;
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
                name: 'excel',
                id: 'excel',
                xtype: 'filefield',
                fieldLabel: "文件名",
                buttonText: '选择文件...',
                submitValue: true,
                allowBlank: false
            }]
        });

        var win = new Ext.Window({
            title: "导入excel文件",
            items: formpanel,
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: "导入",
                handler: function () {
                    if (!formpanel.getForm().isValid()) return;

                    var importUrl = '/api/admin/mass/task/' + taskId + '/message/excel/upload';
                    formpanel.submit({
                        url: importUrl,
                        method: 'POST',
                        waitMsg: '正在导入文件请稍候...',
                        success: function (fp, o) {
                            callbackFn();
                            win.close();
                        },
                        failure: function (fp, o) {
                            Ext.Msg.alert('导入完成');
                            callbackFn();
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

    //创建群发任务，不包括发送对象
    doCreateMasTaskFunction: function (callbackFun) {
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
                    name: 'name',
                    fieldLabel: MASS_TASK_PROPERTY.name,
                    maxLength: 200,
                    maxLengthText: '最多输入200个字符',
                    allowBlank: false,
                    blankText: MASS_TASK_PROPERTY.name

                },
                    Module.Soul.MassTask.Tools.getMassTaskTypeCombo(null),
                    {
                        xtype: 'textarea',
                        name: 'content',
                        fieldLabel: MASS_TASK_PROPERTY.defaultContent,
                        readOnly: false,
                        allowBlank: false,
                        blankText: MASS_TASK_PROPERTY.defaultContent
                    }]
            }]
        });

        var win = null;
        win = new Ext.Window({
            title: MASS_TASK_LABEL.create,
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
                    var importUrl = "/api/admin/mass/task/";
                    formpanel.submit({
                        url: importUrl,
                        method: 'POST',
                        waitMsg: '正在创建群发任务请稍候...',
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


    //创建测试任务
    doCreateTestMasTaskFunction: function (records, callbackFun) {
        var url = "/api/admin/mass/task/" + records.id + "/test";
        Soul.Ajax.restAction(url, "get", null, null, function (ret) {
            callbackFun();
        }, null, null, null);
    },
    //弹出用户筛选用户筛选页面
    showUserFunction: function (masdTask, callbackFn) {

        //给任务增加用户
        var taskBtn = Ext.create("Ext.Button", {
            text: MASS_TASK_LABEL.addUser,
            disabled: false,
            name: 'addUserButton',
            iconCls: 'x-add-icon'
        });

        var winName = Ext.String.format('群发任务[{0}]增加发送用户--用户列表', masdTask.name);

        var userInfoGrid = Ext.create('Module.Soul.MassTask.view.UserInfoGrid', {
            anchor: '100% 100%',
            massTaskRecord: masdTask,
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [taskBtn]
            }]
        });

        var win = new Ext.Window({
            id: 'add_Task_to_user_show_users',
            title: winName,
            items: userInfoGrid,
            width: 1020,
            height: 500,
            layout: 'fit',
            autoDestroy: true,
            modal: true,
        });
        win.show();
    },

    viewTaskMessageFunction: function (massTask, callbackFun) {

        var delAction = Ext.create("Ext.Button", {
            text: '删除',
            name: 'delMessageTop',
            iconCls: 'x-del-icon',
            disabled: false
        });

        var messageGrid = Ext.create('Module.Soul.MassTask.view.MassMessageGrid', {
            id: 'manageMassMessageGrid',
            anchor: '100% 100%',
            massTaskRecord: massTask,
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [delAction]
            }],
            massTaskId: massTask.id,
            massTaskName: massTask.name
        });

        //设置相关的 store api
        var store = Ext.data.StoreManager.lookup("Module.Soul.MassTask.store.MassMessageStore");
        store.proxy.api = {
            read: "/api/admin/mass/task/" + massTask.id + "/message/"
        };

        var winTitle = Ext.String.format('群发任务[{0}]--消息明细', massTask.name);

        var win = new Ext.Window({
            title: winTitle,
            items: messageGrid,
            width: 1020,
            height: 500,
            layout: 'fit',
            autoDestroy: true,
            modal: true
        });
        win.show();
    },

    //添加用户到群发任务中
    doAddUserToTaskFunction: function (masstask, records, callbackFn) {

        if (records.length == 0) {
            Ext.Msg.alert('请选中需要添加到任务中的用户');
            return false;
        }

        var url = "/api/admin/mass/task/" + masstask.id + "/user/";
        
        var lisId = new Array();
        for (var i = 0; i < records.length; i++) {   	
        	lisId[i]=records[i].data.id     
        }

        Soul.Ajax.restAction(url, "post", null, Ext.encode(lisId), function (ret) {
                callbackFn();
        }, null, null, null);


    },

    //删除message
    doDelMessageFunction: function (records,masstask ,callbackFn) {

        if (records.length == 0) {
            Ext.Msg.alert('请选中需要删除的消息！');
            return false;
        }
        var url = "/api/admin/mass/task/"+masstask.id+"/message/";
   
        if(records.length==1)
        	url = "/api/admin/mass/task/"+masstask.id+"/message/" + records[0].data.id + "/";
        
        var lisId = new Array();
        for (var i = 0; i < records.length; i++) {   	
        	lisId[i]=records[i].data.id     
        }
        
        Soul.Ajax.restAction(url, "DELETE", null, Ext.encode(lisId), function (ret) {
                callbackFn();      
        }, null, null, null);


    },

    //删除task
    doDelMassTaskFunction: function (records, callbackFn) {

        Ext.Msg.confirm('', Ext.String.format('确定要删除选中的群发任务[{0}]?', records.name), function (button, text) {
            if (button == "yes") {
                var url = "/api/admin/mass/task/" + records.id + "/";
                Soul.Ajax.restAction(url, "DELETE", null, null, function (ret) {
                    callbackFn();

                }, null, null, null);
            }
        });

    },

    //触发task
    doTriggerMassTaskFunction: function (records, callbackFn) {
        Ext.Msg.confirm('', Ext.String.format('确定要触发选中的群发任务[{0}]?', records.name), function (button, text) {
            if (button == "yes") {
                var jobId =records.jobId;
                var massTaskId= records.id;
                var url = "/api/admin/mass/task/" + massTaskId + "/status?status=run";
                Soul.Ajax.restAction(url, "put", null, null, function (ret) {
                    var url = "/api/job/" + jobId + "/start";
                    Soul.Ajax.restAction(url, "post", null, null, function (ret) {
                        callbackFn();
                    }, null, null, null);
                }, null, null, null);
            }
        });
    },

    //关闭任务
    dostopMassTaskFunction: function (records, callbackFn) {

        Ext.Msg.confirm('', Ext.String.format('确定要关闭选中的群发任务[{0}]?', records.name), function (button, text) {
            if (button == "yes") {

                var url = "/api/admin/mass/task/" + records.id + "/status?status=stop";
                Soul.Ajax.restAction(url, "put", null, null, function (ret) {
                    callbackFn();
                }, null, null, null);
            }
        });

    }


});