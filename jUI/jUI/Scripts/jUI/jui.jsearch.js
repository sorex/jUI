/// <reference path="../../Views/Home/linkHtml.cshtml" />
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
					{ Name: "小数和整数", Id: "txt_double", Type:"double" },
					{ Name: "范围小数和整数", Id: "txt_doubleStart", Type: "doubleRange", Brother: [{ Id: "txt_doubleEnd" }] },
					{ Name: "两位整数", Id: "txt_int", Type: "int", MaxLength: 2 },
					{ Name: "范围整数", Id: "txt_intStart", Type: "intRange", MaxLength: 3, Brother: [{ Id: "txt_intEnd", MaxLength: 4 }] },
					{ Name: "单个日期", Id: "txt_Time", Type: "date" },
					{ Name: "两个日期", Id: "date_StartTime", Type: "dateRange", Brother: [{ Id: "date_EndTime" }] },

                    { Name: "单选按钮", Id: "btn-radio", name: "radio-hobby", Type: "radio", Value: [{ value: "羽毛球", text: "羽毛球" }, { value: "篮球", text: "篮球", selected: true }, { value: "乒乓球", text: "乒乓球" }] },
                     { Name: "多选按钮", Id: "btn-checkbox", name: "checkbox-hobby", Type: "checkbox", Value: [{ value: "羽毛球", text: "羽毛球", selected: true }, { value: "篮球", text: "篮球",selected:true }, { value: "乒乓球", text: "乒乓球" }] },

                    { Name: "自定义", Type: "user-defined", Content: "<input  id='txt_contetent' name='text' type='text' >" },
					{ Name: "自定义2", Type: "user-defined", Content: "<input  id='txt_contetent2' name='text' type='text' >" },
					{ Name: "字符串", Id: "txt_Name", Type: "string", MaxLength: 5 },
                    { Name: "单选", Id: "txt_State1", Type: "selectSingle", Value: [{ value: 0, text: "全部" }, { value: 1, text: "正常" }, { value: 2, text: "停用", selected: true }] },
					{ Name: "多选", Id: "txt_State", Type: "selectMultiple", Value: [{ value: 0, text: "全部" }, { value: 1, text: "正常" }, { value: 2, text: "停用" }] }

	        ],
            onButtonClick:null
	    },

	    _create: function () {

	        this._showTable();
	        this._setLimit();
	        this._onButtonClick();
            
	    },
	    _onButtonClick:function(){
	     
	        var e = $(this.element);
	        o = this.options;
	        var count = o.items.length;
	        var tagId = this.element.attr("id");/*目标的id*/
	        var tableId = tagId + "_table";
	        var buttonId = tagId + "_btn";


	        $("#" + buttonId).click(function () {
	            var returnList = {};
	            for (var i = 0; i < count ; i++) {
	                switch (o.items[i]["Type"]) {

	                    case "int":
	                        returnList[o.items[i]["Id"]] = parseInt($("#" + o.items[i]["Id"]).val());
	                        break;
	                    case "intRange":
	                        returnList[o.items[i]["Id"]] = parseInt($("#" + o.items[i]["Id"]).val());
	                        returnList[o.items[i]["Brother"][0]["Id"]] = parseInt($("#" + o.items[i]["Brother"][0]["Id"]).val());
	                        break;
	                    case "double":
	                        returnList[o.items[i]["Id"]] = $("#" + o.items[i]["Id"]).val();
	                        break;
	                    case "doubleRange":
	                        returnList[o.items[i]["Id"]] = $("#" + o.items[i]["Id"]).val();
	                        returnList[o.items[i]["Brother"][0]["Id"]] = $("#" + o.items[i]["Brother"][0]["Id"]).val();
	                        break;
	                    case "date":
	                        returnList[o.items[i]["Id"]] = $("#" + o.items[i]["Id"]).val();
	                        break;
	                    case "dataRange":
	                        returnList[o.items[i]["Id"]] = $("#" + o.items[i]["Id"]).val();
	                        returnList[o.items[i]["Brother"][0]["Id"]] = $("#" + o.items[i]["Brother"][0]["Id"]).val();
	                        break;

	                    case "radio":
	                        returnList[o.items[i]["name"]] = $(":radio[name=" + o.items[i]["name"] + "[checked]]").val();
	                        break;
	                    case "checkbox":
	                        var checkboxValue = "";
	                        var item = document.getElementsByName(o.items[i]["name"]);
	                        for (var i = 0; i < item.length; i++) {
	                            if (item[i].checked == true) {
	                                checkboxValue += item[i].value + "_";
	                            }
	                        }
	                        returnList[o.items[i]["name"]] = checkboxValue;
	                       // returnList[o.items[i]["name"]] = $(":checkbox[name=" + o.items[i]["name"] + "[checked]]").val();
	                        break;
	                    case "":
	                        break;
	                    case "":
	                        break;

	                }

	            }

	            if (o.onButtonClick != null) {

                    o.onButtonClick();
	            }
	        });
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

	        $("#" + tableId).after("<p style='margin-top: 5px; margin-left: 55%;'><input id=" + buttonId + " type='button' value='搜索' /></p>");

	        if (count % 2 == 0) { //创建偶数行 
	            for (var i = 0; i < count / 2; i++) {
	                $("#" + tableId).append("<tr id='" + trId +""+ i + "'></tr>");
	            
	            
	                this._appendEven(i);
	            }
	        }
	        if (count % 2 != 0) {  //创建奇数行
	            for (var i = 0; i < parseInt(count / 2) ; i++) {
	                $("#" + tableId).append("<tr  id='" + trId +""+ i + "'></tr>");
	           
	                this._appendEven(i);
	            }
	            $("#" + tableId).append("<tr id='" + trId + parseInt(count / 2) + "'></tr>");
	            var last = parseInt(count / 2);
	       
	            this._appendLast(last);
	          
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
	                $("#" + trId +""+ last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%; padding-left:5px;'><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + "/></td><td></td><td></td>");
	                break;
	            case "int":
	               
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + "/></td><td></td><td></td>");
	                break;
	            case "intRange":
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width:25%;padding-left:5px;'><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[last * 2]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[last * 2]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td><td></td><td></td>");
	                break;

	            case "double":
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + "/></td><td></td><td></td>");
	                break;
	            case "dateRange":
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width:25%;'padding-left:5px;><input  id=" + o.items[last * 2]["Id"] + " type='text' maxlength=" + o.items[last * 2]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[last * 2]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[last * 2]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td><td></td><td></td>");
	                break;

	            case "date":

	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[last * 2]["Id"] + " type='text' /></td><td></td><td></td>");
	                break;
	            case "dateRange":
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width:25%;padding-left:5px;'><input  id=" + o.items[last * 2]["Id"] + " type='text' style='width:90px;'/>至<input  id=" + o.items[last * 2]["Brother"][0]["Id"] + " type='text' style='width:90px;'/></td><td></td><td></td>");
	                break;

	            case "radio":
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;' id=" + trId + last * 2 + "_td" + "></td><td></td><td></td>");
	                break;
	            case "checkbox":
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;' id=" + trId + last * 2 + "_td" + "></td><td></td><td></td>");
	                break;

	            case "selectSingle":
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;' id=" + trId + last * 2 + "_td" + "></td><td></td><td></td>");
	                break;

	            case "selectMultiple":
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width: 25%;padding-left:7px;' id=" + trId + last * 2 + "_td" + "></td><td></td><td></td>");
	                break;

	            case "user-defined":
	                $("#" + trId + "" + last).append("<td style='text-align: right; width: 25%;'>" + o.items[last * 2]["Name"] + "</td><td style='width:25%;padding-left:5px;' > " + o.items[last * 2]["Content"] + "</td><td></td><td></td>");
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
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + "/></td>");
	                break;
	            case "int":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + "/></td>");
	                break;
	            case "intRange":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width:25%;padding-left:5px;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[range * 2]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[range * 2]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td>");
	                break;

	            case "double":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + "/></td>");
	                break;
	            case "doubleRange":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width:25%;padding-left:5px;'><input  id=" + o.items[range * 2]["Id"] + " type='text' maxlength=" + o.items[range * 2]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[range * 2]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[range * 2]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td>");
	                break;


	            case "radio":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px; padding-top:0;' id=" + trId + range * 2 + "_td" + "></td>");
	                break;

	            case "checkbox":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%; padding-left:7px;' id=" + trId + range * 2 + "_td" + "></td>");
	                break;

	            case "date":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[range * 2]["Id"] + " type='text' /></td>");
	                break;
	            case "dateRange":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width:25%;padding-left:5px;'><input  id=" + o.items[range * 2]["Id"] + " type='text'  style='width:90px;'/>至<input  id=" + o.items[range * 2]["Brother"][0]["Id"] + " type='text'  style='width:90px;'/></td>");
	                break;

	            case "selectSingle":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%;padding-left:5px; padding-top:0;' id=" + trId + range * 2 + "_td" + "></td>");
	                break;

	            case "selectMultiple":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width: 25%; padding-left:7px;' id=" + trId + range * 2 + "_td" + "></td>");
	                break;

	            case "user-defined":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2]["Name"] + "</td><td style='width:25%;padding-left:5px;' > " + o.items[range * 2]["Content"] + "</td>");
	                break;

	        }
	        switch (o.items[range * 2 + 1]["Type"]) {
	            case "string":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + "/></td>");
	                break;
	            case "int":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + "/></td>");
	                break;
	            case "intRange":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width:25%;padding-left:5px;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[range * 2 + 1]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td>");
	                break;

	            case "double":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + "/></td>");
	                break;
	            case "doubleRange":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width:25%;padding-left:5px;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["MaxLength"] + " style='width:90px;'/>至<input  id=" + o.items[range * 2 + 1]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td>");
	                break;

	            case "radio":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;padding-left:5px;' id=" + trId + (range * 2 + 1) + "_td" + "></td>");
	                break;

	            case "checkbox":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;padding-left:7px;' id=" + trId + (range * 2 + 1) + "_td" + "></td>");
	                break;

	            case "date":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;padding-left:5px;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text' /></td>");
	                break;
	            case "dateRange":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width:25%;padding-left:5px;'><input  id=" + o.items[range * 2 + 1]["Id"] + " type='text'  style='width:90px;'/>至<input  id=" + o.items[range * 2 + 1]["Brother"][0]["Id"] + " type='text' maxlength=" + o.items[range * 2 + 1]["Brother"][0]["MaxLength"] + " style='width:90px;'/></td>");
	                break;

	            case "selectSingle":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;padding-left:5px;' id=" + trId + (range * 2 + 1) + "_td" + "></td>");
	                break;

	            case "selectMultiple":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width: 25%;padding-left:7px;' id=" + trId + (range * 2 + 1) + "_td" + "></td>");
	                break;

	            case "user-defined":
	                $("#" + trId + "" + range).append("<td style='text-align: right; width: 25%;'>" + o.items[range * 2 + 1]["Name"] + "</td><td style='width:25%;padding-left:5px;' > " + o.items[range * 2 + 1]["Content"] + "</td>");
	                break;
	        }

	    },


	    _setLimit: function () { //数据条件的限制
	        var e = $(this.element);
	        o = this.options;
	        var count = o.items.length;

	        var tagId = this.element.attr("id");/*目标的id*/
	        var trId = tagId + "_tr_";

	        for (var n = 0; n < count; n++) {

	            switch (o.items[n]["Type"]) {
	                case "int":
	                    $("#"+o.items[n]["Id"]).bind("keyup", function () {//限制文本框中只能输入数字
	                        $(this).val($(this).val().replace(/[\D]/g, ""));
	                    });
	                    break;
	                case "intRange":
	                    $("#" + o.items[n]["Id"]).bind("keyup", function () {//限制文本框中只能输入数字
	                        $(this).val($(this).val().replace(/[\D]/g, ""));
	                    });

	                    $("#" + o.items[n]["Brother"][0]["Id"]).bind("keyup", function () {//限制文本框中只能输入数字
	                        $(this).val($(this).val().replace(/[\D]/g, ""));
	                    });
	                    break;
	                case "double":
	                    $("#" + o.items[n]["Id"]).bind("keyup", function () {	//限制文本框只能输入小数
	                      
	                        len = $(this).val().length;
	                        var dotNum = 0;
	                        for (var i = 0; i < len; i++) {
	                            oneNum = $(this).val().substring(i, i + 1);
	                            if (oneNum == ".") {
	                                dotNum++;
	                            }
	                            if (((oneNum < "0" || oneNum > "9") && oneNum != ".") || dotNum > 1) {
	                                $(this).val($(this).val().substring(0, i));
	                                break;
	                            } else {
	                            }
	                        }
	                    });
	                    break;
	                case "doubleRange":
	                    $("#" + o.items[n]["Id"]).bind("keyup", function () {	//限制文本框只能输入小数
	                        len = $(this).val().length;
	                        var dotNum = 0;
	                        for (var i = 0; i < len; i++) {
	                            oneNum = $(this).val().substring(i, i + 1);
	                            if (oneNum == ".") {
	                                dotNum++;
	                            }
	                            if (((oneNum < "0" || oneNum > "9") && oneNum != ".") || dotNum > 1) {
	                                $(this).val($(this).val().substring(0, i));
	                                break;
	                            } else {
	                            }
	                        }
	                    });


	                    $("#" + o.items[n]["Brother"][0]["Id"]).bind("keyup", function () {	//限制文本框只能输入小数
	                        len = $(this).val().length;
	                        var dotNum = 0;
	                        for (var i = 0; i < len; i++) {
	                            oneNum = $(this).val().substring(i, i + 1);
	                            if (oneNum == ".") {
	                                dotNum++;
	                            }
	                            if (((oneNum < "0" || oneNum > "9") && oneNum != ".") || dotNum > 1) {
	                                $(this).val($(this).val().substring(0, i));
	                                break;
	                            } else {
	                            }
	                        }
	                    });
	                    break;
	                case "radio":
	              
	                    var dataSource = o.items[n].Value;
	                    var radioHtml = "";
	                    for (var i = 0; i < dataSource.length; i++) {
	                        if (dataSource[i]["selected"]) {
	                            radioHtml += "<input id=" + o.items[n]["Id"] + '_' + i + "  type='radio' value=" + dataSource[i]["value"] + "  name=" + o.items[n]["name"] + " checked ><label for=" + o.items[n]["Id"] + '_' + i + ">" + dataSource[i]["text"] + "</label>";
	                        } else {
	                            radioHtml += "<input id=" + o.items[n]["Id"] + '_' + i + " type='radio' value=" + dataSource[i]["value"] + "  name=" + o.items[n]["name"]+"><label for=" + o.items[n]["Id"] + '_' + i + ">" + dataSource[i]["text"] + "</label>";
	                        }
                            
	                    }
	                    $("#" + trId + n + "_td").append(radioHtml);
	                    $("#" + trId + n + "_td").jradio();
	                    break;
	                case "checkbox":
	                    var dataSource = o.items[n].Value;
	                    var checkboxHtml = "";
	                    for (var i = 0;i<dataSource.length ;i++){
	                        if (dataSource[i]["selected"]) {
	                            checkboxHtml += "<input id=" + o.items[n]["Id"] + '_' + i + "  type='checkbox' value=" + dataSource[i]["value"] + "  name=" + o.items[n]["name"] + " checked ><label for=" + o.items[n]["Id"] + '_' + i + ">" + dataSource[i]["text"] + "</label>";
	                        } else {
	                            checkboxHtml += "<input id=" + o.items[n]["Id"] + '_' + i + "  type='checkbox' value=" + dataSource[i]["value"] + "  name=" + o.items[n]["name"] + " ><label for=" + o.items[n]["Id"] + '_' + i + ">" + dataSource[i]["text"] + "</label>";

	                        }
	                    }
	                    $("#" + trId + n + "_td").append(checkboxHtml);
	                    $("#" + trId + n + "_td").jcheckbox();
	                    break;

	                case "date":
	                    $("#"+o.items[n]["Id"]).jdatetimepicker({
	                        datetimeParse: "yyyy-MM-dd"
	                    });
	                    break;
	                case "dateRange":
	                    $("#" + o.items[n]["Id"]).jdatetimepicker({
	                        datetimeParse: "yyyy-MM-dd"
	                    });
	                    $("#" + o.items[n]["Brother"][0]["Id"]).jdatetimepicker({
	                        datetimeParse: "yyyy-MM-dd"
	                    });
	                    break
	                case "selectSingle":
	                   
	                    $("#"+trId+n+"_td").jSelect({ //单选
	                        items: o.items[n]["Value"],
	                        placeholder: "请选择状态....",
	                        width: "100px",
	                        model: "single"
	                    });
	                    break;

	                case "selectMultiple":
	                   
	                    $("#" + trId + n + "_td").jSelect({ //单选
	                        items: o.items[n]["Value"],
	                        placeholder: "请选择状态....",
	                        width: "200px",
	                        model: "multiple"
	                    });

	                    break;
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

    $.extend($.jui.jsearch, {
        version: "0.1.0"
    });
})(jQuery);