/// <reference path="../jquery-1.8.1-vsdoc.js" />
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
* Create date: 2012年11月7日 15:03:06
* Description: 带checkbox的树形菜单
*/

/**/

(function ($, undefined) {
    $.widget("jui.jcheckTree",
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
	            str_unChecked = "jui-jtree-u-cbox-unChecked",//未选中
                str_checkedPart = "jui-jtree-u-cbox-partChecked2";//部分选中
	        e.find("a").before("<span class='jui-jtree-u-cbox-unChecked'></span>");
	        var parent_li = e.children("ul").children("li");//顶端li
	        var children_li = parent_li.children("ul").find("li").has("ul");//次级li

            //全选控制
	        var controlChildrenClass = function (obj, str) {
	            obj.removeClass().addClass(str);
	            obj.siblings("ul").find("li").find("span:eq(1)").removeClass().addClass(str);
	        }

            //子项选中，影响父项选中
	        var controllChecked = function (obj) {
	            obj.children("span:eq(1)").click(function () {
	                if ($(this).attr("class") == str_checked || $(this).attr("class") == str_checkedPart) {
	                    controlChildrenClass($(this), str_unChecked);
	                } else if ($(this).attr("class") == str_unChecked) {
	                    controlChildrenClass($(this), str_checked);
	                }

	                var _count = obj.siblings().length + 1;//同级个数
	                var checked_span = $(this).parent().parent().children("li").children("span.jui-jtree-u-cbox-checked").length;//同级选中个数
	                if (_count == checked_span) {
	                    obj.parents("li").children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-checked");//全部选中样式
	                }
	                if (_count > checked_span) {
	                    obj.parents("li").children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-partChecked2");//部分选中样式
	                }
	                if (checked_span == 0) {
	                    obj.parents("li").children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-unChecked");//未选中样式
	                }

	                e.children("ul").find("li").has("ul").each(function () {
	                    if ($(this).find(".jui-jtree-u-cbox-partChecked2").length > 0) {
	                        $(this).children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-partChecked2");
	                    }
	                });
	            });
	        }

	        e.children("ul").find("li").each(function () {
	            var _t = $(this);
	            controllChecked(_t);
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