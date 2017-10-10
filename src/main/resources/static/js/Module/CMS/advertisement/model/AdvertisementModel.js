Ext.define('Module.CMS.advertisement.model.AdvertisementModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'trade_id',
		mapping : 'obj.trade_id'
	},{
		name : 'adv_title',
		mapping : 'obj.adv_title'
	},{
		name : 'adv_type',
		mapping : 'obj.adv_type'
	},{
		name : 'adv_content',
		mapping : 'obj.adv_content'
	},{
		name : 'adv_url',
		mapping : 'obj.adv_url'
	},{
		name : 'enable_tag',
		mapping : 'obj.enable_tag'
	},{
		name : 'state_date',
		mapping : 'obj.state_date'
	},{
		name : 'end_date',
		mapping : 'obj.end_date'
	},{
		name : 'oper_user',
		mapping : 'obj.oper_user'
	},{
		name : 'oper_time',
		mapping : 'obj.oper_time'
	},{
		name : 'publish_user_id',
		mapping : 'obj.publish_user_id'
	},{
		name : 'publish_date',
		mapping : 'obj.publish_date'
	},{
		name : 'adv_publisher',
		mapping : 'obj.adv_publisher'
	},{
		name : 'adv_contact',
		mapping : 'obj.adv_contact'
	},{
		name : 'adv_state',
		mapping : 'obj.adv_state'
	},{
		name : 'adv_id',
		mapping : 'obj.adv_id'
	},{
		name : 'actual_end_date',
		mapping : 'obj.actual_end_date'
	},{
		name : 'adv_site',
		mapping : 'obj.adv_site'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});

Module.CMS.advertisement.model.AdvertisementModel.REVOKED = '3';
Module.CMS.advertisement.model.AdvertisementModel.RELEASED = '1';
