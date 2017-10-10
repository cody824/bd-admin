Ext.define('Module.Account.ledger.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Account.ledger.Tools',
 		'Module.Account.ledger.model.LedgerModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return ACCOUNT_LEDGER_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return ACCOUNT_LEDGER_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateLedgerState : function(v){
		if(v == '00'){
			return ACCOUNT_LEDGER_LABEL.active;
		}else if(v == '10'){
			return ACCOUNT_LEDGER_LABEL.locked;
		}else if(v == '99'){
			return ACCOUNT_LEDGER_LABEL.cancelled;
		}else{
			return ACCOUNT_LEDGER_LABEL.unknown;
		}
	},
	translateLedgerDate : function(v){
		if(v == null) {
			return ACCOUNT_LEDGER_LABEL.unknown;
		}
		
		var year = v.substr(0,4);
		var month = v.substr(4,2);
		var day = v.substr(6,2);
		return Ext.String.format("{0}-{1}-{2}",year,month,day);
	},
	translateLedgerTime : function(value){
		if(value == null) {
			return ACCOUNT_LEDGER_LABEL.unknown;
		}
		
		var year = value.substr(0,4);
		var month = value.substr(4,2);
		var day = value.substr(6,2);
		var hour = value.substr(8,2);
		var min = value.substr(10,2);
		var sec = value.substr(12,2);
		return Ext.String.format("{0}-{1}-{2} {3}:{4}:{5}",year,month,day,hour,min,sec);
	},
	translateLedgerLockIcon : function(val, u, r, rowIndex, columnIndex, s, v){
		var ledger = r.data, me = this;
		var permitOk = me.isPermitOk(ledger, columnIndex, v);
		if (permitOk && ledger.accItemState == this.UM.LOCKED) {
			u.tdAttr = 'data-qtip="' + Ext.String.format(ACCOUNT_LEDGER_MESSAGE.unLockLedger, r.data.accItemCode) + '"';
			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
		} else if (permitOk && ledger.accItemState != this.UM.LOCKED){
			u.tdAttr = 'data-qtip="' + Ext.String.format(ACCOUNT_LEDGER_MESSAGE.lockLedger, r.data.accItemCode) + '"';
			return Soul.util.GridRendererUtil.getLockMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	getLedgerName : function(val, u, r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
			return '<a style="cursor:pointer;text-decoration:underline;font-style:italic;"'
			+ 'onclick="Module.Account.ledger.Tools.showLedgerInEast(\''
			+ r.data.terraceId +'\',event);">' + val + '</a>';
		} else {
			return val;
		}
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Account.ledger.model.LedgerModel;
   	}
});