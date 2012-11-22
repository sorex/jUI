/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI tip Plugin
/*
* jQuery UI tip
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	chosen.jquery.js
*	jui.jselect.js
*	jui.jdatetimepicker.js
*/


/*
* Author: Leidc
* Start date: 2012-11-23 16:30
* Description: 查询控件
* 
*/

/*
* options:
*		type;表示提示的类型包括(nomal[常规],success[成功],error[错误])
*		position;表示提示出现的位置(w[底部中间提示],n[右边中间提示])
*		width：表示提示框的长度
*		content:表示提示的内容
*       autoshow:表示是否直接显示（false[初始化为隐藏],true[初始化为显示]）
* event
*		show：显示
*		hide:隐藏
*	    refreshPositon:重新定位
*/

(function ($, undefined) {
	$.widget("jui.jsearch",
	{
		options: {
			items: [
					{ Name: "小数和整数", Id: "txt_Age", Type: "double" },
					{ Name: "范围小数和整数", Id: "txt_AgeStart", Type: "doubleRange", Brother: [{ Id: "txt_AgeEnd" }] },
					{ Name: "两位整数", Id: "txt_Age", Type: "int", MaxLength: 2 },
					{ Name: "范围整数", Id: "txt_AgeStart", Type: "intRange", MaxLength: 3, Brother: [{ Id: "txt_AgeEnd", MaxLength: 4 }] },
					{ Name: "单个日期", Id: "txt_Time", Type: "date" },
					{ Name: "两个日期", Id: "data_StartTime", Type: "dateRange", Brother: [{ Id: "data_EndTime", Type: "date" }] },
					{ Name: "单选", Id: "txt_State1", Type: "selectSingle", Value: [{ value: 0, text: "全部" }, { value: 1, text: "正常" }, { value: 2, text: "停用", selected: true }] },
					{ Name: "多选", Id: "txt_State", Type: "selectMultiple", Value: [{ value: 0, text: "全部" }, { value: 1, text: "正常" }, { value: 2, text: "停用" }] },
					{ Name: "自定义", Type: "user-defined", Content: "<input style='width: 223px;'  id='txt_contetent' name='text' type='text' >" },
					{ Name: "自定义2", Type: "user-defined", Content: "<input style='width: 223px;'  id='txt_contetent2' name='text' type='text' >" },
					{ Name: "字符串", Id: "txt_Name", Type: "string", MaxLength: 5 }

			],
		},

		_create: function () {

			this._showTable();

		},
		_showTable: function () {

			$(this.element).empty();
			var e = $(this.element);
			o = this.options;
			var count = o.data.length;
			var tagId = this.element.attr("id");/*目标的id*/
			var tableId = tagId + "_table";
			var buttonId = tagId + "_btn";
			var trId = tagId + "_tr_";

			e.append("<table id=" + tableId + " width='100%' class='ui-jsearch-table' cellpadding='0' cellspacing='0'></table>");
			$("#" + tableId).after("<p align='center' style='margin-top: 5px; margin-left: 55%;'><input id=" + buttonId + " type='button' value='搜索' /></p><p align='right'>");
			if (count % 2 == 0) { //创建偶数行 
				for (var i = 0; i < count / 2; i++) {
					$("#" + tableId).append("<tr id='" + trId + i + "'></tr>");
					this._appendEven(i);
				}
			}
			if (count % 2 != 0) {  //创建奇数行
				for (var i = 0; i < parseInt(count / 2) ; i++) {
					$("#" + tableId).append("<tr  id='" + trId + i + "'></tr>");
					this._appendEven(i);
				}
				$("#" + tableId).append("<tr id='" + trId + parseInt(count / 2) + "'></tr>");
				var last = parseInt(count / 2);
				this._appendLast(last);
			}
		},

		_appendEvent: function (range) {
			$(this.element).empty();
			var e = $(this.element);
			o = this.options;
			var count = o.data.length;
			var tagId = this.element.attr("id");/*目标的id*/
			var trId = tagId + "_tr_";
			//{ Name: "小数和整数", Id: "txt_Age", Type: "double" },
			//{ Name: "范围小数和整数", Id: "txt_AgeStart", Type: "doubleRange", Brother: [{ Id: "txt_AgeEnd" }] },
			//{ Name: "两位整数", Id: "txt_Age", Type: "int", MaxLength: 2 },
			//{ Name: "范围整数", Id: "txt_AgeStart", Type: "intRange", MaxLength: 3, Brother: [{ Id: "txt_AgeEnd", MaxLength: 4 }] },
			//{ Name: "单个日期", Id: "txt_Time", Type: "date" },
			//{ Name: "两个日期", Id: "data_StartTime", Type: "dateRange", Brother: [{ Id: "data_EndTime", Type: "date" }] },
			//{ Name: "单选", Id: "txt_State1", Type: "selectSingle", Value: [{ value: 0, text: "全部" }, { value: 1, text: "正常" }, { value: 2, text: "停用", selected: true }] },
			//{ Name: "多选", Id: "txt_State", Type: "selectMultiple", Value: [{ value: 0, text: "全部" }, { value: 1, text: "正常" }, { value: 2, text: "停用" }] },
			//{ Name: "自定义", Type: "user-defined", Content: "<input style='width: 223px;'  id='txt_contetent' name='text' type='text' >" },
			//{ Name: "自定义2", Type: "user-defined", Content: "<input style='width: 223px;'  id='txt_contetent2' name='text' type='text' >" },
			//{ Name: "字符串", Id: "txt_Name", Type: "string", MaxLength: 5 }
		//	<td style="text-align: right; width: 25%">普通字符</td>
		//<td style="width: 25%">
		//	<input id="txt_Name" type="text" maxlength="2" /></td>
		//<td style="text-align: right; width: 25%;">整数</td>
		//<td style="width: 25%">
		//	<input id="txt_Age" type="text" maxlength="3" /></td>
			switch (o.data[range * 2]["Type"]) {
				case "string":
					$("#"+trId+ range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2]["Name"] + "</td><td style='width:36%' align='left' class='ui-jsearch-table-centerborder'><input style='width: 223px;'  id=" + o.data[range * 2]["Id"] + " type='text'/></td>");
					break;
				case "int":
					$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2]["Name"] + "</td><td style='width:36%' align='left' class='ui-jsearch-table-centerborder'><input style='width: 223px;' id=" + o.data[range * 2]["Id"] + " type='text' /></td>");
					break;
				case "date":
					$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2]["Name"] + "</td><td style='width:36%' align='left' class='ui-jsearch-table-centerborder'><input style='width: 223px;'  id=" + o.data[range * 2]["Id"] + " type='text'/></td>");
					break;
				case "state":

					$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2]["Name"] + "</td><td style='width:36%' align='left' class='ui-jsearch-table-centerborder' id='td_" + o.data[range * 2]["Id"] + "'></td>");
					this._setSelect(range * 2);
					break;
				case "daterange":
					if (o.data[range * 2]["Brother"].length != 0) { //默认只有一个
						$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2]["Name"] + "</td><td style='width:36%' align='left' class='ui-jsearch-table-centerborder'><input id=" + o.data[range * 2]["Id"] + " type='text' style='width: 103px;' />至<input id=" + o.data[range * 2]["Brother"][0]["Id"] + " style='width: 103px;' /></td>");
					}
					break;
				case "user-defined":
					$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2]["Name"] + "</td><td style='width:36%' align='left' class='ui-jsearch-table-centerborder' > " + o.data[range * 2]["Content"] + "</td>");
					break;

			}
			switch (o.data[range * 2 + 1]["Type"]) {
				case "varchar":
					$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2 + 1]["Name"] + "</td><td style='width:36%' align='left'><input style='width: 223px;'  id=" + o.data[range * 2 + 1]["Id"] + " type='text'/></td>");
					break;
				case "int":
					$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2 + 1]["Name"] + "</td><td style='width:36%' align='left'><input style='width: 223px;' id=" + o.data[range * 2 + 1]["Id"] + " type='text'/></td>");
					break;
				case "date":
					$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2 + 1]["Name"] + "</td><td style='width:36%' align='left'><input style='width: 223px;'  id=" + o.data[range * 2 + 1]["Id"] + " type='text'/></td>");
					break;
				case "state":
					$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2 + 1]["Name"] + "</td><td style='width:36%' align='left' id='td_" + o.data[range * 2 + 1]["Id"] + "'></td>");
					//					for (var j = 0; j < o.data[range * 2 + 1]["Value"].length; j++) {
					//						$("<option value=" + o.data[range * 2 + 1]["Value"][j]["Value"] + ">" + o.data[range * 2 + 1]["Value"][j]["Text"] + "</option>").appendTo("#" + o.data[range * 2 + 1]["Id"]);
					//					}
					this._setSelect(range * 2 + 1);
					break;
				case "daterange":
					if (o.data[range * 2 + 1]["Brother"].length != 0) { //默认只有一个
						$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2 + 1]["Name"] + "</td><td style='width:36%' align='left'><input id=" + o.data[range * 2 + 1]["Id"] + " type='text' style='width: 103px;' />至<input id=" + o.data[range * 2 + 1]["Brother"][0]["Id"] + " style='width: 103px;' /></td>");
					}
					break;
				case "user-defined":
					$("#"+trId + range).append("<td style='width: 14%;padding-right:10px;' align='right'>" + o.data[range * 2 + 1]["Name"] + "</td><td style='width:36%' align='left' class='ui-jsearch-table-centerborder' > " + o.data[range * 2 + 1]["Content"] + "</td>");
					break;
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

	$.extend($.jui.jsearch, {
		version: "0.1.0"
	});
})(jQuery);