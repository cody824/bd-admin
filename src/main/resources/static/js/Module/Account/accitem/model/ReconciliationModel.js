Ext.define('Module.Account.accitem.model.ReconciliationModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'reconciliationID',
		mapping : 'obj.reconciliationID'
	},{
		name : 'reconciliationMode',
		mapping : 'obj.reconciliationMode'
	},{
		name : 'reconciliationChange',
		mapping : 'obj.reconciliationChange'
	},{
		name : 'reconciliationTime',
		mapping : 'obj.reconciliationTime'
	},{
		name : 'accItemUseBalna',
		mapping : 'obj.accItemUseBalna'
	},{
		name : 'accItemAllBalna',
		mapping : 'obj.accItemAllBalna'
	},{
		name : 'accItemChangeBalna',
		mapping : 'obj.accItemChangeBalna'
	},{
		name : 'relationId',
		mapping : 'obj.relationId'
	},{
		name : 'accItem',
		mapping : 'obj.accItem'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});