// <reference path="../jquery-1.7.js" />
/// <reference path="../jquery-ui-1.8.18.js" />
/// <reference path="jui.jtable.js" />

//JQuery UI table Plugin
/*
* jQuery UI table 
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*   jui.jtable.js
*/

/*
* Author: ZhangJian
* Create date: 2012年10月12日 14:04:45
* Description: 给表格添加checkbox
* 注:调用前需要先调用jui.jtable.js生成表格
*   可选项小于全选个数时候，全选按钮不可用
*   若默认选择项个数等于可选项个数，则其他项不可用
*   默认选择项个数不得大于可选项个数
*/


(function ($, undefined) {
    $.widget("j.jcheckTable",
	{
	    // default options
	    options: {
	        checkedItems: []//默认选择项
	        ,count: 0//限制可供勾选的checkBox的个数
            //,returnValue:""//指定勾选后返回的值类型(id,name,null)
	    },

	    _create: function () {
	        this._jcheckTable();
	    },

	    _jcheckTable: function () {
	        var self = this,
            o = this.options;
	        var count = o.count;//可勾选的数目
	        var checkedItems = o.checkedItems;
	        var tableId = $(this.element).attr("id");
	        var table = $("#" + tableId + "_tableSorter");
	        var checkAll = true;//判断全选
	        $("#" + tableId + "_tableSorter tr").find("td:has(input)").remove();
	        $("#" + tableId + "_tableSorter tr").prepend("<td><input id='checkbox_" + tableId + "'  type='checkbox'  name='checkbox_" + tableId + "' style='display:none;'/><span class='jui-checkbox'></span></td>");

	        //默认选中的项
	        if (checkedItems.length > 0) {
	            for (var i = 0; i < checkedItems.length; i++) {
	                for (var j = 0; j < table.find("tbody tr").length; j++) {
	                    var rowId = table.find("tbody tr").eq(i).find("td:eq(1)").find("span:eq(1)").html();
	                    if (checkedItems[i] == rowId) {
	                        table.find("tbody tr").eq(i).find("td:eq(0) input").attr("checked", 'true').next().addClass("jui-checkbox-checked");
	                    }
	                }
	            }
	        }

	        //全选
	        table.find("thead .jui-checkbox").click(function () {
	            if (checkAll) {
	                $("input[name='checkbox_" + tableId + "']").attr("checked", 'true').next().addClass("jui-checkbox-checked");
	                checkAll = false;
	            } else if (!checkAll) {
	                $("input[name='checkbox_" + tableId + "']").removeAttr("checked").next().removeClass("jui-checkbox-checked");
	                checkAll = true;
	            }
	        });

	        //补齐新增列样式
	        table.children("thead").find("td").css("background", "#094ab2");
	        table.find("td").css({ "padding-top": "5px", "padding-bottom": "5px" });

	        if (count > 0) {
	            //可选项小于全选个数时候，全选按钮不可用
	            if (o.count < table.children("tbody").find("tr").length) {
	                table.find("thead .jui-checkbox").hide();
	            }

	            //若默认选择项个数等于可选项个数，则其他项不可用
	            if (o.count == checkedItems.length) {
	                table.find("td input:not(:checked)").next().hide();
	            }

	            //限定可选个数
	            table.find("tbody .jui-checkbox").click(function () {
	                if ($(this).prev().is(":checked")) {
	                    $(this).removeClass('jui-checkbox-checked');
	                    $(this).prev().removeAttr("checked");
	                } else {
	                    $(this).addClass('jui-checkbox-checked');
	                    $(this).prev().attr("checked", 'true');
	                }
	                var listChecked = [];//选中项
	                var checkCounts = table.children("tbody").find("td input:checked").length;
	                if (checkCounts == count) {
	                    table.find("td input:not(:checked)").next().hide();
	                }
	                if (checkCounts < count) {
	                    table.find("td input:not(:checked)").next().show();
	                }
	                //可选项小于全选个数时候，全选按钮不可用
	                if (o.count < table.children("tbody").find("tr").length) {
	                    table.find("thead .jui-checkbox").hide();
	                }
	                for (var i = 0; i < table.find("tbody tr").length; i++) {
	                    if (table.find("tbody tr:eq(" + i + ")").find("input").is(':checked')) {
	                        listChecked.push(table.find("tbody tr:eq(" + i + ")").find("td:eq(1) span:eq(1)").html());
	                    }
	                }
	            });

	            //默认选择项个数不得大于可选项个数
	            if (o.count > 0 && checkedItems.length > o.count) {
	                $("#" + tableId + "_tableSorter").parent("div").empty().append("<span class='ui-icon ui-icon-alert' style='float: left; margin: 3px 3px 0px 3px;'></span><p>默认选中项个数不得大于可选项个数。</p>");
	            }
	        }
	    },

	    isChecked: function () {
	        var tableId = $(this.element).attr("id");
	        var table = $("#" + tableId + "_tableSorter");
	        var listChecked = [];
	        for (var i = 0; i < table.find("tbody tr").length; i++) {
	            if (table.find("tbody tr:eq(" + i + ")").find("input").is(':checked')) {
	                listChecked.push(table.find("tbody tr:eq(" + i + ")").find("td:eq(1) span:eq(1)").html());
	            }
	        }
	        return listChecked;
	    },

	    _init: function () {
	        //this._jcheckTable();
	    },

	    _setOption: function (key, value) {
	        if (value !== undefined || value != null)
	            this.options[key] = value;
	        else
	            return this.options[key];
	        this._jcheckTable();
	    },

	    _setOptions: function (options) {
	        var self = this;
	        $.each(options, function (key, value) {
	            self._setOption(key, value);
	        });
	        this._jcheckTable();

	    },

	    _destroy: function () {
	        var o = this.options;

	        $(this.element).empty();
	        $(this).empty();

	        return this;
	    }
	});

    $.extend($.j.jcheckTable, {
        version: "0.1.0"
    });
})(jQuery);