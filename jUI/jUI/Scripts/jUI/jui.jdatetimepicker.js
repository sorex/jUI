/// <reference path="../jquery-1.8.1-vsdoc.js" />
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
*       display:日期呈现类型
*       readonly:文本框只读
*       showToday:显示今天
*/

(function ($, undefined) {
    $.widget("jui.jdatetimepicker",
	{
	    // default options
	    options: {
	        datetimeType: ""
            , datetimeParse: ""
            , display: ""
            , readonly: null
	        ,showToday:false
	    },

	    _create: function () {
	        var self = this;
	        var e = $(this.element);
	        var data = this.options;
	        var showToday = data.showToday;
	        var datetimeType = data.datetimeType;
	        var datetimeParse = data.datetimeParse;
	        var display = data.display;
	        var readonly = data.readonly;
	        var date = new Date();
	        var y = date.getFullYear(); //今年
	        var m = date.getMonth();//当月
	        var d = date.getDate();//今日
	        var longMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	        var shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	        var shortWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	        var longWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	        var shortWeekCN = ['日', '一', '二', '三', '四', '五', '六'];
	        var longWeekCN = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	        var MonthNamesCN = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

	        var fullDay = [1, 3, 5, 7, 8, 10, 12];
	        var maxDay = null;
	        var max = false;
	        var weekResult = null;//列
	        var roll = null;//行               
	        var elementId = e.attr("id");
	        var t = 0;
	        var _t = 1;
	        var hideValue = null;
	        var y_value = null;
	        var ym_value = null;
	        var setVal_y = null;
	        var setVal_M = null;
	        if (datetimeParse == "yyyy-MM-dd") {
	            t = 1;
	            _t = 0;
	        }
	        //外层div
	        var outDiv = "<div id='" + elementId + "_outDiv' class='jui-datetimepicker'></div>";
	        //头部
	        var head = "<div id='" + elementId + "_headDiv' class='jui-datetimepicker-dhead jui-datetimepicker-corner-all'>"
            + "<a id='" + elementId + "_prev' title='上一页' class='jui-datetimepicker-al jui-datetimepicker-corner-all'><span class='ui-icon ui-icon-circle-triangle-w'>&nbsp;</span></a>"
            + "<a id='" + elementId + "_next' title='下一页' class='jui-datetimepicker-ar jui-datetimepicker-corner-all'><span class='ui-icon ui-icon-circle-triangle-e'>&nbsp;</span></a>"
            + "<div id='" + elementId + "_yearDiv' class='jui-datetimepicker-dhcenter'><span>" + (y - 5) + "~" + (y + 4) + "</span></div>"
            + "</div>";
	        //text占一行
	        e.wrap("<p></p>").after(outDiv);
	        //添加头部内容
	        $("#" + elementId + "_outDiv").append(head);
	        //填日期
	        var writeDate = function () {
	            var write_y = parseInt($("#" + elementId + "_yearDiv").children("select:eq(" + t + ")").val());//当前选择的年份
	            var write_m = parseInt($("#" + elementId + "_yearDiv").children("select:eq(" + _t + ")").val()) + 1;//当前选择的月份
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
	            var act_y = parseInt($("#" + elementId + "_yearDiv").children("select:eq(" + t + ")").val());//当前选择的年份
	            var act_m = parseInt($("#" + elementId + "_yearDiv").children("select:eq(" + _t + ")").val());//当前选择的月份
	            $("#" + elementId + "_tb a").each(function () {
	                if ($(this).text() == date.getDate() && act_y == date.getFullYear() && (act_m == date.getMonth()))
	                    $(this).removeClass("jui-datetimepicker-table-tr-a").addClass("jui-datetimepicker-now ");
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
	            var chose_y = parseInt($("#" + elementId + "_yearDiv").children("select:eq(" + t + ")").val());//当前选择的年份
	            var chose_m = parseInt($("#" + elementId + "_yearDiv").children("select:eq(" + _t + ")").val());//当前选择的月份
	            $("#" + elementId + "_tb td").each(function () {
	                if ($(this).text() == hideValue && chose_y == setVal_y && chose_m == setVal_M) {
	                    $(this).children("a").addClass("jui-datetimepicker-active");
	                }
	            });
	        }
	        var choseDate_y = function () {
	            if ($(this).text() == y_value ) {
	                $(this).children("a").addClass("jui-datetimepicker-active");
	            }
	        }
	        var choseDate_ym = function () {
	            if ($(this).text() == ym_value) {
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
	                setVal_y = $("#" + elementId + "_yearDiv").children("select:eq("+t+")").val();
	                setVal_M = $("#" + elementId + "_yearDiv").children("select:eq(" + _t + ")").val();
	                var international_val = function (setVal_y, setVal_M) {
	                    if ((parseInt(setVal_M) + 1) < 10) {
	                        if (parseInt(hideValue) < 10) {
	                            e.val(setVal_y + "-0" + (parseInt(setVal_M) + 1) + "-0" + hideValue); //赋值                                            
	                        } else {
	                            e.val(setVal_y + "-0" + (parseInt(setVal_M) + 1) + "-" + hideValue); //赋值 
	                        }
	                    } else {
	                        if (parseInt(hideValue) < 10) {
	                            e.val(setVal_y + "-" + (parseInt(setVal_M) + 1) + "-0" + hideValue); //赋值                                            
	                        } else {
	                            e.val(setVal_y + "-" + (parseInt(setVal_M) + 1) + "-" + hideValue); //赋值                         
	                        }
	                    }
	                }
	                var china_val = function (setVal_y, setVal_M) {
	                    if ((parseInt(setVal_M) + 1) < 10) {
	                        if (parseInt(hideValue) < 10) {
	                            e.val(setVal_y + "年0" + (parseInt(setVal_M) + 1) + "月0" + hideValue+"日"); //赋值                                            
	                        } else {
	                            e.val(setVal_y + "年0" + (parseInt(setVal_M) + 1) + "月" + hideValue+"日"); //赋值 
	                        }
	                    } else {
	                        if (parseInt(hideValue) < 10) {
	                            e.val(setVal_y + "年" + (parseInt(setVal_M) + 1) + "月0" + hideValue+"日"); //赋值                                            
	                        } else {
	                            e.val(setVal_y + "年" + (parseInt(setVal_M) + 1) + "月" + hideValue+"日"); //赋值                         
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
	        var addOptions = function () {
	            for (var i = y - 10; i < y; i++) {
	                var op = "";
	                if (datetimeParse == "yyyy-MM-dd") {
	                    op = "<option value='" + i + "'>" + i + "</option>";
	                    $("#" + elementId + "_yearDiv").children("select:eq(1)").append(op);
	                } else {
	                    op = "<option value='" + i + "'>" + i + "年</option>";
	                    $("#" + elementId + "_yearDiv").children("select:eq(0)").append(op);
	                }
	            }
	            for (var i = y; i <= y + 10; i++) {
	                var op = "";
	                if (datetimeParse == "yyyy-MM-dd") {
	                    op = "<option value='" + i + "'>" + i + "</option>";
	                    $("#" + elementId + "_yearDiv").children("select:eq(1)").append(op);
	                } else {
	                    op = "<option value='" + i + "'>" + i + "年</option>";
	                    $("#" + elementId + "_yearDiv").children("select:eq(0)").append(op);
	                }
	            }
	        }
	        //添加年份下拉列表
	        var addYear = function () {
	            addOptions();
	            $("#" + elementId + "_yearDiv").children("select:eq("+t+")").find("option").each(function () {
	                if ($(this).val() == y)
	                    $(this).attr("selected", "selected");
	            });//默认今年                
	            $("#" + elementId + "_yearDiv").children("select:eq("+t+")").bind("change", function () {
	                $("#" + elementId + "_tb").find("a").removeClass("jui-datetimepicker-active");
	                y = parseInt($(this).val());
	                $(this).empty();
	                addOptions();
	                $(this).children("option").removeAttr("selected");
	                $("#" + elementId + "_yearDiv").children("select:eq("+t+")").find("option").each(function () {
	                    if ($(this).val() == y)
	                        $(this).attr("selected", "selected");
	                });
	                $("#" + elementId + "_tb a").text("");//清空
	                writeDate();
	                choseDate();
	            });//年份动态添加          
	            $("#" + elementId + "_yearDiv").children("select:eq("+_t+")").bind("change", function () {
	                $("#" + elementId + "_tb").find("a").removeClass("jui-datetimepicker-active");
	                $("#" + elementId + "_tb a").text("");//清空
	                writeDate();
	                choseDate();
	            });//日期随月份动态添加
	        }
	        //添加月份下拉列表
	        var addMonth = function () {
	            //添加月下拉列表
	            for (var i = 0; i < shortMonthNames.length; i++) {
	                var op = "<option value='" + i + "'>" + MonthNamesCN[i] + "</option>";
	                if (datetimeParse == "yyyy-MM-dd") {
	                     op = "<option value='" + i + "'>" + shortMonthNames[i] + "</option>";
	                }
	                $("#" + elementId + "_yearDiv").children("select:eq("+_t+")").append(op);
	            }
	            $("#" + elementId + "_yearDiv").children("select:eq("+_t+")").find("option").each(function () {
	                if ($(this).val() == m)
	                    $(this).attr("selected", "selected");
	            });//默认当前月
	        }
	        //高亮并赋值
	        var lightAndSetValue = function () {
	            $("#" + elementId + "_tb td").click(function () {
	                e.val($(this).text());//赋值
	                y_value = $(this).text();
	                $("#" + elementId + "_tb a").removeClass("jui-datetimepicker-active").addClass("jui-datetimepicker-table-tr-a");
	                $(this).children("a").addClass("jui-datetimepicker-active");//高亮
	                activeCss_y();
	            });
	        }
	        //默认高亮
	        var defaultheightLight = function () {
	            $("#" + elementId + "_tb td").each(function () {
	                if ($(this).text() == e.val()) {
	                    $(this).children("a").addClass("jui-datetimepicker-active");
	                }
	            });
	        }
	        //点击消失
	        var clickToHide = function () {
	            if (display == "click" || display == "") {
	                $("#" + elementId + "_tb a").click(function () {
	                    $("#" + elementId + "_outDiv").hide();
	                });
	            }
	        }
	        //年
	        var whenYYYY = function () {
	            var table = "<table id='" + elementId + "_tb' class='jui-datetimepicker-table'></table>"; //表格
	            $("#" + elementId + "_outDiv").append(table); //添加下部内容
	            var makeCells = function (y) {
	                $("#" + elementId + "_tb").empty();
	                for (var i = 0; i < 5; i++) {
	                    $("#" + elementId + "_tb").append("<tr><td><a href='#'>" + (y - 5 + i) + "</a></td><td><a href='#'>" + (y + i) + "</a></td></tr>");
	                }
	                $("#" + elementId + "_yearDiv").text((y - 5) + "~" + (y + 4));
	                $("#" + elementId + "_tb a").addClass("jui-datetimepicker-table-tr-a");
	            }
	            //前翻页
	            $("#" + elementId + "_prev").bind("click", function () {
	                y = y - 10;
	                makeCells(y);
	                lightAndSetValue();
	                defaultheightLight();
	                clickToHide();
	                activeCss_y();
	                choseDate_y();
	            });
	            //后翻页
	            $("#" + elementId + "_next").bind("click", function () {
	                y = y + 10;
	                makeCells(y);
	                lightAndSetValue();
	                defaultheightLight();
	                clickToHide();
	                activeCss_y();
	                choseDate_y();
	            });
	            makeCells(y);
	            lightAndSetValue();
	            clickToHide();
	            activeCss_y();
	        }
	        //年月
	        var yM = function () {
	            var saveM;
	            $("#" + elementId + "_yearDiv").children("span").text(y);
	            $("#" + elementId + "_outDiv").append("<table id='" + elementId + "_tb' class='jui-datetimepicker-table'></table>"); //添加下部内容
	            for (var i = 0; i < 6; i++) {
	                $("#" + elementId + "_tb").append("<tr><td><a href='#'>" + (2 * i + 1) + "</a></td><td><a href='#'>" + (2 * i + 2) + "</a></td></tr>");
	            }
	            var click_yM = function (y) {
	                $("#" + elementId + "_yearDiv > span").text(y);
	            }
	            //前翻页
	            $("#" + elementId + "_prev").bind("click", function () {
	                y = y - 1;
	                click_yM(y);
	                choseDate_ym();
	                activeCss_ym();
	            });
	            //后翻页
	            $("#" + elementId + "_next").bind("click", function () {
	                y = y + 1;
	                click_yM(y);
	                choseDate_ym();
	                activeCss_ym();
	            });
	            //高亮并赋值            
	            $("#" + elementId + "_tb td").click(function () {
	                saveM = $(this).text();
	                ym_value = saveM;
	                switch (datetimeParse) {
	                    case 'yyyy年MM月dd日':
	                        e.val(y + "年" + $(this).text() + "月");
	                        break; //赋值      
	                    case 'dd MM,yyyy':
	                        for (var i = 0; i < longMonthNames.length; i++) {
	                            if ($(this).text() == (i + 1))
	                                e.val(longMonthNames[i] + "," + y); //赋值    
	                        }
	                        break;
	                    case 'yyyy-MM-dd':
	                        if ($(this).text() < 10) {
	                            e.val(y + "-0" + $(this).text()); //赋值                                     
	                        } else {
	                            e.val(y + "-" + $(this).text()); //赋值                                     
	                        }
	                        break;
	                    default:
	                        e.val(y + "年" + $(this).text() + "月"); //赋值    
	                }
	                $("#" + elementId + "_tb td a").removeClass("jui-datetimepicker-active").addClass("jui-datetimepicker-table-tr-a");
	                $(this).children("a").addClass("jui-datetimepicker-active"); //高亮	        
	                activeCss_ym();
	                //$("#" + elementId + "_tb").find("td").each(function () {
	                //    if ($(this).text() != saveM) {
	                //        $(this).children("a").removeClass("jui-datetimepicker-active").addClass("jui-datetimepicker-table-tr-a");
	                //    }
	                //});
	            });
	            clickToHide();//点击消失
	            $("#" + elementId + "_tb td a").addClass("jui-datetimepicker-table-tr-a");
	            activeCss_ym();
	        }
	        //年月日
	        var yMd = function () {
	            $("#" + elementId + "_yearDiv").children("span").remove("span");
	            $("#" + elementId + "_yearDiv").append("<select class='jui-datetimepicker-select'></select><select class='jui-datetimepicker-select'></select>");//年月的下拉列表

	            if (datetimeParse == "yyyy-MM-dd") {
	                $("#" + elementId + "_headDiv").children("a:eq(1)").attr("title", "next");
	                $("#" + elementId + "_headDiv").children("a:eq(0)").attr("title", "previous");
	            } else {
	                $("#" + elementId + "_headDiv").children("a:eq(1)").attr("title", "下一页");
	                $("#" + elementId + "_headDiv").children("a:eq(0)").attr("title", "上一页");
	            }
	            addMonth();
	            addYear();
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
	            $("#" + elementId + "_prev").click(function () {
	                $("#" + elementId + "_tb a").removeClass("jui-datetimepicker-active");
	                m = $("#" + elementId + "_yearDiv").children("select:eq("+_t+")").val() - 1;
	                if (m == -1) {
	                    m = 11;
	                    y = $("#" + elementId + "_yearDiv").children("select:eq("+t+")").val() - 1;
	                    $("#" + elementId + "_yearDiv").children("select:eq(" + t + ")").find("option").each(function () {
	                        $(this).removeAttr("selected"); //清空选择项                        
	                        if ($(this).val() == y)
	                            $(this).attr("selected", "selected");
	                    });
	                    $("#" + elementId + "_yearDiv").children("select:eq(" + t + ")").val(y);
	                }
	                $("#" + elementId + "_yearDiv").children("select:eq(" + _t + ")").find("option").each(function () {
	                    $(this).removeAttr("selected"); //清空选择项
	                    if ($(this).val() == m)
	                        $(this).attr("selected", "selected");
	                });
	                $("#" + elementId + "_yearDiv").children("select:eq(" + _t + ")").val(m);
	                $("#" + elementId + "_tb a").text("");//清空
	                writeDate();
	                choseDate();
	            }); //前翻
	            $("#" + elementId + "_next").bind("click", function () {
	                $("#" + elementId + "_tb").find("a").removeClass("jui-datetimepicker-active");
	                m = parseInt($("#" + elementId + "_yearDiv").children("select:eq(" + _t + ")").val()) + 1;
	                if (m == 12) {
	                    m = 0;
	                    y = parseInt($("#" + elementId + "_yearDiv").children("select:eq(" + t + ")").val()) + 1;
	                    $("#" + elementId + "_yearDiv").children("select:eq(" + t + ")").find("option").each(function () {
	                        $(this).removeAttr("selected"); //清空选择项                        
	                        if ($(this).val() == y)
	                            $(this).attr("selected", "selected");
	                    });
	                    $("#" + elementId + "_yearDiv").children("select:eq(" + t + ")").val(y);
	                }
	                $("#" + elementId + "_yearDiv").children("select:eq(" + _t + ")").find("option").each(function () {
	                    $(this).removeAttr("selected"); //清空选择项
	                    if ($(this).val() == m)
	                        $(this).attr("selected", "selected");
	                });
	                $("#" + elementId + "_yearDiv").children("select:eq(" + _t + ")").val(m);
	                $("#" + elementId + "_tb a").text("");//清空
	                writeDate();
	                choseDate();
	            });//后翻
	            Today();
	        }
	        
            //显示今日
	        var Today = function () {
	            if (showToday) {
	                $("#" + elementId + "_tb").after("<input id='btn_" + elementId + "' type='button' value='今天' />");
	                $("#btn_" + elementId).click(function () {
	                    var international_val = function (date) {
	                        if ((date.getMonth() + 1) < 10) {
	                            if (d< 10) {
	                                e.val(date.getFullYear() + "-0" + (date.getMonth() + 1) + "-0" + d); //赋值                                            
	                            } else {
	                                e.val(date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + d); //赋值 
	                            }
	                        } else {
	                            if (d < 10) {
	                                e.val(date.getFullYear() + "-" + (date.getMonth() + 1) + "-0" + d); //赋值                                            
	                            } else {
	                                e.val(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + d); //赋值                         
	                            }
	                        }
	                    }
	                    var china_val = function (date) {
	                        if ((date.getMonth() + 1) < 10) {
	                            if (d < 10) {
	                                e.val(date.getFullYear() + "年0" + (date.getMonth() + 1) + "月0" + d + "日"); //赋值                                            
	                            } else {
	                                e.val(date.getFullYear() + "年0" + (date.getMonth() + 1) + "月" + d + "日"); //赋值 
	                            }
	                        } else {
	                            if (d < 10) {
	                                e.val(date.getFullYear() + "年" + (date.getMonth() + 1) + "月0" + d + "日"); //赋值                                            
	                            } else {
	                                e.val(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + d + "日"); //赋值                         
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
	                    if (display == "click" || display == "") {
	                        $("#" + elementId + "_outDiv").hide();
	                    }
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
	                if (display == "click" || display == "") {
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
	                if (display == "click" || display == "") {
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
	                if (display == "click" || display == "") {
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

	        //判断点击显示或总是显示
	        if (display == "click" || display == "") {
	            $("#" + elementId + "_outDiv").hide();
	            e.focus(function () {
	                $("#" + elementId + "_outDiv").show();
	            });
	        }
	        //只读  
	        if (readonly == true) {
	            e.attr("readonly", "readonly");
	        }
	        $("#" + elementId + "_outDiv").bind("selectstart", function () { return false; });//界面无法选中
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