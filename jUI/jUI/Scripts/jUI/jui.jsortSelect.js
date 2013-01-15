/// <reference path="../../Views/Home/checkTable.cshtml" />
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

//items: [{ sortColumn: "Id", text: "编号" }, 
//				{ sortColumn: "Age", text: "年龄",sortType: "desc" }, /sort值区分大小写/
//				{ sortColumn: "finishData", text: "完成日期", sortType: "asc" },
//				{ sortColumn: "size", text: "大小", sortType: "desc" }
/*
* options:
*		items ：
*				sortColumn: 表示排序字段的名称  text: 字段显示的值 sortType:排序方式
*
*		onSortChange:回调函数 项选择之后触发
*       sortItem:{sortColumn:"大小",sortType:"desc"}
*		
* event
*		getSelectedItem：
*		
*	    
*/

(function ($, undefined) {
		$.widget("jui.jsortSelect",
		{
			options: {
				items: null,
				onSortChange: null,
				sortItem: { sortColumn: "size", sortType: "desc" }
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
				var defaultDataSortType, defaultDataSortColumn, defaultDataContent; /*默认排序 实际值 显示值*/
				
				if (o.items != null) {
				    defaultDataSortType = (o.items[0]["sortType"] != "desc") ? "asc" : "desc";
					defaultDataSortColumn = o.items[0]["sortColumn"];
					defaultDataContent = o.items[0]["text"];
					var flag = false;
					for (var i = 0; i < o.items.length ; i++) {
					    if (o.sortItem != null && o.items[i]["sortColumn"] == o.sortItem.sortColumn) {
						    defaultDataSortType = (o.sortItem.sortType!= "desc") ? "asc" : "desc";
							defaultDataSortColumn = o.items[i]["sortColumn"];
							defaultDataContent = o.items[i]["text"];
							flag = true;
							break;
						}
					}

				
					$("#" + tagId).append("<span id=" + titleId + " style='cursor:pointer;text-align:right;display:-moz-inline-box; display:inline-block; width:130px;'>排序方式:" +
						"<span id=" + selectId + " style='cursor: pointer' data-sortColumn=" + defaultDataSortColumn + " data-sortType=" + defaultDataSortType + ">" + defaultDataContent + "</span>" +
					"<span class='jui-jsortSelect-downBtn'>&nbsp;&nbsp;</span></span>");

					var ulHtml = "<ul id=" + showParentUl + " class='jui-jsortSelect-ul'>";
					for (var i = 0; i < o.items.length; i++) {
					    var dataSortType = (o.items[i]["sortType"] != "desc") ? "asc" : "desc";
						if (flag) {
						    if (o.sortItem.sortColumn != null && o.items[i]["sortColumn"] == o.sortItem.sortColumn) {

							    ulHtml += "<li data-sortColumn=" + o.items[i]["sortColumn"] + " data-sortType=" + dataSortType + " class='action'><i class='action'></i><span>" + o.items[i]["text"] + "</span> </li>";
							} else {
							    ulHtml += "<li data-sortColumn=" + o.items[i]["sortColumn"] + " data-sortType=" + dataSortType + "><i></i><span>" + o.items[i]["text"] + "</span></li>";
							}
						
						}else{
							if (i == 0) {
							    ulHtml += "<li data-sortColumn=" + o.items[0]["sortColumn"] + " data-sortType=" + dataSortType + " class='action'><i class='action'></i><span>" + o.items[0]["text"] + "</span> </li>";
							} else {
							    ulHtml += "<li data-sortColumn=" + o.items[i]["sortColumn"] + " data-sortType=" + dataSortType + "><i></i><span>" + o.items[i]["text"] + "</span> </li>";
							}
						}
					}
					if (defaultDataSortType == "asc") {
					    ulHtml += "<div><hr style='margin:12px;cursor:default;'/><ul id=" + showChildUl + "><li class='action'><i class='action'></i><span>升序</span></li><li><i></i><span>降序</span</li></ul></div></ul>"
					}else{
					    ulHtml += "<div><hr style='margin:12px;cursor:default;'/><ul id=" + showChildUl + "><li ><i ></i><span>升序<span></li><li class='action'><i class='action'></i><span>降序<span></li></ul></div></ul>"
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
					    $("#" + selectId).attr("data-sortType", "desc");
						break;
					case "升序":
					    $("#" + selectId).attr("data-sortType", 'asc');
						break;
					default:
					    if ($(this).attr("data-sortType") == "desc") {
							$("#" + showChildUl + " > li").siblings().removeClass("action");
							$("#" + showChildUl + " > li").eq(1).addClass("action");
							$("#" + showChildUl + " > li").siblings().find("i").removeClass("action");
							$("#" + showChildUl + " > li").eq(1).find("i").addClass("action");
							$("#" + selectId).attr("data-sortType", "desc");
						} else {
							$("#" + showChildUl + " > li").siblings().removeClass("action");
							$("#" + showChildUl + " > li").eq(0).addClass("action");
							$("#" + showChildUl + " > li").siblings().find("i").removeClass("action");
							$("#" + showChildUl + " > li").eq(0).find("i").addClass("action");
							$("#" + selectId).attr("data-sortType", 'asc');
						}
						$("#" + selectId).html($(this).html()).attr("data-sortColumn", $(this).attr("data-sortColumn"));
						break;
				}
				$("#" + showParentUl).slideToggle("fast");
				if (o.onSortChange != null) {
				   
				    self.options.onSortChange($("#" + selectId).attr("data-sortColumn"), $("#" + selectId).find("span").text(), $("#" + selectId).attr("data-sortType"));
			}
			}
			event.stopPropagation();

		});
		$(document).bind("click", function (e) {
		    if ($(e.target).parent("#" + showParentUl).length == 0) {
		        if (!$("#" + showParentUl).is(":hidden")) {
		        $("#" + showParentUl).slideUp("fast");  
		        }
		    } 		    });
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
		getSelectedItem: function () {
			var self = this,
			o = this.options;
			var tagId = this.element.attr("id");/*目标的id*/
			var selectId = tagId + "-selectId";/*content*/
			var selectObject = Object;
			selectObject.sortColumn = $("#" + selectId).attr("data-sortColumn");
			selectObject.text = $("#" + selectId).text();
			selectObject.sortType = $("#" + selectId).attr("data-sortType");
			return selectObject;
		},

		_setOption: function (key, value) {
		    if (value !== undefined || value != null){
		        this.options[key] = value;
		       
		    } else{     
		        return this.options[key];
		    }
		},
		
		_setOptions: function (options) {
		    var self = this, refresh = false;
		    $.each(options, function (key, value) {
		        self._setOption(key, value);
		        if (key == "sortItem") {
                    refresh = true;
		        }
		    });
		    if (refresh) {
			    o = this.options;
		        var tagId = this.element.attr("id");/*目标的id*/
		        var selectId = tagId + "-selectId";/*content*/                                    //改效果
		        var showParentUl = tagId + "-showParentUl";
		        var showChildUl = tagId + "-showChildUl";
		        $("#" + selectId).attr("data-sortColumn", o.sortItem.sortColumn);
		        $("#" + selectId).attr("data-sortType", o.sortItem.sortType);
		        for (var i = 0; i < o.items.length; i++) {
		            if (o.items[i]["sortColumn"] == o.sortItem.sortColumn) {
		                $("#" + selectId).html(o.items[i]["text"]);
		                break;
		            }
		        }
		        $("#" + showParentUl + ">li").each(function () {
		            $(this).find("i").removeClass("action");
		            if ($(this).attr("data-sortColumn") == o.sortItem.sortColumn) {
		                $(this).attr("data-sortType", o.sortItem.sortType);
                        $(this).find("i").addClass("action")
		            }
		        });
		        $("#" + showChildUl + " > li").find("i").removeClass("action");
		        if (o.sortItem.sortType == "asc") {
		            $("#" + showChildUl + " > li").eq(0).find("i").addClass("action");
		        } else {
		            $("#" + showChildUl + " > li").eq(1).find("i").addClass("action");
		        }

	
		   
		    }
		   
		    
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