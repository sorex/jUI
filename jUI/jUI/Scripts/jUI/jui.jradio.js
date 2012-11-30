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
* Description: radio美化

/*
* options:

*		
* event
*		
*	    
*/

(function ($, undefined) {
    $.widget("jui.jradio",
    {
        options: {
            items: null
        },

        _create: function () {
            var self = this,
            o = this.options;
            $(this.element).find(":radio").after("<span class='jui-radio'></span>").click(function () {
                if ($(this).is(':checked')) {
                    $(this).next().siblings().removeClass("jui-radio-checked");
                    $(this).next().addClass("jui-radio-checked");
                    $(this).checked = true;
                } else {
                    $(this).next().removeClass("jui-radio-checked");
                    $(this).checked = false;

                }
            }).hide().next().click(function () {
                $(this).siblings().removeClass("jui-radio-checked");
                if (!$(this).prev().is(":checked")) {
                    $(this).prev()[0].checked = true;
                    $(this).addClass("jui-radio-checked");
                }
            }).next().mouseover(function (event) {
                $(this).addClass('jui-radio-label');
                event.stopPropagation();
            }).mouseout(function (event) {

                event.stopPropagation();
            });
            $(this.element).find(":radio").each(function () {
                if ($(this).is(':checked')) {
                    $(this).next().siblings().removeClass("jui-radio-checked");
                    $(this).next().addClass("jui-radio-checked");
                    $(this).checked = true;
                } else {
                    $(this).next().removeClass("jui-radio-checked");
                    $(this).checked = false;
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