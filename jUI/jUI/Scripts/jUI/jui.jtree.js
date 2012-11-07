﻿/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI tree Plugin
/*
* jQuery UI tree 
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/


/*
* Author: ZhangJian
* Create date: 2012年11月5日 09:17:16
* Description: 树形菜单
*/

/**/

(function ($, undefined) {
    $.widget("jui.jtree",
	{
	    // default options
	    options: {
	        nodes: [
                {
                    name: "父节点1",children: [
                        {
                            name: "父节点1-1", children: [
                              { name: "子节点1-1-1" },
                              { name: "子节点1-1-2" },
                              { name: "子节点1-1-3" }
                            ]
                        },
                        {
                            name: "父节点1-2", children: [
                                { name: "子节点1-2-1" },
                                { name: "子节点1-2-2" },
                                { name: "子节点1-2-3" }
                            ]
                        }
                    ]
                }
                //,
                //{
                //    name: "父节点2",children: [
                //        {
                //            name: "父节点2-1", children: [
                //                { name: "子节点2-1-1" },
                //                { name: "子节点2-1-2" },
                //                { name: "子节点2-1-3" }
                //            ]
                //        },
                //        {
                //            name: "父节点2-2", children: [
                //                { name: "子节点2-2-1" },
                //                { name: "子节点2-2-2" },
                //                { name: "子节点2-2-3" }
                //            ]
                //        },
                //        {
                //            name: "父节点2-3", children: [
                //                { name: "子节点2-2-1" },
                //                { name: "子节点2-2-2" },
                //                { name: "子节点2-2-3" }
                //            ]
                //        }
                //    ]
                //},
                //{
                //    name: "父节点3",children: [
                //        { name: "父节点3-1" }
                //    ]
                //},
                //{
                //    name: "父节点4"
                //}
	        ]
	    },

	    _create: function () {
	        this._jdatapagerify();
	    },

	    _jdatapagerify: function () {
	        var
                self = this,
                o = this.options,
                n = o.nodes,
                l = n.length,
	            e = $(this.element),
                e_id = e.attr("id");
	        e.addClass("jui-jtree");
            e.empty();
            e.append("<ul id='" + e_id + "_u1'></ul>");//u1
            e.bind("selectstart", function () { return false; });//界面无法选中
            //生成树
            var makeTree = function () {
                for (var i = 1; i <= l; i++) {
                    $("#" + e_id + "_u1").append(
                        "<li class='jui-jtree-u-li' id='" + e_id + "_li1_" + i + "'>" +
                        "<span class='jui-jtree-u-switch' id='" + e_id + "_switch_" + i + "'></span>" +
                        "<a title='" + n[i - 1]["name"] + "' class='jui-jtree-u-a' id='" + e_id + "_a_" + i + "'>" +
                        "<span class='jui-jtree-u-icon' id='" + e_id + "_icon_" + i + "'></span>" +
                        "<span class='jui-jtree-u-text' id='" + e_id + "_text_" + i + "'>" + n[i - 1]["name"] +
                        "</span></a></li>");
                    if (n[i - 1]["children"]) {
                        $("#" + e_id + "_a_" + i).after("<ul id='" + e_id + "_u2_" + i + "' class='line'></ul>");//u2
                        if (i == l) {
                            $("#" + e_id + "_u2_" + i).removeClass("line");
                        }
                        for (var j = 1; j <= n[i - 1]["children"].length; j++) {
                            $("#" + e_id + "_u2_" + i).append(
                                "<li class='jui-jtree-u-li' id='" + e_id + "_li2_" + j + "'>" +
                                "<span class='jui-jtree-u-switch-dircorss-close' id='" + e_id + "_switch2_" + j + "'></span>" +
                                "<a title='" + n[i - 1]["children"][j - 1]["name"] + "' class='jui-jtree-u-a' id='" + e_id + "_a2_" + i + "_" + j + "'>" +
                                "<span class='jui-jtree-u-icon' id='" + e_id + "_icon2_" + j + "'></span>" +
                                "<span class='jui-jtree-u-text' id='" + e_id + "_text2_" + j + "'>" + n[i - 1]["children"][j - 1]["name"] +
                                "</span></a></li>");
                            if (n[i - 1]["children"][j - 1]["children"]) {
                                $("#" + e_id + "_a2_" + i + "_" + j).after("<ul id='" + e_id + "_u3_" + i + "_" + j + "' class='line'></ul>");//u3
                                if (j == n[i - 1]["children"].length) {
                                    $("#" + e_id + "_u3_" + i + "_" + j).removeClass("line");
                                }
                                for (var k = 1; k <= n[i - 1]["children"][j - 1]["children"].length; k++) {
                                    $("#" + e_id + "_u3_" + i + "_" + j).append(
                                        "<li class='jui-jtree-u-li' id='" + e_id + "_li3_" + k + "'>" +
                                        "<span class='jui-jtree-u-switch-cross' id='" + e_id + "_switch3_" + k + "'></span>" +
                                        "<a title='" + n[i - 1]["children"][j - 1]["children"][k - 1]["name"] + "' class='jui-jtree-u-a' id='" + e_id + "_a3_" + i + "_" + j + "_" + k + "'>" +
                                        "<span class='jui-jtree-u-icon-file' id='" + e_id + "_icon3_" + j + "'></span>" +
                                        "<span class='jui-jtree-u-text' id='" + e_id + "_text3_" + j + "'>" + n[i - 1]["children"][j - 1]["children"][k - 1]["name"] +
                                        "</span></a></li>");
                                }
                            }
                            $("#" + e_id + "_u3_" + i + "_" + j).children("li").last().children("span").removeClass("jui-jtree-u-switch-cross").addClass("jui-jtree-u-switch-cross-bottom");
                        }
                        $("#" + e_id + "_li1_" + i).children("ul").children("li").last().children("span").removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch-dircorss-bottom-close");                        
                    }
                }

            }
            makeTree();
            var
                sw1 = e.children("ul").find("li").children("span"),//所有switch
                sw_1 = e.children("ul").children("li").children("span"),//一级switch
                //a1 = e.children("ul").children("li").children("a"),//一级a
                //dir1 = a1.find("span:eq(0)"),//一级目录图标

                ul2 = e.children("ul").children("li").children("ul"),//二级ul
                //sw2 = ul2.children("li").children("span"),//二级switch
                //a2 = ul2.children("li").children("a"),//二级a
                //dir2 = a2.find("span:eq(0)"),//二级目录图标

                ul3 = ul2.children("li").children("ul");//三级ul
                //sw3 = ul3.children("li").children("span"),//三级switch
	            //a3 = ul3.children("li").children("a"),//三级a
                //dir3 = a3.find("span:eq(0)");//三级目录图标

            sw_1.removeClass("jui-jtree-u-switch").addClass("jui-jtree-u-switch-dircorss-close");
            sw_1.first().removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch");
            sw_1.last().removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch-dircorss-bottom-close");

            ul3.css("display", "none");
            ul2.css("display", "none");
            //sw1.each(function(){
            //    $(this).click(function () {
            //        var sw_1 = $(this);
            //        $(this).siblings("ul").slideToggle("fast", function () {
            //            if (sw_1.attr("class") == "jui-jtree-u-switch") {
            //                sw_1.removeClass("jui-jtree-u-switch").addClass("jui-jtree-u-switch-open");
            //            } else {
            //                sw_1.removeClass("jui-jtree-u-switch-open").addClass("jui-jtree-u-switch");
            //            }
            //        });
            //    });
            //});

            sw1.click(function () {
                if ($(this).attr("class") == "jui-jtree-u-switch") {
                    $(this).removeClass("jui-jtree-u-switch").addClass("jui-jtree-u-switch-open");
                    $(this).siblings("ul").slideToggle("fast");
                } else {
                    $(this).removeClass("jui-jtree-u-switch-open").addClass("jui-jtree-u-switch");
                    $(this).siblings("ul").slideToggle("fast");
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
	        this._jdatapagerify();
	    },

	    _destroy: function () {
	        $(this.element).empty();
	        $(this).empty();
	        return this;
	    }
	});

    $.extend($.jui.jtree, {
        version: "0.1.0"
    });
})(jQuery);