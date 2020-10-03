Ext.define('Soul.ux.button.PluploadButton', {
    extend: 'Ext.Button',
    alias: ['widget.pluploadbutton'],
    constructor: function (config) {
        var me = this;
        me.callParent(arguments);
        me.on('render', function (btn, eOpts) {
            btn.uploader = Ext.create('Soul.ux.Plupload', {
                browseButton: btn,
                pluploadConfig: eOpts.pluploadConfig
            });
        }, me, {pluploadConfig: config.pluploadConfig});
        me.on('destroy', function (btn, eOpts) {
            if (btn.uploader) {
                try {
                    btn.uploader.uploader.destroy();
                } catch (e) {
                    // console.error(e);
                }
            }
        })
    }
});