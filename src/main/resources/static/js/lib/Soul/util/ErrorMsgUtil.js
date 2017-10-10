Ext.define('Soul.util.ErrorMsgUtil', {
	 singleton: true, 
	 
	 UNKNOWNERRNO : 65535,
	 
	 /*
	 *通过传入的错误号，返回错误信息！
	 *
	*/
	parseError : function (errorNum){
		if(ERROR_INFO[errorNum])
			return LABEL.errorNum+':'+errorNum+'!<br>'+LABEL.errorDesc+'<span style="color:red;">'+ERROR_INFO[errorNum] + '</span>';
		else{
			if(errorNum == 0)
				return LABEL.task_complete;
			else {
				return '<span style="color:red;">' + errorNum + '</span>';
			}
		}
		
	}, 
	
	 /*
	 *返回错误显示信息！
	 *
	*/
	parseErrorMsg : function (error){
		var errorNum = Soul.util.ErrorMsgUtil.UNKNOWNERRNO, 
			errorDesc = LABEL.unknownError;
		
		if (error.hasOwnProperty('errorNum'))
			errorNum = error.errorNum;
		

		var args = '';
		if (error.hasOwnProperty('errorArgs') && Ext.isArray(error.errorArgs) && error.errorArgs.length > 0) {
			args = "Ext.String.format(ERROR_INFO[" + errorNum + "],";
			for(var i = 0 ; i < error.errorArgs.length; i++) {
				if(i == (error.errorArgs.length - 1))
					args += 'error.errorArgs[' + i + ']';
				else
					args += 'error.errorArgs[' + i + '],';
			}
			args +=")";
		} else {
			args = 'ERROR_INFO[' + errorNum + ']';
		}
		
		if (args.length > 0 ) {
			try{
				errorDesc = eval(args);
				if (!errorDesc)
					errorDesc = error.errorMsg;
			}catch(e){
				if (error.hasOwnProperty('errorMsg'))
					errorDesc = error.errorMsg;
			}
		} else if (args.length == 0 && error.hasOwnProperty(error.errorMsg)) {
			errorDesc = error.errorMsg;
		}
		return LABEL.errorNum + ':' + errorNum + '!<br>' + LABEL.errorDesc + ':<span style="color:red;">' + errorDesc + '</span>';
	},
	
	/*
	 *通过传入的错误号，返回系统状态信息！
	 *
	*/
	parseSysStatus : function (sysStatus){
		if(ERROR_INFO[sysStatus.errorNum])
			return sysStatus.devName+":"+ERROR_INFO[sysStatus.errorNum];
		else{
			return sysStatus.devName+":"+sysStatus.errorNum;
		}
	}
});
