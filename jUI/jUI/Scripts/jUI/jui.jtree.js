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
            e.append("<span id='saveId"+e_id+"' style='display:none;'></span>" +
                            "<span id='saveName" + e_id + "' style='display:none;'></span>" +
                            "<span id='saveImage" + e_id + "' style='display:none;'></span>" +
                            "<span id='savePosition" + e_id + "' style='display:none;'></span>" +
                            "<span id='temp" + e_id + "' style='display:none;'>0</span>" +
                            "<ul id='" + e_id + "_ul_top'></ul>");//u1
            e.bind("selectstart", function () { return false; });//界面无法选中
	        //#region生成节点
            //生成节点
            var makeNode = function (str,obj) {
                $("#" + e_id + "_ul_" + str).append(
                    "<li class='jui-jtree-u-li' id='" + e_id + "_li_" + obj["id"] + "'>" +
                    "<span class='jui-jtree-u-switch'></span>" +
                    "<span style='display:none;'></span>" +
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
                            $("#" + e_id + "_li_" + n[i]["children"][j]["id"]).children("a").next().children("li").last().children("span:eq(0)").removeClass("jui-jtree-u-switch-cross").addClass("jui-jtree-u-switch-cross-bottom");
                            $("#" + e_id + "_li_" + n[i]["children"][j]["id"]).children("a").next().children("li").first().children("span:eq(0)").removeClass("jui-jtree-u-switch-cross").addClass("jui-jtree-u-switch-cross-bottom");
                        }
                        $("#" + e_id + "_li_" + n[i]["id"]).children("a").next().children("li").last().children("span:eq(0)").removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch-dircorss-bottom-close");
                    }
                }                
            }
            makeTree();
            //#endregion 
	        //#region 样式的切换
            var
                dir_All = e.children("ul").find("li").children("a"),//所有含ul的li中的a
                sw_1 = e.children("ul").children("li").children("span:eq(0)"),//一级switch
                ul2 = e.children("ul").children("li").children("ul"),//二级ul
                ul3 = ul2.children("li").children("ul");//三级ul
            sw_1.removeClass("jui-jtree-u-switch").addClass("jui-jtree-u-switch-dircorss-close");
            sw_1.first().removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch");
            sw_1.last().removeClass("jui-jtree-u-switch-dircorss-close").addClass("jui-jtree-u-switch-dircorss-bottom-close");

            ul3.css("display", "none");
            ul2.css("display", "none");
            e.children("ul").find("li").each(function () {
                if ($(this).children("ul").children("li").length > 0) {
                    self.toggleLiCss($(this).children("span:eq(0)"));
                }
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
                var t = $(this).children("a");
                t.click(function () {
                    e.children("ul").find("a").removeClass("jui-jtree-a-clicked");
                    t.addClass("jui-jtree-a-clicked");
                });
            });
	        //#endregion
            e.children("ul").children("li:eq(0)").children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch");
	    },

        //#region增加节点
	    //添加子节点
	    addChildNode: function () {
	        var
                self = this,
                o = this.options,
                n = o.nodes,
	            e = $(this.element),
                onClick = o.onClick,
                e_id = e.attr("id");
	        var node_id = $("#saveId" + e_id).text();
	        if (node_id == "" || node_id == null) {
	            alert("未选中节点。");
	            return;
	        }
	        var temp = $("#temp" + e_id).text();
	        //#region选中节点为父节点时
	        if ($("#" + node_id).children("ul").length > 0) {
	            var newLi_id , newLi_name;
	            var lastNodeIcon = $("#" + node_id).children("ul").children("li").last().children("span:eq(0)");
	            //#region如果最后的节点为父节点
	            if ($("#" + node_id).children("ul").children("li").last().children("ul").length > 0) {	                
	                if (lastNodeIcon.attr("class") == "jui-jtree-u-switch-dircorss-bottom-close") {
	                    //闭合时
	                    lastNodeIcon.removeClass().addClass("jui-jtree-u-switch-dircorss-close");
	                } else if (lastNodeIcon.attr("class") == "jui-jtree-u-switch-dircorss-bottom-open") {
	                    //打开时
	                    lastNodeIcon.removeClass().addClass("jui-jtree-u-switch-dircorss-open");
	                }
	                lastNodeIcon.siblings("ul").addClass("line");//ul添加虚线
	            }
                //#endregion
	            else
	            //#region 如果最后的节点为子节点
	            {
	                lastNodeIcon.removeClass().addClass("jui-jtree-u-switch-cross");
	            }
                //#endregion
                //#region 父节点闭合时，添加子节点后，父节点展开
	            if ($("#" + node_id).children("span:eq(0)").attr("class") == "jui-jtree-u-switch") {
	                $("#" + node_id).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-open");
	            } else if ($("#" + node_id).children("span:eq(0)").attr("class") == "jui-jtree-u-switch-dircorss-close") {
	                $("#" + node_id).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-dircorss-open");
	            } else if ($("#" + node_id).children("span:eq(0)").attr("class") == "jui-jtree-u-switch-dircorss-bottom-close") {
	                $("#" + node_id).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-dircorss-bottom-open");
	            } else if ($("#" + node_id).children("span:eq(0)").attr("class") == "jui-jtree-u-switch-single-close") {
	                $("#" + node_id).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-single-open");
	            }
	            $("#" + node_id).children("a").children("span:eq(0)").css("background-position", "-110px -15px");
	            $("#" + node_id).children("span:eq(0)").siblings("ul").slideDown("fast");
                //#endregion
	        }//#endregion
	        else
            //#region 选中节点为子节点时
	        {
	            var newUl_id = node_id + "_newUl";//ul的id
	            if ($("#" + node_id).children("ul").length == 0) {
	                $("#" + node_id).append("<ul class='line' id='" + newUl_id + "'></ul>")
	            }
	            //子节点增加子节点,此时子节点变为父节点
	            if ($("#" + node_id).children("span:eq(0)").attr("class") == "jui-jtree-u-switch-cross-bottom") {
	                //切换图标变更
	                $("#" + node_id).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-dircorss-bottom-open");
	                $("#" + node_id).children("ul").removeClass("line");
	            } else {
	                //切换图标变更
	                $("#" + node_id).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-dircorss-open");
	            }
	            //文件夹图标变更
	            $("#" + node_id).children("a").children("span:eq(0)").css("background-position", "-110px -15px");
	        }
	        //#endregion
            //#region 具体添加节点的操作
	        newLi_id =  "NewLi_" + temp;//新增节点的id
	        newLi_name = "NewNode";//新增节点的文本内容
	        if ($("#" + node_id).children("ul").children("li").length == 0) {
	            this.toggleLiCss($("#" + node_id).children("span:eq(0)"));
	        }
	        //添加新节点
	        $("#" + node_id).children("ul").append(
                "<li class='jui-jtree-u-li' id='" + newLi_id + "'>" +
                "<span class='jui-jtree-u-switch-cross-bottom'></span>" +
                "<span style='display:none;'></span>" +
                "<a title='" + newLi_name + "' class='jui-jtree-u-a'>" +
                "<span class='jui-jtree-u-icon' style='background-image:url(../../Images/zTreeStandard.png);background-position:-110px -30px;' ></span>" +
                "<span class='jui-jtree-u-text'>" + newLi_name +
                "</span></a></li>");
	        var css = $("#" + node_id).children("span:eq(1)").attr("class");
	        if (css == "jui-jtree-u-cbox-unChecked" || css == "jui-jtree-u-cbox-partChecked2" || css == "jui-jtree-u-cbox-checked") {
	            $("#" + newLi_id).children("span:eq(1)").addClass(css);
	            e.jcheckTree("updateCheckedState");//更新选中状态
	            e.jcheckTree("controllChecked", $("#" + newLi_id));
	        }
	        this.clickNode(newLi_id);// 添加节点点击事件
	        $("#temp" + e_id).text(parseInt(temp)+1);
            //#endregion
	    },
	    //添加同级节点
	    addSiblingNode: function () {
	        var
                self = this,
                o = this.options,
                n = o.nodes,
	            e = $(this.element),
                onClick = o.onClick,
                e_id = e.attr("id");
	        var node_id = $("#saveId" + e_id).text();
	        if (node_id == "" || node_id == null) {
	            alert("未选中节点。");
	            return;
	        }
	        var temp = $("#temp" + e_id).text();
	        var ul_father = $("#" + node_id).parent("ul");//选中li节点的父ul
	        var newUlId = $("#" + node_id).parent("ul").attr("id") + "_" + ($("#" + node_id).parent("ul").children("li").length + 1);//新增li节点的ulid
	        var newLi_name = "NewNode";//新增节点的文本
	        var newLi_id = "NewLi_" +temp;//新增li节点的id
	        //#region如果末节点为文件夹(父节点)
	        if (ul_father.children("li").last().children("ul").length > 0) {
	            if (ul_father.children("li").last().children("span:eq(0)").attr("class") == "jui-jtree-u-switch-dircorss-bottom-close") {
	                ul_father.children("li").last().children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-dircorss-close");
	            } else if (ul_father.children("li").last().children("span:eq(0)").attr("class") == "jui-jtree-u-switch-dircorss-bottom-open") {
	                ul_father.children("li").last().children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-dircorss-open");
	            }
	            ul_father.children("li").last().children("ul").addClass("line");//ul添加虚线
	        }
	        //#endregion
	        else
	        //#region如果末节点为文件(子节点)
	        {
	            ul_father.children("li").last().children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-cross");
	        }
	        if ($("#" + node_id).children("span:eq(0)").attr("class") == "jui-jtree-u-switch-single-close") {
	            $("#" + node_id).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch");
	        } else if ($("#" + node_id).children("span:eq(0)").attr("class") == "jui-jtree-u-switch-single-open") {
	            $("#" + node_id).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-open");
	        }
	        //#endregion
	        //#region具体添加操作 
	        ul_father.append(
            "<li class='jui-jtree-u-li' id='" + newLi_id + "'>" +
            "<span class='jui-jtree-u-switch-cross-bottom'></span>" +
            "<span style='display:none;'></span>" +
            "<a title='" + newLi_name + "' class='jui-jtree-u-a'>" +
            "<span class='jui-jtree-u-icon' style='background-image:url(../../Images/zTreeStandard.png);background-position:-110px -30px;' ></span>" +
            "<span class='jui-jtree-u-text'>" + newLi_name +
            "</span></a>" +
            "</li>");
	        if ($("#" + node_id).children("ul").length > 0) {
	            $("#" + newLi_id).append("<ul id='" + newUlId + "'></ul>");
	            $("#" + newLi_id).children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-dircorss-bottom-close");
	            $("#" + newLi_id).children("a").children("span:eq(0)").css("background-position", "-110px 0px");
	        }
	        this.clickNode(newLi_id);// 添加节点点击事件
	        var css = $("#" + node_id).children("span:eq(1)").attr("class");
	        if (css == "jui-jtree-u-cbox-unChecked" || css == "jui-jtree-u-cbox-partChecked2" || css == "jui-jtree-u-cbox-checked") {
	            $("#" + newLi_id).children("span:eq(1)").addClass("jui-jtree-u-cbox-unChecked");
	            e.jcheckTree("controllChecked", $("#" + newLi_id));//点击多选框后更新选中状态
	            e.jcheckTree("updateCheckedState");//更新选中状态
	        }
	        $("#temp" + e_id).text(parseInt(temp) + 1);
	        //#endregion
	    },
        //给节点添加点击事件 str:选中li标签id
	    clickNode: function (str) {
	        var
                o = this.options,
	            e = $(this.element),
                onClick = o.onClick,
	            e_id = e.attr("id");

	        if (onClick != null) {
	            $("#" + str).children("a").click(function () {
	                id = str;
	                name = $(this).children("span:eq(1)").text();
	                image = $(this).children("span:eq(0)").css("background-image");
	                position = $(this).children("span:eq(0)").css("background-position");
	                onClick({ name: name, id: id, image: image, position: position });
	                $("#saveId" + e_id).text(id);
	                $("#saveName" + e_id).text(name);
	                $("#saveImage" + e_id).text(image);
	                $("#savePosition" + e_id).text(position);
	            });
	        }
	        e.children("ul").find("li").children("a").each(function () {
	            var t = $("#"+str).children("a");
	            t.click(function () {
	                e.children("ul").find("a").removeClass("jui-jtree-a-clicked");
	                t.addClass("jui-jtree-a-clicked");
	            });
	        });

	    },
        //切换"+","-"图标 obj为span标签
	    toggleLiCss: function (obj) {
	        obj.unbind("click");
	        obj.bind("click", function () {
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
	    },
	    //#endregion
        //#region删除节点
	    deleteNode: function () {
	        var
                self = this,
                o = this.options,
                n = o.nodes,
	            e = $(this.element),
                onClick = o.onClick,
                e_id = e.attr("id");
	        var node_id = $("#saveId" + e_id).text();
	        if (node_id == "" || node_id == null) {
	            alert("未选中节点。");
	            return;
	        }
            //#region 仅留一层父节点时的样式控制
	        if (node_id == e.children("ul").children("li:eq(0)").attr("id") && e.children("ul").children("li").length > 2) {
	            e.children("ul").children("li:eq(1)").children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch");
	        }
	        if (e.children("ul").children("li").length == 2) {
	            if (e.children("ul").children("li:eq(1)").children("span:eq(0)").attr("class") == "jui-jtree-u-switch-dircorss-bottom-close") {
	                e.children("ul").children("li:eq(1)").children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-single-close");
	            } else if (e.children("ul").children("li:eq(1)").children("span:eq(0)").attr("class") == "jui-jtree-u-switch-dircorss-bottom-open") {
	                e.children("ul").children("li:eq(1)").children("span:eq(0)").removeClass().addClass("jui-jtree-u-switch-single-open");
	            }
	            e.children("ul").children("li:eq(1)").children("span:eq(0)").click(function () {
	                if ($(this).attr("class") == "jui-jtree-u-switch-single-close") {
	                    $(this).removeClass().addClass("jui-jtree-u-switch-single-open");
	                } else if ($(this).attr("class") == "jui-jtree-u-switch-single-open") {
	                    $(this).removeClass().addClass("jui-jtree-u-switch-single-close");
	                }
	            });
	        }
	        //#endregion
	        //#region删除节点为末尾节点时
	        if ($("#" + node_id).next().length == 0) {
	            var prev_li = $("#" + node_id).prev().children("span:eq(0)");
	            if (prev_li.attr("class") == "jui-jtree-u-switch-dircorss-close"){
	                prev_li.removeClass().addClass("jui-jtree-u-switch-dircorss-bottom-close");
	            } else if (prev_li.attr("class") == "jui-jtree-u-switch-dircorss-open") {
	                prev_li.removeClass().addClass("jui-jtree-u-switch-dircorss-bottom-open");
	            } else if (prev_li.attr("class") == "jui-jtree-u-switch-cross") {
	                prev_li.removeClass().addClass("jui-jtree-u-switch-cross-bottom");
	            } else if (prev_li.attr("class") == "jui-jtree-u-switch-open") {
	                prev_li.removeClass().addClass("jui-jtree-u-switch-single-open");
	            } else if (prev_li.attr("class") == "jui-jtree-u-switch") {
	                prev_li.removeClass().addClass("jui-jtree-u-switch-single-close");
	            }
	            if (prev_li.siblings("ul").length > 0) {
	                prev_li.siblings("ul").removeClass("line");
	            }
	        }
	        //子节点删除完后
	        if ($("#" + node_id).next().length == 0 && $("#" + node_id).prev().length == 0) {
	            var switchSpan = $("#" + node_id).parent().parent().children("span:eq(0)");
	            if (switchSpan.attr("class") == "jui-jtree-u-switch-dircorss-bottom-open") {
	                switchSpan.removeClass().addClass("jui-jtree-u-switch-dircorss-bottom-close");
	            }
	            if (switchSpan.attr("class") == "jui-jtree-u-switch-dircorss-open") {
	                switchSpan.removeClass().addClass("jui-jtree-u-switch-dircorss-close");
	            }
	            if (switchSpan.attr("class") == "jui-jtree-u-switch-open") {
	                switchSpan.removeClass().addClass("jui-jtree-u-switch-close");
	            }
	        }
	        //#endregion
	        $("#" + node_id).remove();
	        var css = e.children("ul").children("li:eq(0)").children("span:eq(1)").attr("class");
	        if (css == "jui-jtree-u-cbox-unChecked" || css == "jui-jtree-u-cbox-partChecked2" || css == "jui-jtree-u-cbox-checked") {
	            e.jcheckTree("updateCheckedState");//更新选中状态
	        }
	        $("#saveId" + e_id).text("");
	    },
	    //#endregion
	    //#region编辑节点
	    editNode: function () {
	        var
                self = this,
                o = this.options,
                n = o.nodes,
	            e = $(this.element),
                onClick = o.onClick,
                e_id = e.attr("id");
	        var node_id = $("#saveId"+e_id).text();//选中节点ID
	        if (node_id == "" || node_id == null) {
	            alert("未选中节点。");
	            return;
	        }
	        var node = $("#" + node_id);
	        var a_html = node.children("a").clone();
	        var old_text = node.children("a").children("span:eq(1)").text();
	        var text_html = "<input type='text' style='height:16px;' id='newText' value='" + old_text + "'/>";
	        
	        node.children("a").remove();
	        var css = $("#" + node_id).children("span:eq(1)").attr("class");
	        if (css == "jui-jtree-u-cbox-unChecked" || css == "jui-jtree-u-cbox-partChecked2" || css == "jui-jtree-u-cbox-checked") {
	            node.children("span:eq(1)").after(text_html);
	        } else {
	            node.children("span:eq(0)").after(text_html);
	        }
	        $("#newText").focus();
	        $("#newText").focusout(function () {
	            var content = $(this).attr("value");
	            node.children("input").remove();
	            node.children("span:eq(0)").after(a_html);
	            if (css == "jui-jtree-u-cbox-unChecked" || css == "jui-jtree-u-cbox-partChecked2" || css == "jui-jtree-u-cbox-checked") {
	                node.children("span:eq(1)").after(a_html);
	            } else {
	                node.children("span:eq(0)").after(a_html);
	            }
	            node.children("a").attr("title",content);
	            node.children("a").children("span:eq(1)").text(content);
	            self.clickNode(node_id);
	        });

	    },
	    //#endregion
	    //#region遍历节点
	    //选中子节点，返回父节点
	    getParentNode: function () {
	        var
                self = this,
                o = this.options,
                n = o.nodes,
	            e = $(this.element),
                onClick = o.onClick,
                e_id = e.attr("id");
	        var node_id = $("#saveId" + e_id).text();//选中节点ID
	        if (node_id == "" || node_id == null) {
	            alert("未选中节点。");
	            return false;
	        }
	        var parent_node = $("#" + node_id).parent("ul").parent("li");
	        var id = parent_node.attr("id");
	        var name = parent_node.children("a").children("span:eq(1)").text();
	        var bgimg = parent_node.children("a").children("span:eq(0)").css("background-image");
	        var position = parent_node.children("a").children("span:eq(0)").css("background-position");
	        var objParent = { id: id, name: name, image: bgimg, position: position };
	        return objParent;
	    },
        //选中父节点，返回子节点集合
	    getChildrenNodes: function (obj) {
	        var
                self = this,
                o = this.options,
                n = o.nodes,
	            e = $(this.element),
                onClick = o.onClick,
                e_id = e.attr("id");
	        var node_id = $("#saveId"+e_id).text();//选中节点ID
	        //var node_id = obj;//选中节点ID
	        if (node_id == "" || node_id == null) {
	            alert("未选中节点。");
	            return false;
	        }
	        var objli = $("#" + node_id).children("ul").children("li");
	        var children_nodes = [],
                id,
                name,
                bgimg,
                position;
	        if (objli.length > 0) {
	            for (var i = 0; i < objli.length; i++) {
	                id = objli.eq(i).attr("id");
	                name = objli.eq(i).children("a").children("span:eq(1)").text();
	                bgimg = objli.eq(i).children("a").children("span:eq(0)").css("background-image");
	                position = objli.eq(i).children("a").children("span:eq(0)").css("background-position");
	                children_nodes.push({ id: id, name: name, image: bgimg, position: position });
	            }
	            return children_nodes;
	        } else {
	            return "N";
	        }
	    },

	    //#endregion
	    //#region查找选中节点的路径
	    getNodePath: function () {
	        var
                self = this,
                o = this.options,
                n = o.nodes,
	            e = $(this.element),
                onClick = o.onClick,
                e_id = e.attr("id");
	        var node_id = $("#saveId" + e_id).text();//选中节点ID
	        if (node_id == "" || node_id == null) {
	            alert("未选中节点。");
	            return false;
	        }
	        var parentsId = $("#" + node_id).parents("li");
	        var result = "~", id;
	        for (var i = parentsId.length-1; i >=0; i--) {
	            id = parentsId.eq(i).attr("id");
	            result += "/"+id;
	        }
	        return result+"/"+node_id;
	    },
	    //#endregion
	    //#region获取最终nodes集合
	    getNodes: function () {
	        var
                self = this,
	            e = $(this.element),
                nodes=[],
                e_id = e.attr("id");
            //生成子节点集合
	        var makechildNode = function (obj) {
	            var id = obj.attr("id");
	            var name = obj.children("a").children("span:eq(1)").text();
	            var bgimg = obj.children("a").children("span:eq(0)").css("background-image");
	            var position = obj.children("a").children("span:eq(0)").css("background-position");
	            makeParentNode(obj);
	            return { id: id, name: name, image: bgimg, position: position };
	        };
            //生成父节点集合
	        var makeParentNode = function (obj) {
	            var id = obj.attr("id");
	            var name = obj.children("a").children("span:eq(1)").text();
	            var bgimg = obj.children("a").children("span:eq(0)").css("background-image");
	            var position = obj.children("a").children("span:eq(0)").css("background-position");
	            var children = [];
	            obj.children("ul").children("li").each(function () {
	                if ($(this).children("ul").children("li").length > 0) {
	                    children.push(makeParentNode($(this)));
	                } else {
	                    children.push(makechildNode($(this)));
	                }
	            });
	            return { id: id, name: name, image: bgimg, position: position, children: children };
	        };
	        e.children("ul").children("li").each(function () {
	            nodes.push(makeParentNode($(this)));
	        });
	        return nodes;
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