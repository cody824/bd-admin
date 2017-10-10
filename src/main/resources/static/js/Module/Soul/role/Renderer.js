Ext.define('Module.Soul.role.Renderer', {//定义一个类，相当于java里的包路径
	singleton: true,
	requires  : [//需要的类列表（数组）    实例化类之前必须加载的类列表
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Soul.role.Tools',
 		'Module.Soul.role.model.RoleModel'
  	],
//	translateIsStaff : function (v){
//		
//		if(v == this.UM.ADMIN_USER){
//			return ROLE_LABEL.staff;
//		}else{
//			return ROLE_LABEL.commonUser;
//		}
//	},
  	translateCtime : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateIsStatus : function(v){//状态显示
		if(v == 0){
			return ROLE_LABEL.active;
		} else if (v == 1){
			return ROLE_LABEL.unactive;
		} else if (v == 2){
			return ROLE_LABEL.unusedStatus;
		} else {
			return ROLE_LABEL.unknownStatus;
		}
	},
	translateAddToUserIcon : function(val, u,r, rowIndex, columnIndex, s){//添加用户到组
		u.tdAttr = 'data-qtip="' + ROLE_LABEL.openUserRole + '"'; 
		return Soul.util.GridRendererUtil.getPlusMgrInnerBox();
	},
	translateAddToGroupIcon : function(val, u,r, rowIndex, columnIndex, s){//添加用户到组
		u.tdAttr = 'data-qtip="' + ROLE_LABEL.openGroupRole + '"'; 
		return Soul.util.GridRendererUtil.getPlusMgrInnerBox();
	},
	
//	translateLockIcon : function(val, u,r, rowIndex, columnIndex, s, v){//对角色的锁定
//		var user = r.data, me = this;
//		var permitOk = me.isPermitOk(user, columnIndex, v);
//		if (permitOk && user.status == this.UM.LOCKED) {
//			u.tdAttr = 'data-qtip="' + Ext.String.format(ROLE_MESSAGE.roleIsLock, r.data.name) + '"'; 
//			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
//		} else if (permitOk && user.status != this.UM.LOCKED){
//			u.tdAttr = 'data-qtip="' + Ext.String.format(ROLE_MESSAGE.lockRole, r.data.name) + '"';
//			return Soul.util.GridRendererUtil.getLockMgrInnerBox();
//		} else {
//			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
//			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
//		}
//	},
	
//	translateResetPasswdIcon : function(val, u,r, rowIndex, columnIndex, s, v){//此方法是用来修改密码的
//		var user = r.data, me = this;
//		var permitOk = me.isPermitOk(user, columnIndex, v);
//		if(permitOk){
//			if (r.data.status == this.UM.LOCKED)
//				u.tdAttr = 'data-qtip="' + Ext.String.format(ROLE_MESSAGE.unLockRole, r.data.name) + '"';
//			else
//				u.tdAttr = 'data-qtip="' + Ext.String.format(ROLE_MESSAGE.resetPasswd, r.data.name) + '"';
//			return Soul.util.GridRendererUtil.getKeyMgrInnerBox();
//		}else{
//			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
//			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
//		}
//	},
	
//	isRoleEditAble : function(user){
//		return true;
//	},
	
//	isPermitOk : function(user, columnIndex, v){
//		var permitOk = true;
//		var operation = v.panel.columns[columnIndex].operation;
//		if (user.links[operation] == null)
//			permitOk = false;
//		return permitOk;
//	},
	
//	translateStaffIcon : function(v, u,r, rowIndex, columnIndex, s,view){
//		var render = Module.Soul.role.Renderer;
//		if(render.isRoleEditAble(r.data)){
//			if(v == this.UM.ADMIN_USER){
//				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.cancelAdmin, r.data.userName) + '"'; 
//				return Soul.util.GridRendererUtil.getUserNoAdminInnerBox();
//			}else if(v == this.UM.COMMON_USER){
//				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.setAdmin, r.data.userName) + '"'; 
//				return Soul.util.GridRendererUtil.getUserAdminInnerBox();
//			}
//		}else{
//			r.changeroleOperateAble = false;
//			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
//			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
//		}
//	},
	
	//translateDeleteIcon : function(val, u,r, rowIndex, columnIndex, s){
	//	var render = Module.Soul.role.Renderer;
	//	if(render.isUserEditAble(r.data)){
	//		u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.delUser, r.data.userName) + '"';
	//		return Soul.util.GridRendererUtil.getMinusMgrInnerBox();
	//	}else{
	//		u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
	//		return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
	//	}
	//},
	
	getRoleName : function(val, u,r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
			var icon = '';
			if (r.data.type == "role")
				icon = '<img src="/img/icon/user.png"/>';
			else if (r.data.type == "app")
				icon = '<img src="/img/icon/view.png"/>';
			//返回用户列表
			return icon + '<a style="cursor:pointer;text-decoration:underline;font-style:italic;" onclick="Module.Soul.role.Tools.showRoleInEast(\''+ r.data.name  +'\',event);">' + val + '</a>';
		} else
			return val;
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Soul.role.model.RoleModel;
   	}
});