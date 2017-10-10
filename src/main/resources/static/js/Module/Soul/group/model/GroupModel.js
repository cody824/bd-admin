
Ext.define('Module.Soul.group.model.GroupModel', {
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
		name : 'parentGroupId',
		mapping : 'obj.parentGroupId'
	},{
		name : 'domain',
		mapping : 'obj.domain'
	},{
		name : 'type',
		mapping : 'obj.type'
	},{
		name : 'createrId',
		mapping : 'obj.createrId'
	},{
		name : 'comment',
		mapping : 'obj.comment'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});

Module.Soul.group.model.GroupModel.ACTIVE = 0;
Module.Soul.group.model.GroupModel.UNACTIVE = 1;
Module.Soul.group.model.GroupModel.LOCKED = 2;
