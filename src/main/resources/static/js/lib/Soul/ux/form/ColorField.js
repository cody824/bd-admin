Ext.define('Soul.ux.form.ColorField', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.colorfield',
    requires: ['Ext.picker.Color'],
    triggerTip: '请选择一个颜色',
    labelWidth: 60,
    fieldLabel: '颜色',
    value: '#FFFFFF',
    createPicker: function () {
        var me = this;
        var config = {
            pickerField: me,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            autoScroll: true,
            minWidth: 195,
            listeners: {
                select: function (picker, selColor) {
                    me.setValue("#" + selColor);
                    // 实现根据选择的颜色来改变背景颜色,根据背景颜色改变字体颜色,防止看不到值
                    var r = parseInt(selColor.substring(0, 2), 16);
                    var g = parseInt(selColor.substring(2, 4), 16);
                    var b = parseInt(selColor.substring(4, 6), 16);
                    var a = new Ext.draw.Color(r, g, b);
                    var l = a.getHSL()[2];
                    if (l > 0.5 || selColor.toLowerCase() === 'ffff00') {
                        me.setFieldStyle('background:#' + selColor + ';color:#000000');
                    }
                    else {
                        me.setFieldStyle('background:#' + selColor + ';color:#FFFFFF');
                    }
                }
            }
        };
        //自定义颜色选择
        if (Ext.isArray(me.colors)) {
            config.colors = me.colors;
        }
        return Ext.create('Ext.picker.Color', config);
    }

    /*
    // 使用该颜色组件，要监听boxready、change两个事件，在初始化时默认值时，不用触发select事件，就可以显示出背景色
     boxready: function (obj) {
         if (obj.inputEl)
         obj.inputEl.el.dom.style.backgroundColor = this.value;
     },
     change: function (obj, newValue, oldValue) {
         if (obj.inputEl)
         obj.inputEl.el.dom.style.backgroundColor = newValue;
     }
    *
    * */
});
