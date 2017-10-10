Ext.define('Module.Account.sysRunPara.model.SysRunParaModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'sysRunParaId',
		mapping : 'obj.sysRunParaId'
	},{
		name : 'sysRunParaCode',
		mapping : 'obj.sysRunParaCode'
	},{
		name : 'sysRunParaName',
		mapping : 'obj.sysRunParaName'
	},{
		name : 'sysRunParaType',
		mapping : 'obj.sysRunParaType'
	},{
		name : 'sysRunParaValue',
		mapping : 'obj.sysRunParaValue'
	},{
		name : 'sysRunParaNote',
		mapping : 'obj.sysRunParaNote'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});