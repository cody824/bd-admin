
Ext.define('Module.Soul.role.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Soul.user.model.UserModel',
		'Module.Soul.user.Renderer',
		'Module.Soul.group.model.GroupModel'
	],
	
//	getOperationForRole : function(role){
//		role.httpParams = new Object();
//		role.httpMethod = new Object();
//		role.requestBody = new Object();
//		role.methodConfirm = new Object();
//		role.methodConfirm["deleteRole"] = {
//				"delete" : {
//					msg : Ext.String.format(ROLE_MESSAGE.confirmDeleteSelectRoles, role.name)
//				}
//		};
//	},
	//删除方法和后台交互
	dodeleteRolesByIdFunction : function(records, callbackFn){
		var requestBody = [];
		var requestBody1 = [];
			Ext.each(records, function(r, i, rs){
				requestBody.push(r.data.id);
				requestBody1.push(r.data.name);
			});
		var method = "delete";
		var confirm = {
			"delete" : {
				msg : Ext.String.format(ROLE_MESSAGE.confirmDeleteSelectRoles, requestBody1)
			}
		};
		Soul.Ajax.confirmRestAction("/suresecurity/role", method, {}, requestBody,  callbackFn, null, null, confirm);
	},
	toAddRoleFunction : function(callbackFn){
		Ext.QuickTips.init();
		var userForm = new Ext.FormPanel( {
            labelWidth : 75, 
            frame : true,
            bodyStyle : 'padding:5px 5px 0',
            waitMsgTarget : true,
            defaults : {
                width : 370
            },
            defaultType : 'textfield',
            items : [{
                fieldLabel : 'id',
                name : 'id',
                emptyText: 'id',
                hidden: true, 
                hideLabel:true,
                allowBlank : true
            }, {
                fieldLabel : ROLE_PROPERTY.name,
                name : 'name',
                emptyText: ROLE_PROPERTY.name,
                regex : /^[a-zA-Z0-9\.\_]+$/,
                regexText:'只能输入英文下划线和数字',
                msgTarget:"side",
                maxLength:50,
                allowBlank : false
            },{
                fieldLabel : ROLE_PROPERTY.cName,
                name : 'cName',
                emptyText: ROLE_PROPERTY.cName,
                regex : /^[\u4E00-\u9FA5]+$/,
                regexText:'只能输入中文',
                msgTarget:"side",
                maxLength:50,
                allowBlank : false
            },{
                fieldLabel : ROLE_PROPERTY.type,
                name : 'type',
                emptyText: ROLE_PROPERTY.type,
                msgTarget:"side",
                maxLength:50,
                allowBlank : false
            },{
            		 xtype: 'combo', 
	                 fieldLabel : ROLE_PROPERTY.status,  
		             name : 'statuss',  
		             store : new Ext.data.SimpleStore({  
					               　fields : ['key', 'value'],  
					          data : [['0', '激活'], ['1', '未激活'], ['2', '停用']] 
			               　　}),
			            displayField : 'value',  
			            valueField : 'key',  
			            mode : 'local',  
			            typeAhead : true,  
			            forceSelection : true,  
			            triggerAction : 'all',  
			            width : 370,  
			            value: '0',
			            selectOnFocus : true  
	                 
            },{
                fieldLabel : ROLE_PROPERTY.comment,
                name : 'comment',
                emptyText: ROLE_PROPERTY.comment,
                xtype : 'textarea',
                msgTarget:"side",
                maxLength:250,
                allowBlank : false
            }
           ]          
        });
	var newFormWin  = 	Ext.create('Ext.window.Window', {
		region:'center',
			buttonAlign: 'center',
		    title: LABEL_TITLE.addRole,
		    autoHeight:true,
		    width: 400,
		    layout: 'form',
		    maximizable:true,
			minimizable:true,
			closeAction:'hide',
			constrainHeader:true,
			defaultButton:0,
			resizable:true,
			resizeHandles:'se',
			modal:true,
			plain:true,
			animateTarget:'target',
			items :userForm,
            buttons : [ {
                text : LABEL.save,
                handler : function(){
                	var formValid = userForm.form.isValid();
                	if(formValid){
                		Soul.Ajax.confirmRestAction('/suresecurity/role/', 'PUT',null, {
                    		name:userForm.form.findField('name').getValue(),
                    		cName:userForm.form.findField('cName').getValue(),
                    		type:userForm.form.findField('type').getValue(),
                    		status:userForm.form.findField('statuss').getValue(),
                    		comment:userForm.form.findField('comment').getValue()
                    		},  callbackFn, null, null, null);
            					userForm.form.reset();
                         	 	newFormWin.hide();
                		}
                	}
                }, {
                text : LABEL.cancel,
                handler : function() {
                	 userForm.form.reset();
                	 newFormWin.hide();
                }
            }]
		}).show();
	},
	toUpdateRoleByIdFunction:function(records,callbackFn){
		var requestBody = [];
			Ext.each(records, function(r, i, rs){
				requestBody.push(r.data.id);
			});
		var roleForm = new Ext.FormPanel({
            labelWidth : 75, 
            frame : true,
            bodyStyle : 'padding:5px 5px 0',
            waitMsgTarget : true,
            defaults : {
                  width : 370
            },
            defaultType : 'textfield',
            items : [{
                fieldLabel : 'id',
                name : 'id',
                emptyText: 'id',
                hidden: true, 
                hideLabel:true,
                allowBlank : true
            }, {
                fieldLabel : ROLE_PROPERTY.name,
                name : 'name',
                emptyText: ROLE_PROPERTY.name,
                regex : /^[a-zA-Z0-9\.\_]+$/,
                regexText:'只能输入英文下划线和数字',
                msgTarget:"side",
                maxLength:50,
                allowBlank : false
            },{
                fieldLabel : ROLE_PROPERTY.cName,
                name : 'cName',
                emptyText: ROLE_PROPERTY.cName,
                regex : /^[\u4E00-\u9FA5]+$/,
                regexText:'只能输入中文',
                msgTarget:"side",
                maxLength:50,
                allowBlank : false
            },{
                fieldLabel : ROLE_PROPERTY.type,
                name : 'type',
                emptyText: ROLE_PROPERTY.type,
                msgTarget:"side",
                maxLength:50,
                allowBlank : false
            },{
	            	xtype: 'combo', 
	                fieldLabel : ROLE_PROPERTY.status,  
		            name : 'status',
		            store : new Ext.data.SimpleStore({  
				               　fields : ['key', 'value'],  
				          data : [['0', '激活'], ['1', '未激活'], ['2', '停用']] 
		               　　}),
		            displayField : 'value',  
		            valueField : 'key',  
		            mode : 'local',
		            typeAhead : true,  
		            forceSelection : true,  
		            triggerAction : 'all',  
		            width : 230,
		            selectOnFocus:true, 
		            editable : false,
		            mode: 'remote'
            },{
                fieldLabel : ROLE_PROPERTY.comment,
                name : 'comment',
                emptyText: ROLE_PROPERTY.comment,
                xtype : 'textarea',
                msgTarget:"side",
                allowBlank : false,
                maxLength:250
            }
           ]          
        });
		Soul.Ajax.executeRequestData('/suresecurity/role/'+requestBody, null, function(data){
			roleForm.form.findField('id').setValue(data.id);
			roleForm.form.findField('name').setValue(data.name);
			roleForm.form.findField('cName').setValue(data.cName);
			roleForm.form.findField('type').setValue(data.type);
			roleForm.form.findField('status').setValue((data.status).toString());
			roleForm.form.findField('comment').setValue(data.comment);
		}, null, ROLE_LABEL.loadData);
		Ext.QuickTips.init();
		var EditRoleWin = Ext.create('Ext.window.Window',{
			buttonAlign: 'center',　　　　　　　　
			title: LABEL_TITLE.updateRole,
			autoHeight:true,
		    width: 400,
		    layout: 'fit',
		    maximizable:true,
			minimizable:true,
			closeAction:'hide',
			constrainHeader:true,
			defaultButton:0,
			resizable:true,
			resizeHandles:'se',
			modal:true,
			plain:true,
			animateTarget:'target',　　　　　　　
            items:roleForm,
            //按钮
            buttons: [{　　　　　　　　　　
                text:LABEL.save,　　　　　　　　　
                handler:function(){
                	var formValid = roleForm.form.isValid();
                	if(formValid){
                		Soul.Ajax.confirmRestAction('/suresecurity/role/'+requestBody, 'PUT',null, {
	                		name:roleForm.form.findField('name').getValue(),
	                		cName:roleForm.form.findField('cName').getValue(),
	                		type:roleForm.form.findField('type').getValue(),
	                		status:roleForm.form.findField('status').getValue(),
	                		comment:roleForm.form.findField('comment').getValue()
            			},  callbackFn, null, null, null);
                			roleForm.form.reset();
                			EditRoleWin.hide();
                	}
                	
                }　　　　　　
            },{　　　　　　　　　　
                text: LABEL.cancel,　　　　　　　　　　
                handler: function(){　　　　　　　　　　　　
                	EditRoleWin.hide();　　　　　　　　　　
                }　
            }]　　 
        }).show();
	},
	OperRoleGroup:function(records,callbackFn){
		var requestBody = [];
		Ext.each(records, function(r, i, rs){
			requestBody.push(r.data.id);
		});
		var columns = new Array();
		var renders = Module.Soul.role.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),//行数
			{text: GROUP_PROPERTY.name,sortable: true,dataIndex: 'name', searchType : 'string',
				renderer : function(v, u,r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
					return v;
				},
				flex : 1},
			{
					text: GROUP_PROPERTY.cName,width: 200, searchType : 'string',
				sortable: false,
				menuDisabled:true,
				dataIndex: 'cName'
			},{
				text : GROUP_PROPERTY.status,width : 60, dataIndex:'status',  
				menuDisabled:true, 
				searchType : 'number',
				renderer: function(val, u,r, rowIndex, columnIndex, s){
					return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
				},
				align : 'center'
			},{
				text : GROUP_PROPERTY.comment, width : 200, dataIndex:'comment',  
				menuDisabled:true, 
				searchType : 'string',
				align : 'center'
			}
			
		);
		
		var roleStore = Ext.create('Ext.data.Store', {
		    model: 'Module.Soul.group.model.GroupModel',
		    storeId:'Module.Soul.group.store.GroupStore',
		    proxy: {
		         type: 'rest',
		         headers : {
		         	"Content-Type": "application/json; charset=utf-8", 
		         	Accept : 'application/json'
		         },
		         url: '/suresecurity/role/'+requestBody+'/group',
		         reader: {
		             type: 'json',
		             root: 'data'
		         }
		     },
		     autoLoad: true
		});
		var selectedList;
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					selectedList = sm2.getSelection();
				}
			}
		});
		var roleGrid = Ext.create('Soul.view.SearchGrid', {
			checkIndexes : ['name'], 
		    store: Ext.data.StoreManager.lookup(roleStore),
		    viewConfig : {
				emptyText : ROLE_MESSAGE.noGroup
			},
		    columns: columns,
		    width: 600,
		    height: 275,
		    selModel: sm,
		    renderTo: Ext.getBody()
		});

			var newObjWin = Ext.create('Ext.window.Window',{
				region:'center',
				buttonAlign: 'center',
			    title:LABEL_TITLE.roleGroup,
			    autoHeight:true,
			    maximizable:true,
				minimizable:true,
				closeAction:'hide',
				constrainHeader:true,
				defaultButton:0,
				resizable:true,
				resizeHandles:'se',
				modal:true,
				plain:true,
				bodyPadding: 5,
	    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
	    	    layout: 'anchor',
	    	    defaults: {
	    	        anchor: '100%'
	    	    },
				animateTarget:'target',
				items:roleGrid,
				tbar: [
	    	           { 
	    	        	 xtype: 'button', 
	    	        	 iconCls: 'x-del-icon',
	    	        	 text:ROLE_LABEL.delGroupRole ,
	    	        	   handler: function() {
	    	        		   if(selectedList==undefined || selectedList.length == 0){
		    	        			   Ext.Msg.alert(GROUP_LABEL.operationWarn,'请至少选择一条数据进行操作');
		    	        			   return;
	    	        		   	}
	    	        		   var requestBody2 = [];
	    	        		   var requestBody3 = [];
	    	            		Ext.each(selectedList, function(r, i, rs){
	    	            			requestBody2.push(r.data.id);
	    	            			requestBody3.push(r.data.name);
	    	            		});
	    	            		var method = "DELETE";
	    	            		var confirm = {
	    	            				"DELETE" : {
	    	            					msg : Ext.String.format(ROLE_MESSAGE.confirmDeleteSelectRoles, requestBody3)
	    	            				}
	    	            			};
	    	            		Soul.Ajax.confirmRestAction("/suresecurity/role/"+requestBody+"/group/"+requestBody2, method, {}, requestBody2,  function(){
	    	            			roleGrid.updateView(roleGrid);
	    	            		}, null, null, confirm);
	    	        	   }
	    	           }
	    	         ],
				buttons: [　　　　　　　　　　
	                {　　　　　　　　　　
	                text: '关闭',　　　　　　　　　　
	                handler: function(){　　　　　　　　　　　　
	                	newObjWin.hide();　　　　　　　　　　
	                }　
	            }]
				       
				
			}).show();
			
	},
	OperRoleForUser:function(records,callbackFn){
		var requestBody = [];
		Ext.each(records, function(r, i, rs){
			requestBody.push(r.data.id);
		});
		var columns = new Array();
		var renders = Module.Soul.user.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),//行数
			{text: USERMANAGE_LABEL.user,sortable: true,dataIndex: 'name', searchType : 'string',
				renderer : function(v, u,r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
					return v;
				},
				flex : 1},
			{
					text: USERMANAGE_LABEL.email,width: 200, searchType : 'string',
					sortable: false, menuDisabled:true, dataIndex: 'email'
			},{
				text : ROLE_PROPERTY.status,width : 60, dataIndex:'status',  
				menuDisabled:true, 
				searchType : 'number',
				renderer: function(val, u,r, rowIndex, columnIndex, s){
					return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
				},
				align : 'center'
			},{
				text : USERMANAGE_LABEL.ctime, width : 200, dataIndex:'registdate',  
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			}
			
		);
		
		var roleStore = Ext.create('Ext.data.Store', {
		    model: 'Module.Soul.user.model.UserModel',
		    storeId:'Module.Soul.user.store.UserStore',
		    proxy: {
		         type: 'rest',
		         headers : {
		         	"Content-Type": "application/json; charset=utf-8", 
		         	Accept : 'application/json'
		         },
		         url: '/suresecurity/role/'+requestBody+'/user',
		         reader: {
		             type: 'json',
		             root: 'data'
		         }
		     },
		     autoLoad: true
		});
		var selectedList;
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					selectedList = sm2.getSelection();
				}
			}
		});
		var roleGrid = Ext.create('Soul.view.SearchGrid', {
			checkIndexes : ['name'], 
		    store: Ext.data.StoreManager.lookup(roleStore),
		    viewConfig : {
				emptyText : ROLE_MESSAGE.noUser
			},
		    columns: columns,
		    width: 600,
		    height: 275,
		    selModel: sm,
		    renderTo: Ext.getBody()
		});

			var newObjWin = Ext.create('Ext.window.Window',{
				region:'center',
				buttonAlign: 'center',
			    title:LABEL_TITLE.roleUser,
			    autoHeight:true,
			    maximizable:true,
				minimizable:true,
				closeAction:'hide',
				constrainHeader:true,
				defaultButton:0,
				resizable:true,
				resizeHandles:'se',
				modal:true,
				plain:true,
				bodyPadding: 5,
	    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
	    	    layout: 'anchor',
	    	    defaults: {
	    	        anchor: '100%'
	    	    },
				animateTarget:'target',
				items:roleGrid,
				tbar: [
	    	           { 
	    	        	 xtype: 'button', 
	    	        	 text: ROLE_LABEL.delUserRole,
	    	        	 iconCls: 'x-del-icon',
	    	        	   handler: function() {
	    	        		   if(selectedList==undefined || selectedList.length == 0){
		    	        			   Ext.Msg.alert(GROUP_LABEL.operationWarn,'请至少选择一条数据进行操作');
		    	        			   return;
	    	        		   	}
	    	        		   var requestBody2 = [];
	    	        		   var requestBody3 = [];
	    	            		Ext.each(selectedList, function(r, i, rs){
	    	            			requestBody2.push(r.data.id);
	    	            			requestBody3.push(r.data.name);
	    	            		});
	    	            		var method = "DELETE";
	    	            		var confirm = {
	    	            				"DELETE" : {
	    	            					msg : Ext.String.format(ROLE_MESSAGE.confirmDeleteSelectRoles, requestBody3)
	    	            				}
	    	            			};
	    	            		Soul.Ajax.confirmRestAction("/suresecurity/role/"+requestBody+"/user/"+requestBody2, method, {}, requestBody2,  function(){
	    	            			roleGrid.updateView(roleGrid);
	    	            		}, null, null, confirm);
	    	        	   }
	    	           }
	    	         ],
				buttons: [　　　　　　　　　　
	                {　　　　　　　　　　
	                text: '关闭',　　　　　　　　　　
	                handler: function(){　　　　　　　　　　　　
	                	newObjWin.hide();　　　　　　　　　　
	                }　
	            }]
				       
				
			}).show();
	}
});
