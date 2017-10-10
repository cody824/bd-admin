Ext.define('Module.CMS.dictionary.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.CMS.dictionary.Tools',
 		'Module.CMS.dictionary.model.DictionaryModel'
  	],
  	
	translateCtime : function(v){
		if (v == null || v == '')
			return '';
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},

	translateDate : function(v){
		if (v == null || v == '')
			return '';
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},

	translateStatus : function(v){
		if (v == Module.CMS.dictionary.model.DictionaryModel.INUSE)
			return DICT_MANAGE_LABEL.used;
		else if (v == Module.CMS.dictionary.model.DictionaryModel.NOTUSE)
			return DICT_MANAGE_LABEL.unused;
		else
			return DICT_MANAGE_LABEL.unknown;
	},

	translateDictIcon : function(val, u,r, rowIndex, columnIndex, s, v){
		var dict = r.data, me = this;
		var permitOk = me.isPermitOk(dict, columnIndex, v);
		if (permitOk && dict.status == this.UM.INUSE) {
			u.tdAttr = 'data-qtip="' + Ext.String.format(DICTIONARY_MESSAGE.dictIsUsed, dict.key) + '"'; 
			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
		} else if (permitOk && dict.status == this.UM.NOTUSE){
			u.tdAttr = 'data-qtip="' + Ext.String.format(DICTIONARY_MESSAGE.useDict, dict.key) + '"';
			return Soul.util.GridRendererUtil.getLockMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},

	translateDictItemIcon : function(val, u,r, rowIndex, columnIndex, s, v){
		var dictItem = r.data, me = this;
		var permitOk = me.isPermitOk(dictItem, columnIndex, v);
		if (permitOk && dictItem.status == this.UM.INUSE) {
			u.tdAttr = 'data-qtip="' + Ext.String.format(DICTIONARY_MESSAGE.DictItemIsUsed, dictItem.key) + '"'; 
			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
		} else if (permitOk && dictItem.status == this.UM.NOTUSE){
			u.tdAttr = 'data-qtip="' + Ext.String.format(DICTIONARY_MESSAGE.useDictItem, dictItem.key) + '"';
			return Soul.util.GridRendererUtil.getLockMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},

	isPermitOk : function(item, columnIndex, v){
		var permitOk = true;
		var operation = v.panel.columns[columnIndex].operation;
		if (item.links[operation] == null)
			permitOk = false;
		return permitOk;
	},

	translateIsValid : function(val, u,r, rowIndex, columnIndex, s, v){
		if (val == 0) {
			return BULLETIN_MANAGE_LABEL.invalid;
		}else if (val == 1) {
			return BULLETIN_MANAGE_LABEL.valid;
		}else {
			return BULLETIN_MANAGE_LABEL.unknownStatus;
		}
	},

	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.CMS.dictionary.model.DictionaryModel;
   	}
});