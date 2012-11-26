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
					{ Name: "两个日期", Id: "date_StartTime", Type: "dateRange", Brother: [{ Id: "date_EndTime", Type: "date" }] },
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
	        var count = o.items.length;
	        var tagId = this.element.attr("id");/*目标的id*/
	        var tableId = tagId + "_table";
	        var buttonId = tagId + "_btn";
	        var trId = tagId + "_tr_";

	        e.append("<table id=" + tableId + " width='100%' class='ui-jsearch-table' cellpadding='0' cellspacing='0'></table>");
	        $("#" + tableId).after("<p align='center' style='margin-top: 5px; margin-left: 55%;'><input id=" + buttonId + " type='button' value='搜索' /></p><p align='right'>");

	        if (count % 2 == 0) { //创建偶数行 
	            for (var i = 0; i < count / 2; i++) {
	                $("#" + tableId).append("<tr id='" + trId +""+ i + "'></tr>");
	                //alert($("tr:eq("+i+")").attr("id"));
	            
	                this._appendEven(i);
	            }
	        }
	        if (count % 2 != 0) {  //创建奇数行
	            for (var i = 0; i < parseInt(count / 2) ; i++) {
	                $("#" + tableId).append("<tr  id='" + trId +""+ i + "'></tr>");
	                alert($("table").find("tr:eq("+i+")").attr("id"));
	                this._appendEven(i);
	            }
	            $("#" + tableId).append("<tr id='" + trId + parseInt(count / 2) + "'></tr>");
	            var last = parseInt(count / 2);
	       
	            //this._appendLast(last);
	            alert($("table").find("tr").length);
	        }
	    },

	    _appendLast: function (last) { //添加最后一条数据
	        
	        var e = $(this.element);
	        o = this.options;
	        var count = o.items.length;
	        var tagId = this.element.attr("id");/*目标的id*/
	        var trId = tagId + "_tr_";
	   
	        switch (o.items[last * 2]["Type"]) {
	            case "string":
	                $("#" + trId +""+ last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;'><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + "/></td><td></td><td></td>");
	                break;

	            case "int":
	               
	                $("#" + trId +""+ last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;'><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + "/></td><td></td><td></td>");
	                break;
	            case "intRange":
	                $("#" + trId +""+ last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width:25%;'><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[last * 2]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[last * 2]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td><td></td><td></td>");
	                break;

	            case "double":
	                $("#" + trId +""+ last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;'><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + "/></td><td></td><td></td>");
	                break;
	            case "dateRange":
	                $("#" + trId +""+ last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width:25%;'><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[last * 2]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[last * 2]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td><td></td><td></td>");
	                break;

	            case "selectSingle":
	                $("#" + trId +""+ last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;' id=" + trId + last * 2 + "_td" + ">单选</td><td></td><td></td>");
	                break;

	            case "selectMultiple":
	                $("#" + trId +""+ last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;' id=" + trId + last * 2 + "_td" + ">多选</td><td></td><td></td>");
	                break;

	            case "user-defined":
	                $("#" + trId +""+ last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width:25%;' > " + o.items[last * 2]["Content"] + "</td><td></td><td></td>");
	                break;

	        }

	    },
	    _appendEven: function (range) { //添加偶数条数据
	     
	        var e = $(this.element);
	        o = this.options;
	        var count = o.items.length;
	        var tagId = this.element.attr("id");/*目标的id*/
	        var trId = tagId + "_tr_";
	        switch (o.items[range * 2]["Type"]) {
	            case "string":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + "/></td>");
	                break;

	            case "int":
	                alert(trId + "" + range);
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + "/></td>");
	                
	                break;
	            case "intRange":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width:25%;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[range * 2]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[range * 2]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td>");
	                break;

	            case "double":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + "/></td>");
	                break;
	            case "doubleRange":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width:25%;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[range * 2]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[range * 2]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td>");
	                break;

	            case "selectSingle":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;' id=" + trId + range * 2 + "_td" + ">单选</td>");
	                break;

	            case "selectMultiple":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;' id=" + trId + range * 2 + "_td" + ">多选</td>");
	                break;

	            case "user-defined":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width:25%;' > " + o.items[range * 2]["Content"] + "</td>");
	                break;

	        }
	        switch (o.items[range * 2 + 1]["Type"]) {
	            case "string":
	                $("#" + trId+"" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + "/></td>");
	                break;
	            case "int":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + "/></td>");
	                break;
	            case "intRange":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width:25%;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[range * 2 + 1]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td>");
	                break;

	            case "double":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + "/></td>");
	                break;
	            case "doubleRange":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width:25%;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[range * 2 + 1]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td>");
	                break;

	            case "selectSingle":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;' id=" + trId + (range * 2 + 1) + "_td" + ">单选</td>");
	                break;

	            case "selectMultiple":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;' id=" + trId + (range * 2 + 1) + "_td" + ">多选</td>");
	                break;

	            case "user-defined":
	                $("#" + trId +""+ range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width:25%;' > " + o.items[range * 2 + 1]["Content"] + "</td>");
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