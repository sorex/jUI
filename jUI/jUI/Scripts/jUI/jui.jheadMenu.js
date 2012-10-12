/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI headMenu Plugin
/*
* jQuery UI headMenu 
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/


/*
* Author: ZhangJian
* Create date: 2012年9月19日 10:33:31
* Description: 导航菜单(二级菜单) 
* PS: 特定皮肤
*/

/*
* items:
*		data:菜单对象列表
*       name:菜单各项显示内容
*       id:选项id
*       icon:给选项前添加小图标
*       line:设置选项间距为空格或分割线
*       children:设置是否有二级菜单
*/

(function ($, undefined) {
    $.widget("jui.jheadMenu",
	{
	    // default options
	    options: {
            data: [{
                        name: "创建",id: "A1", icon: "whiteplus", line: true                
                                 ,children: [{ name: "文件夹",id: "A21", line: true }
                                               ,{name: "Word 文档",id: "A22"}
                                               ,{name: "Excel 工作薄",id: "A22"}]}
                        ,{name: "上载",id: "B1", icon: "whitearrows"}
                        ,{name: "打开",id: "C1", icon: ""}
                        ,{name: "管理",id: "G1", icon: ""
                                 ,children: [{ name: "重命名",id: "B21" }
                                               ,{name: "删除",id: "B22"}
                                               ,{name: "移致",id: "B23", line: true}
                                               ,{name: "属性",id: "B24"}]}
                        ,{name: "清除选定内容",id: "F1", icon: ""
                    }]
            , onItemClick: null
	    },

	    _create: function () {
	        this._jdatapagerify();
	    },

	    _jdatapagerify:function(){	        
	        var self = this,o = this.options;
	        e = $(this.element);
	        e.empty();
	        var eid = $(this.element).attr("id");
	        var data = o.data;
	        e.addClass('jui-headMenu').empty().append("<ul id='" + eid + "_ul' class='jui-headMenu-ju'></ul>").bind("selectstart", function () { return false; });
	        for (var i = 0; i < data.length; i++) {
	            var id = data[i]["id"];
	            var name = data[i]["name"];
	            var icon = data[i]["icon"];
	            var image = "../../Images/headMenuTestImage.png";
	            var children = data[i]["children"];
	            var hline = data[i]["line"];
	            var position = data[i]["position"];

	            if (icon != null && icon != "") {
	                $("#"+eid+"_ul").append("<li id='l" + id + "'><a>"
                        + "<span class='jui-headMenu-las1'> <span class='jui-headMenu-lass'> <span class='jui-headMenu-lass_endicon'><span style='width:26px;height:26px;float:left;position:relative;top:4px;'><img class='jui-headMenu-icon-"
                        + icon + "'  src='" + image + "'/></span></span> " + name + "</span> </span>"
                        + "</a></li>");
	            } else {
	                $("#" + eid + "_ul").append("<li id='l" + id + "'><a>"
                        + "<span class='jui-headMenu-las1'> <span class='jui-headMenu-lass'> <span class='jui-headMenu-lass_endicon'><span style='height:26px;float:left;position:relative;top:4px;'></span></span> " + name + "</span> </span>"
                        + "</a></li>");
	            }
	            var lw = 0;
	            if (children != null && children.length) {
	                $("#l" + id).append("<ul class='jui-headMenu-u1' id='u" + id + "'></ul>"); //二级菜单
	                for (var j = 0; j < children.length; j++) {
	                    var uid = children[j]["id"];
	                    var uname = children[j]["name"];
	                    var uline = children[j]["line"];
	                    $("#u" + id).append("<li id='" + uid + "'><a><span>" + uname + "</span></a></li>");
	                    if (uline == true)
	                        $("#u" + id).find("li").eq(j).append("<span  class='jui-headMenu-solid'></span>");
	                    lw = $("#l" + id).width();
	                    $("#u" + id).css("width", 2 * lw);
	                    $("#l" + id).width(lw);

	                    if (i == data.length - 1) {
	                        $("#l" + id).children("ul").css({ "left": -lw + 12 + "px" });
	                    }
	                    lw = 0;
	                }
	            }
	            if (hline == true) {
	                $("#l" + id).after("<span class='jui-headMenu-vsolid '></span>");
	            }
	        }
	        var endImg = '../../Content/images/jui-jheadMenu-carat-s-ffffff.png';//箭头图标
	        e.find("li").has("ul").find(".jui-headMenu-lass").after("<img class='jui-headMenu-endImg' style='' src='" + endImg + "'/>");
	        e.children("ul").children("li").click(function () {
	            $(this).children("ul").slideToggle("fast").end().siblings().has("ul:visible").children("ul").hide();
	        });

	        e.find("li").bind("click", function () {
	            if ($(this).find(".jui-headMenu-endImg").length == 0) {
	                self.options.onItemClick($(this).text());
	                //self._setOptions($(this).text());
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
	        //self.options.onItemClick(options);
	        this._jdatapagerify();
	    },

	    _destroy: function () {
	        $(this.element).empty();
	        $(this).empty();
	        return this;
	    }
	});

    $.extend($.jui.jheadMenu, {
        version: "0.1.0"
    });
})(jQuery);