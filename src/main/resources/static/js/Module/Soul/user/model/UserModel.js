
Ext.define('Module.Soul.user.model.UserModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'obj.id'
	},{
		name : 'name',
		mapping : 'obj.name'
	},{
		name : 'email',
		mapping : 'obj.email'
	},{
		name : 'password',
		mapping : 'obj.password'
	},{
		name : 'status',
		mapping : 'obj.status'
	},{
		name : 'mobilePhone',
		mapping : 'obj.mobilePhone'
	},{
		name : 'registdate',
		mapping : 'obj.registdate'
	},{
		name : 'updatedate',
		mapping : 'obj.updatedate'
	},{
		name : 'type',
		mapping : 'obj.type'
	},{
		name : 'source',
		mapping : 'obj.source'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	},{
		name : 'lastLoginTime',
		mapping : 'obj.lastLoginTime'
	},{
		name : 'firstLoginTime',
		mapping : 'obj.firstLoginTime'
	}]
});

Module.Soul.user.model.UserModel.ACTIVE = 0;
Module.Soul.user.model.UserModel.UNACTIVE = 1;
Module.Soul.user.model.UserModel.LOCKED = 2;
