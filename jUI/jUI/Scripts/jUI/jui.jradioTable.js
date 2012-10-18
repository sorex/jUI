﻿// <reference path="../jquery-1.7.js" />
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
* Create date: 2012年10月16日 14:16:04
* Description: 给表格添加checkbox
* 注:调用前需要先调用jui.jtable.js生成表格
*/


(function ($, undefined) {
    $.widget("j.jradioTable",
	{
	    // default options
	    options: {
	        checkedItem:0//默认选中项
	    },

	    _create: function () {
	        this._jcheckTable();
	    },

	    _jcheckTable: function () {
	        var self = this,
            o = this.options;
	        var checkedItem = o.checkedItem;
	        var tableId = $(this.element).attr("id");
	        var table = $("#" + tableId + "_tableSorter");
	        $("#" + tableId + "_tableSorter").find("td:has(input)").remove();
	        $("#" + tableId + "_tableSorter tr").prepend("<td><input  type='radio'  name='radio_" + tableId + "'/></td>");
	        ////默认选中的项
	        for (var j = 0; j < table.find("tbody tr").length; j++) {
	            var rowId = table.find("tbody tr").eq(j).find("td:eq(1)").find("span").html();
	            if (checkedItem == rowId) {
	                table.find("tbody tr").eq(j).find("td:eq(0) input").attr("checked", 'checked');
	            }
	        }
	        ////补齐新增列样式
	        table.children("thead").find("td").css("background", "#094ab2");
	        table.find("td").css({ "padding-top": "5px", "padding-bottom": "5px" });	     
	    },

	    checked: function () {
	        var tableId = $(this.element).attr("id");
	        var table = $("#" + tableId + "_tableSorter");
	        var r;
	        for (var i = 0; i < table.find("tbody tr").length; i++) {
	            if (table.find("tbody tr").eq(i).find("input").attr("checked") == "checked") {
	                r = table.find("tbody tr:eq("+i+")").find("td").find("span").text();
	            }
	        }
	        return r;
	    },

	    _init: function () {
	        this._jcheckTable();
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