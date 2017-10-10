Ext.define('Soul.ux.grid.column.ComboColumn', {
	extend : 'Ext.grid.column.Column',
	alternateClassName : 'Soul.ux.ComboColumn',
	alias : 'widget.combocolumn',

	comboData : null,
	/**
	 * @property {Boolean} searchType
	 * 搜索类型
	 */
	searchType : 'combo',
	
	comboStore : null,
	
	renderer : function(val, u,r, rowIndex, columnIndex, s){
		if (this.columns[columnIndex - 1].comboData != null) {
			var cd = this.columns[columnIndex - 1].comboData;
			Ext.each(cd, function(d, i, ds) {
				if (val == d[0]) {
					val = d[1];
					return false;
				}
			});
			return val;
		} else if (this.columns[columnIndex - 1].comboCfg != null) {
			var records = this.columns[columnIndex - 1].comboCfg.store.getRange();
			Ext.each(records, function(r, i, rs){
				if (val == r.data.code) {
					val = r.data.name;
					return false;
				}
			});
			return val;
		}
		return val;
	}

});