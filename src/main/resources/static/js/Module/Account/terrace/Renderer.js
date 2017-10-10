Ext.define('Module.Account.terrace.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Account.terrace.Tools',
 		'Module.Account.terrace.model.TerraceModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return ACCOUNT_TERRACE_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return ACCOUNT_TERRACE_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateTerraceLevel : function(v){
		if(v == null){
			return ACCOUNT_TERRACE_LABEL.unknown;
		}

		switch(v){
			case 1 : return '全部';break;
		}

		return ACCOUNT_TERRACE_LABEL.unknown;
	},
	translateTerraceState : function(v){
		if(v == '00'){
			return ACCOUNT_TERRACE_LABEL.active;
		}else if(v == '10'){
			return ACCOUNT_TERRACE_LABEL.locked;
		}else if(v == '99'){
			return ACCOUNT_TERRACE_LABEL.cancelled;
		}else{
			return ACCOUNT_TERRACE_LABEL.unknown;
		}
	},
	translateTerraceDate : function(v){
		if(v == null) {
			return ACCOUNT_TERRACE_LABEL.unknown;
		}
		
		var year = v.substr(0,4);
		var month = v.substr(4,2);
		var day = v.substr(6,2);
		return Ext.String.format("{0}-{1}-{2}",year,month,day);
	},
	translateTerraceTime : function(value){
		if(value == null) {
			return ACCOUNT_TERRACE_LABEL.unknown;
		}
		
		var year = value.substr(0,4);
		var month = value.substr(4,2);
		var day = value.substr(6,2);
		var hour = value.substr(8,2);
		var min = value.substr(10,2);
		var sec = value.substr(12,2);
		return Ext.String.format("{0}-{1}-{2} {3}:{4}:{5}",year,month,day,hour,min,sec);
	},
	translateTerraceLockIcon : function(val, u, r, rowIndex, columnIndex, s, v){
		var terrace = r.data, me = this;
		var permitOk = me.isPermitOk(terrace, columnIndex, v);
		if (permitOk && terrace.accItemState == this.UM.LOCKED) {
			u.tdAttr = 'data-qtip="' + Ext.String.format(ACCOUNT_TERRACE_MESSAGE.unLockTerrace, r.data.accItemCode) + '"';
			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
		} else if (permitOk && terrace.accItemState != this.UM.LOCKED){
			u.tdAttr = 'data-qtip="' + Ext.String.format(ACCOUNT_TERRACE_MESSAGE.lockTerrace, r.data.accItemCode) + '"';
			return Soul.util.GridRendererUtil.getLockMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	getTerraceName : function(val, u, r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
			return '<a style="cursor:pointer;text-decoration:underline;font-style:italic;"'
			+ 'onclick="Module.Account.terrace.Tools.showTerraceInEast(\'' + r.data.terraceId + '\',event);">' + val + '</a>';
		} else {
			return val;
		}
	},


	
	
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
		if (r.data.role == this.UM.ADMIN_USER) {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.addUserToGroup, r.data.userName) + '"'; 
			return Soul.util.GridRendererUtil.getPlusMgrInnerBox();
		}
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
	
	isPermitOk : function(terrace, columnIndex, v){
		var permitOk = true;
		var operation = v.panel.columns[columnIndex].operation;
		if (terrace.links[operation] == null)
			permitOk = false;
		return permitOk;
	},
	
	translateStaffIcon : function(v, u,r, rowIndex, columnIndex, s,view){
		var render = Module.Account.terrace.Renderer;
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
		var render = Module.Account.terrace.Renderer;
		if(render.isUserEditAble(r.data)){
			u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.delUser, r.data.userName) + '"';
			return Soul.util.GridRendererUtil.getMinusMgrInnerBox();
		}else{
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	
	getUserName : function(val, u,r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
			var icon = '';
			if (r.data.type == "user")
				icon = '<img src="img/icon/user.png"/>';
			else if (r.data.type == "app")
				icon = '<img src="img/icon/view.png"/>';
			return icon + '<a style="cursor:pointer;text-decoration:underline;font-style:italic;" onclick="Module.Account.terrace.Tools.showUserInEast(\''+ r.data.name  +'\',event);">' + val + '</a>';
		} else
			return val;
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Account.terrace.model.TerraceModel;
   	}
});