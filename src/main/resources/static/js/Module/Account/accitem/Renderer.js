Ext.define('Module.Account.accitem.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Account.accitem.Tools',
 		'Module.Account.accitem.model.AccitemModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return ACCITEM_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return ACCITEM_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateAccitemState : function(v){
		if(v == '00'){
			return ACCITEM_LABEL.active;
		}else if(v == '20'){
			return ACCITEM_LABEL.locked;
		}else if(v == '30'){
			return ACCITEM_LABEL.cancelled;
		}else{
			return ACCITEM_LABEL.unknown;
		}
	},
	getMemAccName : function(v){
		if(v != null) {
			return v.memAccName;
		}else{
			return ACCITEM_LABEL.unknown;
		}
	},
	translateAccitemLockIcon : function(val, u, r, rowIndex, columnIndex, s, v){
		var accitem = r.data, me = this;
		var permitOk = me.isPermitOk(accitem, columnIndex, v);
		if (permitOk && accitem.accItemState == this.UM.LOCKED) {
			u.tdAttr = 'data-qtip="' + Ext.String.format(ACCITEM_MESSAGE.unLockAccitem, r.data.accItemCode) + '"';
			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
		} else if (permitOk && accitem.accItemState == this.UM.ACTIVE){
			u.tdAttr = 'data-qtip="' + Ext.String.format(ACCITEM_MESSAGE.lockAccitem, r.data.accItemCode) + '"';
			return Soul.util.GridRendererUtil.getLockMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	translateAccitemCancelIcon : function(val, u, r, rowIndex, columnIndex, s, v){
		var accitem = r.data, me = this;
		var permitOk = me.isPermitOk(accitem, columnIndex, v);
		if (permitOk && accitem.accItemState == this.UM.CANCELLED) {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}else{
			u.tdAttr = 'data-qtip="' + Ext.String.format(ACCITEM_MESSAGE.cancelAccitem, r.data.accItemCode) + '"';
			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
		}
	},
	getAccitemName : function(val, u, r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
			return '<a style="cursor:pointer;text-decoration:underline;font-style:italic;"'
			+ 'onclick="Module.Account.accitem.Tools.showAccitemInEast(\''
			+ r.data.accItemId +'\',event);">' + val + '</a>';
		} else {
			return val;
		}
	},
	isPermitOk : function(accitem, columnIndex, v){
		var permitOk = true;
		var operation = v.panel.columns[columnIndex].operation;
		if (accitem.links[operation] == null)
			permitOk = false;
		return permitOk;
	},



	//用户明细
	translateRelationBoundType : function(val){
		if(val == null){
			return RELATIONUSER_LABEL.unknown;
		}

		if(val == '00'){
			return '手机';
		}else if(val == '10'){
			return '邮箱';
		}else if(val == '99'){
			return '未注册';
		}else{
			return RELATIONUSER_LABEL.unknown;
		}
	},
	translateRelationUserState : function(val){
		if(val == null){
			return RELATIONUSER_LABEL.unknown;
		}

		if(val == '00'){
			return '开通';
		}else if(val == '20'){
			return '锁定';
		}else if(val == '99'){
			return '注销';
		}else{
			return RELATIONUSER_LABEL.unknown;
		}
	},


	//对账明细
	translateReconciliationMode : function(val){
		if(val == null){
			return RECONCILIATION_LABEL.unknown;
		}

		if(val == '00'){
			return '入金';
		}else if(val == '10'){
			return '出金';
		}else if(val == '20'){
			return '交易转出';
		}else if(val == '30'){
			return '交易转入'
		}else{
			return RECONCILIATION_LABEL.unknown;
		}
	},
	
	translateChangeBalna : function(type, val, record){
		if(type == 'in'){
			var mode = record.data.reconciliationMode;
			switch(mode){
				case '00' : return val; break;
				case '10' : return 0; break;
				case '20' : return 0; break;
				case '30' : return val; break;
			}
		}else if(type == 'out'){
			var mode = record.data.reconciliationMode;
			switch(mode){
				case '00' : return 0; break;
				case '10' : return val; break;
				case '20' : return val; break;
				case '30' : return 0; break;
			}
		}else{
			return RECONCILIATION_LABEL.unknown;
		}
	},

	//冻结明细
	translateAccCondetaType : function(val){
		if(val == null){
			return ACCCONDETA_LABEL.unknown;
		}

		if(val == '00'){
			return '出金冻结';
		}else if(val == '10'){
			return '服务消费冻结';
		}else{
			return ACCCONDETA_LABEL.unknown;
		}
	},

	translateAccCondetaState : function(val){
		if(val == null){
			return ACCCONDETA_LABEL.unknown;
		}

		if(val == '00'){
			return '已付';
		}else if(val == '10'){
			return '冻结';
		}else if(val == '20'){
			return '已解冻';
		}else{
			return ACCCONDETA_LABEL.unknown;
		}
	},

	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Account.accitem.model.AccitemModel;
   	}
});