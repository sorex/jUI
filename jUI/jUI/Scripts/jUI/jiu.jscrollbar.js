﻿/// <reference path="../jquery-1.7.js" />
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
	        handleBgColor: 'lightGray' //滑块背景色
			, handleInColor: 'darkGray'//鼠标移入滑块后背景色
			, buttonColor: 'silver'//按钮颜色
			, buttonClickColor: 'darkGray'//按钮点击后颜色
			, scrollWrapColor: 'silver'//滚动条背景色
            , scrollWidth:15//滚动条宽度
	    },

	    _create: function () {
	        this._jscrollbar();
	    },

	    _jscrollbar: function () {
	        var t = $(this.element); //目标元素，需要用到滚动条的div
	        var self = this, o = this.options;
	        var handlebgcolor = o.handleBgColor;
	        var handleincolor = o.handleInColor;
	        var buttonColor = o.buttonColor;
	        var buttonClickColor = o.buttonClickColor;
	        var scrollWrapColor = o.scrollWrapColor;
	        var scrollWidth = o.scrollWidth;
	        if (scrollWidth < 10 || scrollWidth > 40) {
	            scrollWidth = 20;
	        }
	        t.css({ 'overflow': 'hidden', 'position': 'relative' }); //隐藏溢出部分 
	        //如果目标元素内部没有内部div，则嵌套一个内部容器
	        if (t.find('.jui-jscrollbar-scroll-content').length == 0) {
	            t.children().wrapAll("<div class='jui-jscrollbar-scroll-content'></div>");
	        }
	        //#region垂直滚动条
	        t.append("<div class='jui-jscrollbar-slider-wrap-vertical' style='width:" + scrollWidth + "px;'>" +
		                    "<div class='jui-jscrollbar-slider-top' style='width:" + scrollWidth + "px;height:" + scrollWidth + "px;'>" +
                            "<span style='width:" + scrollWidth + "px;height:" + scrollWidth + "px;cursor:pointer;'></span>" +
                            "</div>" +
		                    "<div class='jui-jscrollbar-slider-vertical' style='margin-top:" + scrollWidth + "px;'></div>" +
		                    "<div class='jui-jscrollbar-slider-bottom' style='width:" + scrollWidth + "px;height:" + scrollWidth + "px;'>" +
                            "<span style='width:" + scrollWidth + "px;height:" + scrollWidth + "px;cursor:pointer;'></span>" +
                            "</div>" +
		                    "</div>"); //添加垂直滚动条外层div及滚动条  
	        //设置滚动条高度
	        t.find('.jui-jscrollbar-slider-wrap-vertical').height(t.height() - scrollWidth).css("background-color", scrollWrapColor);
            //#endregion
	        //#region平行滚动条 
	        t.append("<div class='jui-jscrollbar-slider-wrap-horizontal' style='height:" + scrollWidth + "px;'>" +
		                    "<div class='jui-jscrollbar-slider-left' style='width:" + scrollWidth + "px;height:" + scrollWidth + "px;'>" +
                            "<span style='width:" + scrollWidth + "px;height:" + scrollWidth + "px;cursor:pointer;'></span>" +
                            "</div>" +
		                    "<div class='jui-jscrollbar-slider-horizontal' style='margin-left:" + scrollWidth + "px;'></div>" +
		                    "<div class='jui-jscrollbar-slider-right' style='width:" + scrollWidth + "px;height:" + scrollWidth + "px;'>" +
                            "<span style='width:" + scrollWidth + "px;height:" + scrollWidth + "px;cursor:pointer;'></span>" +
                            "</div>" +
		                    "</div>"); //添加横向滚动条外层div及滚动条  
	        //设置滚动条宽度
	        t.find('.jui-jscrollbar-slider-wrap-horizontal').width(t.width() - scrollWidth).css("background-color", scrollWrapColor); ;
            //#endregion

	        t.find(".jui-jscrollbar-slider-wrap-vertical").bind("selectstart", function () { return false; }); //文本不得选中
	        t.find(".jui-jscrollbar-slider-wrap-horizontal").bind("selectstart", function () { return false; }); //文本不得选中
            //#region滚动条与内部容器高宽差
	        //比较内部容器高度与目标元素高度
	        var diff = t.find('.jui-jscrollbar-scroll-content').height() - t.height();
	        //比较内部容器宽度和目标元素宽度
	        var w_diff = t.find('.jui-jscrollbar-scroll-content').width() - t.width();
	        //保存高度差
	        t.data('diff', diff);
	        //保存宽度差
	        t.data('w_diff', w_diff)
	        var space_ = 3 * scrollWidth;//空白及按钮部分宽度总和
	        //#endregion

	        //如果需要垂直滚动条
	        if (diff > 0) {
	            var prop = diff / t.find('.jui-jscrollbar-scroll-content').height(); //高度差与内容层高度比例
	            var handleHeight = Math.round((1 - prop) * (t.height() - space_)); //计算滑块的高度
	            var sliderInitial = 100;
	            var a = true, b = true;
	            //设置滑动条
	            t.find('.jui-jscrollbar-slider-vertical').slider({
	                orientation: 'vertical',
	                min: 0,
	                max: 100,
	                range: 'min',
	                value: sliderInitial,
	                slide: function (event, ui) {
	                    if (a) {
	                        t.find('.jui-jscrollbar-slider-vertical').find("a").css("background", handleincolor).css("border", "0");
	                        a = false;
	                    }
	                    var topValue = -((100 - ui.value) * diff / 100);
	                    t.find('.jui-jscrollbar-scroll-content').css({ top: topValue }); //内容层随滑轮改变位置
	                },
	                change: function (event, ui) {
	                    if (b) {
	                        t.find('.jui-jscrollbar-slider-vertical').find("a").css("background", handleincolor).css("border", "0");
	                        b = false;
	                    }
	                    var topValue = -((100 - ui.value) * (t.find('.jui-jscrollbar-scroll-content').height() - t.height()) / 100); //重新计算超出高度
	                    t.find('.jui-jscrollbar-scroll-content').css({ top: topValue }); //内容层随滑轮改变位置   
	                }
	            });

	            //去除slider自带样式
	            t.find('.jui-jscrollbar-slider-vertical').removeClass("ui-widget-content").removeClass("ui-slider-vertical").css("cursor", "default");
	            t.find('.jui-jscrollbar-slider-vertical').find("a").removeClass("ui-state-default").removeClass("ui-state-hover")
				.removeClass("ui-state-active").removeClass("ui-slider").removeClass("ui-slider-handle").removeClass("ui-state-focus")
				.addClass("jui-jscrollbar-slider-vhandle").css("background-color", handlebgcolor).css("width", scrollWidth+"px");

	            //设置滑块层的高度和底边距，以使得滑块层中间位置正好处在滑块位置
	            t.find('.jui-jscrollbar-slider-vertical').find("a").css({ height: handleHeight, 'margin-bottom': -0.5 * handleHeight });
	            var origSliderHeight = t.height() - space_; //读取滚动条总长度
	            var sliderHeight = origSliderHeight - handleHeight-3; //获取滑块可移动范围长度
	            var sliderMargin = (origSliderHeight - sliderHeight) * 0.5 + scrollWidth-1; //获取滑块上下边距

	            if ($.browser.msie) {
	                t.find(".jui-jscrollbar-slider-vertical").css({ 'height': sliderHeight, 'top': sliderMargin}); //设置滑动层高度和上边距
	            } else {
	                t.find(".jui-jscrollbar-slider-vertical").css({ 'height': sliderHeight, 'margin-top': sliderMargin}); //设置滑动层高度和上边距                    
	            }

	            //点击滚动条非滑动范围时
	            $(".jui-jscrollbar-slider-wrap-vertical").mousedown(function (event) {
	                var offsetTop = t.find('.jui-jscrollbar-slider-vertical').offset().top; //获得滑动层定位
	                var clickValue = (event.pageY - offsetTop) * 100 / t.find('.jui-jscrollbar-slider-vertical').height(); //找到点击点，减去偏移量，计算点击处与滑动层高度百分比
	                t.find(".jui-jscrollbar-slider-vertical").slider("value", 100 - clickValue); //设置滑动层新的值
	            });

	            //#region设置滑块样式
	            t.find('.jui-jscrollbar-slider-vertical').find("a").mouseover(function () {
	                $(this).removeClass("ui-state-hover");
	                $(this).removeClass("ui-state-active").removeClass("ui-state-focus").removeClass("ui-widget-content");
	                $(this).css("background-color", handleincolor);
	            }).mouseout(function () {
	                $(this).css("background-color", handlebgcolor);
	            }).mousedown(function () {
	                $(this).css("background", handleincolor).css("border", "0");
	            }).mouseup(function () {
	                $(this).removeClass("ui-corner-all");
	                $(this).css("outline", "0");
	            });
                //#endregion
	            //#region支持鼠标滑轮滚动的代码
	            if ($.fn.mousewheel) {
	                t.unmousewheel(); //删除之前所有鼠标滑轮相关事件
	                t.mousewheel(function (event, delta) {
	                    var speed = Math.round(5000 / t.data('diff'));
	                    if (speed < 1) speed = 1;
	                    if (speed > 100) speed = 100;

	                    var sliderVal = $(this).find(".jui-jscrollbar-slider-vertical").slider("value"); //读取当前滚动条的值

	                    sliderVal += (delta * speed); //增加当前滑轮值

	                    $(this).find(".jui-jscrollbar-slider-vertical").slider("value", sliderVal); //为滚动条设置新值

	                    event.preventDefault(); //终止默认行为
	                });

	            }
	            var intervalId;
                //#region点击方向按钮事件
	            $('.jui-jscrollbar-slider-top').css("background-color", buttonColor);
	            $('.jui-jscrollbar-slider-top').mousedown(function (event) {
	                event.stopPropagation();
	                $(this).css("background", buttonClickColor);
	                intervalId = setInterval(function addfix() {
	                    var v = t.find(".jui-jscrollbar-slider-vertical").slider("value"); v += 1; t.find(".jui-jscrollbar-slider-vertical").slider("value", v);
	                }, 10);
	            }).mouseup(function () {
	                clearInterval(intervalId);
	                $(this).css("background", buttonColor);
	            });

	            $('.jui-jscrollbar-slider-bottom').css("background-color", buttonColor);
	            $('.jui-jscrollbar-slider-bottom').mousedown(function (event) {
	                event.stopPropagation();
	                $(this).css("background", buttonClickColor);
	                intervalId = setInterval(function addfix() {
	                    var v = t.find(".jui-jscrollbar-slider-vertical").slider("value"); v -= 1; t.find(".jui-jscrollbar-slider-vertical").slider("value", v);
	                }, 10);
	            }).mouseup(function () {
	                clearInterval(intervalId);
	                $(this).css("background", buttonColor);
	            });
                //#endregion
	        }
            //#endregion

	        var c = true, d = true;
	        //如果需要横向滚动条
	        if (w_diff > 0) {
	            var w_prop = w_diff / t.find('.jui-jscrollbar-scroll-content').width(); //宽度差与内容层宽度比例
	            var handleWidth = Math.round((1 - w_prop) * (t.width() - space_)); //计算滑块的宽度
	            var w_sliderInitial = 0;
	            //设置滑动条
	            t.find('.jui-jscrollbar-slider-horizontal').slider({
	                orientation: 'horizontal',
	                min: 0,
	                max: 100,
	                range: 'min',
	                value: w_sliderInitial,
	                slide: function (event, ui) {
	                    if (c) {
	                        t.find('.jui-jscrollbar-slider-horizontal').find("a").css("background", handleincolor).css("border", "0");
	                        c = false;
	                    }
	                    var leftValue = -((ui.value) * w_diff / 100);
	                    t.find('.jui-jscrollbar-scroll-content').css({ left: leftValue }); //内容层随滑轮改变位置
	                },
	                change: function (event, ui) {
	                    if (d) {
	                        t.find('.jui-jscrollbar-slider-horizontal').find("a").css("background", handleincolor).css("border", "0");
	                        d = false;
	                    }
	                    var leftValue = -((ui.value) * (t.find('.jui-jscrollbar-scroll-content').width() - t.width()) / 100); //重新计算超出高度
	                    t.find('.jui-jscrollbar-scroll-content').css({ left: leftValue }); //内容层随滑轮改变位置   
	                }
	            });

	            t.find('.jui-jscrollbar-slider-horizontal').find("div").removeClass().css("font-size", "small");
	            //去除slider自带样式
	            t.find('.jui-jscrollbar-slider-horizontal').removeClass("ui-widget-content").removeClass("ui-slider-horizontal").css("cursor", "default");
	            t.find('.jui-jscrollbar-slider-horizontal').find("a").removeClass("ui-state-default").removeClass("ui-state-hover")
				.removeClass("ui-state-active").removeClass("ui-slider").removeClass("ui-slider-handle").removeClass("ui-state-focus")
				.addClass("jui-jscrollbar-slider-hhandle").css("background-color", handlebgcolor).css("border", "0").css("outline", "0").css("z-index", "11").css("top", "0px").css("font-size", "small").css("height", scrollWidth+"px");

	            //	        设置滑块层的宽度和右边距，以使得滑块层中间位置正好处在滑块位置
	            t.find('.jui-jscrollbar-slider-horizontal').find("a").css({ width: handleWidth, 'margin-left': -0.5 * handleWidth });
	            var origSliderWidth = t.width() - space_; //读取滚动条总长度
	            var sliderWidth = origSliderWidth - handleWidth-3; //获取滑块可移动范围长度
	            var w_sliderMargin = (origSliderWidth - sliderWidth) * 0.5 + scrollWidth-1; //获取滑块左右边距
	            t.find(".jui-jscrollbar-slider-horizontal").css({ 'width': sliderWidth, 'margin-left': w_sliderMargin, 'height': scrollWidth }); //设置滑动层宽度和左边距

	            $(".jui-jscrollbar-slider-wrap-horizontal").mousedown(function (event) {//点击滚动条非滑动条范围时
	                var offsetLeft = t.find(".jui-jscrollbar-slider-horizontal").offset().left; //获得滑动层定位
	                var clickValue = (event.pageX - offsetLeft) * 100 / t.find(".jui-jscrollbar-slider-horizontal").width(); //找到点击点，减去偏移量，计算点击处与滑动层宽度百分比
	                $(this).find(".jui-jscrollbar-slider-horizontal").slider("value", clickValue); //设置滑动层新的值
	            });

	            //#region设置滑块样式
	            t.find('.jui-jscrollbar-slider-horizontal').find("a").mouseover(function () {
	                $(this).removeClass("ui-state-hover");
	                $(this).removeClass("ui-state-active").removeClass("ui-state-focus").removeClass("ui-widget-content");
	                $(this).css("background-color", handleincolor);
	            }).mouseout(function () {
	                $(this).css("background-color", handlebgcolor);
	            }).mousedown(function () {
	                $(this).css("background", handleincolor).css("border", "0");
	            }).mouseup(function () {
	                $(this).removeClass("ui-corner-all");
	                $(this).css("outline", "0");
	            });

                //#region点击方向按钮事件
	            $('.jui-jscrollbar-slider-left').css("background-color", buttonColor);
	            $('.jui-jscrollbar-slider-left').mousedown(function (event) {
	                event.stopPropagation();
	                $(this).css("background", buttonClickColor);
	                intervalId = setInterval(function addfix() {
	                    var v = t.find(".jui-jscrollbar-slider-horizontal").slider("value"); v -= 1; t.find(".jui-jscrollbar-slider-horizontal").slider("value", v);
	                }, 10);
	            }).mouseup(function () {
	                clearInterval(intervalId);
	                $(this).css("background", buttonColor);
	            });


	            $('.jui-jscrollbar-slider-right').css("background-color", buttonColor).css("top", "0px");
	            $('.jui-jscrollbar-slider-right').mousedown(function (event) {
	                event.stopPropagation();
	                $(this).css("background", buttonClickColor);
	                intervalId = setInterval(function addfix() {
	                    var v = t.find(".jui-jscrollbar-slider-horizontal").slider("value"); v += 1; t.find(".jui-jscrollbar-slider-horizontal").slider("value", v);
	                }, 10);
	            }).mouseup(function () {
	                clearInterval(intervalId);
	                $(this).css("background", buttonColor);
	            });
                //#endregion
                //#endregion
	        }

	    },

	    _setOption: function (key, value) {
	        if (value !== undefined || value != null)
	            this.options[key] = value;
	        else
	            return this.options[key];
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