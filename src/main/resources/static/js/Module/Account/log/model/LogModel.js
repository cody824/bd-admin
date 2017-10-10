Ext.define('Module.Account.log.model.LogModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'obj.id'
	},{
		name : 'luser',
		mapping : 'obj.luser'
	},{
		name : 'ldate',
		mapping : 'obj.ldate'
	},{
		name : 'url',
		mapping : 'obj.url'
	},{
		name : 'method',
		mapping : 'obj.method'
	},{
		name : 'lip',
		mapping : 'obj.lip'
	},{
		name : 'lcontext',
		mapping : 'obj.lcontext'
	},{
		name : 'luserRole',
		mapping : 'obj.luserRole'
	},{
		name : 'requestType',
		mapping : 'obj.requestType'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});