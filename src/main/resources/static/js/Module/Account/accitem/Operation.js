Ext.define('Module.Account.accitem.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox'
	],
	
	getOperationForAccitem : function(accitem){
		accitem.httpParams = new Object();
		accitem.httpMethod = new Object();
		accitem.requestBody = new Object();
		accitem.methodConfirm = new Object();
		accitem.methodConfirm["lockedAccitem"] = {
			"put" : {
				msg : Ext.String.format(ACCITEM_MESSAGE.confirmLockAccitem, accitem.data.accMenAcc.memAccName)
			},
			"delete" : {
				msg : Ext.String.format(ACCITEM_MESSAGE.confirmUnLockAccitem, accitem.data.accMenAcc.memAccName)
			}	
		};
		accitem.methodConfirm["canceledAccitem"] = {
			"put" : {
				msg : Ext.String.format(ACCITEM_MESSAGE.confirmCancelAccitem, accitem.data.accMenAcc.memAccName)
			}
		};
		
		if (accitem.accItemState == Module.Account.accitem.model.AccitemModel.LOCKED) {
			accitem.httpMethod["lockedAccitem"] = "delete";
		} else  {
			accitem.httpMethod["lockedAccitem"] = "put";
		};
		accitem.httpMethod["canceledAccitem"] = "put";
	},
	
	doLockAccitemFunction : function(records, callbackFn){
		var requestBody = [];
		var confirmBody = [];
		Ext.each(records, function(r, i, rs){
			requestBody.push(r.data.accItemId);
			confirmBody.push(r.data.data.accMenAcc.memAccName);
		});
		var method = "put";
		var accitem = records[0].data;
		var confirm = {
			"put" : {
				msg : Ext.String.format(ACCITEM_MESSAGE.confirmLockAccitem, confirmBody)
			},
			"delete" : {
				msg : Ext.String.format(ACCITEM_MESSAGE.confirmUnLockAccitem, confirmBody)
			}
		};
		if (accitem.accItemState == Module.Account.accitem.model.AccitemModel.LOCKED) {
			method = "delete";
		};
		
		// Soul.Ajax.confirmRestAction("account/lockedAccitems", method, {}, requestBody,  callbackFn, null, null, confirm);
		Soul.Ajax.confirmRestAction(accitem.links.lockedAccitems, method, {}, requestBody,  callbackFn, null, null, confirm);
	},
	
	doCancelAccitemFunction : function(records, callbackFn){
		var requestBody = [];
		var confirmBody = [];
		Ext.each(records, function(r, i, rs){
			requestBody.push(r.data.accItemId);
			confirmBody.push(r.data.data.accMenAcc.memAccName);
		});
		var method = "put";
		var accitem = records[0].data;
		var confirm = {
			"put" : {
				msg : Ext.String.format(ACCITEM_MESSAGE.confirmCancelAccitem, confirmBody)
			}
		};
		
		// Soul.Ajax.confirmRestAction("account/canceledAccitems", method, {}, requestBody,  callbackFn, null, null, confirm);
		Soul.Ajax.confirmRestAction(accitem.links.canceledAccitems, method, {}, requestBody,  callbackFn, null, null, confirm);
	},

	doListRelationUser : function(accItemId) {
        var menu = Module.Account.accitem.Tools.buildRelationUserOptMenu();
        var initToolbar = function(){
        	var toolbar = new Array();
			relationUserMenu = {
				text: RELATIONUSER_LABEL.operation,
            	iconCls: 'pool_setting',
	           	menu: menu
	       	};
			toolbar.push(relationUserMenu);
			return toolbar;
		};

       	var relationUserGrid = Ext.create('Module.Account.accitem.view.RelationUserGrid',{
       		id : 'relationUserGrid',
       		anchor : '100% 100%',
       		dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: initToolbar()
           	}],
        });

       	//设置相关的accItemId
        var store = Ext.data.StoreManager.lookup("Module.Account.accitem.store.RelationUserStore");
       	params = {};
       	params['accItem.accItemId'] = accItemId;
       	store.proxy.extraParams = {
			searchMap : Ext.encode(params)
		};
		
        var win = new Ext.Window({
			title: ACCITEM_LABEL.listRelationUser,
			items: relationUserGrid,
			width: 1230,
			height: 560,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.showAt(10,10);
	},

	doListReconciliation : function(type, typeValue) {
		var reconciliationGrid = Ext.create('Module.Account.accitem.view.ReconciliationGrid',{
       		id : 'reconciliationGrid',
       		anchor : '100% 100%'
        });

        //设置相关的accItemId
        var store = Ext.data.StoreManager.lookup("Module.Account.accitem.store.ReconciliationStore");
       	params = {};
       	if(type == 'accItemId'){
       		params['accItem.accItemId'] = typeValue;
       	}else if(type == 'relationId'){
       		params['relationId'] = typeValue;
       	}
       	store.proxy.extraParams = {
			searchMap : Ext.encode(params)
		};

        var win = new Ext.Window({
			title: ACCITEM_LABEL.listReconciliation,
			items: reconciliationGrid,
			width: 1230,
			height: 560,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.showAt(10,10);
	},

	doListAccCondetaFunction : function(type, typeValue){
		var accCondetaGrid = Ext.create('Module.Account.accitem.view.AccCondetaGrid',{
       		id : 'accCondetaGrid',
       		anchor : '100% 100%'
        });

        //设置相关accItemId,即searchMap
        var store = Ext.data.StoreManager.lookup("Module.Account.accitem.store.AccCondetaStore");
       	params = {};
       	params[type] = typeValue;
       	store.proxy.extraParams = {
			searchMap : Ext.encode(params)
		};

		var win = new Ext.Window({
			title: ACCITEM_LABEL.listAccCondeta,
			items: accCondetaGrid,
			width: 1230,
			height: 560,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.showAt(10,10);
	},


	//查看用户明细
	getOperationForRelationUser : function(relationUser) {
		relationUser.httpParams = new Object();
		relationUser.httpMethod = new Object();
		relationUser.requestBody = new Object();
		relationUser.methodConfirm = new Object();
		relationUser.methodConfirm["lockedRelationUser"] = {
			"put" : {
				msg : Ext.String.format(RELATIONUSER_MESSAGE.confirmLockRelationUser, relationUser.data.relationName)
			},
			"delete" : {
				msg : Ext.String.format(RELATIONUSER_MESSAGE.confirmUnlockRelationUser, relationUser.data.relationName)
			}	
		};
		relationUser.methodConfirm["canceledRelationUser"] = {
			"put" : {
				msg : Ext.String.format(RELATIONUSER_MESSAGE.confirmCancelRelationUser, relationUser.data.relationName)
			}
		};
		
		if (relationUser.relationState == Module.Account.accitem.model.RelationUserModel.LOCKED) {
			relationUser.httpMethod["lockedRelationUser"] = "delete";
		} else  {
			relationUser.httpMethod["lockedRelationUser"] = "put";
		};
		relationUser.httpMethod["canceledRelationUser"] = "put";
	},

	doLockRelationUserFunction : function(records, callbackFn) {
		var requestBody = [];
		var confirmBody = [];
		Ext.each(records, function(r, i, rs){
			confirmBody.push(r.data.relationName);
			requestBody.push(r.data.relationId);
		});
		var method = "put";
		var relationUser = records[0].data;
		var confirm = {
			"put" : {
				msg : Ext.String.format(RELATIONUSER_MESSAGE.confirmLockRelationUser, confirmBody)
			},
			"delete" : {
				msg : Ext.String.format(RELATIONUSER_MESSAGE.confirmUnlockRelationUser, confirmBody)
			}
		};
		if (relationUser.relationState == Module.Account.accitem.model.RelationUserModel.LOCKED) {
			method = "delete";
		};
		
		// Soul.Ajax.confirmRestAction('account/lockedRelationUsers', method, null, requestBody,  callbackFn, null, null, confirm);
		Soul.Ajax.confirmRestAction(relationUser.links.lockedRelationUsers, method, null, requestBody,  callbackFn, null, null, confirm);
	},

	doCancelRelationUserFunction : function(records, callbackFn) {
		var requestBody = [];
		var confirmBody = [];
		Ext.each(records, function(r, i, rs){
			confirmBody.push(r.data.relationName);
			requestBody.push(r.data.relationId);
		});
		var method = "put";
		var relationUser = records[0].data;
		var confirm = {
			"put" : {
				msg : Ext.String.format(RELATIONUSER_MESSAGE.confirmCancelRelationUser, confirmBody)
			},
			"delete" : {
				msg : Ext.String.format(RELATIONUSER_MESSAGE.confirmCancelRelationUser, confirmBody)
			}
		};
		
		// Soul.Ajax.confirmRestAction('account/canceledRelationUsers', method, null, requestBody,  callbackFn, null, null, confirm);
		Soul.Ajax.confirmRestAction(relationUser.links.canceledRelationUsers, method, null, requestBody,  callbackFn, null, null, confirm);
	},
	
	doTransferFunction : function(record, callbackFun) {
		console.log(record)
		   var formpanel = new Ext.FormPanel({
	            labelWidth: 60,
	            width: 400,
	            frame: true,
	            layout: {
	                type: 'column'
	            },
	            items: [{
	                xtype: 'container',
	                columnWidth: .50,
	                autoHeight: true,
	                defaults: {
	                    xtype: 'textfield',
	                    labelAlign: 'right',
	                    width: 250
	                },
	                items: [{
	                    name: 'money',
	                    fieldLabel: ACCITEM_LABEL.transferMoney,
	                    maxLength: 200,
	                    maxLengthText: '最多输入200个字符',
	                    allowBlank: false,
	                    blankText: ACCITEM_LABEL.transferMoney
	             
	                  },
	                    {
	                        name: 'description',
	                        fieldLabel: ACCITEM_LABEL.transferDescription,
	                        readOnly: false,
	                        allowBlank: false,
	                        blankText: ACCITEM_LABEL.transferDescription
	                    }]
	            }]
	        });

	        var win = null;
			win = new Ext.Window({
	            title: SHORTURL_LABEL.create,
	            items: formpanel,
	            stateful: false,
	            autoDestroy: true,
	            bodyStyle: 'padding:5px',
	            modal: true,
	            buttonAlign: 'center',
	            buttons: [{
	                text: LABEL.apply,
	                handler: function () {
	                    if (!formpanel.getForm().isValid()) return;          
	                    var importUrl = "/account/"+record.data.accItemId+"/tranfer/";
	                    
	                    formpanel.submit({
	                        url: importUrl,
	                        method: 'POST',
	                        waitMsg: '正在转账...',
	                        success: function (fp, o) {
	                        	alert("转账成功！")
	                        	callbackFun();
	                            win.close();
	                        },
	                        failure: function (fp, o) {
	                        	callbackFun();
	                            win.close();
	                        }
	                    });


	                }
	            }, {
	                text: LABEL.cancel,
	                handler: function () {
	                    win.close();
	                }
	            }]
	        });

	        win.show();
		
	}
	
});