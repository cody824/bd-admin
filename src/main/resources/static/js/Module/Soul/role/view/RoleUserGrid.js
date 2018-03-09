Ext.define('Module.Soul.role.view.RoleUserGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching'
    ],

    role: null,

    initComponent: function () {
        var columns = new Array();
        columns.push(
            {
                text: "登录名", width: 80, sortable: false,
                menuDisabled: true, dataIndex: 'nick', align: 'center'
            },
            {
                text: "邮箱", flex: 1, dataIndex: 'email',
                menuDisabled: true, align: 'center', sortable: false
            },
            {
                text: "操作",
                xtype: 'actioncolumn',
                width: 80,
                sortable: false,
                editor: false,
                align: 'center',
                items: [
                    {
                        icon: '/img/icon/del.png',
                        tooltip: '删除',
                        name: 'view',
                        scope: this,
                        handler: this.onDelClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    }]
            }
        );

        var me = this;
        var paramFields = ["id", "nick", "email"];
        var paramStore = new Ext.create('Ext.data.Store', {
            fields: paramFields
        });

        Ext.apply(this, {
            viewConfig: {
                emptyText: "角色不包含任何用户"
            },
            store: paramStore,
            columns: columns
        });
        this.loadData();
        this.callParent(arguments);
    },

    loadData: function () {
        var me = this;
        var configUrl = '/security/role/' + me.role + "/user";

        Soul.Ajax.restAction(configUrl, 'get', null, null, function (ret) {
            me.store.loadData(ret);
        }, null, null);
    },

    onDelClick: function (view, rowIndex, colIndex, item, e, record, row) {
        var me = this;
        Soul.Ajax.request({
            url: '/security/user/' + record.data.id + '/role?roleName=' + me.role,
            method: 'delete',
            jsonData: [],
            success: function (ret) {
                me.loadData();
            }
        });
    },


    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    }
});
