/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI jsortSelect Plugin
/*
* jQuery UI jsortSelect
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/


/*
* Author: Leidc
* Start date: 2012-10-22 
* Description: 排序功能的select
*/

//item: [{ name: "Id", text: "编号" },
//				{ name: "Age", text: "年龄", sort: "desc" },
//				{ name: "finishData", text: "完成日期", sort: "asc" },
//				{ name: "size", text: "大小", sort: "desc" }
/*
* options:
*		item ：
*				name: 表示排序字段的名称  text: 字段显示的值
*
*		onItemClick:回调函数 项选择之后触发
*		
* event
*		
*		
*	    
*/

(function ($, undefined) {
	$.widget("jui.jsortSelect",
	{
		options: {
			item: null,
			onItemClick: null
		},

		_create: function () {
			$(this.element).empty();
			var self = this,
			o = this.options;
			var tagId = this.element.attr("id");/*目标的id*/
			var titleId = tagId + "-title"; /*title*/
			var selectId = tagId + "-selectId";/*content*/
			var showParentUl = tagId + "-showParentUl";
			var showChildUl = tagId + "-showChildUl";
			var defaultDataSort, defaultDataValue, defaultDataContent; /*默认排序 实际值 显示值*/

			if (o.item.length > 0) {
				defaultDataSort = (o.item[0]["sort"] != "desc") ? "asc" : "desc";
				defaultDataValue = o.item[0]["name"];
				defaultDataContent = o.item[0]["text"];
			}

			$("#" + tagId).append("<span id=" + titleId + " style='cursor: pointer;'>排序方式:" +
				"<span id=" + selectId + " style='cursor: pointer' data-value=" + defaultDataValue + " data-sort=" + defaultDataSort + ">" + defaultDataContent + "</span>" +
			"<span class='jui-jsortSelect-downBtn'>&nbsp;&nbsp;</span></span>");

			var ulHtml = "<ul id=" + showParentUl + " class='jui-jsortSelect-ul'>";
			for (var i = 0; i < o.item.length; i++) {
				var dataSort = (o.item[i]["sort"]!="desc")?"asc":"desc";
				if (i == 0) {
					
					ulHtml += "<li data-value=" + o.item[0]["name"] + " data-sort=" +dataSort+ " class='action'>" + o.item[0]["text"] + " </li>";
				} else {
					ulHtml += "<li data-value=" + o.item[i]["name"] + " data-sort=" + dataSort+ ">" + o.item[i]["text"] + " </li>";
				}
			}
			ulHtml += "<div><hr style='margin:12px;'/><ul id=" + showChildUl + "><li class='action'>升序</li><li>降序</li></ul></div></ul>"


			$("body").append(ulHtml); /*body之前追加要显示的ul部分*/

			//鼠标点击展开事件
			$("#" + titleId).click(function (event) {
				//取消事件冒泡
				event.stopPropagation();
				$("#" + showParentUl).slideToggle("fast");
			});

			//里面的点击事件
			$("#" + showParentUl + " > li,#" + showChildUl + " > li").click(function (event) {

				$(this).siblings().removeClass("action");
				$(this).addClass("action");

				if ($("#" + showParentUl + " > li").hasClass("action") && $("#" + showChildUl + " > li").hasClass("action")) {
					switch ($(this).html()) {
						case "降序":
							$("#" + selectId).attr("data-sort", "desc");
							break;
						case "升序":
							$("#" + selectId).attr("data-sort", 'asc');
							break;
						default:
							if ($(this).attr("data-sort") == "desc") {
								$("#" + showChildUl + " > li").siblings().removeClass("action");
								$("#" + showChildUl + " > li").eq(1).addClass("action");
								$("#"+selectId).attr("data-sort", "desc");
							} else {
								$("#"+ showChildUl+" > li").siblings().removeClass("action");
								$("#"+showChildUl+" > li").eq(0).addClass("action");
								$("#"+selectId).attr("data-sort", 'asc');
							}
							$("#"+selectId).html($(this).html()).attr("data-value", $(this).attr("data-value"));

							break;
					}
					//alert($("#content").attr("data-value") + $("#content").attr("data-sort"));
					$("#" + showParentUl).slideToggle("fast");
					//self.options.onItemClick($(this).children("span").text().trim(), $(this).children("a").text().trim());
					self.options.onItemClick($("#"+selectId).attr("data-value"),$("#"+selectId).attr("data-sort"));
				}
				event.stopPropagation();
			
			});


			$("body").click(function () {
				if (!$("#" + showParentUl).is(":hidden")) {
					$("#" + showParentUl).slideUp("fast");
				}
			});
			$("#" + showParentUl).position({
				of: $("#"+titleId),
				my: "left top",
				at: "left bottom",
				offset: '0 0'
			}).css("display", "none");


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

	$.extend($.jui.jtip, {
		version: "0.1.0"
	});
})(jQuery);