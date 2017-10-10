Ext.define('Module.CMS.dictionary.model.DictionaryItemModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'obj.id'
	},{
		name : 'name',
		mapping : 'obj.name'
	},{
		name : 'description',
		mapping : 'obj.description'
	},{
		name : 'key',
		mapping : 'obj.key'
	},{
		name : 'value',
		mapping : 'obj.value'
	},{
		name : 'dictId',
		mapping : 'obj.dictId'
	},{
		name : 'dictKey',
		mapping : 'obj.dictKey'
	},{
		name : 'domain',
		mapping : 'obj.domain'
	},{
		name : 'status',
		mapping : 'obj.status'
	},{
		name : 'seqnum',
		mapping : 'obj.seqnum'
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

