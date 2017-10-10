Ext.define('Module.Soul.shortUrl.view.Grid', {
	extend: 'Soul.view.AdvanceSearchGrid',
	alias: 'widget.shortUrlGrid',

	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.Soul.shortUrl.Data',
		'Module.Soul.shortUrl.Renderer',
		'Soul.ux.grid.column.ComboColumn',
		'Module.Soul.shortUrl.Operation'
	],

	initComponent: function () {
		var columns = new Array();
		var renders = Module.Soul.shortUrl.Renderer;
		var comboData = Module.Soul.shortUrl.Config.COMBO_DATA;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: SHORTURL_PROPERTY.id,
				dataIndex: 'id',
				searchType: 'number',
				align: 'center',
				width: 25
			},{
				text: SHORTURL_PROPERTY.code,
				dataIndex: 'code',
				searchType: 'string',
				align: 'center',
				width: 150
			}, {
				text: SHORTURL_PROPERTY.viewNum,
				dataIndex: 'viewNum',
				searchType: 'number',
				align: 'center',
				width: 60
			},{
				text: SHORTURL_PROPERTY.srcUrl,
				dataIndex: 'srcUrl',
				searchType: 'string',
				align: 'center',
				width: 300
			},
			{
				text: SHORTURL_PROPERTY.destUrl,
				dataIndex: 'destUrl',
				searchType: 'string',
				align: 'center',
				width: 150
			},
			{
				text: SHORTURL_PROPERTY.ctime,
				dataIndex: 'ctime',
				searchType: 'date',
				align: 'center',
				width: 150,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					var val = new Date(v);
					return Ext.util.Format.date(val, 'Y-m-d H:i:s');
				}
			},{
				text: SHORTURL_PROPERTY.etime,
				dataIndex: 'etime',
				searchType: 'date',
				align: 'center',
				width: 150,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					var val = new Date(v);
					return Ext.util.Format.date(val, 'Y-m-d H:i:s');
				}
			},{
				text: SHORTURL_PROPERTY.mode,
				dataIndex: 'mode',
				searchType: 'combo',
				align: 'center',
				width: 100,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return renders.translateShortUrlMode(v);
				},
				comboData: comboData.mode
			}, {
				text: SHORTURL_PROPERTY.status,
				dataIndex: 'status',
				searchType: 'combo',
				align: 'center',
				width: 100,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return renders.translateShortUrlStatus(v);
				},
				comboData: comboData.status
			},{
				text: SHORTURL_PROPERTY.objId,
				dataIndex: 'objId',
				searchType: 'number',
				align: 'center',
				width: 45
			}
		);

		var me = this;

		//右击事件
		me.contextMenu = me.portlet.buildShortUrlOptMenu();
		
		//双击事件 --> 订单详情
		me.doubleClick = function (view, record, item, index, e) {};

		var sm = new Ext.selection.CheckboxModel({
			listeners : {
				selectionchange : function(sm2) {
					var records = sm2.getSelection();
					var statusT = -1;			
					/*判断所选状态是否一致*/
					Ext.each(records, function(record, index, rs){
						if (statusT == -1) {
							statusT = record.data.status;
						} else if (statusT != record.data.status){
							statusT = -1;
							return false;
						}
					});
					
					var delShortUrlRight = me.contextMenu.down('menuitem[name=delShortUrl]');				
					var openShortUrlRight = me.contextMenu.down('menuitem[name=openShortUrl]');		
					var closeShortUrlRight = me.contextMenu.down('menuitem[name=closeShortUrl]');

					if(records.length > 0)
					{
						delShortUrlRight.enable();
						openShortUrlRight.enable();	
						closeShortUrlRight.enable();	
					}else{
						delShortUrlRight.disable();
						openShortUrlRight.disable();
						closeShortUrlRight.disable();
					}
					if(statusT == -1)
					{
						openShortUrlRight.disable();
						closeShortUrlRight.disable();			
					}else{						
						if(statusT == Module.Soul.shortUrl.model.ShortUrlModel.STATE_OPEN)
						{
							closeShortUrlRight.enable();	
							openShortUrlRight.disable();
						}else{
							openShortUrlRight.enable();
							closeShortUrlRight.disable();
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
			store: Ext.data.StoreManager.lookup("Module.Soul.shortUrl.store.ShortUrlStore")
		});

		this.callParent(arguments);
	},

	afterRender: function () {
		var me = this;
		me.callParent(arguments);
		var sm = me.selModel;
		
        var callbackFun = function(){
	      	current = me.store.currentPage;
	        if (me.fireEvent('beforechange', me, current) !== false) {
	            me.store.loadPage(current);
	        }
		};
		
		var delShortUrlRight = me.contextMenu.down('menuitem[name=delShortUrl]');				
		var openShortUrlRight = me.contextMenu.down('menuitem[name=openShortUrl]');		
		var closeShortUrlRight = me.contextMenu.down('menuitem[name=closeShortUrl]');
		
		var addShortUrlTop = me.portlet.down('button[name=addShortUrl]');
		
		//新增
        var addShortUrlFunc = function(){   
        	Module.Soul.shortUrl.Operation.doAddShortUrlFunction(callbackFun);
        };
        addShortUrlTop.on('click', addShortUrlFunc);
     
        //删除 
        var delShortUrlFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length > 0) {
        		Module.Soul.shortUrl.Operation.doDelShorturlFunction(records, callbackFun);
        	}
        };
        delShortUrlRight.on('click', delShortUrlFunc);


        //开启
        var openShortUrlFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length > 0) {
        		Module.Soul.shortUrl.Operation.doChangeShorturlStateFunction(records,Module.Soul.shortUrl.model.ShortUrlModel.STATE_OPEN, callbackFun);
        	}
        };
        openShortUrlRight.on('click', openShortUrlFunc);


        //关闭
        var closeShortUrlFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length > 0) {
        		Module.Soul.shortUrl.Operation.doChangeShorturlStateFunction(records,Module.Soul.shortUrl.model.ShortUrlModel.STATE_CLOSE, callbackFun);
        	}
        };
        closeShortUrlRight.on('click', closeShortUrlFunc);
  
		
	}
});
