Ext.define('Module.Soul.notify.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Template.page.model.PtplModel',
		'Module.Soul.notify.Tools'
	],
	
	/**
	 * 创建章节并加入书册
	 * @param bookId	书册ID
	 * @param pos		章节位置
	 * @param stpl		章节模板
	 * @param success	成功回调
	 * @param failure	失败回调
	 */
	onAddSectionToBookClick : function(bookId, pos, stpl, success, failure){
		var form = Module.Soul.notify.Tools.getCreateOrUpdateForm(stpl);
		var section = {};
		section.name = stpl.name;
		section.type = stpl.sectionType;
		section.stpl = stpl;
		
		form.on("afterrender", function(f, eo){
			f.getForm().setValues(section);
		});
		
		form.down('button[name=submit]').on('click',function(btn){
			if (!btn.up('form').getForm().isValid())
				return;
			var win = btn.up('window');
			var values = btn.up('form').getForm().getValues();
			section.name = values.name;
			section.desc = values.desc;
			section.defaultPageTpl = {};
			section.defaultPageTpl.id = values.defaultPageTpl;
			if (values.showInCatalog)
				section.showInCatalog = values.showInCatalog;
			Soul.Ajax.request({
           	   url : '/book/' + bookId + '/section/' + pos,
           	   jsonData : section,
           	   headers : {
      					Accept : 'application/json'
      			   },
      		   loadMask : true,
				   loadMsg : '创建书册',
				   success : function(response, opts) {
						if (typeof success === 'function')
							success();
						win.close();
					},
           	   failure : failure
			});
		});
		
		form.on('destroy', function(){
			failure();
		});
		
		Soul.util.ObjectView.showInNewWin(form, "新建章节");
		
		
	},
	
	/**
	 * 修改章节配置
	 * @param section
	 * @param callback
	 */
	onModifySectionClick : function(section, callback) {
		var form = Module.Soul.notify.Tools.getCreateOrUpdateForm(section.stpl);
		form.on("afterrender", function(f, eo){
			f.getForm().setValues(section);
			f.getForm().setValues({
				defaultPageTpl : section.defaultPageTpl.id
			});
		});
		form.down('button[name=submit]').on('click',function(btn){
			if (!btn.up('form').getForm().isValid())
				return;
			var win = btn.up('window');
			var values = btn.up('form').getForm().getValues();
			section.name = values.name;
			section.desc = values.desc;
			section.defaultPageTpl = {};
			section.defaultPageTpl.id = values.defaultPageTpl;
			if (values.showInCatalog)
				section.showInCatalog = values.showInCatalog;
			Soul.Ajax.request({
				url : "/section/" + section.id ,
				method : 'put',
				jsonData  : section,
				loadMask : true,
				loadMsg : '修改中',
				successMsg : '修改成功',
				success : function(response, opts) {
					if (typeof callback === 'function')
						callback();
					win.close();
				}
			});
			
		});
		
		Soul.util.ObjectView.showInNewWin(form, "修改章节配置");
	},
	
	onCopyBookClick : function(btplId, callback){
		Soul.Ajax.request({
			url : "/book/tpl/",
			method : 'post',
			params : {
				copyId : btplId
			},
			jsonData : {},
			loadMask : true,
			loadMsg : '复制中',
			successMsg : '复制成功',
			confirm : '确认要复制书册模板？',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},
	
	onBatchAddStyleClick : function(selection, callback){
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '风格',
				name : 'style',
				minLength: 1,
				regex : /^[^,，\s]*$/,
				regexText : '不能包含","和"，"和空格', 
				blankText: "请输入要添加的风格",
				emptyText: "请输入要添加的风格",
				allowBlank : false
			} ],
			buttonAlign:'center',
			buttons : [ {
				text : '添加风格',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					var ids = [];
					var records = selection;
					Ext.each(records, function(r){
						ids.push(r.data.id);
					});
					Soul.Ajax.request({
						url : "/api/tpl/page/style/" + values.style + "/",
						method : 'put',
						jsonData  : ids,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						confirm : '确认要给所选的页面添加"' + values.style + '"的风格？',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
					
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "添加风格");
	},
	
	onBatchAddLabelClick : function(selection, callback){
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '标签',
				name : 'label',
				minLength: 1,
				regex : /^[^,，\s]*$/,
				regexText : '不能包含","和"，"和空格', 
				blankText: "请输入要添加的标签",
				emptyText: "请输入要添加的标签",
				allowBlank : false
			} ],
			buttonAlign:'center',
			buttons : [ {
				text : '添加标签',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					var ids = [];
					var records = selection;
					Ext.each(records, function(r){
						ids.push(r.data.id);
					});
					Soul.Ajax.request({
						url : "/api/tpl/page/labels/" + values.label + "/",
						method : 'put',
						jsonData  : ids,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						confirm : '确认要给所选的页面添加"' + values.label + '"的标签？',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "添加标签");
	},

	onBatchRemoveClick : function(selection, callback) {
		var ids = [];
		var records = selection;
		Ext.each(records, function(r){
			ids.push(r.data.id);
		});
		
		Soul.Ajax.request({
			url : "/api/tpl/page/",
			method : 'delete',
			jsonData  : ids,
			loadMask : true,
			loadMsg : '删除中',
			successMsg : '删除成功',
			confirm : '确定要删除所选的模板？',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},

	onLoadTplClick : function(callback) {
		Soul.Ajax.request({
			url : "/api/tpl/page/",
			method : 'post',
			loadMask : true,
			loadMsg : '载入中',
			successMsg : '载入成功',
			confirm : '确认要从系统中重新载入模板吗？',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},
	
	onSetCoverClick : function(selection, callback){
		if (selection.length <= 0) {
			return;
		}
		
		var id = selection[0].data.id;
		
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [Module.Template.page.Config.coverCombo()],
			buttonAlign:'center',
			buttons : [ {
				text : '设定',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					Soul.Ajax.request({
						url : "/api/tpl/page/" + id,
						method : 'put',
						jsonData  : values,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "设置关联封面模板");
	},
	
	onSetBackCoverClick : function(selection, callback){
		if (selection.length <= 0) {
			return;
		}
		
		var id = selection[0].data.id;
		
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [Module.Template.page.Config.backCoverCombo()],
			buttonAlign:'center',
			buttons : [ {
				text : '设定',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					Soul.Ajax.request({
						url : "/api/tpl/page/" + id,
						method : 'put',
						jsonData  : values,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "设置关联封底模板");
	},
	
	onSetBaseAttrClick : function(selection, callback){
		if (selection.length <= 0) {
			return;
		}
		
		var data = selection[0].data;
		var id = selection[0].data.id;
		
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [
				{
					xtype : 'textfield',
					fieldLabel : '名称',
					name : 'name',
					minLength: 1,
					value : data.name,
					regex : /^[^,，\s]*$/,
					regexText : '不能包含","和"，"和空格', 
					blankText: "请输入名称",
					emptyText: "请输入名称",
					allowBlank : false
				}, {
					xtype : 'textarea',
					fieldLabel : '描述',
					value : data.desc,
					name : 'desc'
				}, {
					xtype : 'textfield',
					fieldLabel : '风格',
					regex : /^[^\s]*$/,
					regexText : '不能包含空格', 
					value : data.style,
					name : 'style'
				} , {
					xtype : 'textfield',
					regex : /^[^\s]*$/,
					regexText : '不能包含空格', 
					fieldLabel : '标签',
					value : data.labels,
					name : 'labels'
				} 
			         ],
			buttonAlign:'center',
			buttons : [ {
				text : '设定',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					Soul.Ajax.request({
						url : "/api/tpl/page/" + id,
						method : 'put',
						jsonData  : values,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "设置关联封底模板");
	},
	onStaticBookClick : function(records, callback){
		
		var btplIds = [];
		if(records.length > 0) {
			Ext.each(records, function(r, i, rs){
				btplIds.push(r.data.id);
			});
		}
		Soul.Ajax.request({
			url : "/book/tpl/static",
			method : 'put',
			jsonData  : btplIds,
			loadMask : true,
			loadMsg : '模板静态化中',
			successMsg : '模板静态化成功',
			success : function(response, opts) {
				if (typeof callback === 'function'){
					callback();
				}
			}
		});
	}
	

});