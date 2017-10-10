Ext.define('Soul.util.GridRendererUtil', {
	singleton: true, 
	
	getLinkName : function (v){
		return '<div style="margin:auto;cursor:pointer;text-decoration:underline;font-style:italic;">'+v+'</div>';
	},
	
	getSecurityMgrInnerBox: function (v, p, record, rowIndex){
		return '<div class="security" style="margin:auto;cursor:pointer;width: 16px; height: 16px;position:relative;left:7px;">';
	},
	
	
	getUnsupportMgrInnerBox: function (v, p, record, rowIndex){
		return '<div class="unsupport" style="margin:auto;width: 16px; height: 16px;position:relative;left:7px;">';
	},
	
	getUserMgrInnerBox: function (v, p, record, rowIndex){
		return '<div class="md-user" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;">';
	},
	
	getUserAdminInnerBox: function (v, p, record, rowIndex){
		return '<div class="md-user-admin" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;">';
	},
	
	getUserNoAdminInnerBox: function (v, p, record, rowIndex){
		return '<div class="md-user-noadmin" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;">';
	},
	
	getUserOfflineInnerBox: function (v, p, record, rowIndex){
		return '<div class="user-locked" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;">';
	},
	
	getGroupMgrInnerBox: function (v, p, record, rowIndex){
		return '<div class="md-group" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;">';
	},
	
	getGroupEmptyMgrInnerBox: function (v, p, record, rowIndex){
		return '<div class="group-empty" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;">';
	},
	
	getSnapshotMgrInnerBox: function (v, p, record, rowIndex){
		return '<div class="md-snapshot" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getRollBackMgrInnerBox : function (v, p, record, rowIndex){
		return '<div class="rollback" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},

	getCloneMgrInnerBox : function (v, p, record, rowIndex){
		return '<div class="clone" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getLockMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="lock" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},

	getLockedMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="locked" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getKeyMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="key" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getNfsMountMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="nfs24" style="margin:auto;width: 24px; height: 24px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getNfsUnMountMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="nfs_unmount" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getSharesMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="shares" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getDownloadInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="x-download-icon" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getQuotaMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="quota" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getUpdateMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="update" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getDiskMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="md-disk" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getSetupMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="settings" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getDeleteMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="delete" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getExportMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="export" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getImportMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="import" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getPlusMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="plus" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getMinusMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="minus" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},
	
	getDarkStarMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="darkstar" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	},

	getLightStarMgrInnerBox : function (v, u,r, rowIndex, columnIndex, s){
		return '<div class="lightstar" style="margin:auto;width: 16px; height: 16px; cursor:pointer;position:relative;left:7px;"></div>';
	}
});
