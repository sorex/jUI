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

//items: [{ value: "Id", text: "编号" }, 
//				{ value: "Age", text: "年龄",selected:true sort: "desc" }, /sort值区分大小写/
//				{ value: "finishData", text: "完成日期", sort: "asc" },
//				{ value: "size", text: "大小", sort: "desc" }
/*
* options:
*		items ：
*				value: 表示排序字段的名称  text: 字段显示的值 sort:排序方式
*
*		onItemClick:回调函数 项选择之后触发
*		
* event
*		getSelectValueText
*		
*	    
*/

(function ($, undefined) {
		$.widget("jui.jsortSelect",
		{
			options: {
				items: null,
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
				
				if (o.items != null) {

					defaultDataSort = (o.items[0]["sort"] != "desc") ? "asc" : "desc";
					defaultDataValue = o.items[0]["value"];
					defaultDataContent = o.items[0]["text"];
					var flag = false;

					for (var i = 0; i < o.items.length ; i++) {
						if (o.items[i]["selected"]) {
							defaultDataSort = (o.items[i]["sort"] != "desc") ? "asc" : "desc";
							defaultDataValue = o.items[i]["value"];
							defaultDataContent = o.items[i]["text"];
							flag = true;
							break;
						}
					}

				
					$("#" + tagId).append("<span id=" + titleId + " style='cursor: pointer;text-align:right;'>排序方式:" +
						"<span id=" + selectId + " style='cursor: pointer' data-value=" + defaultDataValue + " data-sort=" + defaultDataSort + ">" + defaultDataContent + "</span>" +
					"<span class='jui-jsortSelect-downBtn'>&nbsp;&nbsp;</span></span>");

					var ulHtml = "<ul id=" + showParentUl + " class='jui-jsortSelect-ul'>";
					for (var i = 0; i < o.items.length; i++) {
						var dataSort = (o.items[i]["sort"] != "desc") ? "asc" : "desc";
						if (flag) {
							if (o.items[i]["selected"]) {
							    ulHtml += "<li data-value=" + o.items[i]["value"] + " data-sort=" + dataSort + " class='action'><i class='action'></i><span>"+ o.items[i]["text"] + "</span> </li>";
							} else {
							    ulHtml += "<li data-value=" + o.items[i]["value"] + " data-sort=" + dataSort + "><i></i><span>" + o.items[i]["text"] + "</span></li>";
							}
						
						}else{
							if (i == 0) {
							    ulHtml += "<li data-value=" + o.items[0]["value"] + " data-sort=" + dataSort + " class='action'><i class='action'></i><span>" + o.items[0]["text"] + "</span> </li>";
							} else {
							    ulHtml += "<li data-value=" + o.items[i]["value"] + " data-sort=" + dataSort + "><i></i><span>" + o.items[i]["text"] + "</span> </li>";
							}
						}
					}
					if (defaultDataSort == "asc") {
					    ulHtml += "<div><hr style='margin:12px;'/><ul id=" + showChildUl + "><li class='action'><i class='action'></i><span>升序</span></li><li><i></i><span>降序</span</li></ul></div></ul>"
					}else{
					    ulHtml += "<div><hr style='margin:12px;'/><ul id=" + showChildUl + "><li ><i ></i><span>升序<span></li><li class='action'><i class='action'></i><span>降序<span></li></ul></div></ul>"
					}

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
			$(this).siblings().find("i").removeClass("action");
			$(this).find("i").addClass("action");

			if ($("#" + showParentUl + " > li").hasClass("action") && $("#" + showChildUl + " > li").hasClass("action")) {
			   
			    switch ($(this).find("span").text()) {
                  
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
							$("#" + showChildUl + " > li").siblings().find("i").removeClass("action");
							$("#" + showChildUl + " > li").eq(1).find("i").addClass("action");
							$("#" + selectId).attr("data-sort", "desc");
						} else {
							$("#" + showChildUl + " > li").siblings().removeClass("action");
							$("#" + showChildUl + " > li").eq(0).addClass("action");
							$("#" + showChildUl + " > li").siblings().find("i").removeClass("action");
							$("#" + showChildUl + " > li").eq(0).find("i").addClass("action");
							$("#" + selectId).attr("data-sort", 'asc');
						}

						$("#" + selectId).html($(this).html()).attr("data-value", $(this).attr("data-value"));

						break;
				}
							
				$("#" + showParentUl).slideToggle("fast");
				if(o.onItemClick!=null){
				self.options.onItemClick($("#" + selectId).attr("data-value"), $("#" + selectId).find("span").text(), $("#" + selectId).attr("data-sort"));
			}
			}
			event.stopPropagation();

		});


		$("body").click(function () {
			if (!$("#" + showParentUl).is(":hidden")) {
				$("#" + showParentUl).slideUp("fast");
			}
		});
		$("#" + showParentUl).position({
			of: $("#" + titleId),
			my: "left top",
			at: "left bottom",
			offset: '0 0'
		}).css("display", "none");

		} else {
					$("#" + tagId).append("<span style='color:red;'>错误！！！请检查数据源</span>");
				
		}
		},
		getSelectValueText: function () {
			var self = this,
			o = this.options;
			var tagId = this.element.attr("id");/*目标的id*/
			var selectId = tagId + "-selectId";/*content*/

			var selectObject = Object;
			selectObject.value = $("#" + selectId).attr("data-value");
			selectObject.text = $("#" + selectId).find("span").text();
			selectObject.sort = $("#" + selectId).attr("data-sort");
			
			return selectObject;
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