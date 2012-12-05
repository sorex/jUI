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
	            e = $(this.element),
                onClick = o.onClick,
                e_id = e.attr("id");
	        var name, id, image, position;
	        e.addClass("jui-jtree");
            e.empty();
            e.append("<span id='saveId' style='display:none;'></span>" +
                            "<span id='saveName' style='display:none;'></span>" +
                            "<span id='saveImage' style='display:none;'></span>" +
                            "<span id='savePosition' style='display:none;'></span>" +
                            "<ul id='" + e_id + "_ul_top'></ul>");//u1
            e.bind("selectstart", function () { return false; });//界面无法选中
	        //#region生成节点
            //生成节点
            var makeNode = function (str,obj) {
                $("#" + e_id + "_ul_" + str).append(
                    "<li class='jui-jtree-u-li' id='" + e_id + "_li_" + obj["id"] + "'>" +
                    "<span class='jui-jtree-u-switch'></span>" +
                    "<a title='" + obj["name"] + "' class='jui-jtree-u-a' >" +
                    "<span class='jui-jtree-u-icon' style='background-image:url(" + obj["image"] + ");background-position:" + obj["position"] + ";'></span>" +
                    "<span class='jui-jtree-u-text' >" + obj["name"] +
                    "</span></a></li>");
                self.clickNode(e_id + "_li_" + obj["id"]);
            }
            //#endregion
            //#region 生成树
            var makeTree = function () {
                for (var i = 0; i < n.length; i++) {
                    makeNode("top",n[i]);//u1
                    if (n[i]["children"]) {
                        $("#"+e_id + "_li_" + n[i]["id"]).children("a").after("<ul class='line' id='" + e_id + "_ul_"+i+"'></ul>");
                        if (i == n.length-1) {
                            $("#" + e_id + "_li_" + n[i]["id"]).children("a").next().removeClass("line");
                        }
                        for (var j = 0; j < n[i]["children"].length; j++) {
                            makeNode(i,n[i]["children"][j]);//u2
                            if (n[i]["children"][j]["children"]) {
                                $("#" + e_id + "_li_" + n[i]["children"][j]["id"]).children("a").after("<ul class='line' id='" + e_id + "_ul_"+i+j+"'></ul>");//u3
                                if (j == n[i]["children"].length-1) {
                                    $("#" + e_id + "_li_" + n[i]["children"][j]["id"]).children("a").next().removeClass("line");
                                }
                                for (var k = 0; k < n[i]["children"][j]["children"].length; k++) {
                                    makeNode(i.toString()+ j.toString(), n[i]["children"][j]["children"][k]);//u3
                                }
                            }
                            $("#" + e_id + "_li_" + n[i]["children"][j]["id"]).children("a").next().children("li").last().children("span").removeClass("jui-jtree-u-switch-cross").addClass("jui-jtree-u-switch-cross-bottom");
                            $("#" + e_id + "_li_" + n[i]["children"][j]["id"]).children("a").next().children("li").first().children("span").removeClass("jui-jtree-u-switch-cross").addClass("jui-jtree-u-switch-cross-bottom");
                        }
                        $("#" + e_id + "_li_" + n[i]["id"]).children("a").next().children("li").last().children("span").removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch-dircorss-bottom-close");
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
                //切换各级顶端"+","-"按钮
                if ($(this).attr("class") == "jui-jtree-u-switch") {
                    $(this).removeClass("jui-jtree-u-switch").addClass("jui-jtree-u-switch-open");
                } else if ($(this).attr("class") == "jui-jtree-u-switch-open") {
                    $(this).removeClass("jui-jtree-u-switch-open").addClass("jui-jtree-u-switch");
                }
                //切换各级中间"+","-"按钮
                if ($(this).attr("class") == "jui-jtree-u-switch-dircorss-close") {
                    $(this).removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch-dircorss-open");
                } else if ($(this).attr("class") == "jui-jtree-u-switch-dircorss-open") {
                    $(this).removeClass("jui-jtree-u-switch-dircorss-open").addClass("jui-jtree-u-switch-dircorss-close");
                }
                //切换各级底部"+","-"按钮
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
                    if ($(this).nextAll().length == 0) {
                        $(this).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-cross-bottom");
                    } else {
                        $(this).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-cross");
                    }
                } else {
                    if ($(this).nextAll().length == 0) {
                        $(this).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-dircorss-bottom-close");
                    } else {
                        $(this).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-dircorss-close");
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
        //#region 增
	    //添加子节点
	    addChildNode: function () {
	        var
                self = this,
                o = this.options,
                n = o.nodes,
	            e = $(this.element),
                onClick = o.onClick,
                e_id = e.attr("id");
	        var node_id = $("#saveId").text();
	        //父节点增加子节点
	        if ($("#" + node_id).children("ul").length > 0) {
	            var newLi_id , newLi_name;
	            var lastNodeIcon = $("#" + node_id).children("ul").children("li").last().children("span");
	            if ($("#" + node_id).children("ul").children("li").last().children("ul").length > 0) {
	                //如果最后的节点为父节点
	                if (lastNodeIcon.attr("class") == "jui-jtree-u-switch-dircorss-bottom-close") {
	                    //闭合时
	                    lastNodeIcon.removeClass().addClass("jui-jtree-u-switch-dircorss-close");
	                } else if (lastNodeIcon.attr("class") == "jui-jtree-u-switch-dircorss-bottom-open") {
	                    //打开时
	                    lastNodeIcon.removeClass().addClass("jui-jtree-u-switch-dircorss-open");
	                }
	                lastNodeIcon.siblings("ul").addClass("line");//ul添加虚线
	            } else {
	                //如果最后的节点为子节点
	                lastNodeIcon.removeClass().addClass("jui-jtree-u-switch-cross");
	            }
	            newLi_id = $("#" + node_id).children("ul").attr("id")+ "_newLi_" + ($("#" + node_id).children("ul").children("li").length + 1);//新增节点的id
	            newLi_name = "NewNode" + ($("#" + node_id).children("ul").children("li").length + 1);//新增节点的文本内容
                //添加新节点
	            $("#" + node_id).children("ul").append(
                    "<li class='jui-jtree-u-li' id='" + newLi_id + "'>" +
                    "<span class='jui-jtree-u-switch-cross-bottom'></span>" +
                    "<a title='" + newLi_name + "' class='jui-jtree-u-a'>" +
                    "<span class='jui-jtree-u-icon' style='background-image:url(../../Images/zTreeStandard.png);background-position:-110px -30px;' ></span>" +
                    "<span class='jui-jtree-u-text'>" + newLi_name +
                    "</span></a></li>");
	            this.clickNode(newLi_id);// 添加节点点击事件
	        } else {
	            //子节点增加子节点,此时子节点变为父节点

	        }
	    },
	    //添加同级节点
	    addSiblingNode: function () {
            
	    },
        //给节点添加点击事件 
	    clickNode: function (str) {
	        var
                o = this.options,
                onClick = o.onClick;

	        if (onClick != null) {
	            $("#" + str).children("a").click(function () {
	                id = str;
	                name = $(this).children("span:eq(1)").text();
	                image = $(this).children("span:eq(0)").css("background-image");
	                position = $(this).children("span:eq(0)").css("background-position");
	                onClick({ name: name, id: id, image: image, position: position });
	                $("#saveId").text(id);
	                $("#saveName").text(name);
	                $("#saveImage").text(image);
	                $("#savePosition").text(position);
	            });
	        }            
	    },

        //#endregion
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