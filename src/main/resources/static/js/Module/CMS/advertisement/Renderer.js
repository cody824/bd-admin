Ext.define('Module.CMS.advertisement.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.CMS.advertisement.Tools',
 		'Module.CMS.advertisement.model.Adv_siteModel'
  	],
  	
	translateCtime : function(v){
		if(window.console){console.log("renderer translateCtime test");}
		if (v == null || v == '')
			return '';
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},

	translateDate : function(v){
		if(window.console){console.log("renderer translateCtime test");}

		if (v == null || v == '')
			return '';
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},

	translateRevokeTime : function(v, r){
		if(window.console){console.log("renderer translateRevokeTime test");}
		var dt = '';
		if (v == null || v == '' || r.data.adv_state == Module.CMS.advertisement.model.AdvertisementModel.RELEASED){
			dt = ADV_MANAGE_LABEL.norevoke;
		}else {
			dt = dt + Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
		}
		return dt;
	},
	
	translateIsValid : function(v){
		if (v == 0)
			return ADV_MANAGE_LABEL.invalid;
		else if (v == 1)
			return ADV_MANAGE_LABEL.valid;
		else
			return ADV_MANAGE_LABEL.unknown;
	},

	translateAdvStatus : function(v){
		if (v == 3)
			return ADV_MANAGE_LABEL.revoked;
		else if (v == 1)
			return ADV_MANAGE_LABEL.releasing;
		else
			return ADV_MANAGE_LABEL.unknown;
	},

	translateType : function(val){
		if (val == '1')
			return ADV_MANAGE_LABEL.word;
		else if (val == '2')
			return ADV_MANAGE_LABEL.picture;
		else
			return ADV_MANAGE_LABEL.unknown;
	},

	translateReleasedAdv : function(val, u,r){
		site = r.data;
		var num = Soul.Ajax.getSyncData('/common/adv_site/'+site.trade_id+'/released_num', '');
		var str = num + '条';
		return str;
	},

	translateSiteStatus : function(val, u,r){
		site = r.data;
		var status = Soul.Ajax.getSyncData('/common/adv_site/'+site.trade_id+'/status', '');
		if (status == 1)
			return ADV_MANAGE_LABEL.notexpired;
		else if (status == 2)
			return ADV_MANAGE_LABEL.expired;
		else
			return ADV_MANAGE_LABEL.none;
	},

	getAdvertisementCode : function(val, u, r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
			return '<a style="cursor:pointer;text-decoration:underline;font-style:italic;"'
			+ 'onclick="Module.CMS.advertisement.Tools.showAdvSiteInEast(\''
			+ r.data.trade_id +'\',event);">' + val + '</a>';
		} else {
			return val;
		}
	},

	translateLockIcon : function(val, u,r, rowIndex, columnIndex, s, v){
		var adv = r.data, me = this;
		var permitOk = me.isPermitOk(adv, columnIndex, v);
		if (permitOk && adv.adv_state == this.UM.RELEASED) {
			u.tdAttr = 'data-qtip="' + Ext.String.format(ADV_MESSAGE.IsReleased, adv.adv_title) + '"'; 
			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
		} else if (permitOk && adv.adv_state == this.UM.REVOKED){
			u.tdAttr = 'data-qtip="' + Ext.String.format(ADV_MESSAGE.releaseAdv, adv.adv_title) + '"';
			return Soul.util.GridRendererUtil.getLockMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},

	isPermitOk : function(adv, columnIndex, v){
		var permitOk = true;
		var operation = v.panel.columns[columnIndex].operation;
		if (adv.links[operation] == null)
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
        this.UM = Module.CMS.advertisement.model.AdvertisementModel;
   	}
});