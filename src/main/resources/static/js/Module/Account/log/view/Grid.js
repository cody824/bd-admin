Ext.define('Module.Account.log.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.loggrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Account.log.Data',
		'Module.Account.log.Renderer'
	],
    
	checkIndexes : ['ldate', 'luser', 'lcontext'], // 默认选择的列
	disableIndexes : ['id', 'url', 'method', 'lip', 'luserRole', 'requestType'],  //禁止选择的列
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Account.log.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: ACCOUNT_LOG_LABEL.luser, dataIndex:'luser', align:'left', flex:1
			},{
				text: ACCOUNT_LOG_LABEL.ldate, dataIndex:'ldate', searchType:'date', align:'center', flex:1,
				renderer: function(val, u, r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val);
				}
			},{
				text: ACCOUNT_LOG_LABEL.url, dataIndex:'url', searchType:'string', align:'left', flex:1
			},{
				text: ACCOUNT_LOG_LABEL.method, dataIndex:'method', searchType:'string', align:'left', flex:1
			},{
				text: ACCOUNT_LOG_LABEL.lip, dataIndex:'lip', searchType:'string', align:'left', flex:1
			},{
				text: ACCOUNT_LOG_LABEL.lcontext, dataIndex:'lcontext', searchType:'string', align:'left', flex:2
			},{
				text: ACCOUNT_LOG_LABEL.luserRole, dataIndex:'luserRole', searchType:'string', align:'center', flex:1
			},{
				text: ACCOUNT_LOG_LABEL.requestType, dataIndex:'requestType', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		
		Ext.apply(this, {
			columns : columns,
			viewConfig : {
				emptyText : ACCOUNT_LOG_MESSAGE.noLog
			},
			store : Ext.data.StoreManager.lookup("Module.Account.log.store.LogStore"),
		});
		
		this.callParent(arguments);
	}
});
