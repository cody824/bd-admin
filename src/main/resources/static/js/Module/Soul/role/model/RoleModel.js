
Ext.define('Module.Soul.role.model.RoleModel', {
	extend : 'Ext.data.Model',
    fields: ["id", 'name', "comment"]
});

Module.Soul.role.model.RoleModel.ACTIVE = 0;
Module.Soul.role.model.RoleModel.upANDdel = 1;
Module.Soul.role.model.RoleModel.LOCKED = 2;
