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
            $(":radio", this.element).after("<span class='jui-radio'></span>").click(function () {
                var tagObject = $(this);
                var tagNextObject = tagObject.next();
                if (tagObject.is(':checked')) {
                    tagNextObject.siblings().removeClass("jui-radio-checked");
                    tagNextObject.removeClass("jui-radio-checked-hover jui-radio-checked-checked");
                    tagNextObject.addClass("jui-radio-checked");
                    tagObject.checked = true;
                } else {
                    tagNextObject.removeClass("jui-radio-checked");
                    tagObject.checked = false;

                }
            }).hide().next().click(function () {
                $(this).siblings().removeClass("jui-radio-checked");
                var tagPrevObject = $(this).prev();
                if (!tagPrevObject.is(":checked")) {
                    tagPrevObject[0].checked = true;
                    $(this).addClass("jui-radio-checked");
                }
            }).next().mouseover(function (event) {
                $(this).addClass('jui-radio-label');
                var tagPrevObject = $(this).prev();
                if (tagPrevObject.attr("class") == 'jui-radio') {
                    tagPrevObject.addClass("jui-radio-checked-hover");
                } else {
                    
                    tagPrevObject.addClass("jui-radio-checked-checked");
                }
                event.stopPropagation();
            }).mouseout(function (event) {
                var tagPrevObject = $(this).prev();
                tagPrevObject.removeClass("jui-radio-checked-hover jui-radio-checked-checked");
                event.stopPropagation();
            });

            $(":radio", this.element).each(function () {

                var tagObject = $(this);
                var tagNextObject = tagObject.next();

                if (tagObject.is(':checked')) {
                    tagNextObject.siblings().removeClass("jui-radio-checked");
                    tagNextObject.addClass("jui-radio-checked");
                    tagObject.checked = true;
                } else {
                    tagNextObject.removeClass("jui-radio-checked");
                    tagObject.checked = false;
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