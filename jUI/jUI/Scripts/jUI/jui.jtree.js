/// <reference path="../jquery-1.8.1-vsdoc.js" />
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
            //onClick:null
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
                onClick = o.onClick,
                e_id = e.attr("id");
	        e.addClass("jui-jtree");
            e.empty();
            e.append("</span><ul id='" + e_id + "_u1'></ul>");//u1
            e.bind("selectstart", function () { return false; });//界面无法选中
            //#region生成节点
            //生成一层
            var makeFirstTree = function (i) {
                $("#" + e_id + "_u1").append(
                    "<li class='jui-jtree-u-li' id='" + e_id + "_li_" + n[i - 1]["id"] + "'>" +
                    "<span class='jui-jtree-u-switch' id='" + e_id + "_switch_" + i + "'></span>" +
                    "<a title='" + n[i - 1]["name"] + "' class='jui-jtree-u-a' id='" + e_id + "_a_" + i + "'>" +
                    "<span class='jui-jtree-u-icon' style='background-image:url(" + n[i - 1]["image"] + ");background-position:" + n[i - 1]["position"] + ";' id='" + e_id + "_icon_" + i + "'></span>" +
                    "<span class='jui-jtree-u-text' id='" + e_id + "_text_" + i + "'>" + n[i - 1]["name"] +
                    "</span></a></li>");
                if (onClick != null) {
                    $("#" + e_id + "_li_" + n[i - 1]["id"]).children("a").click(function () {
                        onClick(n[i - 1]);
                    });
                }
            }
            //生成二层
            var mackeSecondTree = function (i,j) {
                $("#" + e_id + "_u2_" + i).append(
                    "<li class='jui-jtree-u-li' id='" + e_id + "_li_" + n[i - 1]["children"][j - 1]["id"] + "'>" +
                    "<span class='jui-jtree-u-switch-dircorss-close' id='" + e_id + "_switch2_" + j + "'></span>" +
                    "<a title='" + n[i - 1]["children"][j - 1]["name"] + "' class='jui-jtree-u-a' id='" + e_id + "_a2_" + i + "_" + j + "'>" +
                    "<span class='jui-jtree-u-icon' style='margin-right:2px;background-image:url(" + n[i - 1]["children"][j - 1]["image"] + ");background-position:" + n[i - 1]["children"][j - 1]["position"] + ";' id='" + e_id + "_icon2_" + j + "'></span>" +
                    "<span class='jui-jtree-u-text' id='" + e_id + "_text2_" + j + "'>" + n[i - 1]["children"][j - 1]["name"] +
                    "</span></a></li>");
                if (onClick != null) {
                    $("#" + e_id + "_li_" + n[i - 1]["children"][j - 1]["id"]).children("a").click(function () {
                        onClick(n[i - 1]["children"][j - 1]);
                    });
                }
            }
	        //生成三层
            var makeThirdTree = function (i,j,k) {
                $("#" + e_id + "_u3_" + i + "_" + j).append(
                    "<li class='jui-jtree-u-li' id='" + e_id + "_li_" + n[i - 1]["children"][j - 1]["children"][k - 1]["id"] + "'>" +
                    "<span class='jui-jtree-u-switch-cross' id='" + e_id + "_switch3_" + k + "'></span>" +
                    "<a title='" + n[i - 1]["children"][j - 1]["children"][k - 1]["name"] + "' class='jui-jtree-u-a' id='" + e_id + "_a3_" + i + "_" + j + "_" + k + "'>" +
                    "<span class='jui-jtree-u-icon' style='margin-right:2px;background-image:url(" + n[i - 1]["children"][j - 1]["children"][k - 1]["image"] + ");background-position:" + n[i - 1]["children"][j - 1]["children"][k - 1]["position"] + ";'  id='" + e_id + "_icon3_" + j + "'></span>" +
                    "<span class='jui-jtree-u-text' id='" + e_id + "_text3_" + j + "'>" + n[i - 1]["children"][j - 1]["children"][k - 1]["name"] +
                    "</span></a></li>");
                if (onClick != null) {
                    $("#" + e_id + "_li_" + n[i - 1]["children"][j - 1]["children"][k - 1]["id"]).children("a").click(function () {
                        onClick(n[i - 1]["children"][j - 1]["children"][k - 1]);
                    });
                }

            }
            //#endregion
            //#region 生成树
            var makeTree = function () {
                for (var i = 1; i <= l; i++) {
                    makeFirstTree(i);//u1
                    if (n[i - 1]["children"]) {
                        $("#" + e_id + "_a_" + i).after("<ul id='" + e_id + "_u2_" + i + "' class='line'></ul>");
                        if (i == l) {
                            $("#" + e_id + "_u2_" + i).removeClass("line");
                        }
                        for (var j = 1; j <= n[i - 1]["children"].length; j++) {
                            mackeSecondTree(i,j);//u2
                            if (n[i - 1]["children"][j - 1]["children"]) {
                                $("#" + e_id + "_a2_" + i + "_" + j).after("<ul id='" + e_id + "_u3_" + i + "_" + j + "' class='line'></ul>");//u3
                                if (j == n[i - 1]["children"].length) {
                                    $("#" + e_id + "_u3_" + i + "_" + j).removeClass("line");
                                }
                                for (var k = 1; k <= n[i - 1]["children"][j - 1]["children"].length; k++) {
                                    makeThirdTree(i,j,k);//u3
                                }
                            }
                            $("#" + e_id + "_u3_" + i + "_" + j).children("li").last().children("span").removeClass("jui-jtree-u-switch-cross").addClass("jui-jtree-u-switch-cross-bottom");
                        }
                        $("#" + e_id + "_li_" + n[i - 1]["id"]).children("ul").children("li").last().children("span").removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch-dircorss-bottom-close");
                    }
                }

            }
            makeTree();
            //#endregion 
	        //#region 样式的切换
            var
                dir_All = e.children("ul").find("li").children("a"),//所有含ul的li中的a
                sw1 = e.children("ul").find("li").children("span"),//所有switch
                sw_1 = e.children("ul").children("li").children("span"),//一级switch
                ul2 = e.children("ul").children("li").children("ul"),//二级ul
                ul3 = ul2.children("li").children("ul");//三级ul

            sw_1.removeClass("jui-jtree-u-switch").addClass("jui-jtree-u-switch-dircorss-close");
            sw_1.first().removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch");
            sw_1.last().removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch-dircorss-bottom-close");

            ul3.css("display", "none");
            ul2.css("display", "none");
            
            sw1.click(function () {
                //切换各级中顶端"+","-"按钮
                if ($(this).attr("class") == "jui-jtree-u-switch") {
                    $(this).removeClass("jui-jtree-u-switch").addClass("jui-jtree-u-switch-open");
                } else if ($(this).attr("class") == "jui-jtree-u-switch-open") {
                    $(this).removeClass("jui-jtree-u-switch-open").addClass("jui-jtree-u-switch");
                }
                //切换各级中中间"+","-"按钮
                if ($(this).attr("class") == "jui-jtree-u-switch-dircorss-close") {
                    $(this).removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch-dircorss-open");
                } else if ($(this).attr("class") == "jui-jtree-u-switch-dircorss-open") {
                    $(this).removeClass("jui-jtree-u-switch-dircorss-open").addClass("jui-jtree-u-switch-dircorss-close");
                }
                //切换各级中底部"+","-"按钮
                if ($(this).attr("class") == "jui-jtree-u-switch-dircorss-bottom-close") {
                    $(this).removeClass("jui-jtree-u-switch-dircorss-bottom-close").addClass("jui-jtree-u-switch-dircorss-bottom-open");
                } else if ($(this).attr("class") == "jui-jtree-u-switch-dircorss-bottom-open") {
                    $(this).removeClass("jui-jtree-u-switch-dircorss-bottom-open").addClass("jui-jtree-u-switch-dircorss-bottom-close");
                }
                //切换各级图标开与关按钮 
                if ($(this).siblings("a").find("span:eq(0)").css("background-position") == "-110px 0px") {
                    $(this).siblings("a").find("span:eq(0)").css("background-position", "-110px -15px");
                } else if ($(this).siblings("a").find("span:eq(0)").css("background-position") == "-110px -15px") {
                    $(this).siblings("a").find("span:eq(0)").css("background-position", "-110px 0px");
                }
                $(this).siblings("ul").slideToggle("fast");
            });
            e.children("ul").find("li").each(function () {
                if ($(this).children("ul").length == 0) {
                    $(this).children("a").children("span:eq(0)").css("background-position", "-110px -30px");
                    if (($(this).prevAll().length == 0 && $(this).nextAll().length == 0) || $(this).nextAll().length == 0) {
                        $(this).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-cross-bottom");
                    } else {
                        $(this).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-cross");
                    }
                }
                var t = $(this);
                t.children("a").click(function () {
                    e.children("ul").find("a").removeClass("jui-jtree-a-clicked");
                    t.children("a").addClass("jui-jtree-a-clicked");
                });
            });
	        //#endregion
	    },
	    //增
	    addSiblingNode: function (str) {
	        var id = str;
	        if ($("#id").children("ul").length == 0) {
	            //增同级节点
                //换虚线图案为加减按钮图标
	            $("#id").children("span").removeClass().addClass("jui-jtree-u-switch-dircorss-bottom-open");
                //将文件图标换成打开的文件夹图标
	            $("#id").children("a").children("span:eq(0)").css("background-position", "-110px -15px").after("<ul id='ul_" + id + "'></ul>");
	            $("#ul_"+id).append(
                    "<li class='jui-jtree-u-li' id='newLi_" + id + "'>" +
                    "<span class='jui-jtree-u-switch-cross-bottom' id='spanDashLine_" + id + "'></span>" +
                    "<a title='newNode" + id + "' class='jui-jtree-u-a' id='a_" + id + "'>" +
                        "<span class='jui-jtree-u-icon' style='background-image:url(../../Images/zTreeStandard.png);background-position:-110px -30px;' id='icon_" + id + "'></span>" +
                        "<span class='jui-jtree-u-text' id='text_" + id + "'>" + newNode + id +
                    "</span></a></li>");
	            var n_name = $("#ul_" + id).children("li").children("a").children("span:eq(1)").text();
	            var n_id = "newLi_" + id;
	            var n_image = "../../Images/zTreeStandard.png";
	            var n_position = "-110px -30px";
	            if (onClick != null) {
	                $("#newLi_" + id).children("a").click(function () {
	                    onClick({ name: n_name, id: n_id, image: n_image, position: n_position });
	                });
	            }

	        }else {
                //增子节点
	            //换虚线图案
	            $("#id").children("ul").children("li").last().children("span").removeClass().addClass("jui-jtree-u-switch-cross");
	            $("#id").children("ul").children("li").last().after(
                        "<li class='jui-jtree-u-li' id='newLi_"+id+"'>" +
                        "<span class='jui-jtree-u-switch-cross-bottom' id='spanDashLine_"+id+"'></span>" +
                        "<a title='newNode"+id+"' class='jui-jtree-u-a' id='a_"+id+"'>" +
                        "<span class='jui-jtree-u-icon' style='background-image:url(../../Images/zTreeStandard.png);background-position:-110px -30px;' id='icon_" + id + "'></span>" +
                        "<span class='jui-jtree-u-text' id='text_"+id+"'>" + newNode+id +
                        "</span></a></li>");
                var n_name = $("#ul_" + id).children("li").children("a").children("span:eq(1)").text();
                var n_id = "newLi_" + id;
                var n_image = "../../Images/zTreeStandard.png";
                var n_position = "-110px -30px";
                if (onClick != null) {
                    $("#newLi_" + id).children("a").click(function () {
                        onClick({ name: n_name, id: n_id, image: n_image, position: n_position });
                    });
                }

	        }
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