Ext.define('Soul.ux.Plupload', {
    constructor: function (config) {
        var me = this;
        var cfg = config || {};
        if (!cfg.pluploadConfig) {
            cfg.pluploadConfig = {};
        }
        else {
            var tmp_cfg = cfg.pluploadConfig;
            cfg.pluploadConfig = {};
            Ext.Object.merge(cfg.pluploadConfig, tmp_cfg);
        }
        if (!cfg.pluploadConfig.runtimes) {
            var runtimes = 'html5';
            if (cfg.pluploadConfig.flash_swf_url) {
                runtimes += ',flash';
            }
            if (cfg.pluploadConfig.silverlight_xap_url) {
                runtimes += ',silverlight';
            }
            runtimes += ',html4';
            cfg.pluploadConfig.runtimes = runtimes;
        }
        if (!cfg.pluploadConfig.filters) {
            cfg.pluploadConfig.filters = {
                max_file_size: '10mb'
            }
        }
        else {
            if (!cfg.pluploadConfig.filters.max_file_size) {
                cfg.pluploadConfig.filters.max_file_size = '10mb';
            }
        }
        cfg.pluploadConfig.browse_button = cfg.browseButton.getEl().dom.id;
        me.uploader = new plupload.Uploader(cfg.pluploadConfig);
        me.uploader.init();
    }
});