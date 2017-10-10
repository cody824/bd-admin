
Ext.define('Module.Soul.group.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Soul.user.store.UserStore',
		'Module.Soul.user.Operation',
		'Module.Soul.user.Renderer',
		'Module.Soul.role.Renderer',
		'Module.Soul.role.store.RoleStore'
		
	],
	
	getOperationForGroup : function(user){
		user.httpParams = new Object();
		user.httpMethod = new Object();
		user.requestBody = new Object();
		user.methodConfirm = new Object();
		user.methodConfirm["lockuser"] = {
			"put" : {
				msg : Ext.String.format(USERMANAGE_MESSAGE.confirmLockUsers, user.name)
			},
			"delete" : {
				msg : Ext.String.format(USERMANAGE_MESSAGE.confirmUnLockUsers, user.name)
			}
				
		};
		if (user.status == Module.Soul.group.model.GroupModel.LOCKED) {
			user.httpMethod["lockuser"] = "delete";
			
		} else  {
			user.httpMethod["lockuser"] = "put";
		}
		user.httpMethod["add"] = "put";
	},
	
	doLockUsersFunction : function(records, callbackFn){
		var requestBody = [];
		Ext.each(records, function(r, i, rs){
			requestBody.push(r.data.name);
		});
		var method = "put";
		var user = records[0].data;
		var confirm = {
			"put" : {
				msg : Ext.String.format(USERMANAGE_MESSAGE.confirmLockUsers, requestBody)
			},
			"delete" : {
				msg : Ext.String.format(USERMANAGE_MESSAGE.confirmUnLockUsers, requestBody)
			}
		};
		if (user.status == Module.Soul.group.model.GroupModel.LOCKED) {
			method = "delete";
		} 
		
		Soul.Ajax.confirmRestAction("/suresecurity/lockedUsers/", method, {}, requestBody,  callbackFn, null, null, confirm);
		
	},
	doUpdateGroupFunction : function(me, keyupFunc, callbackFun){
		var sm = me.selModel;
		var records = sm.getSelection();   
		var comStore = Ext.create('Ext.data.Store', {
			   fields:['id', 'name'],
	           proxy:{
	               type:'ajax',
	               url:'/suresecurity/group/?isCombo=true',
	               reader: {
	                   type: 'json',
	                   successProperty:'success',
	                   root: 'datas'
	               }
	           }
	       });
		var pal = Ext.create('Ext.form.Panel', {
		    bodyPadding: 5,
		    width: 350,
		    url: '/suresecurity/group/',
		    method:'put',
		    // 表单域 Fields 将被竖直排列, 占满整个宽度
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },

		    // The fields 
    	    items: [{
    	    	xtype : 'textfield',
    	        fieldLabel: GROUP_PROPERTY.name,
    	        id: 'groName',
    	        allowBlank: false,
           	    enableKeyEvents:true,
    	        listeners: {
    	        	keyup: keyupFunc
    	        }
    	    }
    	    ,{  
    	        fieldLabel:GROUP_PROPERTY.parentGroupId,  
    	        xtype:"combo",
    	        id:'groParentGroupId',
    	        queryMode: 'remote',
    	        store:comStore,
    	        valueField: 'id',
    	        editable:false,
    	        displayField: 'name',
    	        triggerAction: 'all'
    	    },{
    	    	xtype : 'textfield',
    	        fieldLabel: GROUP_PROPERTY.cName,
    	        id: 'groCName',
    	        allowBlank: false,
           	    enableKeyEvents:true,
    	        listeners: {
    	        	keyup: keyupFunc
    	        }
    	    }
    	    ,{
    	    	xtype : 'textareafield',
    	        fieldLabel: GROUP_PROPERTY.comment,
    	        id: 'groComment',
    	        allowBlank: false,
           	    enableKeyEvents:true,
    	        listeners: {
    	        	keyup: keyupFunc
    	        }
    	    }],
    	    // 重置 和 保存 按钮.
    	    buttons: [{
    	        text: '保存',
    	        disabled:false,
    	        id:"saveBtn",
    	        handler: function() {
    	        	var name = Ext.getCmp("groName").getValue(),
    	        		  id = records[0].data.id,
          		  		  cname = Ext.getCmp("groCName").getValue(),
          		  		  comm = Ext.getCmp("groComment").getValue(),
          		  		  parentId = Ext.getCmp("groParentGroupId").getValue();//Ext.getCmp("groParentGroupId").getValue();
    	        	Soul.Ajax.restAction("/suresecurity/group/"+id,"put",Ext.encode({
    	        		name:name,
    	        		cName : cname,
    	        		comment : comm,
    	        		parentGroupId : parentId
    	        	}),null,callbackFun,GROUP_MESSAGE.load,null);
    	        	Ext.getCmp("upWin").close();
    	        	var comb = Ext.getCmp('groParentGroupId');  
	                 comb.setValue(parentId); 
	                 alert();
    	        }
    	    }]
		});
		Ext.create('Ext.window.Window', {
    	    title: '修改组',
    	    id:'upWin',
    	    bodyPadding: 5,
    	    width: 350,
    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
    	    layout: 'anchor',
    	    defaults: {
    	        anchor: '100%'
    	    },
    	    // The fields
    	    defaultType: 'textfield',
    	    items:pal,
    	    beforeShow:function(){
    	    	
    	       	Soul.Ajax.executeRequestData("/suresecurity/group/"+records[0].data.id,null,function(data){
    	    		Ext.getCmp("groName").setValue(data.name),
    		  		Ext.getCmp("groCName").setValue(data.cName),
    		  		Ext.getCmp("groComment").setValue(data.comment);
    		        Ext.getCmp('groParentGroupId').setValue(data.parentGroupId);  
    	    	},null,GROUP_MESSAGE.load);
        	}
    	}).show();
	},
	
	doAddGroupFunction : function(obj, keyupFunc, callbackFun){
		   var comStore = Ext.create('Ext.data.Store', {
			           fields:['id', 'name'],
			           proxy:{
			               type:'ajax',
			               url:'/suresecurity/group/?isCombo=true',
			               reader: {
			                   type: 'json',
			                   successProperty:'success',
			                   root: 'datas'
			               }
			           }
			       });

		
		var pal = Ext.create('Ext.form.Panel', {
		    bodyPadding: 5,
		    width: 350,
		    url: '/suresecurity/group/',
		    method:'put',
		    // 表单域 Fields 将被竖直排列, 占满整个宽度
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },

		    // The fields
    	    items: [{
    	    	xtype : 'textfield',
    	        fieldLabel: GROUP_PROPERTY.name,
    	        id: 'groName',
    	        allowBlank: false,
           	    enableKeyEvents:true,
    	        listeners: {
    	        	keyup: keyupFunc
    	        }
    	    },{  
    	        fieldLabel:GROUP_PROPERTY.parentGroupId,  
    	        xtype:"combo",  
    	        id:'groParentGroupId',
    	        queryMode: 'remote',
    	        store:comStore,
    	        valueField: 'id',
    	        editable:false,
    	        displayField: 'name',
    	        triggerAction: 'all'
    	    },{
    	    	xtype : 'textfield',
    	        fieldLabel: GROUP_PROPERTY.cName,
    	        id: 'groCName',
    	        allowBlank: false,
           	    enableKeyEvents:true,
    	        listeners: {
    	        	keyup: keyupFunc
    	        }
    	    },{
    	    	xtype : 'textareafield',
    	        fieldLabel: GROUP_PROPERTY.comment,
    	        id: 'groComment',
    	        allowBlank: false,
           	    enableKeyEvents:true,
    	        listeners: {
    	        	keyup: keyupFunc
    	        }
    	    }
    	    ],
    	    // 重置 和 保存 按钮.
    	    buttons: [{
    	        text: '重置',
    	        handler: function() {
    	          Ext.getCmp("groName").setValue('');
          		  Ext.getCmp("groCName").setValue('');
          		  Ext.getCmp("groComment").setValue('');
          		  keyupFunc();
    	        }
    	    }, {
    	        text: '保存',
    	        disabled:true,
    	        id:"saveBtn",
    	        handler: function() {
    	        	var name = Ext.getCmp("groName").getValue(),
          		  		  cname = Ext.getCmp("groCName").getValue(),
          		  		  comm = Ext.getCmp("groComment").getValue(),
          		  		  parentId = Ext.getCmp("groParentGroupId").getValue();
    	        	Soul.Ajax.restAction("/suresecurity/group/","put",Ext.encode({
    	        		
    	        		name : name,
    	        		cName:cname,
    	        		comment:comm,
    	        		parentGroupId:parentId
    	        	}),null,callbackFun,GROUP_MESSAGE.load,null);
    	        	Ext.getCmp("addWin").close();
    	        }
    	    }]
		});
	        	Ext.create('Ext.window.Window', {
	        	    id:'addWin',
	        		title: '增加组',
	        	    bodyPadding: 5,
	        	    width: 350,
	        	    // 表单域 Fields 将被竖直排列, 占满整个宽度
	        	    layout: 'anchor',
	        	    defaults: {
	        	        anchor: '100%'
	        	    },
	        	    // The fields
	        	    defaultType: 'textfield',
	        	    items:pal
	        	  
	        	}).show();
	},
	doDeleteGroupFunction:function(me,callbackFun ){

		var sm = me.selModel;
		var records = sm.getSelection();
		var requestBody = [];
		var names = [];
		Ext.each(records, function(r, i, rs){
			requestBody.push(r.data.id);
			names.push(r.data.name);
		});
		var confirm = {
				"delete" : {
					msg : Ext.String.format(GROUP_MESSAGE.confirmDelGroups, names)
				}
			};
    	Soul.Ajax.confirmRestAction("/suresecurity/group/","delete",{},requestBody,callbackFun,GROUP_MESSAGE.load,null,confirm);
 
	},
	operUserByGroupIdFunction:function(me,callbackFun){
		var operation = 'user';
		var sm = me.selModel;
		var records = sm.getSelection();
		var selGroupId = records[0].data.id;
		var selGroupName = records[0].data.name;
		var columns = new Array();
		var renders = Module.Soul.user.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{text: USERMANAGE_LABEL.user,sortable: true,dataIndex: 'name', searchType : 'string',
				flex : 1},
			{
					text: USERMANAGE_LABEL.email,width: 200, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'email'
			},
			{
				text: USERMANAGE_LABEL.ctime, width: 200,dataIndex:'registdate',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},
			{
				text : USERMANAGE_LABEL.status,width : 60, dataIndex:'status',  menuDisabled:true, searchType : 'number',
				renderer: function(val, u,r, rowIndex, columnIndex, s){
					return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
				},
				align : 'center',
			}
		);
		
		var store = Ext.create('Ext.data.Store', {
		    model: 'Module.Soul.user.model.UserModel',
		    storeId:'Module.Soul.group.model.user.userStore',
		    proxy: {
		         type: 'rest',
		         headers : {
		         	"Content-Type": "application/json; charset=utf-8", 
		         	Accept : 'application/json'
		         },
		         url: records[0].data.links[operation],
		         reader: {
		             type: 'json',
		             root: 'data'
		         }
		     },
		     autoLoad: true
		});
		var selUsers;
		var sm1 = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					//when select checkbox do......
					selUsers = sm1.getSelection()
				}
			}
		});
		var pal = Ext.create('Ext.grid.Panel', {
		    store: Ext.data.StoreManager.lookup('Module.Soul.group.model.user.userStore'),
		    columns: columns,
		    width: 600,
		    height: 275,
		    selModel: sm1,
		    renderTo: Ext.getBody()
		});
		Ext.create('Ext.window.Window', {
    	    id:'operUser',
    		title: GROUP_LABEL.delUsersFromGroup,
    	    bodyPadding: 5,
    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
    	    layout: 'anchor',
    	    defaults: {
    	        anchor: '100%'
    	    },
    	    items:pal,
    	    modal:true,
     	    tbar: [
    	           { xtype: 'button', iconCls: 'delete',text:GROUP_LABEL.delMapping ,listeners:{
    	        	   click:function(){
    	        		   if(selUsers == undefined || selUsers.length == 0){
    	        			   Ext.Msg.alert(GROUP_LABEL.operationWarn,GROUP_MESSAGE.noSelectForUpdate);
    	        			   return;
    	        		   }
    	        	 		var requestBody = [];
    	            		var names = [];
    	            		Ext.each(selUsers, function(r, i, rs){
    	            			requestBody.push(r.data.id);
    	            			names.push(r.data.name);
    	            		});
    	            		var confirm = {
    	            				"delete" : {
    	            					msg : Ext.String.format(GROUP_MESSAGE.confirmRemoveUsersFromGroup, selGroupName, names)
    	            				}
    	            			};
    	                	Soul.Ajax.confirmRestAction(records[0].data.links[operation],"delete",{},requestBody,function(){
    	                		store.reload();
    	                	},GROUP_MESSAGE.load,null,confirm);
    	                	
    	        	   }
    	           }}
    	         ]
    	  
    	}).show();
	},
	removeRoleByGroupIdFunction:function(me,callbackFun){
		var operation = 'role';
		var sm = me.selModel;
		var records = sm.getSelection();
		var selGroupId = records[0].data.id;
		var selGroupName = records[0].data.name;
		var columns = new Array();
		var renders = Module.Soul.role.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),//行数
			{text: ROLE_PROPERTY.name,sortable: true,dataIndex: 'name', searchType : 'string',
				flex : 1},
			{
					text: ROLE_PROPERTY.cName,width: 200, searchType : 'string',
				sortable: false,
				menuDisabled:true,
				dataIndex: 'cName'
			},{
				text : ROLE_PROPERTY.status,width : 60, dataIndex:'status',  
				menuDisabled:true, 
				searchType : 'number',
				renderer: function(val, u,r, rowIndex, columnIndex, s){
					return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
				},
				align : 'center'
			},{
				text : ROLE_PROPERTY.comment, width : 200, dataIndex:'comment',  
				menuDisabled:true, 
				searchType : 'string',
				align : 'center'
			}
		);
		var selRoles;
		var sm1 = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					//when select checkbox do......
					selRoles = sm1.getSelection()
				}
			}
		});
		var store = Ext.create('Ext.data.Store', {
		    model: 'Module.Soul.role.model.RoleModel',
		    proxy: {
		         type: 'rest',
		         headers : {
		         	"Content-Type": "application/json; charset=utf-8", 
		         	Accept : 'application/json'
		         },
		         url: records[0].data.links[operation],
		         reader: {
		             type: 'json',
		             root: 'data'
		         }
		     },
		     autoLoad: true
		});
		var pal = Ext.create('Ext.grid.Panel', {
		    store: store,
		    columns: columns,
		    width: 600,
		    height: 275,
		    selModel: sm1,
		    autoShow:true,
		    renderTo: Ext.getBody()
		});
		Ext.create('Ext.window.Window', {
    	    id:'operRole',
    		title: GROUP_LABEL.removeRoleToGroup,
    	    bodyPadding: 5,
    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
    	    layout: 'anchor',
    	    defaults: {
    	        anchor: '100%'
    	    },
    	    modal:true,
    	    items:pal,
     	    tbar: [
    	           { xtype: 'button', iconCls: 'delete',text:GROUP_LABEL.delMapping ,listeners:{
    	        	   click:function(){
    	        		   if(selRoles == undefined || selRoles.length == 0){
    	        			   Ext.Msg.alert(GROUP_LABEL.operationWarn,GROUP_MESSAGE.noSelectForUpdate);
    	        			   return;
    	        		   }
    	        	 		var requestBody = [];
    	            		var names = [];
    	            		Ext.each(selRoles, function(r, i, rs){
    	            			requestBody.push(r.data.id);
    	            			names.push(r.data.name);
    	            		});
    	            		var confirm = {
    	            				"delete" : {
    	            					msg : Ext.String.format(GROUP_MESSAGE.confirmRemoveRolesFromGroup, selGroupName, names)
    	            				}
    	            			};
    	                	Soul.Ajax.confirmRestAction(records[0].data.links[operation],"delete",{},requestBody,function(){
    	                		store.reload();
    	                	},GROUP_MESSAGE.load,null,confirm);
    	                	
    	        	   }
    	           }}
    	         ]
    	  
    	}).show();
	},
	operRoleByGroupIdFunction:function(me,callbackFun ){
		var operation = 'role';
		var sm = me.selModel;
		var records = sm.getSelection();
		var selGroupId = records[0].data.id;
		var selGroupName = records[0].data.name;
		var columns = new Array();
		var renders = Module.Soul.role.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),//行数
			{text: ROLE_PROPERTY.name,sortable: true,dataIndex: 'name', searchType : 'string',
				flex : 1},
			{
					text: ROLE_PROPERTY.cName,width: 200, searchType : 'string',
				sortable: false,
				menuDisabled:true,
				dataIndex: 'cName'
			},{
				text : ROLE_PROPERTY.status,width : 60, dataIndex:'status',  
				menuDisabled:true, 
				searchType : 'number',
				renderer: function(val, u,r, rowIndex, columnIndex, s){
					return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
				},
				align : 'center'
			},{
				text : ROLE_PROPERTY.comment, width : 200, dataIndex:'comment',  
				menuDisabled:true, 
				searchType : 'string',
				align : 'center'
			}
		);
		var selRoles;
		var sm1 = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					//when select checkbox do......
					selRoles = sm1.getSelection()
				}
			}
		});
		
		var store = Ext.create('Ext.data.Store', {
		    model: 'Module.Soul.role.model.RoleModel',
		    proxy: {
		         type: 'rest',
		         headers : {
		         	"Content-Type": "application/json; charset=utf-8", 
		         	Accept : 'application/json'
		         },
		         url: records[0].data.links["nousedRole"],
		         reader: {
		             type: 'json',
		             root: 'data'
		         }
		     },
		     autoLoad: true
		});
		//var store = Ext.data.StoreManager.lookup('Module.Soul.role.store.RoleStore');
		var pal = Ext.create('Ext.grid.Panel', {
		    store: store,
		    columns: columns,
		    width: 600,
		    height: 275,
		    selModel: sm1,
		    autoShow:true,
		    renderTo: Ext.getBody()
		});
		Ext.create('Ext.window.Window', {
    	    id:'operRole',
    		title: GROUP_LABEL.addRoleToGroup,
    	    bodyPadding: 5,
    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
    	    layout: 'anchor',
    	    defaults: {
    	        anchor: '100%'
    	    },
    	    modal:true,
    	    items:pal,
     	    tbar: [
    	           { xtype: 'button',iconCls: 'x-add-icon',   text:GROUP_LABEL.addMapping ,listeners:{
    	        	   click:function(){
    	        		   if(selRoles == undefined || selRoles.length == 0){
    	        			   Ext.Msg.alert(GROUP_LABEL.operationWarn,GROUP_MESSAGE.noSelectForUpdate);
    	        			   return;
    	        		   }
    	        	 		var requestBody = [];
    	            		var names = [];
    	            		Ext.each(selRoles, function(r, i, rs){
    	            			requestBody.push(r.data.id);
    	            			names.push(r.data.name);
    	            		});
    	                	Soul.Ajax.restAction(records[0].data.links[operation],"put",{},requestBody,function(){
    	                		Ext.getCmp("operRole").close();
    	                	},GROUP_MESSAGE.load,null);
    	                	
    	        	   }
    	           }}
    	         ]
    	  
    	}).show();
	}
});
