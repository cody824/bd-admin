
Ext.define('Module.Soul.user.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.usergrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Soul.user.Data',
		'Module.Soul.user.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
    
	checkIndexes : ['name'], // 默认选择的列	
	minChars : 1,
	minLength : 1,
	
	initComponent : function() {
		var columns = new Array();
		var me = this;
	       var callbackFun = function(){
	    	   me.updateView(me);
	       };
		var renders = Module.Soul.user.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{text: "ID",sortable: true,dataIndex: 'id', searchType : 'number',
				width : 60},
			{text: USERMANAGE_LABEL.user,sortable: true,dataIndex: 'name', searchType : 'string',
				renderer : function(v, u,r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
					return (Soul.util.GridRendererUtil.getLinkName(Module.Soul.user.Renderer.getUserName(v, u,r, rowIndex, columnIndex - 1, s)));
				},
				flex : 1},
			{
					text: USERMANAGE_LABEL.email,width: 200, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'email'
			},
			{
				text: USERMANAGE_LABEL.mobilePhone,width: 200, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'mobilePhone',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					if(val == 0){
						return "未填写";
					}else{
						return val;
					}
				}
			},
			{
				text: USERMANAGE_LABEL.ctime, width: 200,dataIndex:'registdate', searchType : 'date',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},
			{
				text: USER_PROPERTY.lastLoginTime, width: 200,dataIndex:'lastLoginTime', searchType : 'date',
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
			}, {
				text : USERMANAGE_LABEL.lockUser, sortable: false, menuDisabled:true,
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateLockIcon(val, u,r, rowIndex, columnIndex - 1, s, v);
				},
				width : 60,
				align : 'center',
				operation : 'lockuser'
			},
			{
				text : USERMANAGE_LABEL.resetPwd, sortable: false, menuDisabled:true,
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateResetPasswdIcon(val, u,r, rowIndex, columnIndex -1 , s, v);
				},
				width : 60,
				align : 'center',
				operation : 'resetPwd'
			} , {
				text : USERMANAGE_LABEL.checkGroup, sortable: false, menuDisabled:true,
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCheckGroupIcon(val, u,r, rowIndex, columnIndex -1 , s, v);
				},
				listeners:{
					click:function(){
						Module.Soul.user.Operation.docheckGroupFunction(me,callbackFun);
					}
				},
				width : 60,
				align : 'center',
			}, {
				text : USERMANAGE_LABEL.checkRole, sortable: false, menuDisabled:true,
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCheckRoleIcon(val, u,r, rowIndex, columnIndex -1 , s, v);
				},
				width : 60,
				listeners:{
					click:function(){
						Module.Soul.user.Operation.docheckRoleFunction(me,callbackFun);
					}
				},
				align : 'center',
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildUserOptMenu();
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
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
					
					rightMI = me.contextMenu.down('menuitem[name=lockuser]');
					topMI = me.portlet.down('menuitem[name=lockuser]');
					rightDelMI = me.contextMenu.down('menuitem[name=resetuser]');
					topDelMI = me.portlet.down('menuitem[name=resetuser]');
					rightAddGroupMI = me.contextMenu.down('menuitem[name=addUserToGroup]');
					topAddGroupMI = me.portlet.down('menuitem[name=addUserToGroup]');
					rightAddRoleMI = me.contextMenu.down('menuitem[name=addUserToRole]');
					topAddRoleMI = me.portlet.down('menuitem[name=addUserToRole]');
					if (sm2.getCount() > 0 && statusT != -1) {
						if (statusT == Module.Soul.user.model.UserModel.LOCKED){
							rightMI.setText("解锁用户");
							topMI.setText("解锁用户");
						} else {
							rightMI.setText("锁定用户");
							topMI.setText("锁定用户");
						}
						
						if(sm2.getCount() > 1){
							rightAddGroupMI.disable();
							topAddGroupMI.disable();
							rightAddRoleMI.disable();
							topAddRoleMI.disable();
						}else{
							rightAddGroupMI.enable();
							topAddGroupMI.enable();
							rightAddRoleMI.enable();
							topAddRoleMI.enable();
						}
						rightDelMI.enable();
						topDelMI.enable();
						rightMI.enable();
						topMI.enable();
						
						
					} else {
						rightMI.disable();
						topMI.disable();
						rightAddGroupMI.disable();
						topAddGroupMI.disable();
						rightAddRoleMI.disable();
						topAddRoleMI.disable();
						rightDelMI.disable();
						topDelMI.disable();
					}
				}
			}
		});
		
		Ext.apply(this, {
			store : Ext.data.StoreManager.lookup("Module.Soul.user.store.UserStore"),
			selModel: sm,
			viewConfig : {
				emptyText : USERMANAGE_MESSAGE.noUser
			},
			columns : columns
		});
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};
        
        var sm = me.selModel,
			lockItem = me.portlet.down('menuitem[name=lockuser]'),
			addGroupItem = me.portlet.down('menuitem[name=addUserToGroup]'),
			addRoleItem = me.portlet.down('menuitem[name=addUserToRole]'),
			resetItem=me.portlet.down('menuitem[name=resetuser]');
        
        var lockuserFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if (records.length == 1) {
        		Soul.Ajax.objectRestAction(records[0].data, item.name, callbackFun);
        	} else if (records.length > 1){
        		Module.Soul.user.Operation.doLockUsersFunction(records, callbackFun);
        	}
        };
        var resetPasswordFunc = function(item,e,eOpts){
        	var records = sm.getSelection();
        	Module.Soul.user.Operation.doResetPasswordFunction(records, callbackFun);
        };
        var addUserToGroup = function(item,e,eOpts){
//        	var records = sm.getSelection();
        	Module.Soul.user.Operation.doAddUserToGroupFunction(me, callbackFun);
        };
        var addUserToRole = function(item,e,eOpts){
//        	var records = sm.getSelection();
        	Module.Soul.user.Operation.doAddUserToRoleFunction(me, callbackFun);
        };
        me.contextMenu.down('menuitem[name=lockuser]').on('click', lockuserFunc);
        me.contextMenu.down('menuitem[name=resetuser]').on('click', resetPasswordFunc);
        me.contextMenu.down('menuitem[name=addUserToGroup]').on('click', addUserToGroup);
        me.contextMenu.down('menuitem[name=addUserToRole]').on('click', addUserToRole);
        lockItem.on('click', lockuserFunc);
        resetItem.on('click',resetPasswordFunc);
        addGroupItem.on('click',addUserToGroup);
        addRoleItem.on('click',addUserToRole);


		var topCreateUserBtn = me.portlet.down('menuitem[name=createUsesBtn]');


		topCreateUserBtn.on('click',function(){
			Module.Soul.user.Operation.doCreateUsersFunction(callbackFun);

		});

    }
});
