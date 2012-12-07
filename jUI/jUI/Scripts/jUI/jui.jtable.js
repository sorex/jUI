/// <reference path="../jquery-1.7.js" />
/// <reference path="../jquery-ui-1.8.18.js" />

//JQuery UI table Plugin
/*
* jQuery UI table 
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/

/*
* Author: ZhangJian
* Create date: 2012年10月8日 10:48:21
* Description: 表格生成插件
*/

/*
items:
    [
        {item,item...},
        {item,item...},
        ...
    ]	//使用item列表为其赋值

    item:
            head: "名称名称名称名称",				                        //名称
            context: "#Name(#Name2)(#ID)",			                //#Name(#Name2)(#ID)
            maxLength: 5,			                                            //文本最大长度，0不限制
            head_align: "left",                                                 //表头单元格横向分布 [left], center, right
            v_align: "top",		                                                //表格单元格纵向分布 [top], middle, bottom
            h_align: "left",		                                                //表格单元格横向分布 [left], center, right
            height: "auto",			                                            //单元格高度 150px, 10%
            width: "auto"			                                            //单元格宽度 150px, 10%
*/

(function ($, undefined) {
    $.widget("j.jtable",
	{
	    // default options
	    options: {
	        height: '', //表高
	        width: '', //表宽
	        data: [
                        //{ "ID": 1, "Name": "AAAAA", "Name2": "aaaaa", "Name3": "aaaaa3", "Name4": "aaaaaa4", "Name5": "aaaaaaaa5" },
                        //{ "ID": 2, "Name": "BBBBBBB", "Name2": "bbbbb", "Name3": "bbbbb3", "Name4": "bbbbb4", "Name5": "bbbbb5" },
                        //{ "ID": 3, "Name": "CCCCCC", "Name2": "cccccc", "Name3": "cccccc3", "Name4": "cccccc4", "Name5": "cccccc5" },
                        //{ "ID": 4, "Name": "DDDDDD", "Name2": "dddddd", "Name3": "dddddd3", "Name4": "dddddd4", "Name5": "dddddd5" },
                        //{ "ID": 5, "Name": "EEEEEEE", "Name2": "eeeeeee", "Name3": "eeeeeee3", "Name4": "eeeeeee4", "Name5": "eeeeeee5" },
                        //{ "ID": 6, "Name": "FFFFFFF", "Name2": "ffffffff", "Name3": "ffffffff3", "Name4": "ffffffff4", "Name5": "ffffffff5" },
                        //{ "ID": 7, "Name": "GGGGG", "Name2": "gggggg", "Name3": "gggggg3", "Name4": "gggggg4", "Name5": "gggggg5" }
	        ], //数据源
	        columns: [
		                //{
		                //    head: "名称1",				                                    //名称
		                //    context: "#Name(#Name2)(#ID)",			            //#Name(#Name2)(#ID)
		                //    maxLength: 5,			                                        //文本最大长度，0不限制
		                //    head_align: "left",                                             //[left], center, right
		                //    v_align: "top",		                                            //[top], middle, bottom
		                //    h_align: "left",		                                            //[left], center, right
		                //    height: "auto",			                                        //150px, 10%
		                //    width: "auto"			                                        //150px, 10%
		                //},
		                //{ head: "名称2", context: "#Name2", maxLength: 5, head_align: "left", v_align: "top", h_align: "left", height: "auto", width: "auto" },
		                //{ head: "名称3", context: "#Name3", maxLength: 5, head_align: "left", v_align: "top", h_align: "left", height: "auto", width: "auto" },
		                //{ head: "名称4", context: "#Name4", maxLength: 5, head_align: "left", v_align: "top", h_align: "left", height: "auto", width: "auto" },
		                //{ head: "名称5", context: "#Name5", maxLength: 5, head_align: "left", v_align: "top", h_align: "left", height: "auto", width: "auto" },
		                //{
		                //    head: "操作", context: "<a href='#' onclick=ActionEdit(#ID,'#Name','#Name2')>Edit</a>|<a href='#' onclick=ActionDetail(#ID,'#Name','#Name2')>Detail</a>|<a href='#' onclick=ActionDelete(#ID,'#Name','#Name2')>Delete</a>",
		                //    maxLength: 5, head_align: "left", v_align: "top", h_align: "left", height: "auto", width: "auto"
		                //}
	        ]//列
	    },

	    _create: function () {
	        this._jtableCreate();
	    },

	    _jtableCreate: function () {
	        var self = this,
            o = this.options;
	        $(this.element).empty();
	        $(document).bind("selectstart", function () { return false; }); //控制文本不能被选中
	        //无数据时，显示错误提示信息
	        if (o.data.length == 0) {
	            $(this.element).empty().append('<span class="ui-icon ui-icon-alert" style="float: left; margin: 3px 3px 0px 3px;"></span><p>无数据</p>');
	        } else {
	            $(this.element).empty().addClass("jui-table");
	            var tableId = $(this.element).attr("id");

                //生成表框架
	            $(this.element).append(
                    "<table id='" + tableId + "_tableSorter' style='width:" + o.width + ";height:" + o.height + ";'>" +
                    "<thead class='jui-table-head'><tr></tr></thead><tbody></tbody>" +
                    "</table>" +
                    "<span id='dis_checkedItems' style='display:none;'></span>");

	            var dataArray = new Array();
	            for (d in o.data[0]) {
	                dataArray.push(d);
	            }
	            dataArray.sort(this._sortNum).reverse();

                //生成表头
	            var g, short_g_head;
	            for (var j in o.columns) {
	                g = o.columns[j];
	                var g_head = g["head"];
	                var g_maxLength = g["maxLength"];
	                if (g_head.length > g_maxLength && g_maxLength !=0) {
	                    short_g_head = g_head.substring(0, g_maxLength) + "...";
	                } else {
	                    short_g_head = g_head;
	                }
	                var g_context = g["context"];
	                var g_head_align = g["head_align"];
	                var g_v_align = g["v_align"];
	                var g_h_align = g["h_align"];
	                var g_height = g["height"];
	                var g_width = g["width"];
	                $("#" + tableId + "_tableSorter thead tr").append(
                        "<td style='text-align: " + g_head_align
                        + "; vertical-align: " + g_v_align
                        + "; height: " + g_height
                        + "; width: " + g_width + ";padding-left: 2px; padding-right: 2px;padding-top:5px;padding-bottom:5px;'>"
                        + "<span style='cursor:default;' title='" + g_head + "'>" + short_g_head + "</span>" +
                        "</td>"
                        );
	            }

                //生成表格
	            var v, short_v_head;
	            for (var i = 0; i < o.data.length; i++) {
	                $("#" + tableId + "_tableSorter tbody").append("<tr></tr>"); //行
	                for (var c in o.columns) {
	                    var isLink = false;
	                    v = o.columns[c];
	                    var v_head = v["head"];
	                    var v_context = v["context"];
	                    var v_maxLength = v["maxLength"];
	                    var v_head_align = v["head_align"];
	                    var v_v_align = v["v_align"];
	                    var v_h_align = v["h_align"];
	                    var v_height = v["height"];
	                    var v_width = v["width"];
	                    for (var r = 0; r < dataArray.length; r++) {
	                        var t = "#" + dataArray[r];
	                        v_context = v_context.replace2(t, o.data[i][dataArray[r]]);
	                    }
                        //排除操作列
	                    if (v_context.length > v_maxLength && !v_context.startsWith("<") && v_maxLength!=0) {
	                        short_v_head = v_context.substring(0, v_maxLength) + "...";
	                    } else {
	                        short_v_head = v_context;
	                        if(v_context.startsWith("<")){
	                            isLink = true;
	                        }
	                    }
	                    if (isLink == true) {
	                        $("#" + tableId + "_tableSorter tbody tr:eq(" + i + ")").append("<td style='text-align: " + v_h_align
                            + "; vertical-align: " + v_v_align
                            + "; height: " + v_height
                            + "; width: " + v_width + ";padding-left: 2px; padding-right: 2px;padding-top:5px;padding-bottom:5px;'><span>" + v_context + "</span></td>"); //列 
	                    } else {
	                        $("#" + tableId + "_tableSorter tbody tr:eq(" + i + ")").append("<td style='text-align: " + v_h_align
                            + "; vertical-align: " + v_v_align
                            + "; height: " + v_height
                            + "; width: " + v_width + ";padding-left: 2px; padding-right: 2px;padding-top:5px;padding-bottom:5px;'><span style='cursor:default;' title='" + v_context + "'>" + short_v_head + "</span></td>"); //列 
	                    }
	                }
                    //隐藏域保存行ID
	                $("#" + tableId + "_tableSorter tbody tr:eq(" + i + ") td:eq(0)").prepend("<span style='display:none;'>" + o.data[i]["ID"] + "</span>");
	            }


                //首列添加图标
	            var table = $("#" + tableId + "_tableSorter");

	            //*********表格行样式切换
	            var $tr = table.children("tbody").find('tr');
	            var doubleTr = table.children("tbody").find("tr:odd");
	            var singleTr = table.children("tbody").find("tr:even");
	            //给tr设置LOCK
	            $tr.attr('Lock', 'false');
	            singleTr.addClass("jui-table-out");
	            doubleTr.addClass("jui-table-out-single");
	            var hoverClassToggle = function (obj) {
	                obj.mouseover(function () {
	                    if ($(this).attr("Lock") == "false") {
	                        $(this).removeClass().addClass("jui-table-over");
	                    }
	                });
	                if (obj == singleTr) {
	                    obj.mouseout(function () {
	                        if ($(this).attr("Lock") == "false") {
	                            $(this).removeClass().addClass("jui-table-out");
	                        }
	                    });
	                } else if (obj == doubleTr) {
	                    obj.mouseout(function () {
	                        if ($(this).attr("Lock") == "false") {
	                            $(this).removeClass().addClass("jui-table-out-single");
	                        }
	                    });
	                }
	            }
	            hoverClassToggle(singleTr);
	            hoverClassToggle(doubleTr);
	            $tr.mousedown(function () {
	                singleTr.attr("Lock", "false").removeClass("jui-table-click").addClass("jui-table-out");
	                doubleTr.attr("Lock", "false").removeClass("jui-table-click").addClass("jui-table-out-single");
	                //$tr.attr("Lock", "false").removeClass("jui-table-click");
	                $(this).attr("Lock", "true").removeClass().addClass("jui-table-click");
	            });
	        }
	    },
        //返回选中行数据
	    currentData: function () {
	        var o = this.options;
	        var checkedRoll="";
	        var checkedRollId = $(this.element).find(".jui-table-click").find("td:eq(0)").find("span:eq(1)").text();
	        for (var i = 0; i < o.data.length; i++) {
	            if (o.data[i]["ID"] == checkedRollId) {
	                checkedRoll = o.data[i];
	            }
	        }
	        return checkedRoll;
	    },

	    _init: function () {
	        this._jtableCreate();
	    },

	    _sortNum: function (a, b) {
	        return a.length - b.length;
	    },

	    _setOption: function (key, value) {
	        if (value !== undefined || value != null)
	            this.options[key] = value;
	        else
	            return this.options[key];
	    },

	    _setOptions: function (options) {
	        var self = this;
	        $.each(options, function (key, value) {
	            self._setOption(key, value);
	        });
	        this._jtableCreate();
	    },

	    _destroy: function () {
	        var o = this.options;

	        $(this.element).empty();
	        $(this).empty();

	        return this;
	    }
	});

    $.extend($.j.jtableCreate, {
        version: "0.1.0"
    });
})(jQuery);