Ext.define('Module.Soul.job.view.JobLogGrid', {
	extend: 'Soul.view.AdvanceSearchGrid',
	alias: 'widget.jobLogGrid',

	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.Soul.job.Data',
		'Module.Soul.job.Renderer',
		'Soul.ux.grid.column.ComboColumn',
		'Module.Soul.job.Operation'
	],

	initComponent: function () {
		var columns = new Array();
		columns.push(
			//new Ext.grid.RowNumberer(),
			{
				text: JOB_LOG_PROPERTY.jobId,
				dataIndex: 'jobId',
				searchType: 'number',
				align: 'center',
				width: 50
			}, {
			text: JOB_LOG_PROPERTY.level,
				dataIndex: 'level',
				searchType: 'string',
				align: 'center',
				width: 100
			}, {
				text: JOB_LOG_PROPERTY.ctime,
				dataIndex: 'ctime',
				searchType: 'date',
				align: 'center',
				width: 150,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					var val = new Date(v);
					return Ext.util.Format.date(val, 'Y-m-d H:i:s');
				}
			},{
				text: JOB_LOG_PROPERTY.content,
				dataIndex: 'content',
				searchType: 'string',
				align: 'left',
				width: 600
			}
		);

		var sm = new Ext.selection.CheckboxModel({
			listeners : {
				selectionchange : function(sm2) {
				}
			}
		});
		Ext.apply(this, {
			selModel: sm,
			columns: columns,
			viewConfig: {
				emptyText: "未查询到数据"
			},
			store: this.store
		});

		this.callParent(arguments);
	},

	afterRender: function () {
		var me = this;
		me.callParent(arguments);
		me.updateView(me);
	}
});
