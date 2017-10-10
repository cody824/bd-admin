
Ext.define('Module.Soul.role.model.RoleModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'obj.id'
	},{
		name : 'name',
		mapping : 'obj.name'
	},{
		name : 'cName',
		mapping : 'obj.cName'
	},{
		name : 'status',
		mapping : 'obj.status'
	},{
		name : 'comment',
		mapping : 'obj.comment'
	},{
		name : 'type',
		mapping : 'obj.type'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});

Module.Soul.role.model.RoleModel.ACTIVE = 0;
Module.Soul.role.model.RoleModel.upANDdel = 1;
Module.Soul.role.model.RoleModel.LOCKED = 2;
