/// <reference path="../jquery-1.7.js" />
/// <reference path="../jquery-ui-1.8.18.js" />
/// <reference path="jquery.mousewheel.js" />

//JQuery UI datapager Plugin
/*
* jQuery UI DataPager 
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/

/*
* Author: ZhangJian
* Create date: 2012年9月7日 14:16:34
* Description: 滚动条
*/

(function ($, undefined) {
    $.widget("j.jscrollbar",
	{
	    // default options
	    options: {
	        //btnDefault: '#bababa'//按钮颜色
			//, btnActive: '#e2e2e2'//按钮点击后颜色
            //, btnHover: '#d4d4d4'//覆盖按钮后颜色
            //, btnBorder: '#666666'//按钮边框颜色 

	        //, handleDefault: '#bababa' //滑块背景色
            //, handleActive: '#e2e2e2'//滑块点击后颜色
			//, handleHover: '#d4d4d4'//鼠标移入滑块后背景色

			//, scrollDefault: '#f3f3f3'//滚动条背景色
            //, scrollBorder: '#000000'//滚动条边框颜色 
            //, scrollWidth: 15//滚动条宽度
            //, showWidth: 200//显示宽度
            //, showHeight:200//显示高度
            //, outDivBorder: '#062f72'//内容层边框颜色
	    },

	    _create: function () {
	        this._jscrollbar();
	    },

	    _jscrollbar: function () {
	        var t = $(this.element); //目标元素，需要用到滚动条的div
	        var t_id = t.attr("id");
	        var self = this, o = this.options;
	        var showWidth = o.showWidth;
	        var showHeight = o.showHeight;

	        var handlebgcolor = o.handleDefault;
	        var handleincolor = o.handleHover;
	        var handleActive = o.handleActive;

	        var buttonColor = o.btnDefault;
	        var buttonClickColor = o.btnActive;
	        var buttonHover = o.btnHover;
	        var buttonBorder = o.btnBorder;

	        var scrollWrapColor = o.scrollDefault;
	        var scrollBorder = o.scrollBorder;
	        var scrollWidth = o.scrollWidth;

	        var outDivBorder = o.outDivBorder;


	        if (scrollWidth < 0 || scrollWidth > 40) {
	            scrollWidth = 20;
	        }
	        if ($("#"+t_id+"sliderWrapVertical").length > 0) {
	            $("#" + t_id + "sliderWrapVertical").remove();
	        }
	        if ($("#" + t_id + "sliderWrapHorizontal").length > 0) {
	            $("#" + t_id + "sliderWrapHorizontal").remove();
	        }
	        t.addClass("jui-jscrollbar-scroll-outDiv");
	        t.css("border", "1px solid " + outDivBorder).css("width",showWidth+"px").css("height",showHeight+"px");
	        //如果目标元素内部没有内部div，则嵌套一个内部容器
	        if (t.find("#" + t_id + "scrollContent").length == 0) {
	            var t_content = t.html();
	            t.html("");
	            t.append("<div id='" + t_id + "scrollContent' class='jui-jscrollbar-scroll-content'></div>");
	            $("#" + t_id + "scrollContent").html(t_content);
	            $("#" + t_id + "scrollContent").css("margin", "0px " + (scrollWidth + 5) + "px " + (scrollWidth + 5) + "px 5px");
	        }
	        //#region滚动条与内部容器高宽差
	        //比较内部容器高度与目标元素高度
	        var diff = $("#" + t_id + "scrollContent").height() - t.height();
	        //比较内部容器宽度和目标元素宽度
	        var w_diff = $("#" + t_id + "scrollContent").width() - t.width();
	        //保存高度差
	        t.data('diff', diff);
	        //保存宽度差
	        t.data('w_diff', w_diff)
	        var space_ = 2 * scrollWidth;//空白及按钮部分宽度总和
	        //#endregion
	        if (diff > 0) {
	            //#region垂直滚动条
	            t.append("<div id='" + t_id + "sliderWrapVertical' class='jui-jscrollbar-slider-wrap-vertical' style='width:" + scrollWidth + "px;'>" +
                                "<div id='"+t_id+"sliderTop' class='jui-jscrollbar-slider-top' style='width:" + (scrollWidth - 2) + "px;height:" + (scrollWidth - 1) + "px;'>" +
                                "</div>" +
                                "<div id='"+t_id+"sliderVertical' class='jui-jscrollbar-slider-vertical' style='margin-top:" + scrollWidth + "px;'></div>" +
                                "<div id='"+t_id+"sliderBottom' class='jui-jscrollbar-slider-bottom' style='width:" + (scrollWidth - 2) + "px;height:" + (scrollWidth - 1) + "px;'>" +
                                "</div>" +
                                "</div>"); //添加垂直滚动条外层div及滚动条  
	            var wap_height;
	            //设置滚动条高度
	            if (w_diff > 0) {//横竖滚动条都有
	                wap_height = t.height() -3;
	            } else {
	                space_ = 2 * scrollWidth-1;
	                wap_height = t.height() - 2;
	            }
	            t.css("padding-right", scrollWidth+5);
	            $("#"+t_id+"sliderWrapVertical").height(wap_height).css("background-color", scrollWrapColor).css("border", "1px solid " + scrollBorder);
	            //#endregion
	        }
	        if (w_diff > 0) {
	            //#region平行滚动条 
	            t.append("<div id='"+t_id+"sliderWrapHorizontal' class='jui-jscrollbar-slider-wrap-horizontal' style='height:" + scrollWidth + "px;'>" +
                                "<div id='"+t_id+"sliderLeft' class='jui-jscrollbar-slider-left' style='width:" + (scrollWidth - 1) + "px;height:" + (scrollWidth - 2) + "px;'>" +
                                "</div>" +
                                "<div id='"+t_id+"sliderHorizontal' class='jui-jscrollbar-slider-horizontal' style='margin-left:" + scrollWidth + "px;'></div>" +
                                "<div id='"+t_id+"sliderRight' class='jui-jscrollbar-slider-right' style='width:" + (scrollWidth - 1) + "px;height:" + (scrollWidth - 2) + "px;'>" +
                                "</div>" +
                                "</div>"); //添加横向滚动条外层div及滚动条  
	            var wap_width;
	            //设置滚动条宽度
	            if (diff > 0) {//横竖滚动条都有
	                wap_width = t.width() +2;
	            } else {
	                space_ = 2 * scrollWidth - 1;
	                wap_width = t.width()-2;
	            }
	            t.css("padding-bottom", scrollWidth);
	            $("#"+t_id+"sliderWrapHorizontal").width(wap_width).css("background-color", scrollWrapColor).css("border", "1px solid " + scrollBorder);
	            //#endregion
	        }
	        $("#" + t_id + "sliderWrapVertical").bind("selectstart", function () { return false; }); //文本不得选中
	        $("#" + t_id + "sliderWrapHorizontal").bind("selectstart", function () { return false; }); //文本不得选中

	        //如果需要垂直滚动条
	        if (diff > 0) {
	            var prop = diff / $("#"+t_id+"scrollContent").height(); //高度差与内容层高度比例
	            var handleHeight = Math.round((1 - prop) * (t.height() - space_)); //计算滑块的高度
	            if (handleHeight < 10) {
	                handleHeight = 10;
	            }
	            var sliderInitial = 100;
	            var a = true, b = true;
	            //设置滑动条
	            $("#"+t_id+"sliderVertical").slider({
	                orientation: 'vertical',
	                min: 0,
	                max: 100,
	                range: 'min',
	                value: sliderInitial,
	                slide: function (event, ui) {
	                    if (a) {
	                        $("#" + t_id + "sliderVertical").find("a").css("background", handleincolor);
	                        a = false;
	                    }
	                    var topValue = -((100 - ui.value) * diff / 100);
	                    $("#" + t_id + "scrollContent").css({ top: topValue }); //内容层随滑轮改变位置
	                },
	                change: function (event, ui) {
	                    if (b) {
	                        $("#" + t_id + "sliderVertical").find("a").css("background", handleincolor).css("border", "0");
	                        b = false;
	                    }
	                    var topValue = -((100 - ui.value) * ($("#" + t_id + "scrollContent").height() - t.height()) / 100); //重新计算超出高度
	                    $("#" + t_id + "scrollContent").css({ top: topValue }); //内容层随滑轮改变位置   
	                }
	            });

	            //去除slider自带样式
	            $("#" + t_id + "sliderVertical").removeClass("ui-widget-content").removeClass("ui-slider-vertical");
	            $("#" + t_id + "sliderVertical").find("a").removeClass("ui-state-default").removeClass("ui-state-hover")
				.removeClass("ui-state-active").removeClass("ui-slider").removeClass("ui-slider-handle").removeClass("ui-state-focus")
				.addClass("jui-jscrollbar-slider-vhandle").css("background-color", handlebgcolor).css("width", scrollWidth+"px");

	            //设置滑块层的高度和底边距，以使得滑块层中间位置正好处在滑块位置
	            $("#" + t_id + "sliderVertical").find("a").css({ height: handleHeight, 'margin-bottom': -0.5 * handleHeight });
	            var origSliderHeight = t.height() - space_; //读取滚动条总长度
	            var sliderHeight = origSliderHeight - handleHeight-5; //获取滑块可移动范围长度
	            var sliderMargin = (origSliderHeight - sliderHeight) * 0.5 + scrollWidth-1; //获取滑块上下边距

	            if ($.browser.msie) {
	                $("#" + t_id + "sliderVertical").css({ 'height': sliderHeight, 'top': sliderMargin }); //设置滑动层高度和上边距
	            } else {
	                $("#" + t_id + "sliderVertical").css({ 'height': sliderHeight, 'margin-top': sliderMargin }); //设置滑动层高度和上边距                    
	            }

	            //点击滚动条非滑动范围时
	            $("#"+t_id+"sliderWrapVertical").mousedown(function (event) {
	                var offsetTop = $("#" + t_id + "sliderVertical").offset().top; //获得滑动层定位
	                var clickValue = (event.pageY - offsetTop) * 100 / $("#" + t_id + "sliderVertical").height(); //找到点击点，减去偏移量，计算点击处与滑动层高度百分比
	                $("#" + t_id + "sliderVertical").slider("value", 100 - clickValue); //设置滑动层新的值
	            });

	            //#region设置滑块样式
	            $("#" + t_id + "sliderVertical").find("a").mouseover(function () {
	                $(this).removeClass("ui-state-hover");
	                $(this).removeClass("ui-state-active").removeClass("ui-state-focus").removeClass("ui-widget-content");
	                $(this).css("background-color", handleincolor);
	            }).mouseout(function () {
	                $(this).css("background-color", handlebgcolor);
	            }).mousedown(function () {
	                $(this).css("background", handleincolor).css("border", "0");
	                $(this).css("background-color", handleActive);
	            }).mouseup(function () {
	                $(this).removeClass("ui-corner-all");
	                $(this).css("outline", "0");
	                $(this).css("background-color", handleincolor);
	            });
                //#endregion
	            //#region支持鼠标滑轮滚动的代码
	            if ($.fn.mousewheel) {
	                t.unmousewheel(); //删除之前所有鼠标滑轮相关事件
	                t.mousewheel(function (event, delta) {
	                    var speed = Math.round(5000 / t.data('diff'));
	                    if (speed < 1) speed = 1;
	                    if (speed > 100) speed = 100;
	                    var sliderVal = $("#" + t_id + "sliderVertical").slider("value"); //读取当前滚动条的值
	                    sliderVal += (delta * speed); //增加当前滑轮值
	                    $("#" + t_id + "sliderVertical").slider("value", sliderVal); //为滚动条设置新值
	                    event.preventDefault(); //终止默认行为
	                });

	            }
	            var intervalId;
                //#region点击方向按钮事件
	            $("#"+t_id+"sliderTop").css("background-color", buttonColor).css("border", "1px solid " + buttonBorder);
	            $("#" + t_id + "sliderTop").mouseover(function () {
	                $(this).css("background", buttonHover);
	            }).mouseout(function () {
	                $(this).css("background", buttonColor);
	            });
	            $("#" + t_id + "sliderTop").mousedown(function (event) {
	                $(this).css("background", buttonClickColor);
	                event.stopPropagation();
	                intervalId = setInterval(function addfix() { var v = $("#" + t_id + "sliderVertical").slider("value"); v += 1; $("#" + t_id + "sliderVertical").slider("value", v); }, 10);
	            }).mouseup(function () {
	                $(this).css("background", buttonHover);
	                clearInterval(intervalId);
	            });

	            $("#"+t_id+"sliderBottom").css("background-color", buttonColor).css("border", "1px solid " + buttonBorder);
	            $("#" + t_id + "sliderBottom").mouseover(function () {
	                $(this).css("background", buttonHover);
	            }).mouseout(function () {
	                $(this).css("background", buttonColor);
	            });
	            $("#" + t_id + "sliderBottom").mousedown(function (event) {
	                event.stopPropagation();
	                $(this).css("background", buttonClickColor);
	                intervalId = setInterval(function addfix() { var v = $("#" + t_id + "sliderVertical").slider("value"); v -= 1; $("#" + t_id + "sliderVertical").slider("value", v); }, 10);
	            }).mouseup(function () {
	                clearInterval(intervalId);
	                $(this).css("background", buttonHover);
	            });
                //#endregion
	        }
            //#endregion

	        var c = true, d = true;
	        //如果需要横向滚动条
	        if (w_diff > 0) {
	            var w_prop = w_diff / $("#"+t_id+"scrollContent").width(); //宽度差与内容层宽度比例
	            var handleWidth = Math.round((1 - w_prop) * (t.width() - space_)); //计算滑块的宽度
	            var w_sliderInitial = 0;
	            //设置滑动条
	            $("#" + t_id + "sliderHorizontal").slider({
	                orientation: 'horizontal',
	                min: 0,
	                max: 100,
	                range: 'min',
	                value: w_sliderInitial,
	                slide: function (event, ui) {
	                    if (c) {
	                        $("#"+t_id+"sliderHorizontal").find("a").css("background", handleincolor).css("border", "0");
	                        c = false;
	                    }
	                    var leftValue = -((ui.value) * w_diff / 100);
	                    $("#" + t_id + "scrollContent").css({ left: leftValue }); //内容层随滑轮改变位置
	                },
	                change: function (event, ui) {
	                    if (d) {
	                        $("#" + t_id + "sliderHorizontal").find("a").css("background", handleincolor).css("border", "0");
	                        d = false;
	                    }
	                    var leftValue = -((ui.value) * ($("#" + t_id + "scrollContent").width() - t.width()) / 100); //重新计算超出高度
	                    $("#" + t_id + "scrollContent").css({ left: leftValue }); //内容层随滑轮改变位置   
	                }
	            });

	            //去除slider自带样式
	            $("#" + t_id + "sliderHorizontal").removeClass("ui-widget-content").removeClass("ui-slider-horizontal");
	            $("#" + t_id + "sliderHorizontal").find("a").removeClass("ui-state-default").removeClass("ui-state-hover")
				.removeClass("ui-state-active").removeClass("ui-slider").removeClass("ui-slider-handle").removeClass("ui-state-focus")
				.addClass("jui-jscrollbar-slider-hhandle").css("background-color", handlebgcolor).css("height", scrollWidth+"px");

	            //	        设置滑块层的宽度和右边距，以使得滑块层中间位置正好处在滑块位置
	            $("#" + t_id + "sliderHorizontal").find("a").css({ width: handleWidth, 'margin-left': -0.5 * handleWidth });
	            var origSliderWidth = t.width() - space_; //读取滚动条总长度
	            var sliderWidth,w_sliderMargin;
	            if (w_diff > 0 && diff > 0) {
	                sliderWidth = origSliderWidth - handleWidth; //获取滑块可移动范围长度
	                w_sliderMargin = (origSliderWidth - sliderWidth) * 0.5 + scrollWidth+1; //获取滑块左右边距
	            } else {
	                sliderWidth = origSliderWidth - handleWidth - 5; //获取滑块可移动范围长度
	                w_sliderMargin = (origSliderWidth - sliderWidth) * 0.5 + scrollWidth - 2; //获取滑块左右边距
	            }
	            $("#" + t_id + "sliderHorizontal").css({ 'width': sliderWidth, 'margin-left': w_sliderMargin, 'height': scrollWidth }); //设置滑动层宽度和左边距

	            $("#"+t_id+"sliderWrapHorizontal").mousedown(function (event) {//点击滚动条非滑动条范围时
	                var offsetLeft = $("#" + t_id + "sliderHorizontal").offset().left; //获得滑动层定位
	                var clickValue = (event.pageX - offsetLeft) * 100 / $("#" + t_id + "sliderHorizontal").width(); //找到点击点，减去偏移量，计算点击处与滑动层宽度百分比
	                $("#" + t_id + "sliderHorizontal").slider("value", clickValue); //设置滑动层新的值
	            });

	            //#region设置滑块样式
	            $("#" + t_id + "sliderHorizontal").find("a").mouseover(function () {
	                $(this).removeClass("ui-state-hover");
	                $(this).removeClass("ui-state-active").removeClass("ui-state-focus").removeClass("ui-widget-content");
	                $(this).css("background-color", handleincolor);
	            }).mouseout(function () {
	                $(this).css("background-color", handlebgcolor);
	            }).mousedown(function () {
	                $(this).css("background", handleActive).css("border", "0");
	            }).mouseup(function () {
	                $(this).removeClass("ui-corner-all");
	                $(this).css("outline", "0");
	                $(this).css("background-color", handleincolor);
	            });

                //#region点击方向按钮事件
	            $("#"+t_id+"sliderLeft").css("background-color", buttonColor).css("border", "1px solid " + buttonBorder);
	            $("#" + t_id + "sliderLeft").mouseover(function () {
	                $(this).css("background", buttonHover);
	            }).mouseout(function () {
	                $(this).css("background", buttonColor);
	            });
	            $("#" + t_id + "sliderLeft").mousedown(function (event) {
	                event.stopPropagation();
	                $(this).css("background", buttonClickColor);
	                intervalId = setInterval(function addfix() { var v = $("#" + t_id + "sliderHorizontal").slider("value"); v -= 1; $("#" + t_id + "sliderHorizontal").slider("value", v); }, 10);
	            }).mouseup(function () {
	                clearInterval(intervalId);
	                $(this).css("background", buttonHover);
	            });


	            $("#"+t_id+"sliderRight").css("background-color", buttonColor).css("border", "1px solid " + buttonBorder);
	            $("#" + t_id + "sliderRight").mousedown(function (event) {
	                event.stopPropagation();
	                $(this).css("background", buttonClickColor);
	                intervalId = setInterval(function addfix() { var v = $("#" + t_id + "sliderHorizontal").slider("value"); v += 1; $("#" + t_id + "sliderHorizontal").slider("value", v); }, 10);
	            }).mouseup(function () {
	                clearInterval(intervalId);
	                $(this).css("background", buttonHover);
	            });
	            $("#" + t_id + "sliderRight").mouseover(function () {
	                $(this).css("background", buttonHover);
	            }).mouseout(function () {
	                $(this).css("background", buttonColor);
	            });
                //#endregion
	            //#endregion
                
	            if (diff > 0 && w_diff > 0) {
	                t.append("<div style='width:" + (scrollWidth + 3) + "px;height:" + (scrollWidth + 3) + "px;background-color:" + scrollWrapColor + ";top:" +
                        $("#" + t_id + "sliderWrapVertical").height() + "px;left:" + $("#"+t_id+"sliderWrapHorizontal").width() + "px;position:absolute;'></div>");
	            }
	        }

	    },

	    _setOption: function (key, value) {
	        if (value !== undefined || value != null)
	            this.options[key] = value;
	        else
	            return this.options[key];
	        this._jscrollbar();
	    },

	    _setOptions: function (options) {
	        var self = this, refresh = false;
	        $.each(options, function (key, value) {
	            self._setOption(key, value);
	        });
	    },

	    _destroy: function () {
	        var o = this.options;

	        $(this.element).empty();
	        $(this).empty();

	        return this;
	    }
	});

    $.extend($.j.jdatapager, {
        version: "0.1.0"
    });
})(jQuery);