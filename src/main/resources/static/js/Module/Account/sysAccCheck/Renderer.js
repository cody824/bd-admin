Ext.define('Module.Account.sysAccCheck.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Account.sysAccCheck.Tools',
 		'Module.Account.sysAccCheck.model.CheckingModel'
  	],
  	translateCtime : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateCheckingDate : function(v){
		if(v == null) {
			return ACCOUNT_CHECKING_LABEL.unknown;
		}
		
		var year = v.substr(0,4);
		var month = v.substr(4,2);
		var day = v.substr(6,2);
		return Ext.String.format("{0}-{1}-{2}",year,month,day);
	},
	translateCheckingTime : function(value){
		if(value == null) {
			return ACCOUNT_CHECKING_LABEL.unknown;
		}
		
		var year = value.substr(0,4);
		var month = value.substr(4,2);
		var day = value.substr(6,2);
		var hour = value.substr(8,2);
		var min = value.substr(10,2);
		var sec = value.substr(12,2);
		return Ext.String.format("{0}-{1}-{2} {3}:{4}:{5}",year,month,day,hour,min,sec);
	},
	translateCheckingState : function(val, u, r, rowIndex, columnIndex, s) {
		if(val == null) {
			return ACCOUNT_CHECKING_LABEL.unknown;
		}
		
		if(val == Module.Account.sysAccCheck.model.CheckingModel.PROCESSED){
			return ACCOUNT_CHECKING_LABEL.checkingState_processed;
		}else if(val == Module.Account.sysAccCheck.model.CheckingModel.TOPROCESS){
			return ACCOUNT_CHECKING_LABEL.checkingState_toProcess;
		}else if(val == Module.Account.sysAccCheck.model.CheckingModel.NONEED){
			return ACCOUNT_CHECKING_LABEL.checkingState_noNeedProcess;
		}
	},
	translateCheckingIsOK : function(val, u, r, rowIndex, columnIndex, s) {
		if(val == null) {
			return ACCOUNT_CHECKING_LABEL.unknown;
		}
		
		if(val == Module.Account.sysAccCheck.model.CheckingModel.YES){
			return ACCOUNT_CHECKING_LABEL.checkingIsOK_yes;
		} else if(val == Module.Account.sysAccCheck.model.CheckingModel.NO){
			return ACCOUNT_CHECKING_LABEL.checkingIsOK_no;
		}
	},
	translateCheckingType : function(val, u, r, rowIndex, columnIndex, s) {
		if(val == null) {
			return ACCOUNT_CHECKING_LABEL.unknown;
		}
		
		if(val == Module.Account.sysAccCheck.model.CheckingModel.MANUAL){
			return ACCOUNT_CHECKING_LABEL.checkingType_manual;
		} else if(val == Module.Account.sysAccCheck.model.CheckingModel.SYSTEM){
			return ACCOUNT_CHECKING_LABEL.checkingType_system;
		}
	},
	getCheckingName : function(val, u, r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
			return '<a style="cursor:pointer;text-decoration:underline;font-style:italic;"'
			+ 'onclick="Module.Account.sysAccCheck.Tools.showCheckingInEast(\''
			+ r.data.checkingId + '\',event);">' + val + '</a>';
		} else {
			return val;
		}
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Account.sysAccCheck.model.CheckingModel;
   	}
});