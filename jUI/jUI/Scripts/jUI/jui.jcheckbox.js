/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI jsortSelect Plugin
/*
* jQuery UI jsortSelect
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/


/*
* Author: Leidc
* Start date: 2012-11-30
* Description: checkbox美化

/*
* options:

*		
* event
*		
*	    
*/

(function ($, undefined) {
    $.widget("jui.jcheckbox",
    {
        options: {
            items: null
        },

        _create: function () {
            var self = this,
            o = this.options;
            $(this.element).find(":checkbox").after("<span class='jui-checkbox'></span>").click(function (event) {//checkbox的点击事件
                if ($(this).is(':checked')) {

                    $(this).next().addClass("jui-checkbox-checked");
                    $(this).checked = true;
                    $(this).next().removeClass("jui-checkbox-checked-hover");
                    $(this).next().removeClass('jui-checkbox-checked-checked');
                }
                else {

                    $(this).next().removeClass('jui-checkbox-checked-checked');
                    $(this).next().removeClass('jui-checkbox-checked');
                    $(this).next().addClass("jui-checkbox-checked-hover");
                    $(this).checked = false;
                }
                event.stopPropagation();

            }).hide().next().click(function (event) { //背景图片点击事件
                var myObject = document.getElementById($(this).prev().attr("id"));
                if (myObject.checked == true) {
                    $(this).removeClass('jui-checkbox-checked');
                    myObject.checked = false;
                } else {
                    myObject.checked = true;
                    $(this).addClass('jui-checkbox-checked')
                }
                event.stopPropagation();

            }).next().mouseover(function (event) {
                $(this).addClass('jui-checkbox-laber');

                if ($(this).prev().attr("class") == 'jui-checkbox') {
                    $(this).prev().addClass('jui-checkbox-checked-hover');
                } else {
                    $(this).prev().addClass('jui-checkbox-checked-checked');
                }

                event.stopPropagation();
            }).mouseout(function (event) {
                $(this).prev().removeClass('jui-checkbox-checked-hover');
                $(this).prev().removeClass('jui-checkbox-checked-checked');
                event.stopPropagation();
            });


            $(this.element).find(":checkbox").each(function () {
                if ($(this).is(':checked')) {
                    $(this).next().addClass("jui-checkbox-checked");
                    $(this).checked = true;
                    $(this).next().removeClass("jui-checkbox-checked-hover");
                    $(this).next().removeClass('jui-checkbox-checked-checked');
                }
            });
        },


        _setOption: function (key, value) {
            if (value !== undefined || value != null)
                this.options[key] = value;
            else
                return this.options[key];
        },

        _setOptions: function (options) {
            $.each(options, function (key, value) {
                this._setOption(key, value);
            });
        },


        _destroy: function () {
            $(this.element).empty();
            $(this).empty();

            return this;
        }
    });

    $.extend($.jui.jtip, {
        version: "0.1.0"
    });
})(jQuery);