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
*		activeId: 默认选中项
*		data:菜单对象列表
*           [{name:'nameA1'，href:'actionName1',id:'A1',icon:'ui-icon ui-icon-circle-plus',image:'../../Content/themes/base/images/xxx.png'}
            ,{type:''}
            ,{name:'nameA2'，href:'actionName2',id:'A2',icon:'ui-icon ui-icon-circle-plus',image:'../../Content/themes/base/images/xxx.png'
            ,children:[{name:'nameB1',href:'actionName3',id:'B1'},{type:'space'}
                ,{name:'nameB2',href:'actionName4',id:'B2'}]}
            ]
*       name:菜单各项显示内容
*       href:点击选项后调用的js
*       id:选项id
*       icon:给选项前添加jquery-ui 小图标
*       image:给选项前添加图片
*       type:设置选项间距为空格或分割线
*       children:设置是否有二级菜单
*/

(function ($, undefined) {
    $.widget("jui.jheadMenu",
	{
	    // default options
	    options: {
	        activeId: 'A1',
	        data: [
						{
						    name: "JDatepicker"//名称
							, href: "/Control/JDatepicker"//链接
							, id: "1"
							, icon: "ui-icon ui-icon-circle-plus"//小图标
						}
						, { type: "" }//空格或横条
						, {
						    name: "JTableSorter"
							, href: "/Control/JTableSorter"
							, id: "2"
							, icon: ""
							, children: [
												{
												    name: "name B21"
													, href: "#"
													, id: "B21"
												}
												, { type: "space" }
												, {
												    name: "name B22"
													, href: "#"
													, id: "B22"
												}
												, { type: "space" }
												, {
												    name: "name B23"
													, href: "#"
													, id: "B23"
												}
												, { type: "space" }
												, {
												    name: "name B24"
													, href: "#"
													, id: "B24"
												}
							]
						}
						, { type: "" }
						, {
						    name: "JNavigation"
							, href: "/Control/JNavigation"
							, id: "3"
							, icon: "ui-icon ui-icon-circle-zoomout"
						}
						, { type: "" }
						, {
						    name: "JDatapager"
							, href: "/Control/JDatapager"
							, id: "4"
							, icon: "ui-icon ui-icon-circle-zoomout"
						}
						, { type: "" }
						, {
						    name: "Jsearch"
							, href: "/Control/Jsearch"
							, id: "5"
							, icon: "ui-icon ui-icon-circle-zoomout"
						}
						, { type: "" }
						, {
						    name: "JSearchs"
							, href: "/Control/JSearchs"
							, id: "6"
							, icon: "ui-icon ui-icon-circle-zoomout"
						}
						, { type: "" }
						, {
						    name: "JTip"
							, href: "/Control/JTip"
							, id: "7"
							, icon: "ui-icon ui-icon-circle-zoomout"
						}
						, { type: "" }
						, {
						    name: "TestModel"
							, href: "/Control/TestModel"
							, id: "8"
							, icon: "ui-icon ui-icon-circle-zoomout"
						}],
	    },

	    _create: function () {
	        $(this.element).empty();
	        var self = this,
				o = this.options;
	        e = $(this.element);
	        e.empty();
	        var listOne = "<ul id='outUl'></ul>";//一级菜单
	        e.append(listOne);
	        var note = "<div style='color:red;font-family:arial;'>参数不全！</div>";//错误提示
	        var activeId = o.activeId;
	        for (var i = 0; i < o.data.length; i++) {
	            if (i % 2 == 0) {
	                var id = o.data[i]['id'];
	                var href = o.data[i]['href'];
	                var name = o.data[i]['name'];
	                var icon = o.data[i]['icon'];
	                var image = o.data[i]['image'];
	                var listOneItem = "<li ><div id='d" + id + "' class='ui-jnavigation-d'><a  href='" + href + "' id='" + id + "'>" + name + "</a><span class='ui-jnavigation-sp'>&nbsp;</span></div></li>";
	                $("#outUl").append(listOneItem); //一级菜单有子项的标识
	                if (activeId != null && activeId == id) {
	                    $("#" + activeId).parent().parent().addClass("jui-headMenu-aciveItem");//.css("background", "#73f"); //activeId样式
	                }
	                if (image != null && image != "" && (icon == null || icon == "")) {
	                    var img = "<img class='jui-headMenu-image' src='" + image + "'/>";
	                    $("#d" + id).append(img);
	                }
	                else if (icon != null && icon != "" && (image == null || image == "")) {
	                    var span = "<span class='jui-headMenu-icon'>&nbsp;</span>";
	                    $("#d" + id).append(span);
	                    $(".jui-headMenu-icon").addClass(icon);
	                } else if (icon != null && icon != "" && image != null && image != "") {
	                    $("#d" + id).append("<img class='jui-headMenu-image' src='" + image + "'/>");
	                }
	            }
	            if (i % 2 != 0 && o.data[i]["type"] == "space") {

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