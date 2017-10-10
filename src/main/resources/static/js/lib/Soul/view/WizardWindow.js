Ext.define('Soul.view.WizardWindow', {
    extend   : 'Ext.Window',
    
    navigate : function(panel, direction){     
        var layout = panel.getLayout();    
        layout[direction]();     
        Ext.getCmp('move-prev').setDisabled(!layout.getPrev());     
        Ext.getCmp('move-next').setDisabled(!layout.getNext());
        Ext.getCmp('wizard-submit').setVisible(!layout.getNext());
    },
	
    submitFn : Ext.emptyFn,
    
	initComponent : function(){
        var me = this;
        Ext.apply(this, {
//	       	width: 500,     
//	    	height: 400,
//	    	title : 'WizardWin',
//	    	id : 'WizardWin',
//			frame : true,
			stateful : false,
			layout: 'card',
        	activeItem: 0,
        	modal: true,
			bodyStyle: 'padding:15px',    
       		defaults: {border: false}, 
       		buttonAlign: 'center',
			buttons: [{
				text : LABEL.prevStep,
				id: 'move-prev',
				handler: function(btn) {
                	me.navigate(btn.up("panel"), "prev");            
            	}, 
			}, {
				text : LABEL.nextStep,
				id: 'move-next',   
				handler: function(btn) {
                	me.navigate(btn.up("panel"), "next");            
           		}, 
			}, {
				text : LABEL.submit,
				id: 'wizard-submit',
				hidden : true,
				handler : this.submitFn
			}, {
				text : LABEL.cancel,
				id: 'wizard-cancel',
				handler : function() {
					me.destroy();
				}
			}]
		});
    	this.callParent(arguments);
  	}
	
});