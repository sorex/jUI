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
* data:[item,item....]
* item:
*       name:菜单各项显示内容
*       id:选项id
*       position:定位图片的坐标字符串
*       image:给选项前添加小图标(注：图标宽高各为27px)
*       line:设置选项间距为空格或分割线
*       children:设置是否有二级菜单
*       onItemClick(id, name):
*		    点击菜单时的事件
*		    id：点击项的id
*		    name：点击项的文本内容
*/

(function ($, undefined) {
    $.widget("jui.jheadMenu",
	{
	    // default options
	    options: {
	        data: []
            , onItemClick: null
	    },

	    _create: function () {
	        this._jdatapagerify();
	    },

	    _jdatapagerify:function(){	        
	        var self = this, o = this.options,
	        e = $(this.element);
	        e.empty();
	        var eid= $(this.element).attr("id");
	        var data = o.data;
	        e.addClass('jui-headMenu').empty().append("<ul id='" + eid + "_ul' class='jui-headMenu-ju'></ul>").bind("selectstart", function () { return false; });
	        for (var i = 0; i < data.length; i++) {
	            var id = data[i]["id"];
	            if (id == "" || id == null) {
	                id = i;
	            }
	            var name = data[i]["name"],
	                image = data[i]["image"],
	                children = data[i]["children"],
	                hline = data[i]["line"],
	                position = data[i]["position"];
	            if (image != null && image != "") {
                    $("#" + eid + "_ul").append("<li id='" + eid + "_" + id + "'><span style='display:none;'>"+id+"</span><a>"
                        + "<span class='jui-headMenu-las1'> <span class='jui-headMenu-lass'> <span class='jui-headMenu-lass_endicon'>" +
                        "<span style='width:27px;height:27px;float:left;position:relative;top:4px;background-image:url(" + image + ");background-position:" + position + ";' ></span></span> " + name + "</span> </span>"
                        + "</a></li>");
	            } else {
	                $("#" + eid + "_ul").append("<li id='" + eid + "_" + id + "'><span style='display:none;'>" + id + "</span><a>"
                        + "<span class='jui-headMenu-las1'> <span class='jui-headMenu-lass'> <span class='jui-headMenu-lass_endicon'><span style='height:27px;float:left;position:relative;top:4px;'></span></span> " + name + "</span> </span>"
                        + "</a></li>");
	            }
	            var lw = 0;
	            if (children != null && children.length) {
	                $("#" + eid + "_" + id).append("<ul class='jui-headMenu-u1' id='u" + eid + "_" + id + "'></ul>"); //二级菜单
	                for (var j = 0; j < children.length; j++) {
	                    var uid = children[j]["id"];
	                    if (uid == "" || uid == null) {
	                        uid = i+"_"+j;
	                    }
	                    var uname = children[j]["name"];
	                    var uline = children[j]["line"];
	                    $("#u" + eid + "_" + id).append("<li id='" + eid +"_"+ uid + "'><span style='display:none;'>" + uid + "</span><a><span>" + uname + "</span></a></li>");
	                    if (uline == true) {
	                        $("#u" + eid + "_" + id).find("li").eq(j).append("<span class='jui-headMenu-solid'><span style='border-bottom:1px solid #666;display: block;'></span> </span>");
	                    }
	                    lw = $("#" + eid + "_" + id).width();
	                    if (lw < 50) {
	                        $("#u" + eid + "_" + id).css("width", 2 * lw+100);//ul
	                    } else {
	                        $("#u" + eid + "_" + id).css("width", 2 * lw);//ul
	                    }
	                    $("#" + eid + "_" + id).width(lw);//li

	                    if (i == data.length - 1) {
	                        $("#" + eid + "_" + id).children("ul").css({ "left": -lw + 12 + "px" });
	                    }
	                }
	            }
	            if (hline == true) {
	                $("#" + eid + "_" + id).after("<span class='jui-headMenu-vsolid '></span>");
	            }
	        }
	        e.find("li").has("ul").find(".jui-headMenu-lass").after("<span class='jui-headMenu-endImg'></span>");

	        e.children("ul").children("li").click(function () {
	            e.find("li").not(this).has("ul:visible").children("ul").slideUp("fast");
	            $(this).children("ul").slideToggle("fast");
	        });
	        e.children("ul").children("li").mousedown(function () {
	            e.find("li").removeClass("jui-headMenu-clicked");
	            e.find("li").children("a").removeClass("jui-headMenu-clicked");
	            $(this).addClass("jui-headMenu-clicked");
	            $(this).children("a").addClass("jui-headMenu-clicked");
	            $(this).mouseup(function () {
	                $(this).removeClass("jui-headMenu-clicked");
	                $(this).children("a").removeClass("jui-headMenu-clicked");
	            });	       
	        });

	        e.find("li").bind("click", function () {
	            if ($(this).find(".jui-headMenu-endImg").length == 0) {
	                self.options.onItemClick($(this).children("span").text().trim(), $(this).children("a").text().trim());
	            }
	        });

	        $(document).bind("mousedown", function (evt) {
	            if ($(evt.target).parents('#' + eid).length == 0) {
	                e.find("li").has("ul:visible").children("ul").slideUp("fast");
	                e.find("li").removeClass("jui-headMenu-clicked");
	                e.find("li").children("a").removeClass("jui-headMenu-clicked");
	            }
	        })
	        //当菜单项中无文字而只有下拉图标时候，调整下拉箭头样式
	        e.find("li").has("ul").find(".jui-headMenu-lass").each(function () {
	            var t = $(this).text();
	            var img = $(this).next();
	            var ul = $(this).parent().parent().next();
	            var li = $(this).parent("li");
	            if (t.trim() == "" || t.trim() == null) {
	                $(this).remove();
	                img.css({ "top": "12px", "left": "6px" });
	                ul.css({ "top": "19px" });
	            }
	        });
	        $(".jui-headMenu-ju").find("li").has("ul").addClass("jui-headMenu-ju_li");

	        $(".jui-headMenu-solid").click(function (event) {
	            event.stopPropagation();	            
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