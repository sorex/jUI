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

/*items:		[{ value: "China", text: "中国" }, value:表示实际值  text：表示文本显示的值  selected 表示是否选中
*			{ value: " Japan", text: "日本" },
*			{ value: "America", text: "美国",selected: true },
*			{ value: "Korea  ", text: "朝鲜" },
*			{ value: "Corea  ", text: "韩国" }
*			]
*		
*model:single（multiple） model表示是单选框还是多选框 single表示单选  multiple表示多选
*
*placeholder: "请选择..."  placeholder表示没有选择前的提示语 默认为 请选择...	
*	
*width:150px   width表示select选择框的宽度 默认为150px
*
*onSelectChange:null  onSelectChange表示 选项的点击事件
*/

(function ($, undefined) {
	$.widget("jui.jSelect",
	{
		options: {
			items: null,
			model: "single",
			placeholder: "请选择",
			width: "150px",
			onSelectChange: null
		},

		_create: function () {
			$(this.element).empty();
			var self = this,
			o = this.options;
			var tagId = this.element.attr("id");/*目标的id*/
			var width, palceHoler;
			var selectHtml = '';
			var selectId = tagId + "_select";
			var flag = false;

			if (o.items != null) {

				if (o.model != "multiple") { /*多选功能的select*/
					selectHtml += "<select id=" + selectId + " data-placeholder=" + o.placeholder + " class='chzn-select' style='width:" + o.width + ";' tabindex='2'><option></option>";
				} else {
					flag = true;
					selectHtml += "<select id=" + selectId + " data-placeholder=" + o.placeholder + " class='chzn-select' multiple style='width:" + o.width + ";' tabindex='4'><option></option>";
				}
				for (var i = 0; i < o.items.length; i++) {
					if (o.items[i].selected) {
						selectHtml += "<option selected value=" + o.items[i].value + ">" + o.items[i].text + '　' + "</option>";
					} else {
						selectHtml += "<option value=" + o.items[i].value + ">" + o.items[i].text + '　' + "</option>";
					}

				}
				selectHtml += "</select>";
				$("#" + tagId).append(selectHtml);
				$(".chzn-select").chosen();
				//alert(selectHtml);
				
				$("#" + selectId).change(function () {
					if (flag) {
					
						var selectList = [];
						var textList = $(this).find("option:selected").text().substring(0, $(this).find("option:selected").text().length).split('　');
						var valueList = $(this).val();
						if (valueList != null) {
							for (var i = 0; i < valueList.length ; i++) {
								var tempObject = Object;
								tempObject.value = valueList[i];
								tempObject.text = textList[i];
								selectList.push(tempObject);
							}
						} else {
							selectList = null;
						}
						self.options.onSelectChange(selectList);


					}else{
						self.options.onSelectChange($(this).val(), $(this).find("option:selected").text().substring(0, $(this).find("option:selected").text().length - 1));

					}
				});

			} else {

				$("#" + tagId).append("<span style='color:red;'>错误！！！请检查数据源</span>");

			}


		},
		getSelectValueText: function () {
			
			var self = this,
			o = this.options;
			var tagId = this.element.attr("id");/*目标的id*/
			var selectId = tagId + "_select";/*content*/
		
			if (o.model == "multiple") {
				var list = [];
				var textList = $("#" + selectId).find("option:selected").text().substring(0, $("#" + selectId).find("option:selected").text().length).split('　');
				var valueList = $("#" + selectId).val();
				if (valueList != null) {
					for (var i = 0; i < valueList.length ; i++) {
						var tempObject = Object;
						tempObject.value = valueList[i];
						tempObject.text = textList[i];
						list.push(tempObject);
					}
				} else {
					list = null;
				}
				
			
				return list;
				
			} else {
				
				var selectObject = Object;
				selectObject.value = $("#"+selectId).val();
				selectObject.text = $("#"+selectId).find("option:selected").text().substring(0, $("#" + selectId).find("option:selected").text().length-1);
				return selectObject;
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