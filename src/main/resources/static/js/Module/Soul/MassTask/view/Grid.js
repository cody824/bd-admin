Ext.define('Module.Soul.MassTask.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.masstaskGrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Module.Soul.MassTask.Data',
        'Module.Soul.MassTask.Renderer',
        'Soul.ux.grid.column.ComboColumn',
        'Module.Soul.MassTask.Operation'
    ],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Soul.MassTask.Renderer;
        var comboData = Module.Soul.MassTask.Config.COMBO_DATA;
        columns.push(
            //new Ext.grid.RowNumberer(),
            {
                text: MASS_TASK_PROPERTY.id,
                dataIndex: 'id',
                searchType: 'number',
                align: 'center',
                width: 50
            },
            {
                text: MASS_TASK_PROPERTY.name,
                dataIndex: 'name',
                searchType: 'string',
                align: 'center',
                width: 150
            }, {
                text: MASS_TASK_PROPERTY.status,
                dataIndex: 'status',
                searchType: 'combo',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateTaskStatus(v);
                },
                comboData: comboData.taskStatus
            }, {
                text: MASS_TASK_PROPERTY.type,
                dataIndex: 'type',
                searchType: 'combo',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateTaskType(v);
                },
                comboData: comboData.taskType
            }, {
                text: MASS_TASK_PROPERTY.ctime,
                dataIndex: 'ctime',
                searchType: 'date',
                align: 'center',
                width: 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    var val = new Date(v);
                    return Ext.util.Format.date(val, 'Y-m-d H:i:s');
                }
            }, {
                text: MASS_TASK_PROPERTY.utime,
                dataIndex: 'utime',
                searchType: 'date',
                align: 'center',
                width: 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    var val = new Date(v);
                    return Ext.util.Format.date(val, 'Y-m-d H:i:s');
                }
            }, {
                text: MASS_TASK_PROPERTY.createName,
                dataIndex: 'createName',
                searchType: 'string',
                align: 'center',
                width: 150
            }, {
                text: MASS_TASK_PROPERTY.msgNum,
                dataIndex: 'msgNum',
                searchType: 'number',
                align: 'center',
                width: 60
            }, {
                text: MASS_TASK_PROPERTY.content,
                dataIndex: 'content',
                searchType: 'string',
                align: 'center',
                width: 300
            }, {
                text: MASS_TASK_PROPERTY.jobId,
                dataIndex: 'jobId',
                searchType: 'number',
                align: 'center',
                width: 50
            }
        );

        var me = this;

        //右击事件
        me.contextMenu = me.portlet.buildMessTaskOptMenu();

        //双击事件 --> 作业日记
        me.doubleClick = function (view, record, item, index, e) {
        };

        var sm = new Ext.selection.CheckboxModel({
            mode: 'single',
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();

                    var showTaslDetailBtnRight = me.contextMenu.down('menuitem[name=showTaslDetail]');
                    var triggerTaskBtnRight = me.contextMenu.down('menuitem[name=triggerTask]');
                    var addMessTaskUserBtnRight = me.contextMenu.down('menuitem[name=addMessTaskUser]');
                    var importMessTaskBtnRight = me.contextMenu.down('menuitem[name=importMessTask]');
                    var importOrderMessTaskBtnRight = me.contextMenu.down('menuitem[name=importOrderMessTask]');
                    var delMessTaskBtnRight = me.contextMenu.down('menuitem[name=delMessTask]');
                    var stopMessTaskBtnRight = me.contextMenu.down('menuitem[name=stopMessTask]');
                    var testeMassTaskTop = me.contextMenu.down('menuitem[name=testMessTask]');
                    var importEmailBindUser = me.contextMenu.down('menuitem[name=importEmailBindUser]');
                    var importPhoneBindUser = me.contextMenu.down('menuitem[name=importPhoneBindUser]');

                    showTaslDetailBtnRight.disable();
                    triggerTaskBtnRight.disable();
                    addMessTaskUserBtnRight.disable();
                    importMessTaskBtnRight.disable();
                    delMessTaskBtnRight.disable();
                    stopMessTaskBtnRight.disable();
                    if (records.length > 0) {
                        var status = records[0].data.status;
                        showTaslDetailBtnRight.enable();
                        addMessTaskUserBtnRight.enable();
                        importMessTaskBtnRight.enable();
                        importOrderMessTaskBtnRight.enable();
                        stopMessTaskBtnRight.enable();
                        triggerTaskBtnRight.enable();
                        testeMassTaskTop.enable();
                        importPhoneBindUser.enable();
                        importEmailBindUser.enable();
                        if (status == "stop") {
                            importPhoneBindUser.disable();
                            importEmailBindUser.disable();
                            testeMassTaskTop.disable();
                            triggerTaskBtnRight.disable();
                            addMessTaskUserBtnRight.disable();
                            importMessTaskBtnRight.disable();
                            importOrderMessTaskBtnRight.disable();
                            stopMessTaskBtnRight.disable();
                            delMessTaskBtnRight.enable();
                        }
                    }
                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: Ext.data.StoreManager.lookup("Module.Soul.MassTask.store.MassTaskStore")
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        var sm = me.selModel;
        var callbackFun = function () {
            var current = me.store.currentPage;
            if (me.fireEvent('beforechange', me, current) !== false) {
                me.store.loadPage(current);
            }
        };

        var showTaslDetailBtnRight = me.contextMenu.down('menuitem[name=showTaslDetail]');
        var triggerTaskBtnRight = me.contextMenu.down('menuitem[name=triggerTask]');
        var addMessTaskUserBtnRight = me.contextMenu.down('menuitem[name=addMessTaskUser]');
        var importMessTaskBtnRight = me.contextMenu.down('menuitem[name=importMessTask]');
        var importOrderMessTaskBtnRight = me.contextMenu.down('menuitem[name=importOrderMessTask]');
        var delMessTaskBtnRight = me.contextMenu.down('menuitem[name=delMessTask]');
        var stopMessTaskBtnRight = me.contextMenu.down('menuitem[name=stopMessTask]');
        var importEmailBindUser = me.contextMenu.down('menuitem[name=importEmailBindUser]');
        var importPhoneBindUser = me.contextMenu.down('menuitem[name=importPhoneBindUser]');

        //创建task
        var createMassTaskTop = me.portlet.down('button[name=createMessTask]');
        var createMassTaskFunc = function () {
            Module.Soul.MassTask.Operation.doCreateMasTaskFunction(callbackFun);
        };
        createMassTaskTop.on('click', createMassTaskFunc);

        //测试task
        var testeMassTaskTop = me.contextMenu.down('menuitem[name=testMessTask]');
        var testeMassTaskFunc = function () {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Soul.MassTask.Operation.doCreateTestMasTaskFunction(records[0].data, callbackFun);
            }
        };
        testeMassTaskTop.on('click', testeMassTaskFunc);


        //添加发送用户
        var addMessTaskUserFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Soul.MassTask.Operation.showUserFunction(records[0].data, callbackFun);
            }
        };
        addMessTaskUserBtnRight.on('click', addMessTaskUserFunc);


        //消息明细
        var showTaslDetailFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Soul.MassTask.Operation.viewTaskMessageFunction(records[0].data, callbackFun);
            }
        };
        showTaslDetailBtnRight.on('click', showTaslDetailFunc);

        //导入发送用户数据
        var importExcelDataFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Soul.MassTask.Operation.doImportMessage(records[0], callbackFun);
            }
        };
        importMessTaskBtnRight.on('click', importExcelDataFunc);

        //导入发送用户数据
        var importOrderDataFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Soul.MassTask.Operation.doImportOrderMessage(records[0], callbackFun);
            }
        };
        importOrderMessTaskBtnRight.on('click', importOrderDataFunc);
        //导入发送用户数据
        var importEmailBindUserFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Soul.MassTask.Operation.doImportEmailBindUser(records[0], callbackFun);
            }
        };
        importEmailBindUser.on('click', importEmailBindUserFunc);
        //导入发送用户数据
        var importPhoneBindUserFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Soul.MassTask.Operation.doImportPhoneBindUser(records[0], callbackFun);
            }
        };
        importPhoneBindUser.on('click', importPhoneBindUserFunc);

        //删除任务
        var delMessTaskUserFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Soul.MassTask.Operation.doDelMassTaskFunction(records[0].data, callbackFun);
            }
        };
        delMessTaskBtnRight.on('click', delMessTaskUserFunc);


        //触发任务执行
        var triggerTaskFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            Module.Soul.MassTask.Operation.doTriggerMassTaskFunction(records[0].data, callbackFun);
        };
        triggerTaskBtnRight.on('click', triggerTaskFunc);

        //关闭任务
        var stopTaskFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            Module.Soul.MassTask.Operation.dostopMassTaskFunction(records[0].data, callbackFun);
        };
        stopMessTaskBtnRight.on('click', stopTaskFunc);

    }
});
