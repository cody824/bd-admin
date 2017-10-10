Ext.define('Module.CMS.dictionary.model.DictionaryModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'obj.id'
	},{
		name : 'key',
		mapping : 'obj.key'
	},{
		name : 'name',
		mapping : 'obj.name'
	},{
		name : 'description',
		mapping : 'obj.description'
	},{
		name : 'status',
		mapping : 'obj.status'
	},{
		name : 'domain',
		mapping : 'obj.domain'
	},{
		name : 'ctime',
		mapping : 'obj.ctime'
	},{
		name : 'mtime',
		mapping : 'obj.mtime'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});

Module.CMS.dictionary.model.DictionaryModel.INUSE = '0';
Module.CMS.dictionary.model.DictionaryModel.NOTUSE = '1';


