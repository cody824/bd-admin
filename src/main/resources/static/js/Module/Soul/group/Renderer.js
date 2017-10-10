Ext.define('Module.Soul.group.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Soul.group.Tools',
 		'Module.Soul.group.model.GroupModel'
  	],
	translateIsStaff : function (v){
		if(v == this.UM.ADMIN_USER){
			return USERMANAGE_LABEL.staff;
		}else{
			return USERMANAGE_LABEL.commonUser;
		}
	},
	translateIsStatus : function(v){
		if(v == 0){
			return USERMANAGE_LABEL.active;
		} else if (v == 1){
			return USERMANAGE_LABEL.unactive;
		} else if (v == 2){
			return USERMANAGE_LABEL.lockStatus;
		} else {
			return USERMANAGE_LABEL.unknownStatus;
		}
	},
	translateCtime : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateAddToGroupIcon : function(val, u,r, rowIndex, columnIndex, s){
		u.tdAttr = 'data-qtip="' + GROUP_LABEL.newGroup + '"'; 
		return Soul.util.GridRendererUtil.getPlusMgrInnerBox();
	},
	translateUpdateToGroupIcon : function(val, u,r, rowIndex, columnIndex, s){
		u.tdAttr = 'data-qtip="' + GROUP_LABEL.upGroup + '"'; 
		return Soul.util.GridRendererUtil.getUpdateMgrInnerBox();
	},
	translateDeleteToGroupIcon : function(val, u,r, rowIndex, columnIndex, s){
		u.tdAttr = 'data-qtip="' + GROUP_LABEL.delGroup + '"'; 
		return Soul.util.GridRendererUtil.getDeleteMgrInnerBox();
	},
	translateLockIcon : function(val, u,r, rowIndex, columnIndex, s, v){
		var user = r.data, me = this;
		var permitOk = me.isPermitOk(user, columnIndex, v);
		if (permitOk && user.status == this.UM.LOCKED) {
			u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.userIsLock, r.data.name) + '"'; 
			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
		} else if (permitOk && user.status != this.UM.LOCKED){
			u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.lockUser, r.data.name) + '"';
			return Soul.util.GridRendererUtil.getLockMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	
	translateResetPasswdIcon : function(val, u,r, rowIndex, columnIndex, s, v){
		var user = r.data, me = this;
		var permitOk = me.isPermitOk(user, columnIndex, v);
		if(permitOk){
			if (r.data.status == this.UM.LOCKED)
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.unLockUser, r.data.name) + '"';
			else
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.resetPasswd, r.data.name) + '"';
			return Soul.util.GridRendererUtil.getKeyMgrInnerBox();
		}else{
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	
	isUserEditAble : function(user){
		return true;
	},
	
	isPermitOk : function(user, columnIndex, v){
		var permitOk = true;
		var operation = v.panel.columns[columnIndex].operation;
		if (user.links[operation] == null)
			permitOk = false;
		return permitOk;
	},
	
	translateStaffIcon : function(v, u,r, rowIndex, columnIndex, s,view){
		var render = Module.Soul.group.Renderer;
		if(render.isUserEditAble(r.data)){
			if(v == this.UM.ADMIN_USER){
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.cancelAdmin, r.data.userName) + '"'; 
				return Soul.util.GridRendererUtil.getUserNoAdminInnerBox();
			}else if(v == this.UM.COMMON_USER){
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.setAdmin, r.data.userName) + '"'; 
				return Soul.util.GridRendererUtil.getUserAdminInnerBox();
			}
		}else{
			r.changeroleOperateAble = false;
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	
	translateDeleteIcon : function(val, u,r, rowIndex, columnIndex, s){
		var render = Module.Soul.group.Renderer;
		if(render.isUserEditAble(r.data)){
			u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.delUser, r.data.userName) + '"';
			return Soul.util.GridRendererUtil.getMinusMgrInnerBox();
		}else{
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	
	geGroupName : function(val, u,r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
			var icon = '';
			if (r.data.type == "group")
				icon = '<img src="/img/icon/group.png"/>';
			else if (r.data.type == "app")
				icon = '<img src="/img/icon/view.png"/>';
			return icon + '<a style="cursor:pointer;text-decoration:underline;font-style:italic;" onclick="Module.Soul.group.Tools.showGroupInEast(\''+ r.data.id  +'\',event);">' + val + '</a>';
		} else
			return val;
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Soul.group.model.GroupModel;
   	}
});