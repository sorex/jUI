/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI leftMenu Plugin
/*
* jQuery UI leftMenu 
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/


/*
* Author: Jasper
* Create date: 2012-09-11 14:30
* Description: 左边菜单栏(单级菜单) 
* PS: 特定皮肤
*/

/*
* items:
*		菜单对象列表：{ top: 20, text: "这是一个空的LeftMenu", isSelect: true }
*		top: 上边缘边距
*		text：显示文本内容
*		isSelect：是否选中
* onClick(index, text):
*		点击菜单时的事件
*		index：点击菜单所在索引，0开始
*		text：点击菜单的内容
*/

(function ($, undefined)
{
	$.widget("jui.jleftMenu",
	{
		// default options
		options: {
			items: [],
			onClick: null
		},

		_create: function ()
		{
			$(this.element).empty();
			var self = this,
				o = this.options;

			$(this.element).addClass("jui-leftMenu")
			for (var i = 0; i < o.items.length; i++)
			{
				var item = $("<div>").addClass("jui-leftMenu-item");
				if (o.items[i].isSelect != null && o.items[i].isSelect)
					item.addClass("jui-leftMenu-item-active");
				if (o.items[i].top != null)
					item.css("margin-top", o.items[i].top);
				if(o.items[i].text != null)
					item.text(o.items[i].text);
				if (o.onClick != null)
				{
					(function ()
					{
						var _index = i;
						var _text = o.items[_index].text;
						var _item = item;
						item.click(function ()
						{
							$(".jui-leftMenu-item-active", $(self.element)).removeClass("jui-leftMenu-item-active").addClass("jui-leftMenu-item");
							_item.removeClass("jui-leftMenu-item").addClass("jui-leftMenu-item-active");
							o.onClick(_index, _text);
						});
					})();
				}
				$(self.element).append(item);
			}
		},

		_setOption: function (key, value)
		{
			if (value !== undefined || value != null)
				this.options[key] = value;
			else
				return this.options[key];
		},

		_setOptions: function (options)
		{
			$.each(options, function (key, value)
			{
				this._setOption(key, value);
			});
		},

		_destroy: function ()
		{
			$(this.element).empty();
			$(this).empty();

			return this;
		}
	});

	$.extend($.jui.jleftMenu, {
		version: "0.1.0"
	});
})(jQuery);