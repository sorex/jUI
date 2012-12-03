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
            e.append("<span id='clickIdSave' style='display:none;'></span><ul id='" + e_id + "_u1'></ul>");//u1
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
                        var n_name = $("#" + e_id + "_a_" + i).children("span:eq(1)").text();
                        var n_id = e_id + "_li_" + n[i - 1]["id"];
                        var n_image = $("#"+e_id + "_icon_" + i ).css("background-image");
                        var n_position = $("#" + e_id + "_icon_" + i).css("background-position");
                        onClick({ name: n_name, id: n_id, image: n_image, position: n_position });
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
                        var n_name = $("#" + e_id + "_a2_" + i + "_" + j).children("span:eq(1)").text();
                        var n_id = e_id + "_li_" + n[i - 1]["children"][j - 1]["id"];
                        var n_image = $("#" + e_id + "_icon2_" + j).css("background-image");
                        var n_position = $("#" + e_id + "_icon2_" + j).css("background-position");
                        onClick({ name: n_name, id: n_id, image: n_image, position: n_position });
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
                        var n_name = $("#" + e_id + "_a3_" + i + "_" + j + "_" + k).children("span:eq(1)").text();
                        var n_id = e_id + "_li_" + n[i - 1]["children"][j - 1]["children"][k - 1]["id"];
                        var n_image = $("#" + e_id + "_icon3_" + j).css("background-image");
                        var n_position = $("#" + e_id + "_icon3_" + j).css("background-position");
                        onClick({ name: n_name, id: n_id, image: n_image, position: n_position });
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
	        var o = this.options;
	        var onClick = o.onClick;
	        var e = $(this.element),
                e_id = e.attr("id");
	        var id = str;
	        if ($("#" + e_id + "_li_" + id).children("ul").length == 0) {
	            var l = "-" + ($("#" + e_id + "_li_" + id).children("ul").children("li").length + 1);
	            //增同级节点
	            //换虚线图案为加减按钮图标
	            if ($("#" + e_id + "_li_" + id).children("span").attr("class") == "jui-jtree-u-switch-cross-bottom") {
	                $("#" + e_id + "_li_" + id).children("span").removeClass().addClass("jui-jtree-u-switch-dircorss-bottom-open");
	                $("#" + e_id + "_li_" + id).children("a").after("<ul id='ul_" + id + "'></ul>");
	            } else {
	                $("#" + e_id + "_li_" + id).children("span").removeClass().addClass("jui-jtree-u-switch-dircorss-open");
	                $("#" + e_id + "_li_" + id).children("a").after("<ul id='ul_" + id + "' class='line'></ul>");
	            }
                //将文件图标换成打开的文件夹图标
	            $("#" + e_id + "_li_" + id).children("a").children("span:eq(0)").css("background-position", "-110px -15px");
	            $("#ul_"+id).append(
                    "<li class='jui-jtree-u-li' id='"+ e_id + "_li_" + id + l+"'>" +
                    "<span class='jui-jtree-u-switch-cross-bottom' id='spanDashLine_" + e_id + id + l + "'></span>" +
                    "<a title='newNode" + id + "' class='jui-jtree-u-a' id='a_" + e_id + id + l + "'>" +
                        "<span class='jui-jtree-u-icon' style='background-image:url(../../Images/zTreeStandard.png);background-position:-110px -30px;' id='icon_" + e_id + id + l + "'></span>" +
                        "<span class='jui-jtree-u-text' id='text_" + e_id + id + l + "'>newNode" + id + l +
                    "</span></a></li>");
	            var n_name = $("#a_" + e_id + id + l).children("span:eq(1)").text();
                var n_id = e_id + "_li_" + id + l;
                var n_image = $("#icon_" + e_id + id + l).css("background-image");
                var n_position = $("#icon_" + e_id + id + l).css("background-position");
	            if (onClick != null) {
	                $("#" + e_id + "_li_" + id + l).children("a").click(function () {
	                    onClick({ name: n_name, id: n_id, image: n_image, position: n_position });
	                    e.children("ul").find("a").removeClass("jui-jtree-a-clicked");
	                    $(this).addClass("jui-jtree-a-clicked");
	                });
	            }

	        } else {
                var l = "-"+($("#" + e_id + "_li_" + id).children("ul").children("li").length+1);
                //增子节点
                //换虚线图案           
                if ($("#" + e_id + "_li_" + id).children("ul").children("li").last().children("ul").length == 1) {
                    $("#" + e_id + "_li_" + id).children("ul").children("li").children("ul").addClass("line");
                    if ($("#" + e_id + "_li_" + id).children("ul").children("li").last().children("span").attr("class") == "jui-jtree-u-switch-dircorss-bottom-close") {
                        $("#" + e_id + "_li_" + id).children("ul").children("li").last().children("span").removeClass().addClass("jui-jtree-u-switch-dircorss-close");
                    } else if ($("#" + e_id + "_li_" + id).children("ul").children("li").last().children("span").attr("class") == "jui-jtree-u-switch-dircorss-bottom-open") {
                        $("#" + e_id + "_li_" + id).children("ul").children("li").last().children("span").removeClass().addClass("jui-jtree-u-switch-dircorss-open");
                    }
                } else {
                    $("#" + e_id + "_li_" + id).children("ul").children("li").last().children("span").removeClass().addClass("jui-jtree-u-switch-cross");

                }
                $("#" + e_id + "_li_" + id).children("ul").children("li").last().after(
                        "<li class='jui-jtree-u-li' id='"+e_id + "_li_"+id+l+"'>" +
                        "<span class='jui-jtree-u-switch-cross-bottom' id='spanDashLine_" + e_id + id + l + "'></span>" +
                        "<a title='newNode" + id + l + "' class='jui-jtree-u-a' id='a_" + e_id + id + l + "'>" +
                        "<span class='jui-jtree-u-icon' style='background-image:url(../../Images/zTreeStandard.png);background-position:-110px -30px;' id='icon_" + e_id + id + l + "'></span>" +
                        "<span class='jui-jtree-u-text' id='text_" + e_id + id + l + "'>newNode" + id + l +
                        "</span></a></li>");
                var n_name = $("#a_" + e_id + id + l).children("span:eq(1)").text();
                var n_id = e_id + "_li_" + id + l;
                var n_image = $("#icon_" + e_id + id + l).css("background-image");
                var n_position = $("#icon_" + e_id + id + l).css("background-position");
                if (onClick != null) {
                    $("#" + e_id + "_li_" + id + l).children("a").click(function () {
                        onClick({ name: n_name, id: n_id, image: n_image, position: n_position });
                        e.children("ul").find("a").removeClass("jui-jtree-a-clicked");
                        $(this).addClass("jui-jtree-a-clicked");
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