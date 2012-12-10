/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI tip Plugin
/*
* jQuery UI tip
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/


/*
* Author: Leidc
* Start date: 2012-09-27 16:30
* Description: 提示控件
* Finish date: 2012-09-28 14:30
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
	$.widget("jui.jtip",
	{
		options: {
			type: "nomal",
			positon: "left",
			width: "150px",
			content: "",
			autoshow: false
		},

		_create: function () {
			$(this.element).empty();
			var self = this,
			o = this.options;

			var arrowheadId, contentId;
			var tagid = this.element.attr("id");/*目标的id*/

			var arrowheadId = tagid + "_arrowhead";
			var contentId = tagid + "_content";

			switch (o.type) {
				case "nomal": /*正常情况*/
					switch (o.positon) {
						case "left":/*箭头朝西*/

							$("body").append("<div id=" + contentId + " class='jui-jitp-nomal-w-content' style='width:" + o.width + "'><span style='padding:3px'>" + o.content + "</span></div>");
							$("body").append("<div id=" + arrowheadId + " class='jui-jtip-w-arrowhead'></div>");
							break;
						case "bottom":/*箭头朝北*/

							$("body").append("<div id=" + contentId + " class='jui-jitp-nomal-n-content' style='width:" + o.width + "'><span style='padding:3px'>" + o.content + "</span></div>");
							$("body").append("<div id=" + arrowheadId + " class='jui-jtip-n-arrowhead'></div>");
							break;
					}
					break;


				case "success": /*成功情况*/
					switch (o.positon) {
						case "left":/*箭头朝西*/
						  
							$("body").append("<div id=" + contentId + " class='jui-jtip-success-w-content' style='width:" + o.width + "'><span class='ui-icon ui-icon-check' style='float: left; margin-left: 3px; margin-top: 3px; margin-right: 3px;'></span><span style='padding:3px'>" + o.content + "</span></div>");
							$("body").append("<div id=" + arrowheadId + " class='jui-jtip-w-arrowhead-success'></div>");
							break;
						case "bottom":/*箭头朝北*/

							$("body").append("<div id=" + contentId + " class='jui-jtip-success-n-content' style='width:" + o.width + "'><span class='ui-icon ui-icon-check' style='float: left; margin-left: 3px; margin-top: 3px; margin-right: 3px;'></span><span style='padding:3px'>" + o.content + "</span></div>");
							$("body").append("<div id=" + arrowheadId + " class='jui-jtip-n-arrowhead-success'></div>");
							break;
					}
					break;
				case "error": /*错误情况*/
					switch (o.positon) {
						case "left":/*箭头朝西*/

							$("body").append("<div id=" + contentId + " class='ui-state-error jui-jtip-error-w-content' style='width:" + o.width + "'><span class='ui-icon ui-icon-alert' style='float: left; margin-left: 3px; margin-top: 3px; margin-right: 3px;'></span><span style='padding:3px'>" + o.content + "</span></div>");
							$("body").append("<div id=" + arrowheadId + " class='jui-jtip-w-arrowhead-error'></div>");
							break;
						case "bottom":/*箭头朝北*/

							$("body").append("<div id=" + contentId + " class='ui-state-error  jui-jtip-error-n-content' style='width:" + o.width + "'><span class='ui-icon ui-icon-alert' style='float: left; margin-left: 3px; margin-top: 3px; margin-right: 3px;'></span><span style='padding:3px'>" + o.content + "</span></div>");
							$("body").append("<div id=" + arrowheadId + " class='jui-jtip-n-arrowhead-error'></div>");
							break;
					}

					break;


			}

			if (o.autoshow) {
				this._positon(o.positon, contentId, arrowheadId);
			} else if (o.autoshow == false) {
				$("#" + arrowheadId).css({ "filter": "alpha(opacity = 0)", "opacity": 0 }); //隐藏箭头
				$("#" + contentId).css({ "filter": "alpha(opacity = 0)", "opacity": 0 }); //隐藏内容 

				this._positon(o.positon, contentId, arrowheadId);

			}

		},

		show: function () { /*显示*/
			var self = this,
            o = this.options;
			var tagid = this.element.attr("id");/*目标的id*/
			//$("[id$=content]").stop();
			//$("[id=$arrowhead]").stop();
			var arrowheadId = tagid + "_arrowhead";
			var contentId = tagid + "_content";
			$("#" + contentId).stop();
			$("#" + arrowheadId).stop();
			$("#" + contentId).animate({ opacity: '1' }, 1000);
			$("#" + arrowheadId).animate({ opacity: '1' }, 1000);
			this._positon(o.positon, contentId, arrowheadId);
		},

		hide: function () { /*隐藏*/
			var self = this,
             o = this.options;

			var tagid = this.element.attr("id");/*目标的id*/
			var arrowheadId = tagid + "_arrowhead";
			var contentId = tagid + "_content";
			$("#" + contentId).stop();
			$("#" + arrowheadId).stop();
			$("#" + contentId).animate({ opacity: '0' }, 1000);
			$("#" + arrowheadId).animate({ opacity: '0' }, 1000);
		},

		refreshPositon: function () { /*刷新重定位*/
			var self = this,
            o = this.options;
			var tagid = this.element.attr("id");/*目标的id*/
			var arrowheadId = tagid + "_arrowhead";
			var contentId = tagid + "_content";

			this._positon(o.positon, contentId, arrowheadId);

		},
		_positon: function (positon, contentId, arrowheadId) {
			if (positon == "left") { //朝西定位

				$("#" + arrowheadId).position({
					of: this.element,
					my: "left middle",
					at: "right middle"
				});
				$("#" + contentId).position({
					of: this.element,
					my: "left middle",
					at: "right middle",
					offset: '6 0'
				});
			


			} else { //朝北定位

				$("#" + contentId).position({
					of: this.element,
					my: "center top",
					at: "center bottom",
					offset: '0 6'
				});

				$("#" + arrowheadId).position({
					of: this.element,
					my: "center top",
					at: "center bottom"
				});

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