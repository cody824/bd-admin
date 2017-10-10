Ext.define('Soul.model.UploadModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'fileName',
		mapping : 'fileName'
	}, {
		name : 'originalFilename',
		mapping : 'originalFilename'
	}, {
		name : 'size',
		mapping : 'size'
	}, {
		name : 'status',
		mapping : 'status'
	}]
});