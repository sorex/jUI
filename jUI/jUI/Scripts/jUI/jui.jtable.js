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

(function ($, undefined) {
    $.widget("j.jtable",
	{
	    // default options
	    options: {
	        tableHeight: '30%', //表高
	        tableWidth: '100%', //表宽
	        data: [], //数据源
	        columns: {},//列名
	        overColor: '',//鼠标覆盖后行颜色
            outColor: '',//鼠标移开后行颜色
            onClickColor: '',//鼠标点击行后，行颜色
            onClick: true,//是否开启鼠标点击
	        noResultsText:''//错误提示
	    },

	    _create: function () {
	        this._jtableCreate();
	    },

	    _jtableCreate: function () {
	        var self = this,
            o = this.options;
	        $(this.element).empty();
	        var image = "../../Images/orderedList0.png";
	        $(document).bind("selectstart", function () { 
	            var image = "../../Images/headMenuTestImage.png";return false; }); //控制文本不能被选中
	        if (o.data.length == 0) {
	            $(this.element).empty().append('<span class="ui-icon ui-icon-alert" style="float: left; margin: 3px 3px 0px 3px;"></span><p>' + o.noResultsText + '</p>');
	        } else {
	            $(this.element).empty().addClass("jui-table");
	            var tableId = $(this.element).attr("id");
	            $(this.element).append("<table id='" + tableId + "_tableSorter' width='" + o.tableWidth + "' height='" + o.tableHeight + "'><thead><tr></tr></thead><tbody></tbody></table><span id='dis_checkedItems' style='display:none;'></span>");
	            var dataArray = new Array();
	            for (d in o.data[0]) {
	                dataArray.push(d);
	            }
	            dataArray.sort(this._sortNum).reverse();
	            var g = 0;
	            for (var c in o.columns) {
	                $("#" + tableId + "_tableSorter thead tr").append("<td>" + c + "</td>");
	                g++;
	            }
	            for (var i = 0; i < o.data.length; i++) {
	                var v;
	                var str = "";
	                $("#" + tableId + "_tableSorter tbody").append("<tr></tr>"); //行
	                for (var c in o.columns) {
	                    v = o.columns[c];
	                    if ((typeof v == 'object') && v.constructor == Array) {
	                        for (var m = 0; m < v.length; m++) {
	                            str += v[m];
	                            for (var r = 0; r < dataArray.length; r++) {
	                                var t = "#" + dataArray[r];
	                                str = str.replace(t, o.data[i][dataArray[r]]);
	                            }
	                        }
	                    } else {
	                        for (var r = 0; r < dataArray.length; r++) {
	                            var t = "#" + dataArray[r];
	                            v = v.replace(t, o.data[i][dataArray[r]]);
	                        }
	                        str = v;
	                    }
	                    $("#" + tableId + "_tableSorter tbody tr:eq(" + i + ")").append("<td>" + str + "</td>"); //列 
	                    str = "";
	                }
                    //隐藏域保存行ID
	                $("#" + tableId + "_tableSorter tbody tr:eq(" + i + ") td:eq(0)").prepend("<span style='display:none;'>"+o.data[i]["ID"]+"</span>");
	            }
	            var table = $("#" + tableId + "_tableSorter");

	            var $tr = table.children("tbody").find('tr');

	            table.find("td").css({ "padding-top": "5px", "padding-bottom": "5px" });
	            table.find('tr').find('td:eq(0)').append("<img style='float:left;width:20px;height:20px;margin-left:5px;margin-right:5px;' src='" + image + "'/>");
	            //给tr设置LOCK、初始颜色,设置tr默认为没单击,设置背景色
	            $tr.attr('Lock', 'false').css('background-color', o.outColor);
	            //设置表格样式
	            $tr.each(function (i) {
	                var op = $(this); //tr对象
	                //鼠标悬停事件
	                op.hover(function () {
	                    if (o.onClick) {//如果开启点击
	                        if (op.attr('Lock') == 'false') { op.css('background-color', o.overColor); }
	                    }
	                    else {
	                        op.css('background-color', o.overColor);
	                    }
	                },
                    function () {
                        if (o.onClick) {
                            if (op.attr('Lock') == 'false') { op.css('background-color', o.outColor); }
                        }
                        else {
                            op.css('background-color', o.outColor);
                        }
                    });
	                //单击事件
	                if (o.onClick) {
	                    op.click(function () {
	                        $tr.css('background-color', o.outColor); //全部tr初始化未覆盖时候的颜色
	                        $tr.attr('Lock', 'false'); //全部tr初始化为未锁定状态
	                        op.attr('Lock', 'true'); //选中tr变更为锁定状态
	                        if (op.attr('Lock') == 'true') { op.css('background-color', o.onClickColor); } //选中tr颜色并更为选择状态颜色
	                    });
	                }
	            });
	            table.children("thead").find("td").css("background", "#094ab2");
	            table.find('tr:eq(0)').css("color", "#ffffff");
	        }
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