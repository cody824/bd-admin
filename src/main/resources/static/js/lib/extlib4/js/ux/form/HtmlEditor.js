Ext.namespace('Ext.ux', 'Ext.ux.form.HtmlEditor');
Ext.ux.form.HtmlEditor.PasteImage = Ext.extend(Ext.util.Observable, {
    // private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('afterrender', this.onAfterrender, this, {
            delay: 200
        });//延时执行事件，避免编辑器未加载完成，导致事件绑定不成功
    },
    // private
    onAfterrender: function(){
        var editor = this.cmp;
        this.cmp.iframeEl.dom.contentWindow.document.onpaste = function(event) {//注册粘贴事件
            var items = (event.clipboardData || event.originalEvent.clipboardData).items;
            for (index in items) {//遍历剪贴板数据
                var item = items[index];
                if (item.kind === 'file') {//是文件，且是图片类型
                    if (item.type.match(/^image\//)) {
                        var blob = item.getAsFile();
                        var reader = new FileReader();
                        reader.onload = function(event) {
                            editor.relayCmd('insertimage', event.target.result);//将图片base64编码的数据，以图片形式插入编辑器中
                        };
                        reader.readAsDataURL(blob);
                        break
                    }
                }
            }
        }
    }
});