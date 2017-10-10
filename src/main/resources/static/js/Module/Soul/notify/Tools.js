Ext.define('Module.Soul.notify.Tools', {
	singleton: true, 
	appId: null,
	
	requires  : [
		'Soul.util.ObjectView'
	],


	getCreateOrUpdateForm : function(stpl){
		var ptplStore = Ext.create('Ext.data.Store', {
			 model     : 'Module.Template.page.model.PtplModel',
			 proxy: {
		        type: 'rest',
		        headers : {
		        	Accept : 'application/json'
		        },
		        extraParams : {
		        	filter : {}
		        },
		        url: '/api/tpl/page/type/' + stpl.defaultPageType + '/',
		        reader: {
		            type: 'json',
		            root: 'data',
		            totalProperty : 'total'
		        },
		        autoLoad : true
		    }, 
			remoteSort: true,
		});
		ptplStore.load();
		var combo = new Ext.form.field.ComboBox({
          store:  ptplStore,
          displayField: 'name',
          anchor: '100%',
          name : 'defaultPageTpl',
          fieldLabel : '默认模板',
          valueField : 'id',
          width : 380,
          allowBlank : false,
          listConfig: {
              // Custom rendering template for each item
              getInnerTpl: function() {
                  return '<img height="150" src="/pageTplRes/{type}/{code}/img/thumbnail/left.jpg" /><strong>{name}</strong>';
              }
          },
          pageSize: 10
      });
		
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '名称',
				name : 'name',
				minLength: 1,
				regex : /^[^,，\s]*$/,
				regexText : '不能包含","和"，"和空格', 
				blankText: "请输入名称",
				emptyText: "请输入名称",
				allowBlank : false
			}, {
				xtype : 'textarea',
				fieldLabel : '描述',
				name : 'desc'
			}, {
				xtype : 'checkbox',
				fieldLabel : '是否在目录中显示',
				disabled : !stpl.canShowInCatalog,
				inputValue : true,
				uncheckedValue : false,
				name : 'showInCatalog'
			}, combo],
			buttonAlign:'center',
			buttons : [ {
				text : '确定',
				name : 'submit'
			} ],
		});
		return baseForm;
	},
	
	constructor : function() {
		this.callParent(arguments);
	}
});