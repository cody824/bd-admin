Ext.define('Soul.store.UploadStore', {
    extend    : 'Ext.data.Store',
    requires  : ['Soul.model.UploadModel'],

    model     : 'Soul.model.UploadModel',
    storeId   : 'Soul.store.UploadStore',
    
    
    proxy: {
        type: 'memory'
	},
    
	listeners: {
    }
});