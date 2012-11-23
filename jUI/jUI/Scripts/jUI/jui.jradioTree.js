﻿/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI checkTree Plugin
/*
* jQuery UI checkTree 
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/


/*
* Author: ZhangJian
* Create date: 2012年11月23日 10:44:49
* Description: 带radiobox的树形菜单
*/

/**/

(function ($, undefined) {
    $.widget("jui.jradioTree",
	{
	    // default options
	    options: {

	    },

	    _create: function () {
	        this._jdatapagerify();
	    },

	    _jdatapagerify: function () {
	        var
                self = this,
                o = this.options,
	            e = $(this.element),
                e_id = e.attr("id"),
	            str_checked = "jui-jtree-u-cbox-checked",//选中
	            str_unChecked = "jui-jtree-u-cbox-unChecked";//未选中
	        e.find("a").before("<span class='jui-jtree-u-rbox-unChecked'></span>");
	        var parent_li = e.children("ul").children("li");//顶端li
	        var children_li = parent_li.children("ul").find("li").has("ul");//次级li
            
	        e.children("ul").find("li").each(function () {
	            var _t = $(this);
	            _t.children("span:eq(1)").click(function () {
	                e.children("ul").find(".jui-jtree-u-rbox-checked").removeClass().addClass("jui-jtree-u-rbox-unChecked");
	                e.children("ul").find(".jui-jtree-u-rbox-partChecked").removeClass().addClass("jui-jtree-u-rbox-unChecked");
	                $(this).removeClass().addClass("jui-jtree-u-rbox-checked");
	                e.children("ul").find("li").has("ul").each(function () {
	                    var _t = $(this);
	                    if (_t.children("ul").find(".jui-jtree-u-rbox-checked").length > 0) {
	                        _t.children("span:eq(1)").removeClass().addClass("jui-jtree-u-rbox-partChecked");
	                    }
	                });

	            });
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
	        this._jdatapagerify();
	    },

	    _destroy: function () {
	        $(this.element).empty();
	        $(this).empty();
	        return this;
	    }
	});

    $.extend($.jui.jcheckTree, {
        version: "0.1.0"
    });
})(jQuery);