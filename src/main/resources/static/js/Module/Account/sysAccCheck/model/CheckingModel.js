Ext.define('Module.Account.sysAccCheck.model.CheckingModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'checkingId',
		mapping : 'obj.checkingId'
	},{
		name : 'checkingName',
		mapping : 'obj.checkingName'
	},{
		name : 'checkingType',
		mapping : 'obj.checkingType'
	},{
		name : 'checkingTime',
		mapping : 'obj.checkingTime'
	},{
		name : 'checkingIsOk',
		mapping : 'obj.checkingIsOk'
	},{
		name : 'checkingDis',
		mapping : 'obj.checkingDis'
	},{
		name : 'checkingState',
		mapping : 'obj.checkingState'
	},{
		name : 'checkingDoDis',
		mapping : 'obj.checkingDoDis'
	},{
		name : 'checkingDoTime',
		mapping : 'obj.checkingDoTime'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});

Module.Account.sysAccCheck.model.CheckingModel.PROCESSED = '20';
Module.Account.sysAccCheck.model.CheckingModel.TOPROCESS = '10';
Module.Account.sysAccCheck.model.CheckingModel.NONEED = '00';

Module.Account.sysAccCheck.model.CheckingModel.YES = 'Y';
Module.Account.sysAccCheck.model.CheckingModel.NO = 'N';

Module.Account.sysAccCheck.model.CheckingModel.MANUAL = '00';
Module.Account.sysAccCheck.model.CheckingModel.SYSTEM = '10';