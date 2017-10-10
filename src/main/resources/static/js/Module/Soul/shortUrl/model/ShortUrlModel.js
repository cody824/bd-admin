
Ext.define('Module.Soul.shortUrl.model.ShortUrlModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'objId',
		mapping : 'objId'
	},{
		name : 'srcUrl',
		mapping : 'srcUrl'
	},{
		name : 'destUrl',
		mapping : 'destUrl'
	},{
		name : 'code',
		mapping : 'code'
	},{
		name : 'mode',
		mapping : 'mode'
	},{
		name : 'viewNum',
		mapping : 'viewNum'
	},{
		name : 'status',
		mapping : 'status'
	},{
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'etime',
		mapping : 'etime'
	},{
		name : 'description',
		mapping : 'description'
	}]
});

Module.Soul.shortUrl.model.ShortUrlModel.STATE_OPEN = 1;
Module.Soul.shortUrl.model.ShortUrlModel.STATE_CLOSE = 0;