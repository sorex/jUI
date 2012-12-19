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
            $(":checkbox",this.element).after("<span class='jui-checkbox'></span>").click(function (event) {//checkbox的点击事件

                var tagObject = $(this);
                var tagNextObject = tagObject.next();

                if (tagObject.is(':checked')) {
                    tagNextObject.addClass("jui-checkbox-checked");
                    tagObject.checked = true;
                    tagNextObject.removeClass("jui-checkbox-checked-hover jui-checkbox-checked-checked");
                    //tagNextObject.removeClass('jui-checkbox-checked-checked');
                }
                else {

                    tagNextObject.removeClass('jui-checkbox-checked-checked jui-checkbox-checked');
                    //tagNextObject.removeClass('jui-checkbox-checked');
                    tagNextObject.addClass("jui-checkbox-checked-hover");
                    tagObject.checked = false;
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
                $(this).addClass('jui-checkbox-label');
                var tagPrevObject = $(this).prev();
                if (tagPrevObject.attr("class") == 'jui-checkbox') {
                    tagPrevObject.addClass('jui-checkbox-checked-hover');
                } else {
                    tagPrevObject.addClass('jui-checkbox-checked-checked');
                }

                event.stopPropagation();
            }).mouseout(function (event) {
                var tagPrevObject = $(this).prev();
                tagPrevObject.removeClass('jui-checkbox-checked-hover jui-checkbox-checked-checked');
                //tagPrevObject.removeClass('jui-checkbox-checked-checked');
                event.stopPropagation();
            });

           

            $(":checkbox:checked", this.element).each(function () {
                //if ($(this).is(':checked')) {
                var tagNextObject = $(this).next();

                    tagNextObject.addClass("jui-checkbox-checked");
                    $(this).checked = true;
                    tagNextObject.removeClass("jui-checkbox-checked-hover jui-checkbox-checked-checked");
                    //tagNextObject.removeClass('jui-checkbox-checked-checked');
                //}
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