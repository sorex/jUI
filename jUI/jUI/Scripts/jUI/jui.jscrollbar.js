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

	        btnDefault: '#f3f3f3'//按钮颜色(less文件中已定义)
			, btnActive: '#f3f3f3'//按钮点击后颜色(less文件中已定义)
            , btnHover: '#f3f3f3'//覆盖按钮后颜色(less文件中已定义)

            , btnBorder: '#f3f3f3'//按钮边框颜色       

            , btnWidth: 12//箭头按钮宽度
            , btnHeight: 12//箭头按钮高度

	        , handleDefault: '#bababa' //滑块背景色
            , handleActive: '#666666'//滑块点击后颜色
			, handleHover: '#cccccc'//鼠标移入滑块后背景色

			, scrollDefault: '#666666'//滚动条背景色
            , scrollBorder: '#f3f3f3'//滚动条边框颜色 

            , outDivBorder: '#f3f3f3'//内容层边框颜色
            , showWidth: 300//显示宽度
            , showHeight: 300//显示高度

            , sliderBarWidth: 6//滑块宽度
            , scrollWidth: 2//滚动条宽度
            , borderRadius: 8//圆角
	        //*****btnBackground:url(...)//四个方向按钮背景图片*****
	        //*****scrollBackground:url(...)//滚动条背景图片*****
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
	        var btnWidth = o.btnWidth;
	        var btnHeight = o.btnHeight;

	        var scrollWrapColor = o.scrollDefault;
	        var scrollBorder = o.scrollBorder;
	        var outDivBorder = o.outDivBorder;

	        var scrollWidth = o.scrollWidth;
	        var borderRadius = o.borderRadius;
	        var sliderBarWidth = o.sliderBarWidth;

	        if (scrollWidth < 0 || scrollWidth > 40) {
	            scrollWidth = 20;
	        }
	        t.addClass("jui-jscrollbar-scroll-content ");
	        var t_w = t.width();
	        var t_h = t.height();
	        if ($("#" + t_id + "sliderWrapVertical").length > 0) {
	            $("#" + t_id + "sliderWrapVertical").remove();
	        }
	        if ($("#" + t_id + "sliderWrapHorizontal").length > 0) {
	            $("#" + t_id + "sliderWrapHorizontal").remove();
	        }

	        if ($("#" + t_id + "containerDiv").length == 0) {
	            t.wrap("<div id='" + t_id + "containerDiv'></div>");
	            $("#" + t_id + "containerDiv").addClass("jui-jscrollbar-scroll-containerDiv");
	        }
	        $("#" + t_id + "containerDiv").css({ "width": showWidth, "height": showHeight });

	        if ($("#" + t_id + "outDiv").length == 0) {
	            $("#" + t_id + "containerDiv").wrap("<div id='" + t_id + "outDiv' style='position:relative;margin:5px 5px 5px 5px;'></div>");
	        }
	        $("#" + t_id + "outDiv").css({ "border": "1px solid " + outDivBorder, "width": showWidth + scrollWidth + 3, "height": showHeight + scrollWidth + 3, "border-radius": borderRadius + "px" });

	        if ($("#" + t_id + "sliderWrapVertical").length == 0) {
	            $("#" + t_id + "outDiv").append("<div id='" + t_id + "sliderWrapVertical'></div>");
	            $("#" + t_id + "sliderWrapVertical").addClass("jui-jscrollbar-scroll-sliderWrapVertical");
	        }
	        $("#" + t_id + "sliderWrapVertical").css({ "left": showWidth + 0.5 * btnWidth, "width": scrollWidth, "height": showHeight, "border": "1px solid " + scrollBorder, "border-radius": borderRadius + "px", "background-color": scrollWrapColor });
	        if ($("#" + t_id + "sliderWrapHorizontal").length == 0) {
	            $("#" + t_id + "outDiv").append("<div id='" + t_id + "sliderWrapHorizontal'></div>");
	            $("#" + t_id + "sliderWrapHorizontal").addClass("jui-jscrollbar-scroll-sliderWrapHorizontal");
	        }
	        $("#" + t_id + "sliderWrapHorizontal").css({ "top": showHeight + 0.5 * btnWidth, "width": showWidth, "height": scrollWidth, "border": "1px solid " + scrollBorder, "border-radius": borderRadius + "px", "background-color": scrollWrapColor });
	        //比较内部容器高度与目标元素高度
	        var diff = t_h - showHeight;
	        //比较内部容器宽度和目标元素宽度
	        var w_diff = t_w - showWidth;
	        //保存高度差
	        t.data('diff', diff);
	        //保存宽度差
	        t.data('w_diff', w_diff);
	        //按钮部分宽度总和
	        var space_ = 2 * (btnHeight+2);
            //切换按钮样式
	        var changeBtnCss = function (theA) {
	            var inbtn = false, isdown = false;
	            var slider_a = theA;
	            slider_a.mouseover(function () {
	                inbtn = true;
	                $(this).css({ "border": 0, "outline-color": "transparent" });
	                isdown ? $(this).css("background-color", handleActive) : $(this).css("background-color", handleincolor);
	            }).mouseout(function () {
	                inbtn = false;
	                isdown ? $(this).css("background-color", handleActive) : $(this).css("background-color", handlebgcolor);
	            }).mousedown(function () {
	                isdown = true;
	                $(this).css({ "background-color": handleActive, "outline-color": "transparent" });
	            }).mouseup(function () {
	                isdown = false;
	                $(this).css({ "background-color": handleincolor, "outline-color": "transparent" });
	            });
	            slider_a.focusout(function () {
	                $(this).css("background-color", handlebgcolor);
	            });
	            $(document).mouseup(function () {
	                isdown = false;
	                inbtn ? slider_a.css("background-color", handleincolor) : slider_a.css("background-color", handlebgcolor);
	            });
	        };

            //#region 垂直滚动条 
	        if (diff > 0) {
	            $("#" + t_id + "sliderWrapVertical").show();
	            if (w_diff <= 0) {
	                $("#" + t_id + "outDiv").css("height", $("#" + t_id + "sliderWrapVertical").height() + 2);
	            }
	            $("#" + t_id + "sliderWrapVertical").append("<div id='" + t_id + "sliderTop'>" +
                    "<span id='" + t_id + "top_span' class='jui-jscrollbar-scroll-top_span'></span>" +
                    "</div><div id='" + t_id + "sliderVertical'></div><div id='" + t_id + "sliderBottom'>" +
                    "<span id='" + t_id + "bottom_span' class='jui-jscrollbar-scroll-bottom_span'></span>" +
                    "</div>");
	            $("#" + t_id + "top_span").css({ "margin-left": 0.5 * (btnWidth - 10), "cursor": "pointer" });
	            $("#" + t_id + "bottom_span").css({ "margin-left": 0.5 * (btnWidth - 10), "cursor": "pointer" });
	            $("#" + t_id + "sliderTop").css({ "margin-left": 0.5 * (scrollWidth-2 - btnWidth), "width": btnWidth, "height": btnHeight, "border": "1px solid " + buttonBorder, "border-radius": borderRadius + "px" });
	            $("#" + t_id + "sliderVertical").css({ "width": scrollWidth - 2, "position": "absolute" });
	            $("#" + t_id + "sliderBottom").css({"margin-left": 0.5 * (scrollWidth-2 - btnWidth), "position": "absolute", "bottom": "0", "width": btnWidth, "height": btnHeight, "border": "1px solid " + buttonBorder, "border-radius": borderRadius + "px" });
	            
	            var prop = diff / t_h; //高度差与内容层高度比例
	            var handleHeight = Math.round((1 - prop) * (showHeight - space_)); //计算滑块的高度
	            var sliderInitial = 100;
	            var a = true, b = true;
	            //#region设置滑动条
	            $("#"+t_id+"sliderVertical").slider({
	                orientation: 'vertical',
	                min: 0,
	                max: 100,
	                range: 'min',
	                value: sliderInitial,
	                slide: function (event, ui) {
	                    if (a) {
	                        $("#" + t_id + "sliderVertical").find("a").css("border", "0");
	                        a = false;
	                    }
	                    var topValue = -((100 - ui.value) * diff / 100);
	                    t.css("top",topValue);
	                },
	                change: function (event, ui) {
	                    if (b) {
	                        $("#" + t_id + "sliderVertical").find("a").css("border", "0");
	                        b = false;
	                    }
	                    var topValue = -((100 - ui.value) * (t.height() - showHeight) / 100); //重新计算超出高度
	                    t.css("top",topValue);
	                }
	            });
	            //#endregion

	            //#region 调节滑块样式
	            $("#" + t_id + "sliderVertical").find("a").removeClass("ui-state-default").css({ "cursor": "pointer", "width": sliderBarWidth + "px", "background-color": handlebgcolor, "margin-left": (scrollWidth - sliderBarWidth) * 0.5 + "px" });
	            $("#" + t_id + "sliderVertical").removeClass("ui-slider-vertical").removeClass("ui-widget-content");

	            //设置滑块层的高度和底边距，以使得滑块层中间位置正好处在滑块位置
	            $("#" + t_id + "sliderVertical").find("a").css({ 'height': handleHeight, 'margin-bottom': -0.5 * handleHeight });
	            var origSliderHeight = showHeight - space_; //读取滚动条总长度
	            var sliderHeight = origSliderHeight - handleHeight; //获取滑块可移动范围长度
	            var sliderMargin = 0.5 * handleHeight; //获取滑块上下边距
	            if ($.browser.msie) {
	                $("#" + t_id + "sliderVertical").css({ 'height': sliderHeight, 'top': sliderMargin }); //设置滑动层高度和上边距
	            } else {
	                $("#" + t_id + "sliderVertical").css({ 'height': sliderHeight, 'margin-top': sliderMargin }); //设置滑动层高度和上边距                    
	            }
                //#endregion

	            //#region按钮样式切换
	            changeBtnCss($("#" + t_id + "sliderVertical").find("a"));
	            //#endregion

                //#region点击滑动层外部空白区域
	            $("#" + t_id + "sliderVertical").mousedown(function (event) {
	                event.stopPropagation();
	            });
	            $("#" + t_id + "sliderWrapVertical").mousedown(function (event) {
	                var offsetTop = $("#" + t_id + "sliderVertical").offset().top; //获得滑动层定位
	                var clickValue = (event.pageY - offsetTop) * 100 / $("#" + t_id + "sliderVertical").height(); //找到点击点，减去偏移量，计算点击处与滑动层高度百分比
	                $("#" + t_id + "sliderVertical").slider("value", 100 - clickValue); //设置滑动层新的值
	            });
	            //#endregion

                //#region支持鼠标滚轮事件
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
	            //#endregion

                //#region垂直滚动条按钮点击事件
	            var intervalId;
	            $("#" + t_id + "sliderTop").css("background-color", buttonColor).css("border", "1px solid " + buttonBorder);
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
	            $("#" + t_id + "sliderBottom").css("background-color", buttonColor).css("border", "1px solid " + buttonBorder);
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

            //#region 水平滚动条
	        if (w_diff > 0) {
	            $("#" + t_id + "sliderWrapHorizontal").show();
	            if (diff <= 0) {
	                $("#" + t_id + "outDiv").css("width", $("#" + t_id + "sliderWrapHorizontal").width() + 2);
	            }
	            $("#" + t_id + "sliderWrapHorizontal").append("<div id='" + t_id + "sliderLeft'>" +
                    "<span id='" + t_id + "left_span' class='jui-jscrollbar-scroll-left_span'></span>" +
                    "</div><div id='" + t_id + "sliderHorizontal'></div><div id='" + t_id + "sliderRight'>" +
                    "<span id='" + t_id + "right_span' class='jui-jscrollbar-scroll-right_span'></span>" +
                    "</div>");
	            $("#" + t_id + "left_span").css({ "margin-top": 0.5 * (btnWidth - 10), "cursor": "pointer" });
	            $("#" + t_id + "right_span").css({ "margin-top": 0.5 * (btnWidth - 10), "cursor": "pointer" });
	            $("#" + t_id + "sliderLeft").css({ "margin-top": 0.5 * (scrollWidth-2 - btnWidth),"width": btnHeight, "height": btnWidth, "border": "1px solid " + buttonBorder, "border-radius": borderRadius + "px" });
	            $("#" + t_id + "sliderHorizontal").css({ "height": scrollWidth - 2, "position": "absolute", "top": 0 });
	            $("#" + t_id + "sliderRight").css({ "margin-top": 0.5 * (scrollWidth-2 - btnWidth), "position": "absolute", "right": "0", "top": "0", "width": btnHeight, "height": btnWidth, "border": "1px solid " + buttonBorder, "border-radius": borderRadius + "px" });
                
	            var c = true, d = true;
	            var w_prop = w_diff / t_w; //宽度差与内容层宽度比例
	            var handleWidth = Math.round((1 - w_prop) * (showWidth - space_)); //计算滑块的宽度
	            var w_sliderInitial = 0;

	            //#region设置滑动条
	            $("#" + t_id + "sliderHorizontal").slider({
	                orientation: 'horizontal',
	                min: 0,
	                max: 100,
	                range: 'max',
	                value: w_sliderInitial,
	                slide: function (event, ui) {
	                    if (c) {
	                        $("#"+t_id+"sliderHorizontal").find("a").css("border", "0");
	                        c = false;
	                    }
	                    var leftValue = -((ui.value) * w_diff / 100);
	                    t.css({ "left": leftValue }); //内容层随滑轮改变位置
	                },
	                change: function (event, ui) {
	                    if (d) {
	                        $("#" + t_id + "sliderHorizontal").find("a").css("border", "0");
	                        d = false;
	                    }
	                    var leftValue = -((ui.value) * (t.width() - showWidth) / 100); //重新计算超出高度
	                    t.css({ "left": leftValue }); //内容层随滑轮改变位置   
	                }
	            });
	            //#endregion
                
	            //#region 调节滑块样式
	            $("#" + t_id + "sliderHorizontal").find("a").removeClass("ui-state-default").css({ "cursor": "pointer", "height": sliderBarWidth + "px", "background-color": handlebgcolor, "margin-top": (scrollWidth - sliderBarWidth) * 0.5 + "px" });
	            $("#" + t_id + "sliderHorizontal").removeClass("ui-slider-horizontal").removeClass("ui-widget-content");
	            
	            //设置滑块层的宽度和右边距，以使得滑块层中间位置正好处在滑块位置
	            $("#" + t_id + "sliderHorizontal").find("a").css({ 'width': handleWidth, 'margin-left': -0.5 * handleWidth});
	            var origSliderWidth = showWidth - space_; //读取滚动条总长度
	            var sliderWidth = origSliderWidth - handleWidth; //获取滑块可移动范围长度
	            var sliderMarginLR = 0.5 * handleWidth + btnHeight+2; //获取滑块左右边距
	            //设置滑动层宽度和左边距
	            if ($.browser.msie) {
	                $("#" + t_id + "sliderHorizontal").css({ 'width': sliderWidth, 'left': sliderMarginLR });
	            } else {
	                $("#" + t_id + "sliderHorizontal").css({ 'width': sliderWidth, 'margin-left': sliderMarginLR });
	            }
                //#endregion

	            //#region按钮样式切换
	            changeBtnCss($("#" + t_id + "sliderHorizontal").find("a"));
	            //#endregion

	            //#region点击滑动层外部空白区域
	            $("#" + t_id + "sliderHorizontal").mousedown(function (event) {
	                event.stopPropagation();
	            });
	            $("#" + t_id + "sliderWrapHorizontal").mousedown(function (event) {
	                var offsetLeft = $("#" + t_id + "sliderHorizontal").offset().left; //获得滑动层定位
	                var clickValue = (event.pageX - offsetLeft) * 100 / $("#" + t_id + "sliderHorizontal").width(); //找到点击点，减去偏移量，计算点击处与滑动层宽度百分比
	                $("#" + t_id + "sliderHorizontal").slider("value",clickValue); //设置滑动层新的值
	            });
	            //#endregion
                
	            //#region支持鼠标滚轮事件
	            if (diff <= 0) {
	                if ($.fn.mousewheel) {
	                    t.unmousewheel(); //删除之前所有鼠标滑轮相关事件
	                    t.mousewheel(function (event, delta) {
	                        var speed = Math.round(5000 / t.data('w_diff'));
	                        if (speed < 1) speed = 1;
	                        if (speed > 100) speed = 100;
	                        var sliderVal = $("#" + t_id + "sliderHorizontal").slider("value"); //读取当前滚动条的值
	                        sliderVal -= (delta * speed); //增加当前滑轮值
	                        $("#" + t_id + "sliderHorizontal").slider("value",sliderVal); //为滚动条设置新值
	                        event.preventDefault(); //终止默认行为
	                    });
	                }
	            }
	            //#endregion
                
	            //#region垂直滚动条按钮点击事件
	            var intervalId;
	            $("#" + t_id + "sliderLeft").css("background-color", buttonColor).css("border", "1px solid " + buttonBorder);
	            $("#" + t_id + "sliderLeft").mouseover(function () {
	                $(this).css("background", buttonHover);
	            }).mouseout(function () {
	                $(this).css("background", buttonColor);
	            });
	            $("#" + t_id + "sliderLeft").mousedown(function (event) {
	                $(this).css("background", buttonClickColor);
	                event.stopPropagation();
	                intervalId = setInterval(function addfix() { var v = $("#" + t_id + "sliderHorizontal").slider("value"); v -= 1; $("#" + t_id + "sliderHorizontal").slider("value", v); }, 10);
	            }).mouseup(function () {
	                $(this).css("background", buttonHover);
	                clearInterval(intervalId);
	            });
	            $("#" + t_id + "sliderRight").css("background-color", buttonColor).css("border", "1px solid " + buttonBorder);
	            $("#" + t_id + "sliderRight").mouseover(function () {
	                $(this).css("background", buttonHover);
	            }).mouseout(function () {
	                $(this).css("background", buttonColor);
	            });
	            $("#" + t_id + "sliderRight").mousedown(function (event) {
	                event.stopPropagation();
	                $(this).css("background", buttonClickColor);
	                intervalId = setInterval(function addfix() { var v = $("#" + t_id + "sliderHorizontal").slider("value"); v += 1; $("#" + t_id + "sliderHorizontal").slider("value", v); }, 10);
	            }).mouseup(function () {
	                clearInterval(intervalId);
	                $(this).css("background", buttonHover);
	            });
	            //#endregion

	        }
            //#endregion

	        //#region文本不得选中
	        $("#" + t_id + "sliderWrapVertical").bind("selectstart", function () { return false; });
	        $("#" + t_id + "sliderWrapHorizontal").bind("selectstart", function () { return false; });
            //#endregion
            
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