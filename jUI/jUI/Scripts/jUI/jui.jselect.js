/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />



//JQuery UI jSelect Plugin
/*
* jQuery UI jSelect
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	chosee.jquery.js
*/


/*
* Author: Leidc
* Start date: 2012-10-22 
* Description: 普通的select
*/

//item: [{ name: "Id", text: "编号" },
//				{ name: "Age", text: "年龄", sort: "desc" },
//				{ name: "finishData", text: "完成日期", sort: "asc" },
//				{ name: "size", text: "大小", sort: "desc" }
/*
* options:
*		item ：
*				name: 表示排序字段的名称  text: 字段显示的值 sort:排序方式
*
*		onItemClick:回调函数 项选择之后触发
*		
* event
*		
*		
*	    
*/

(function ($, undefined) {
	$.widget("jui.jSelect",
	{
		options: {
			item: [{ value: "China", text: "中国" },
					{ value: " Japan", text: "日本" },
					{ value: "America", text: "美国" },
					{ value: "Korea  ", text: "朝鲜" },
					{ value: "Corea  ", text: "韩国" }
			],
			model:"default",
			placeholder: "请选择",
			width:"150px",
			onSelectChange: null
		},

		_create: function () {
			$(this.element).empty();
			var self = this,
			o = this.options;
			var tagId = this.element.attr("id");/*目标的id*/
			var width, palceHoler;
			var selectHtml='';
			var selectId = tagId + "_select";
			
		
			if (o.model != "multiple") { /*多选功能的select*/
				selectHtml += "<select id=" + selectId + " data-placeholder=" + o.placeholder + " class='chzn-select' style='width:"+o.width+";' tabindex='2'><option></option>";
			} else {
			
				selectHtml += "<select data-placeholder=" + o.placeholder + " class='chzn-select' multiple style='width:" + o.width + ";' tabindex='4'><option></option>";
			}
			for (var i = 0; i < o.item.length; i++) {
				selectHtml += "<option value="+o.item[i].value+">"+o.item[i].text+"</option>";
			}
			selectHtml += "</select>";
			$("#" + tagId).append(selectHtml);
			$(".chzn-select").chosen();
			if (o.model != "multiple") {
				$("#" + selectId).change(function () {
					self.options.onSelectChange($(this).val(), $(this).find("option:selected").text());
				});
			}else{
				
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

	$.extend($.jui.jtip, {
		version: "0.1.0"
	});
})(jQuery);