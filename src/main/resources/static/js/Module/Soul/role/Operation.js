
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
        Soul.Ajax.confirmRestAction("/security/role/", method, {}, requestBody, callbackFn, null, null, confirm);
    },

    updateRole: function (role, cb) {
        var form = new Ext.FormPanel({
            labelWidth: 60,
            frame: true,
            width: 400,
            maxHeight: 500,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: false,
                width: 350
            },
            items: [{
                name: 'comment',
                fieldLabel: "角色说明"
            }]
        });
        form.form.setValues(role);
        var win = new Ext.Window({
            title: "修改角色说明",
            items: [form],
            // height : 'auto',
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: "保存",
                handler: function () {
                    var params = form.getForm().getValues();
                    Soul.Ajax.request({
                        url: "/security/role/" + role.id,
                        method: 'put',
                        params: params,
                        success: function () {
                            win.close();
                            cb();
                        }
                    });
                }
            }]

        });
        win.show();
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
                fieldLabel: "角色KEY",
                name : 'name',
                emptyText: ROLE_PROPERTY.name,
                regex : /^[a-zA-Z0-9\.\_]+$/,
                regexText:'只能输入英文下划线和数字',
                msgTarget:"side",
                maxLength:50,
                allowBlank : false
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
                text: LABEL.save,
                handler: function () {
                    var formValid = userForm.form.isValid();
                    var params = userForm.form.getValues();
                    if (formValid) {
                        Soul.Ajax.request({
                            url: '/security/role/',
                            method: 'post',
                            params: params,
                            success: function () {
                                callbackFn();
                                userForm.form.reset();
                                newFormWin.hide();
                            }
                        })
                    }
                }
                }, {
                text: LABEL.cancel,
                handler: function () {
                    userForm.form.reset();
                    newFormWin.hide();
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
                url: '/security/role/' + requestBody + '/group',
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
                               Soul.Ajax.confirmRestAction("/security/role/" + requestBody + "/group/" + requestBody2, method, {}, requestBody2, function () {
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
    showUsers: function (role, callbackFn) {
        console.log(role);
        var roleName = role.name;
        var me = this;
        var adminGrid = Ext.create('Module.Soul.role.view.RoleUserGrid', {
            width: 500,
            height: 200,
            role: roleName
        });
        var cb = function () {
            adminGrid.loadData();
        };

        var addForm = new Ext.FormPanel({
            labelWidth: 60,
            frame: true,
            width: 500,
            height: 80,
            maxHeight: 500,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: false,
                width: 400
            },
            items: [{
                name: 'userKey',
                allowBlank: true,
                fieldLabel: "登录名/邮箱/手机"
            }],
            buttonAlign: 'center',
            buttons: [{
                text: "增加用户",
                handler: function () {
                    var params = addForm.getForm().getValues();
                    Soul.Ajax.request({
                        url: '/security/role/' + role.id + "/user/?userKey=" + params.userKey,
                        method: 'put',
                        success: cb
                    });
                }
            }]
        });

        var win = new Ext.Window({
            title: "角色用户信息",
            items: [adminGrid, addForm],
            // height : 'auto',
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true

        });

        win.show();
	}
});
