﻿/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI datetimepicker Plugin
/*
* jQuery UI datetimepicker 
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/


/*
* Author: ZhangJian
* Create date: 2012年9月27日 16:43:24
* Description: 日历控件
*/

/*
* items:
*		datetimeType:日期控件类型
*       datetimeParse:日期显示格式
*       display:日期呈现类型false/true
*       readonly:文本框只读ture/false
*       showToday:显示今天
*       value:指定默认显示日期，格式为xxxx-xx-xx
*/

(function ($, undefined) {
    $.widget("jui.jdatetimepicker",
	{
	    // default options
	    options: {
	        datetimeType: ""
            , datetimeParse: ""
            , display: false
            , readonly: false
	        , showToday: false//是否显示今天按钮
            , value:""//格式为xxxx-xx-xx
	    },

	    _create: function () {
	        var
                self = this,
	            e = $(this.element),
	            data = this.options,
	            showToday = data.showToday,
	            datetimeType = data.datetimeType,
	            datetimeParse = data.datetimeParse,
	            display = data.display,
	            readonly = data.readonly,
                default_value = data.value,
	            date = new Date(),
	            y = date.getFullYear(), //今年
	            m = date.getMonth(),//当月
	            d = date.getDate(),//今日
	            longMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	            shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	            shortWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	            longWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	            shortWeekCN = ['日', '一', '二', '三', '四', '五', '六'],
	            longWeekCN = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	            MonthNamesCN = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	            fullDay = [1, 3, 5, 7, 8, 10, 12],
	            maxDay = null,
	            max = false,
	            weekResult = null,//列
	            roll = null,//行               
	            elementId = "_" + e.attr("id"),
	            hideValue = null,
	            y_value = null,
	            ym_value = null,
	            setVal_y = null,
	            setVal_M = null,
	            outDiv = "<div id='" + elementId + "_outDiv' class='jui-datetimepicker'></div>",//外层div	           

	            head = "<div id='" + elementId + "_headDiv' class='jui-datetimepicker-dhead'>"
                + "<a id='" + elementId + "_prev' title='上一页' class='jui-datetimepicker-prev'><span class='ui-icon ui-icon-circle-triangle-w'>&nbsp;</span></a>"
                + "<div id='" + elementId + "_yearDiv' class='jui-datetimepicker-headcenter'><input type='button' value='" + (y - 5) + "~" + (y + 4) + "' /></div>"
                + "<a id='" + elementId + "_next' title='下一页' class='jui-datetimepicker-next'><span class='ui-icon ui-icon-circle-triangle-e'>&nbsp;</span></a>"
                + "</div>",//头部
                save_y = y,
                save_m = m;
	        //字符串转日期
	        var strToDate = function (str) {
	            var val = Date.parse(str);
	            var newDate = new Date(val);
	            return newDate;
	        }


	        //填日期
	        var writeDate = function () {
	            var write_y = parseInt($("#btn_y").attr("value"));
	            var write_m = parseInt($("#btn_m").attr("value"));
	            var fullDay = [1, 3, 5, 7, 8, 10, 12];
	            var maxDay = null;
	            var max = false;
	            $.each(fullDay, function (key, val) {
	                if (val == write_m)
	                    max = true;
	            });
	            if (max) {
	                maxDay = 31;
	            } else {
	                if (write_m == 2) {
	                    if ((write_y % 4 == 0 && write_y % 100 != 0) || (write_y % 400 == 0)) {
	                        maxDay = 29;
	                    } else {
	                        maxDay = 28;
	                    }
	                } else {
	                    maxDay = 30;
	                }
	            }
	            var myDate = new Date();
	            myDate.setFullYear(write_y);
	            myDate.setMonth(write_m - 1);
	            myDate.setDate(1);
	            var fir = myDate.getDay();//例:0(周日)
	            var weekResult = null;//列
	            var roll = null;//行           
	            for (var i = 1; i <= maxDay; i++) {
	                $("#" + elementId + "_tb").find("tr:eq(6)").remove();
	                myDate.setDate(i);
	                weekResult = myDate.getDay();//例:0(周日)
	                if (i < (8 - fir))
	                    roll = 1;
	                if (i >= (8 - fir) && i < (15 - fir))
	                    roll = 2;
	                if (i >= (15 - fir) && i < (22 - fir))
	                    roll = 3;
	                if (i >= (22 - fir) && i < (29 - fir))
	                    roll = 4;
	                if (i >= (29 - fir) && i < (36 - fir))
	                    roll = 5;
	                if (i >= (36 - fir)) {
	                    roll = 6;
	                    $("#" + elementId + "_tb").append("<tr></tr>");
	                    if (i == 31) {
	                        $("#" + elementId + "_tb").find("tr:eq(6)").empty();
	                        if (fir == 5)
	                            $("#" + elementId + "_tb").find("tr:eq(6)").append("<td ><a href='#'></a></td>");
	                        if (fir == 6)
	                            $("#" + elementId + "_tb").find("tr:eq(6)").append("<td ><a href='#'></a></td><td ><a href='#'></a></td>");
	                        $("#" + elementId + "_tb").find("tr:eq(" + roll + ")").find("td:eq(" + (weekResult - 1) + ")").find("a").html(i - 1);
	                    }
	                    if (i == 30) {
	                        $("#" + elementId + "_tb").find("tr:eq(6)").empty();
	                        $("#" + elementId + "_tb").find("tr:eq(6)").append("<td ><a href='#'></a></td>");
	                    }
	                    $("#" + elementId + "_tb").find("a").addClass("jui-datetimepicker-table-tr-a");
	                }
	                $("#" + elementId + "_tb").find("tr:eq(" + roll + ")").find("td:eq(" + weekResult + ")").find("a").html(i);
	                $("#" + elementId + "_tb").find("a").addClass("jui-datetimepicker-table-tr-a");
	                activeCss();//默认高亮当日
	                clickToHide();
	                noCss();
	            }

	        }

	        //去样式
	        var noCss = function () {
	            $("#" + elementId + "_tb td a").each(function () {
	                var a = $(this);
	                if (a.text() == "") {
	                    a.removeClass();
	                }
	            });
	        }
	        //默认选中当天日期的样式
	        var activeCss = function () {
	            var act_y = parseInt($("#_year" + elementId + " option:selected").attr("value"));//当前选择的年份
	            var act_m = parseInt($("#_month" + elementId + " option:selected").attr("value"));//当前选择的月份
	            $("#" + elementId + "_tb a").each(function () {
	                if (default_value) {
	                    y = strToDate(default_value).getFullYear(),
                        m = strToDate(default_value).getMonth(),
                        d = strToDate(default_value).getDate();
	                    if ($(this).text() == strToDate(default_value).getDate() && act_y == y && (act_m == m))
	                        $(this).removeClass("jui-datetimepicker-table-tr-a").addClass("jui-datetimepicker-now ");
                        if ($(this).text() == date.getDate() && act_y == date.getFullYear() && (act_m == date.getMonth()))
                            $(this).removeClass("jui-datetimepicker-table-tr-a").addClass("jui-datetimepicker-now ");
	                } else {
	                    if ($(this).text() == date.getDate() && act_y == date.getFullYear() && (act_m == date.getMonth()))
	                        $(this).removeClass("jui-datetimepicker-table-tr-a").addClass("jui-datetimepicker-now ");
	                }
	            });
	        }
	        var activeCss_y = function () {
	            $("#" + elementId + "_tb a").each(function () {
	                if ($(this).text() == date.getFullYear())
	                    $(this).removeClass("jui-datetimepicker-table-tr-a").addClass("jui-datetimepicker-now ");
	            });
	        }
	        var activeCss_ym = function () {
	            $("#" + elementId + "_tb a").each(function () {
	                if ($(this).text() == date.getMonth()+1)
	                    $(this).removeClass("jui-datetimepicker-table-tr-a").addClass("jui-datetimepicker-now ");
	            });
	        }
	        //标记选择日期
	        var choseDate = function () {
	            var chose_y = $("#_year" + elementId + " option:selected").attr("value");
	            var chose_m = $("#_month" + elementId + " option:selected").attr("value");
	            $("#" + elementId + "_tb td").each(function () {
	                if ($(this).text() == hideValue && chose_y == setVal_y && chose_m == setVal_M) {
	                    $(this).children("a").addClass("jui-datetimepicker-active");
	                }
	            });
	        }
	        var choseDate_y = function () {
	            if ($(this).text() == save_y ) {
	                $(this).children("a").addClass("jui-datetimepicker-active");
	            }
	        }
	        var choseDate_ym = function () {
	            if ($(this).text() == save_m) {
	                $(this).children("a").addClass("jui-datetimepicker-active");
	            }
	        }


	        //高亮并赋值
	        var setVal = function () {
	            $("#" + elementId + "_tb td a").click(function () {
	                hideValue = $(this).text();
	                $("#" + elementId + "_tb td a").removeClass("jui-datetimepicker-active").addClass("jui-datetimepicker-table-tr-a");
	                $(this).addClass("jui-datetimepicker-active"); //高亮	
	                activeCss();
	                setVal_y = $("#btn_y").attr("value");
	                setVal_M = $("#btn_m").attr("value");
	                var international_val, china_val;
	                if (display) {
	                    international_val = function () {
	                        if (parseInt(setVal_M) < 10) {
	                            if (parseInt(hideValue) < 10) {
	                                $("#show_date").text(setVal_y + "-" + setVal_M + "-0" + hideValue); //赋值                                            
	                            } else {
	                                $("#show_date").text(setVal_y + "-" + setVal_M + "-" + hideValue); //赋值 
	                            }
	                        } else {
	                            if (parseInt(hideValue) < 10) {
	                                $("#show_date").text(setVal_y + "-" + setVal_M + "-0" + hideValue); //赋值                                            
	                            } else {
	                                $("#show_date").text(setVal_y + "-" + setVal_M + "-" + hideValue); //赋值                         
	                            }
	                        }
	                    }
	                    china_val = function () {
	                        if (parseInt(setVal_M) < 10) {
	                            if (parseInt(hideValue) < 10) {
	                                $("#show_date").text(setVal_y + "年" + setVal_M + "月0" + hideValue + "日"); //赋值                                            
	                            } else {
	                                $("#show_date").text(setVal_y + "年" + setVal_M + "月" + hideValue + "日"); //赋值 
	                            }
	                        } else {
	                            if (parseInt(hideValue) < 10) {
	                                $("#show_date").text(setVal_y + "年" + setVal_M + "月0" + hideValue + "日"); //赋值                                            
	                            } else {
	                                $("#show_date").text(setVal_y + "年" + setVal_M + "月" + hideValue + "日"); //赋值                         
	                            }
	                        }
	                    }
	                } else {
	                    international_val = function () {
	                        if (parseInt(setVal_M) < 10) {
	                            if (parseInt(hideValue) < 10) {
	                                e.val(setVal_y + "-" + setVal_M + "-0" + hideValue); //赋值                                            
	                            } else {
	                                e.val(setVal_y + "-" + setVal_M + "-" + hideValue); //赋值 
	                            }
	                        } else {
	                            if (parseInt(hideValue) < 10) {
	                                e.val(setVal_y + "-" + setVal_M + "-0" + hideValue); //赋值                                            
	                            } else {
	                                e.val(setVal_y + "-" + setVal_M + "-" + hideValue); //赋值                         
	                            }
	                        }
	                    }
	                    china_val = function (setVal_y, setVal_M) {
	                        if (parseInt(setVal_M) < 10) {
	                            if (parseInt(hideValue) < 10) {
	                                e.val(setVal_y + "年" + setVal_M + "月0" + hideValue + "日"); //赋值                                            
	                            } else {
	                                e.val(setVal_y + "年" + setVal_M + "月" + hideValue + "日"); //赋值 
	                            }
	                        } else {
	                            if (parseInt(hideValue) < 10) {
	                                e.val(setVal_y + "年" + setVal_M + "月0" + hideValue + "日"); //赋值                                            
	                            } else {
	                                e.val(setVal_y + "年" + setVal_M + "月" + hideValue + "日"); //赋值                         
	                            }
	                        }
	                    }
	                }
	                switch (datetimeParse) {
	                    case 'yyyy年MM月dd日':
	                        china_val(setVal_y, setVal_M);
	                        break;
	                    case 'yyyy-MM-dd':
	                        international_val(setVal_y, setVal_M);
	                        break;
	                    default:
	                        china_val(setVal_y, setVal_M);
	                        break;
	                }
	                noCss();
	            });
	        }

	        //添加年份
	        var addYears = function () {
	            var y_items = [], j = 0, default_year="";
	            for (var i = y - 10; i <= y + 10; i++) {
	                j++;
	                datetimeParse == "yyyy-MM-dd" ? y_items.push({ value: i, text: i, selected: false }) : y_items.push({ value: i, text: i + "年", selected: false});
	                if (i == y) {
	                    y_items[j - 1]["selected"] = true;
	                    default_year = y_items[j - 1]["text"];
	                }
	            }
	            $("#_year" + elementId).jSelect({
	                items: y_items,
	                placeholder: default_year,
	                width: "90px",
	                model: "single",
	                onSelectChange: function (selectValue, SelectText) {
	                    var _options = "", _select = $("#_year" + elementId + "_select");
	                    var select_Value = parseInt($("#_year" + elementId + " option:selected").attr("value"));
	                    $("#_year" + elementId + "_select_chzn").remove();//删除所有li
	                    _select.attr("class", "");
	                    _select.attr("data-placeholder", "");
	                    _select.find("option").remove();//删除所有option
	                    for (var i = select_Value - 10; i <= select_Value + 10; i++) {
	                        _options += "<option></option><option value='"+i+"'>"+i+"年　</option>";
	                        if (i == select_Value) {
	                            _options += "<option selected value='" + i + "'>" + i + "年　</option>";
	                        }
	                    }
	                    _select.append(_options);
	                    _select.chosen();

	                    $("#" + elementId + "_tb a").text("");//清空
	                    writeDate();
	                    choseDate();
	                    setVal();
	                }
	            });
	            $("#_year" + elementId).css("color", "black");
	        }
	        //添加月份下拉列表
	        var addMonths = function () {
	            var m_items = [];
	            //添加月下拉列表
	            for (var i = 0; i < shortMonthNames.length; i++) {
	                datetimeParse == "yyyy-MM-dd" ? m_items.push({ value: i, text: shortMonthNames[i], selected:false}) : m_items.push({ value: i, text: MonthNamesCN[i], selected:false});
	            }
	            m_items[m]["selected"] = true;
	            $("#_month" + elementId).jSelect({
	                items: m_items,
	                placeholder: m_items[m]["text"],
	                width: "90px",
	                model: "single",
	                onSelectChange: function (selectValue, SelectText) {
	                    $("#" + elementId + "_tb").find("a").removeClass("jui-datetimepicker-active");
	                    $("#" + elementId + "_tb a").text("");//清空
	                    writeDate();
	                    choseDate();
	                    setVal();
	                }
	            });
	            $("#_month" + elementId).css("color", "black");
	        }
	        //高亮并赋值
	        var lightAndSetValue = function () {
	            $("#" + elementId + "_tb td").click(function () {
	                save_y = $(this).text();
	                $("#" + elementId + "_prev").unbind("click");
	                $("#" + elementId + "_next").unbind("click");
	                $("#" + elementId + "_tb").remove();
	                yMd();
	                //$("#" + elementId + "_tb a").removeClass("jui-datetimepicker-active").addClass("jui-datetimepicker-table-tr-a");
	                //$(this).children("a").addClass("jui-datetimepicker-active");//高亮
	                //activeCss_y();
	            });
	        }
	        
	        //默认高亮
	        var defaultheightLight = function () {
	            $("#" + elementId + "_tb td").each(function () {
	                if ($(this).text() == save_y) {
	                    $(this).children("a").addClass("jui-datetimepicker-active");
	                }
	            });
	        }
	        //点击消失
	        var clickToHide = function () {
	            if (display == false) {
	                $("#" + elementId + "_tb a").click(function () {
	                    $("#" + elementId + "_outDiv").hide();
	                });
	            } 
	        }
	        
	        //年
	        var whenYYYY = function () {
	            var table = "<table id='" + elementId + "_tb' class='jui-datetimepicker-table'></table>"; //表格
	            $("#" + elementId + "_outDiv").append(table); //添加下部内容
	            var makeCells = function () {
	                $("#" + elementId + "_tb").empty();
	                for (var i = 0; i < 5; i++) {
	                    $("#" + elementId + "_tb").append("<tr><td><a href='#'>" + (parseInt(save_y) - 5 + i) + "</a></td><td><a href='#'>" + (parseInt(save_y) + i) + "</a></td></tr>");
	                }
	                $("#" + elementId + "_yearDiv").find("span").html((parseInt(save_y)-5)+"~"+(parseInt(save_y)+4));
	                $("#" + elementId + "_tb a").addClass("jui-datetimepicker-table-tr-a");
	            }
	            //前翻页
	            $("#" + elementId + "_prev").bind("click", function () {
	                //y = y - 10;
	                save_y = parseInt(save_y) -10;
	                makeCells();
	                lightAndSetValue();
	                //defaultheightLight();
	                //clickToHide();
	                //activeCss_y();
	                //choseDate_y();
	            });
	            //后翻页
	            $("#" + elementId + "_next").bind("click", function () {
	                //y = y + 10;
	                save_y = parseInt(save_y) + 10;
	                makeCells();
	                lightAndSetValue();
	                //defaultheightLight();
	                //clickToHide();
	                //activeCss_y();
	                //choseDate_y();
	            });
	            makeCells();
	            lightAndSetValue();
	            //clickToHide();
	            //activeCss_y();
	        }
	        //年月
	        var yM = function () {
	            var saveM;
	            $("#" + elementId + "_yearDiv").children("span").html(save_y);
	            $("#" + elementId + "_outDiv").append("<table id='" + elementId + "_tb' class='jui-datetimepicker-table'></table>"); //添加下部内容
	            for (var i = 0; i < 6; i++) {
	                $("#" + elementId + "_tb").append("<tr><td><a href='#'>" + (2 * i + 1) + "</a></td><td><a href='#'>" + (2 * i + 2) + "</a></td></tr>");
	            }
	            var click_yM = function () {
	                $("#" + elementId + "_yearDiv").children("span").html(save_y);
	            }
	            //前翻页
	            $("#" + elementId + "_prev").bind("click", function () {
	                save_y =parseInt(save_y) - 1;
	                click_yM(y);
	            });
	            //后翻页
	            $("#" + elementId + "_next").bind("click", function () {
	                save_y=parseInt(save_y)+1;
	                click_yM(y);
	            });
	            //高亮并赋值            
	            $("#" + elementId + "_tb td").click(function () {
	                save_m = $(this).text();
	                if (save_m < 10) {
	                    save_m = "0" + save_m;
	                }
	                $("#" + elementId + "_prev").unbind("click");
	                $("#" + elementId + "_next").unbind("click");
	                $("#" + elementId + "_tb").remove();
	                yMd();
	            });
	            $("#" + elementId + "_tb td a").addClass("jui-datetimepicker-table-tr-a");
	            //activeCss_ym();
	            //$("#" + elementId + "_yearDiv").children("input").click(function () {
	            //    $("#" + elementId + "_outDiv").hide();
	            //});
	        }
            //年月日
	        var yMd = function () {
	            $("#" + elementId + "_yearDiv").empty();
	            if (datetimeParse == "yyyy-MM-dd") {
	                $("#" + elementId + "_yearDiv").append("<div id='_month" + elementId + "' style='display:inline-block;'><input type='button' value='" + save_m + "' id='btn_m'/><span style='display: inline-block;'>-</span></div>" +
                        "<div id='_year" + elementId + "' style='display:inline-block;'><input type='button' value='" + save_y+ "' id='btn_y'/></div>");//年月
	                $("#" + elementId + "_headDiv").children("a:eq(1)").attr("title", "next");
	                $("#" + elementId + "_headDiv").children("a:eq(0)").attr("title", "previous");
	            } else {
	                $("#" + elementId + "_yearDiv").append("<div id='_year" + elementId + "' style='display:inline-block;'><input type='button' value='" + save_y + "' id='btn_y'/><span style='display: inline-block;'>年</span></div>" +
                        "<div id='_month" + elementId + "' style='display:inline-block;'><input type='button' value='" + save_m + "' id='btn_m'/><span style='display: inline-block;'>月</span></div>");//月年
	                $("#" + elementId + "_headDiv").children("a:eq(1)").attr("title", "下一页");
	                $("#" + elementId + "_headDiv").children("a:eq(0)").attr("title", "上一页");
	            }
	            //显示日期的表格结构
	            var table = "<table id='" + elementId + "_tb' class='jui-datetimepicker-table'></table>";
	            $("#" + elementId + "_outDiv").append(table);
	            $("#" + elementId + "_tb").append("<tr></tr>");//表格头部
	            var long_week, short_week;
	            switch (datetimeParse) {
	                case 'yyyy-MM-dd':
	                    long_week = longWeek;
	                    short_week = shortWeek; break;
	                case 'yyyy年MM月dd日':
	                    long_week = longWeekCN;
	                    short_week = shortWeekCN; break;
	                default:
	                    long_week = longWeekCN;
	                    short_week = shortWeekCN; break;
	            }
	            for (var k = 0; k < short_week.length; k++) {
	                $("#" + elementId + "_tb tr").append("<td ><span class='jui-datetimepicker-week' title='" + long_week[k] + "'>" + short_week[k] + "</span></td>");
	            }
	            for (var i = 0; i < 5; i++) {
	                $("#" + elementId + "_tb").append("<tr></tr>");
	                for (var j = 0; j < 7; j++) {
	                    $("#" + elementId + "_tb").find("tr:eq(" + (i + 1) + ")").append("<td><a href='#'></a></td>");
	                }
	            }
	            writeDate();
	            setVal();
	            $("#" + elementId + "_prev").bind("click",function () {                    
	                $("#" + elementId + "_tb a").removeClass("jui-datetimepicker-active");
	                var btn_m_val = parseInt($("#btn_m").attr("value"));
	                var btn_y_val = parseInt($("#btn_y").attr("value"));
	                if (btn_m_val <= 10) {
	                    $("#btn_m").attr("value", "0"+(btn_m_val - 1))
	                    if (btn_m_val == "01") {
	                        $("#btn_m").attr("value", 12);
	                        $("#btn_y").attr("value", btn_y_val - 1);
	                    }
	                } else {
	                    $("#btn_m").attr("value", btn_m_val - 1)
	                }
	                $("#" + elementId + "_tb a").text("");//清空
	                writeDate();
	                choseDate();
	                setVal();
	            }); //前翻
	            $("#" + elementId + "_next").bind("click", function () {
	                $("#" + elementId + "_tb").find("a").removeClass("jui-datetimepicker-active");
	                var btn_m_val = parseInt($("#btn_m").attr("value"));
	                var btn_y_val = parseInt($("#btn_y").attr("value"));
	                if (btn_m_val <9) {
	                    $("#btn_m").attr("value", "0" + (btn_m_val + 1))
	                } else {
	                    $("#btn_m").attr("value", btn_m_val + 1)
	                }
	                if (btn_m_val == 12) {
	                    $("#btn_m").attr("value", "01");
	                    $("#btn_y").attr("value", btn_y_val + 1);
	                }
	                $("#" + elementId + "_tb a").text("");//清空
	                writeDate();
	                choseDate();
	                setVal();
	            });//后翻
	            Today();
	            activeCss();
	            $("#btn_y").click(function () {
	                $("#" + elementId + "_yearDiv").empty();
	                $("#" + elementId + "_yearDiv").append("<span style='display:inline-block;'>" + (parseInt(save_y) - 5) + "~" + (parseInt(save_y) + 4) + "</span>");
	                $("#" + elementId + "_tb").remove();
	                $("#" + elementId + "_prev").unbind("click");
	                $("#" + elementId + "_next").unbind("click");
	                whenYYYY();
	            });
	            $("#btn_m").click(function () {
	                $("#" + elementId + "_yearDiv").empty();
	                $("#" + elementId + "_yearDiv").append("<span style='display:inline-block;'>" + parseInt(save_y) + "</span>");
	                $("#" + elementId + "_tb").remove();
	                $("#" + elementId + "_prev").unbind("click");
	                $("#" + elementId + "_next").unbind("click");
	                yM();
	            });
	        }	        
            //显示今日
	        var Today = function () {
	            if (showToday) {
	                $("#" + elementId + "_tb").after("<input id='btn_" + elementId + "' type='button' value='今天' />");
	                $("#btn_" + elementId).click(function () {
	                    var international_val, china_val;
	                    if (display) {
	                        international_val = function (setVal_y, setVal_M) {
	                            if ((date.getMonth() + 1) < 10) {
	                                if (date.getDate() < 10) {
	                                    $("#show_date").text(date.getFullYear() + "-0" + (date.getMonth() + 1) + "-0" + date.getDate()); //赋值                                            
	                                } else {
	                                    $("#show_date").text(date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate()); //赋值 
	                                }
	                            } else {
	                                if (date.getDate() < 10) {
	                                    $("#show_date").text(date.getFullYear() + "-" + (date.getMonth() + 1) + "-0" + date.getDate()); //赋值                                            
	                                } else {
	                                    $("#show_date").text(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()); //赋值                         
	                                }
	                            }
	                        }
	                        china_val = function (setVal_y, setVal_M) {
	                            if ((date.getMonth() + 1) < 10) {
	                                if (date.getDate() < 10) {
	                                    $("#show_date").text(date.getFullYear() + "年0" + (date.getMonth() + 1) + "月0" + date.getDate() + "日"); //赋值                                            
	                                } else {
	                                    $("#show_date").text(date.getFullYear() + "年0" + (date.getMonth() + 1) + "月" + date.getDate() + "日"); //赋值 
	                                }
	                            } else {
	                                if (date.getDate() < 10) {
	                                    $("#show_date").text(date.getFullYear() + "年" + (date.getMonth() + 1) + "月0" + date.getDate() + "日"); //赋值                                            
	                                } else {
	                                    $("#show_date").text(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"); //赋值                         
	                                }
	                            }
	                        }
	                    } else {
	                        international_val = function (date) {
	                            if ((date.getMonth() + 1) < 10) {
	                                if (date.getDate() < 10) {
	                                    e.val(date.getFullYear() + "-0" + (date.getMonth() + 1) + "-0" + date.getDate()); //赋值                                            
	                                } else {
	                                    e.val(date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate()); //赋值 
	                                }
	                            } else {
	                                if (date.getDate() < 10) {
	                                    e.val(date.getFullYear() + "-" + (date.getMonth() + 1) + "-0" + date.getDate()); //赋值                                            
	                                } else {
	                                    e.val(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()); //赋值                         
	                                }
	                            }
	                        }
	                        china_val = function (date) {
	                            if ((date.getMonth() + 1) < 10) {
	                                if (date.getDate() < 10) {
	                                    e.val(date.getFullYear() + "年0" + (date.getMonth() + 1) + "月0" + date.getDate() + "日"); //赋值                                            
	                                } else {
	                                    e.val(date.getFullYear() + "年0" + (date.getMonth() + 1) + "月" + date.getDate() + "日"); //赋值 
	                                }
	                            } else {
	                                if (date.getDate() < 10) {
	                                    e.val(date.getFullYear() + "年" + (date.getMonth() + 1) + "月0" + date.getDate() + "日"); //赋值                                            
	                                } else {
	                                    e.val(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"); //赋值                         
	                                }
	                            }
	                        }
	                    }
	                    switch (datetimeParse) {
	                        case 'yyyy年MM月dd日':
	                            china_val(date);
	                            break;
	                        case 'yyyy-MM-dd':
	                            international_val(date);
	                            break;
	                        default:
	                            china_val(date);
	                            break;
	                    }
	                    y = date.getFullYear();
	                    m = date.getMonth();
	                    d = date.getDate();
	                    $("#_year" + elementId).empty();
	                    $("#_month" + elementId).empty();
	                    addMonths();
	                    addYears();

	                    $("#" + elementId + "_tb a").text("");//清空
	                    writeDate();
	                    choseDate();
	                    setVal();
	                    var act_y = parseInt($("#_year" + elementId + " option:selected").attr("value"));//当前选择的年份
	                    var act_m = parseInt($("#_month" + elementId + " option:selected").attr("value"));//当前选择的月份
	                    $("#" + elementId + "_tb a").each(function () {
	                        if ($(this).text() == date.getDate() && act_y == date.getFullYear() && (act_m == date.getMonth()))
	                            $(this).removeClass("jui-datetimepicker-table-tr-a").addClass("jui-datetimepicker-now ");
	                    });
	                });
	            }
	        }
            //时分秒
	        var hms = function () {
	            $("#" + elementId + "_outDiv").empty().css({"padding":"0 15px 0 15px"});
	            $("#" + elementId + "_outDiv").append("<table style='width:100%;' id='tab_" + elementId + "'>" +
                    "<tr><td></td><td><span>00</span>时<span>00</span>分<span>00</span>秒</td></tr>" +
                    "<tr><td>时:</td><td><div id='" + elementId + "_slider_h'></div></td></tr>" +
                    "<tr><td>分:</td><td><div id='" + elementId + "_slider_m'></div></td></tr>" +
                    "<tr><td>秒:</td><td><div id='" + elementId + "_slider_s'></div></td></tr>" +
                    "</table>");
	            $("#tab_" + elementId).find("tr td").css({ "padding-top": "4px", "padding-bottom": "4px" });
	            $("#tab_" + elementId).find("span").css({"padding-left":"4px","padding-right":"4px"});
	            hms_HH();
	            hms_mm();
	            hms_ss();
	            $("#tab_" + elementId).after("<div style='height:30px;'><div style='float:left;'><input type='button' value='现在' id='slider_now' /></div><div style='float:right;'><input type='button' value='完成' id='slider_ok' /></div></div>");
	            $("#slider_ok").click(function () {
	                e.val($("#tab_" + elementId).find("tr:eq(0)").find("td:eq(1)").text());
	                if (display == false) {
	                    $("#" + elementId + "_outDiv").hide();
	                }
	            });
	            $("#slider_now").click(function () {
	                var date_now = new Date();
	                var now_HH = date_now.getHours() < 10 ? "0" + date_now.getHours() : date_now.getHours();
	                var now_mm = date_now.getMinutes() < 10 ? "0" + date_now.getMinutes() : date_now.getMinutes();
	                var now_ss = date_now.getSeconds() < 10 ? "0" + date_now.getSeconds() : date_now.getSeconds();
	                $("#" + elementId + "_slider_h").slider("value", now_HH);
	                $("#" + elementId + "_slider_m").slider("value", now_mm);
	                $("#" + elementId + "_slider_s").slider("value", now_ss);
	                var slider_td = $("#tab_" + elementId).find("tr:eq(0)").find("td:eq(1)");
	                slider_td.find("span:eq(0)").text(now_HH);
	                slider_td.find("span:eq(1)").text(now_mm);
	                slider_td.find("span:eq(2)").text(now_ss);
	           
	            });
	        }
            //时分
	        var hm = function () {
	            $("#" + elementId + "_outDiv").empty().css({ "padding": "0 15px 0 15px" });
	            $("#" + elementId + "_outDiv").append("<table style='width:100%;' id='tab_" + elementId + "'>" +
                    "<tr><td></td><td><span>00</span>时<span>00</span>分</td></tr>" +
                    "<tr><td>时:</td><td><div id='" + elementId + "_slider_h'></div></td></tr>" +
                    "<tr><td>分:</td><td><div id='" + elementId + "_slider_m'></div></td></tr>" +
                    "</table>");
	            $("#tab_" + elementId).find("tr td").css({ "padding-top": "4px", "padding-bottom": "4px" });
	            $("#tab_" + elementId).find("span").css({ "padding-left": "4px", "padding-right": "4px" });
	            hms_HH();
	            hms_mm();
	            $("#tab_" + elementId).after("<div style='height:30px;'><div style='float:left;'><input type='button' value='现在' id='" + elementId + "slider_now' /></div><div style='float:right;'><input type='button' value='完成' id='" + elementId + "slider_ok' /></div></div>");
	            $("#" + elementId + "slider_ok").click(function () {
	                e.val($("#tab_" + elementId).find("tr:eq(0)").find("td:eq(1)").text());
	                if (display == false) {
	                    $("#" + elementId + "_outDiv").hide();
	                }
	            });
	            $("#" + elementId + "slider_now").click(function () {
	                var date_now = new Date();
	                var now_HH = date_now.getHours() < 10 ? "0" + date_now.getHours() : date_now.getHours();
	                var now_mm = date_now.getMinutes() < 10 ? "0" + date_now.getMinutes() : date_now.getMinutes();
	                $("#" + elementId + "_slider_h").slider("value", now_HH);
	                $("#" + elementId + "_slider_m").slider("value", now_mm);
	                var slider_td = $("#tab_" + elementId).find("tr:eq(0)").find("td:eq(1)");
	                slider_td.find("span:eq(0)").text(now_HH);
	                slider_td.find("span:eq(1)").text(now_mm);

	            });
	        }
            //时
	        var h = function () {
	            $("#" + elementId + "_outDiv").empty().css({ "padding": "0 15px 0 15px" });
	            $("#" + elementId + "_outDiv").append("<table style='width:100%;' id='tab_" + elementId + "'>" +
                    "<tr><td></td><td><span>00</span>时</td></tr>" +
                    "<tr><td>时:</td><td><div id='" + elementId + "_slider_h'></div></td></tr>" +
                    "</table>");
	            $("#tab_" + elementId).find("tr td").css({ "padding-top": "4px", "padding-bottom": "4px" });
	            $("#tab_" + elementId).find("span").css({ "padding-left": "4px", "padding-right": "4px" });
	            hms_HH();
	            $("#tab_" + elementId).after("<div style='height:30px;'><div style='float:left;'><input type='button' value='现在' id='" + elementId + "slider_now' /></div><div style='float:right;'><input type='button' value='完成' id='" + elementId + "slider_ok' /></div></div>");
	            $("#" + elementId + "slider_ok").click(function () {
	                e.val($("#tab_" + elementId).find("tr:eq(0)").find("td:eq(1)").text());
	                if (display == false) {
	                    $("#" + elementId + "_outDiv").hide();
	                }
	            });
	            $("#" + elementId + "slider_now").click(function () {
	                var date_now = new Date();
	                var now_HH = date_now.getHours() < 10 ? "0" + date_now.getHours() : date_now.getHours();
	                $("#" + elementId + "_slider_h").slider("value", now_HH);
	                var slider_td = $("#tab_" + elementId).find("tr:eq(0)").find("td:eq(1)");
	                slider_td.find("span:eq(0)").text(now_HH);
	            });
	        }
	        var hms_HH = function () {
	            var span_h = $("#tab_" + elementId).find("tr:eq(0)").find("span:eq(0)");
	            $("#" + elementId + "_slider_h").slider({
	                range: "min",
	                min: 0,
	                max: 23,
                    value:0,
                    slide: function (event, ui) {
                        if (ui.value < 10) {
                            ui.value ="0"+ ui.value;
                        }
	                    span_h.html(ui.value);
	                }
	            });
	        }
	        var hms_mm = function () {
	            var span_m = $("#tab_" + elementId).find("tr:eq(0)").find("span:eq(1)");
	            $("#" + elementId + "_slider_m").slider({
	                range: "min",
	                min: 0,
	                max: 60,
	                value: 0,
	                slide: function (event, ui) {
	                    if (ui.value < 10) {
	                        ui.value = "0" + ui.value;
	                    }
	                    span_m.html(ui.value);
	                }
	            });
	        }
	        var hms_ss = function () {
	            var span_s = $("#tab_" + elementId).find("tr:eq(0)").find("span:eq(2)");
	            $("#" + elementId + "_slider_s").slider({
	                range: "min",
	                min: 0,
	                max: 60,
	                value: 0,
	                slide: function (event, ui) {
	                    if (ui.value < 10) {
	                        ui.value = "0" + ui.value;
	                    }
	                    span_s.html(ui.value);
	                }
	            });
	        }
            
	        if (display == false) {	            
	            e.wrap("<div></div>").after(outDiv);//text占一行
	        } else {
	            e.append(outDiv);
	            e.after("<span id='show_date' style='display:block;'></span>");
	            $("#" + elementId + "_outDiv").css("float", "none").css("position", "relative");
	            e.css("display", "block");
	        }
	        //添加头部内容
	        $("#" + elementId + "_outDiv").append(head);
	        if (default_value) {
	            y = strToDate(default_value).getFullYear(),
                m = strToDate(default_value).getMonth(),
                d = strToDate(default_value).getDate();
	            if ((parseInt(m) + 1) < 10) {
	                if (parseInt(d) < 10) {
	                    e.val(y + "年0" + (parseInt(m) + 1) + "月0" + d + "日"); //赋值                                            
	                } else {
	                    e.val(y + "年0" + (parseInt(m) + 1) + "月" + d + "日"); //赋值 
	                }
	            }
	            else {
	                if (parseInt(hideValue) < 10) {
	                    e.val(y + "年" + (parseInt(m) + 1) + "月0" + d + "日"); //赋值                                            
	                } else {
	                    e.val(y + "年" + (parseInt(m) + 1) + "月" + d + "日"); //赋值                         
	                }
	            }
	            if (display) {
	                if ((parseInt(m) + 1) < 10) {
	                    if (parseInt(d) < 10) {
	                        $("#show_date").text(y + "年0" + (parseInt(m) + 1) + "月0" + d + "日"); //赋值                                            
	                    } else {
	                        $("#show_date").text(y + "年0" + (parseInt(m) + 1) + "月" + d + "日"); //赋值 
	                    }
	                } else {
	                    if (parseInt(hideValue) < 10) {
	                        $("#show_date").text(y + "年" + (parseInt(m) + 1) + "月0" + d + "日"); //赋值                                            
	                    } else {
	                        $("#show_date").text(y + "年" + (parseInt(m) + 1) + "月" + d + "日"); //赋值                         
	                    }
	                }
	            }
	        }
	        //判断点击显示或总是显示
	        if (display == false) {
	            $("#" + elementId + "_outDiv").hide();
	            e.focus(function () {
	                $("#" + elementId + "_outDiv").show();
	            });

	            e.click(function (event) {
	                var e = window.event || event;
	                if (e.stopPropagation) {
	                    e.stopPropagation();
	                } else {
	                    e.cancelBubble = true;
	                }
	            });
	            $("#" + elementId + "_outDiv").click(function (event) {
	                var e = window.event || event;
	                if (e.stopPropagation) {
	                    e.stopPropagation();
	                } else {
	                    e.cancelBubble = true;
	                }
	            });
	            $(document).bind("click", function () {
	                $("#" + elementId + "_outDiv").hide();
	            });
	        }
	        if (readonly == true) {
	            e.attr("readonly", "readonly");
	        }
	        $("#" + elementId + "_outDiv").bind("selectstart", function () { return false; });//界面无法选中
	        $("#" + elementId + "_outDiv").bind("contextmenu", function () { return false; });//禁用右键
	        switch (datetimeType) {
	            case 'yyyy':
	                whenYYYY();
	                break;
	            case 'yyyy-MM':
	                yM();
	                break;
	            case 'yyyy-MM-dd':
	                yMd();
	                break;
	            case 'hh-mm-ss':
	                hms();
	                break;
                case 'hh-mm':
                    hm();
                    break;
                case 'hh':
                    h();
                    break;
	            default:
	                yMd();
	        }
	    },
        
	    _setOption: function (key, value) {
	        if (value !== undefined || value != null)
	            this.options[key] = value;
	        else
	            return this.options[key];
	        this._create();
	    },

	    _setOptions: function (options) {
	        var self = this;
	        $.each(options, function (key, value) {
	            self._setOption(key, value);
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


//head = "<div id='" + elementId + "_headDiv' class='jui-datetimepicker-dhead'>"
//+ "<a id='" + elementId + "_prev' title='上一页' class='jui-datetimepicker-prev'><span class='ui-icon ui-icon-circle-triangle-w'>&nbsp;</span></a>"
//+ "<div id='" + elementId + "_yearDiv' class='jui-datetimepicker-headcenter'><span>" + (y - 5) + "~" + (y + 4) + "</span></div>"
//+ "<a id='" + elementId + "_next' title='下一页' class='jui-datetimepicker-next'><span class='ui-icon ui-icon-circle-triangle-e'>&nbsp;</span></a>"
//+ "</div>";//头部  
////填日期
//var writeDate = function () {
//    var write_y = parseInt($("#_year" + elementId + " option:selected").attr("value"));
//    var write_m = parseInt($("#_month" + elementId + " option:selected").attr("value")) + 1;
//    var fullDay = [1, 3, 5, 7, 8, 10, 12];
//    var maxDay = null;
//    var max = false;
//    $.each(fullDay, function (key, val) {
//        if (val == write_m)
//            max = true;
//    });
//    if (max) {
//        maxDay = 31;
//    } else {
//        if (write_m == 2) {
//            if ((write_y % 4 == 0 && write_y % 100 != 0) || (write_y % 400 == 0)) {
//                maxDay = 29;
//            } else {
//                maxDay = 28;
//            }
//        } else {
//            maxDay = 30;
//        }
//    }
//    var myDate = new Date();
//    myDate.setFullYear(write_y);
//    myDate.setMonth(write_m - 1);
//    myDate.setDate(1);
//    var fir = myDate.getDay();//例:0(周日)
//    var weekResult = null;//列
//    var roll = null;//行           
//    for (var i = 1; i <= maxDay; i++) {
//        $("#" + elementId + "_tb").find("tr:eq(6)").remove();
//        myDate.setDate(i);
//        weekResult = myDate.getDay();//例:0(周日)
//        if (i < (8 - fir))
//            roll = 1;
//        if (i >= (8 - fir) && i < (15 - fir))
//            roll = 2;
//        if (i >= (15 - fir) && i < (22 - fir))
//            roll = 3;
//        if (i >= (22 - fir) && i < (29 - fir))
//            roll = 4;
//        if (i >= (29 - fir) && i < (36 - fir))
//            roll = 5;
//        if (i >= (36 - fir)) {
//            roll = 6;
//            $("#" + elementId + "_tb").append("<tr></tr>");
//            if (i == 31) {
//                $("#" + elementId + "_tb").find("tr:eq(6)").empty();
//                if (fir == 5)
//                    $("#" + elementId + "_tb").find("tr:eq(6)").append("<td ><a href='#'></a></td>");
//                if (fir == 6)
//                    $("#" + elementId + "_tb").find("tr:eq(6)").append("<td ><a href='#'></a></td><td ><a href='#'></a></td>");
//                $("#" + elementId + "_tb").find("tr:eq(" + roll + ")").find("td:eq(" + (weekResult - 1) + ")").find("a").html(i - 1);
//            }
//            if (i == 30) {
//                $("#" + elementId + "_tb").find("tr:eq(6)").empty();
//                $("#" + elementId + "_tb").find("tr:eq(6)").append("<td ><a href='#'></a></td>");
//            }
//            $("#" + elementId + "_tb").find("a").addClass("jui-datetimepicker-table-tr-a");
//        }
//        $("#" + elementId + "_tb").find("tr:eq(" + roll + ")").find("td:eq(" + weekResult + ")").find("a").html(i);
//        $("#" + elementId + "_tb").find("a").addClass("jui-datetimepicker-table-tr-a");
//        activeCss();//默认高亮当日
//        clickToHide();
//        noCss();
//    }

//}


////年
//var whenYYYY = function () {
//    var table = "<table id='" + elementId + "_tb' class='jui-datetimepicker-table'></table>"; //表格
//    $("#" + elementId + "_outDiv").append(table); //添加下部内容
//    var makeCells = function (y) {
//        $("#" + elementId + "_tb").empty();
//        for (var i = 0; i < 5; i++) {
//            $("#" + elementId + "_tb").append("<tr><td><a href='#'>" + (y - 5 + i) + "</a></td><td><a href='#'>" + (y + i) + "</a></td></tr>");
//        }
//        $("#" + elementId + "_yearDiv").text((y - 5) + "~" + (y + 4));
//        $("#" + elementId + "_tb a").addClass("jui-datetimepicker-table-tr-a");
//    }
//    //前翻页
//    $("#" + elementId + "_prev").bind("click", function () {
//        y = y - 10;
//        makeCells(y);
//        lightAndSetValue();
//        defaultheightLight();
//        clickToHide();
//        activeCss_y();
//        choseDate_y();
//    });
//    //后翻页
//    $("#" + elementId + "_next").bind("click", function () {
//        y = y + 10;
//        makeCells(y);
//        lightAndSetValue();
//        defaultheightLight();
//        clickToHide();
//        activeCss_y();
//        choseDate_y();
//    });
//    makeCells(y);
//    lightAndSetValue();
//    clickToHide();
//    activeCss_y();
//}

////年月
//var yM = function () {
//    var saveM;
//    $("#" + elementId + "_yearDiv").children("span").text(y);
//    $("#" + elementId + "_outDiv").append("<table id='" + elementId + "_tb' class='jui-datetimepicker-table'></table>"); //添加下部内容
//    for (var i = 0; i < 6; i++) {
//        $("#" + elementId + "_tb").append("<tr><td><a href='#'>" + (2 * i + 1) + "</a></td><td><a href='#'>" + (2 * i + 2) + "</a></td></tr>");
//    }
//    var click_yM = function (y) {
//        $("#" + elementId + "_yearDiv > span").text(y);
//    }
//    //前翻页
//    $("#" + elementId + "_prev").bind("click", function () {
//        y = y - 1;
//        click_yM(y);
//        choseDate_ym();
//        activeCss_ym();
//    });
//    //后翻页
//    $("#" + elementId + "_next").bind("click", function () {
//        y = y + 1;
//        click_yM(y);
//        choseDate_ym();
//        activeCss_ym();
//    });
//    //高亮并赋值            
//    $("#" + elementId + "_tb td").click(function () {
//        saveM = $(this).text();
//        ym_value = saveM;
//        switch (datetimeParse) {
//            case 'yyyy年MM月dd日':
//                e.val(y + "年" + $(this).text() + "月");
//                break; //赋值      
//            case 'dd MM,yyyy':
//                for (var i = 0; i < longMonthNames.length; i++) {
//                    if ($(this).text() == (i + 1))
//                        e.val(longMonthNames[i] + "," + y); //赋值    
//                }
//                break;
//            case 'yyyy-MM-dd':
//                if ($(this).text() < 10) {
//                    e.val(y + "-0" + $(this).text()); //赋值                                     
//                } else {
//                    e.val(y + "-" + $(this).text()); //赋值                                     
//                }
//                break;
//            default:
//                e.val(y + "年" + $(this).text() + "月"); //赋值    
//        }
//        $("#" + elementId + "_tb td a").removeClass("jui-datetimepicker-active").addClass("jui-datetimepicker-table-tr-a");
//        $(this).children("a").addClass("jui-datetimepicker-active"); //高亮	        
//        activeCss_ym();
//    });
//    clickToHide();//点击消失
//    $("#" + elementId + "_tb td a").addClass("jui-datetimepicker-table-tr-a");
//    activeCss_ym();
//}


////年月日
//var yMd = function () {
//    $("#" + elementId + "_yearDiv").children("span").remove("span");
//    if (datetimeParse == "yyyy-MM-dd") {
//        $("#" + elementId + "_yearDiv").append("<div id='_month" + elementId + "' style='display:inline-block;'></div><div id='_year" + elementId + "' style='display:inline-block;'></div>");//年月的下拉列表
//        $("#" + elementId + "_headDiv").children("a:eq(1)").attr("title", "next");
//        $("#" + elementId + "_headDiv").children("a:eq(0)").attr("title", "previous");
//    } else {
//        $("#" + elementId + "_yearDiv").append("<div id='_year" + elementId + "' style='display:inline-block;'></div><div id='_month" + elementId + "' style='display:inline-block;'></div>");//年月的下拉列表
//        $("#" + elementId + "_headDiv").children("a:eq(1)").attr("title", "下一页");
//        $("#" + elementId + "_headDiv").children("a:eq(0)").attr("title", "上一页");
//    }
//    addMonths();
//    addYears();
//    //显示日期的表格结构
//    var table = "<table id='" + elementId + "_tb' class='jui-datetimepicker-table'></table>";
//    $("#" + elementId + "_outDiv").append(table);
//    $("#" + elementId + "_tb").append("<tr></tr>");//表格头部
//    var long_week, short_week;
//    switch (datetimeParse) {
//        case 'yyyy-MM-dd':
//            long_week = longWeek;
//            short_week = shortWeek; break;
//        case 'yyyy年MM月dd日':
//            long_week = longWeekCN;
//            short_week = shortWeekCN; break;
//        default:
//            long_week = longWeekCN;
//            short_week = shortWeekCN; break;
//    }
//    for (var k = 0; k < short_week.length; k++) {
//        $("#" + elementId + "_tb tr").append("<td ><span class='jui-datetimepicker-week' title='" + long_week[k] + "'>" + short_week[k] + "</span></td>");
//    }
//    for (var i = 0; i < 5; i++) {
//        $("#" + elementId + "_tb").append("<tr></tr>");
//        for (var j = 0; j < 7; j++) {
//            $("#" + elementId + "_tb").find("tr:eq(" + (i + 1) + ")").append("<td><a href='#'></a></td>");
//        }
//    }
//    writeDate();
//    setVal();
//    $("#" + elementId + "_prev").click(function () {
//        $("#" + elementId + "_tb a").removeClass("jui-datetimepicker-active");
//        m = parseInt($("#_month" + elementId + " option:selected").attr("value")) - 1;
//        if (m == -1) {
//            m = 11;
//            y = parseInt($("#_year" + elementId + " option:selected").attr("value")) - 1;
//            $("#_year" + elementId).empty();
//            addYears();
//        }
//        addMonths();
//        $("#" + elementId + "_tb a").text("");//清空
//        writeDate();
//        choseDate();
//        setVal();
//    }); //前翻
//    $("#" + elementId + "_next").bind("click", function () {
//        $("#" + elementId + "_tb").find("a").removeClass("jui-datetimepicker-active");
//        m = parseInt($("#_month" + elementId + " option:selected").attr("value")) + 1;
//        if (m == 12) {
//            m = 0;
//            y = parseInt($("#_year" + elementId + " option:selected").attr("value")) + 1;
//            $("#_year" + elementId).empty();
//            addYears();
//        }
//        addMonths();
//        $("#" + elementId + "_tb a").text("");//清空
//        writeDate();
//        choseDate();
//        setVal();
//    });//后翻
//    Today();
//    activeCss();
//}


//var choseDate_y = function () {
//    if ($(this).text() == y_value ) {
//        $(this).children("a").addClass("jui-datetimepicker-active");
//    }
//}
//var choseDate_ym = function () {
//    if ($(this).text() == ym_value) {
//        $(this).children("a").addClass("jui-datetimepicker-active");
//    }
//}
////高亮并赋值
//var setVal = function () {
//    $("#" + elementId + "_tb td a").click(function () {
//        hideValue = $(this).text();
//        $("#" + elementId + "_tb td a").removeClass("jui-datetimepicker-active").addClass("jui-datetimepicker-table-tr-a");
//        $(this).addClass("jui-datetimepicker-active"); //高亮	
//        activeCss();
//        setVal_y = $("#_year" + elementId + " option:selected").attr("value");
//        setVal_M = $("#_month" + elementId + " option:selected").attr("value");
//        var international_val, china_val;
//        if (display) {
//            international_val = function (setVal_y, setVal_M) {
//                if ((parseInt(setVal_M) + 1) < 10) {
//                    if (parseInt(hideValue) < 10) {
//                        $("#show_date").text(setVal_y + "-0" + (parseInt(setVal_M) + 1) + "-0" + hideValue); //赋值                                            
//                    } else {
//                        $("#show_date").text(setVal_y + "-0" + (parseInt(setVal_M) + 1) + "-" + hideValue); //赋值 
//                    }
//                } else {
//                    if (parseInt(hideValue) < 10) {
//                        $("#show_date").text(setVal_y + "-" + (parseInt(setVal_M) + 1) + "-0" + hideValue); //赋值                                            
//                    } else {
//                        $("#show_date").text(setVal_y + "-" + (parseInt(setVal_M) + 1) + "-" + hideValue); //赋值                         
//                    }
//                }
//            }
//            china_val = function (setVal_y, setVal_M) {
//                if ((parseInt(setVal_M) + 1) < 10) {
//                    if (parseInt(hideValue) < 10) {
//                        $("#show_date").text(setVal_y + "年0" + (parseInt(setVal_M) + 1) + "月0" + hideValue + "日"); //赋值                                            
//                    } else {
//                        $("#show_date").text(setVal_y + "年0" + (parseInt(setVal_M) + 1) + "月" + hideValue + "日"); //赋值 
//                    }
//                } else {
//                    if (parseInt(hideValue) < 10) {
//                        $("#show_date").text(setVal_y + "年" + (parseInt(setVal_M) + 1) + "月0" + hideValue + "日"); //赋值                                            
//                    } else {
//                        $("#show_date").text(setVal_y + "年" + (parseInt(setVal_M) + 1) + "月" + hideValue + "日"); //赋值                         
//                    }
//                }
//            }
//        } else {
//            international_val = function (setVal_y, setVal_M) {
//                if ((parseInt(setVal_M) + 1) < 10) {
//                    if (parseInt(hideValue) < 10) {
//                        e.val(setVal_y + "-0" + (parseInt(setVal_M) + 1) + "-0" + hideValue); //赋值                                            
//                    } else {
//                        e.val(setVal_y + "-0" + (parseInt(setVal_M) + 1) + "-" + hideValue); //赋值 
//                    }
//                } else {
//                    if (parseInt(hideValue) < 10) {
//                        e.val(setVal_y + "-" + (parseInt(setVal_M) + 1) + "-0" + hideValue); //赋值                                            
//                    } else {
//                        e.val(setVal_y + "-" + (parseInt(setVal_M) + 1) + "-" + hideValue); //赋值                         
//                    }
//                }
//            }
//            china_val = function (setVal_y, setVal_M) {
//                if ((parseInt(setVal_M) + 1) < 10) {
//                    if (parseInt(hideValue) < 10) {
//                        e.val(setVal_y + "年0" + (parseInt(setVal_M) + 1) + "月0" + hideValue + "日"); //赋值                                            
//                    } else {
//                        e.val(setVal_y + "年0" + (parseInt(setVal_M) + 1) + "月" + hideValue + "日"); //赋值 
//                    }
//                } else {
//                    if (parseInt(hideValue) < 10) {
//                        e.val(setVal_y + "年" + (parseInt(setVal_M) + 1) + "月0" + hideValue + "日"); //赋值                                            
//                    } else {
//                        e.val(setVal_y + "年" + (parseInt(setVal_M) + 1) + "月" + hideValue + "日"); //赋值                         
//                    }
//                }
//            }
//        }
//        switch (datetimeParse) {
//            case 'yyyy年MM月dd日':
//                china_val(setVal_y, setVal_M);
//                break;
//            case 'yyyy-MM-dd':
//                international_val(setVal_y, setVal_M);
//                break;
//            default:
//                china_val(setVal_y, setVal_M);
//                break;
//        }
//        noCss();
//    });
//}


////高亮并赋值
//var lightAndSetValue = function () {
//    $("#" + elementId + "_tb td").click(function () {
//        e.val($(this).text());//赋值
//        y_value = $(this).text();
//        $("#" + elementId + "_tb a").removeClass("jui-datetimepicker-active").addClass("jui-datetimepicker-table-tr-a");
//        $(this).children("a").addClass("jui-datetimepicker-active");//高亮
//        activeCss_y();
//    });
//}
////默认高亮
//var defaultheightLight = function () {
//    $("#" + elementId + "_tb td").each(function () {
//        if ($(this).text() == e.val()) {
//            $(this).children("a").addClass("jui-datetimepicker-active");
//        }
//    });
//}