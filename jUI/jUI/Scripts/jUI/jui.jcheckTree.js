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
                e_id = e.attr("id");
	        e.find("a").prev().addClass("jui-jtree-u-cbox-unChecked");
	        var parent_li = e.children("ul").children("li");//顶端li
            
	        var children_li = parent_li.children("ul").find("li").has("ul");//次级li
	        e.children("ul").find("li").each(function () {
	            self.controllChecked($(this));
	        });
	    },
	    //每次选中操作返回选中节点数据的集合
	    getCheckValue: function () {
	        var
	            list = [],
                self = this,
                o = this.options,
	            e = $(this.element),
	            str_checked = "jui-jtree-u-cbox-checked";//选中
	        e.children("ul").find("li").each(function () {
	            var _t = $(this);
	            if ($(this).children("span:eq(1)").attr("class") == str_checked) {
	                list.push($(this).children("a").children("span:eq(1)").html());
	            }
	        });

	        return list;
	    },
	    //更新选中状态
	    updateCheckedState: function () {
	        var e = $(this.element);
	        e.children("ul").find("li").has("ul").each(function () {
	            var t2 = $(this);
	            if (t2.children("ul").children("li").length > 0) {
	                if (t2.find("span.jui-jtree-u-cbox-unChecked").length == 0) {
	                    t2.children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-checked");
	                } else if (t2.find("span.jui-jtree-u-cbox-checked").length == 0) {
	                    t2.children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-unChecked");
	                } else {
	                    t2.children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-partChecked2");
	                }
	            } else {
	                t2.children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-unChecked");
	            }
	        });
	    },
	    //子项选中，影响父项选中
	    controllChecked: function (obj) {
	        var
                self = this,
                o = this.options,
	            e = $(this.element),
                e_id = e.attr("id");
	            str_checked = "jui-jtree-u-cbox-checked",//选中
                str_unChecked = "jui-jtree-u-cbox-unChecked",//未选中
                str_checkedPart = "jui-jtree-u-cbox-partChecked2";//部分选中
	        //全选控制 
	        var controlChildrenClass = function (obj, str) {
	            obj.removeClass().addClass(str);
	            obj.siblings("ul").find("li").find("span:eq(1)").removeClass().addClass(str);
	        }

	        obj.children("span:eq(1)").click(function () {
	            var t = $(this);
	            if (t.attr("class") == str_checked || t.attr("class") == str_checkedPart) {
	                controlChildrenClass(t, str_unChecked);
	            } else if (t.attr("class") == str_unChecked) {
	                controlChildrenClass(t, str_checked);
	            }
	            var _count = obj.siblings().length + 1;//同级个数
	            var checked_span = t.parent().parent().children("li").children("span.jui-jtree-u-cbox-checked").length;//同级选中个数
	            if (_count == checked_span) {
	                obj.parents("li").children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-checked");//全部选中样式
	            }
	            if (_count > checked_span) {
	                obj.parents("li").children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-partChecked2");//部分选中样式
	            }
	            if (checked_span == 0) {
	                obj.parents("li").children("span:eq(1)").removeClass().addClass("jui-jtree-u-cbox-unChecked");//未选中样式
	            }
	            self.updateCheckedState();
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