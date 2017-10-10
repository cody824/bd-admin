Ext.define('SureAdmin.util.Common', {
    singleton: true, 
});


Ext.apply(Ext.form.VTypes, {
	loginName:function(v,field) {
		var reg = /^\w+$/; 
		field.vtypeText = LOGIN_SELF_HELP.userName;
		if(reg.exec(v) == null){
			return false;
		}
		if(v.length < 4 || v.length > 16){
			return false;
		}
		return true;
	}
});
