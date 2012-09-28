/// <reference path="../jquery-1.8.1-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.23.js" />

//JQuery UI datapager Plugin
/*
* jQuery UI datapager 
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/


/*
* Author: Jasper
* Create date: 2012-09-25 15:00
* Description: 翻页控件
* PS: 特定样式
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
	$.widget("jui.jdatapager",
	{
		options: {
			pageIndex: 1,
			pageSize: 15,
			recordCount: 0,
			noResultsText: "对不起，没有找到您的搜索结果。",
			onPageChange: null
		},

		_create: function ()
		{
			this._jdatapagerify();
		},

		_jdatapagerify: function ()
		{
			$(this.element).empty();
			var self = this,
				o = this.options,
				pageIndex = parseInt(o.pageIndex + ""),
				pageSize = parseInt(o.pageSize + ""),
				recordCount = parseInt(o.recordCount + "");

			if (isNaN(pageIndex) || pageIndex <= 0)
			{
				pageIndex = o.pageIndex = 1;
			}
			if (isNaN(pageSize) || pageSize <= 0)
			{
				pageSize = o.pageSize = 15;
			}
			if (isNaN(recordCount) || recordCount <= 0)
			{
				recordCount = o.recordCount = 0;
			}

			var pageMax = Math.ceil(recordCount / pageSize);

			if (isNaN(pageMax) || pageMax <= 0)
			{
				pageMax = 1;
			}
			if (pageIndex > pageMax)
			{
				pageIndex = o.pageIndex = pageMax;
			}

			var AddButton = function (pageIndex, text, type)
			{
				if (type)
					return '<span class="jui-datapager-item-' + type + '" pageIndex="' + pageIndex + '">' + text + '</span>';
				else
					return '<span class="jui-datapager-item" pageIndex="' + pageIndex + '">' + text + '</span>';
			};

			if (recordCount > 0)
			{
				/*首页，上一页*/
				if (pageIndex > 1)
				{
					$(self.element).append(AddButton(1, "首页"));
					$(self.element).append(AddButton(pageIndex - 1, "&lt;上一页"));
				}
				else
				{
					$(self.element).append(AddButton(1, "首页", "disabled"));
					$(self.element).append(AddButton(pageIndex - 1, "&lt;上一页", "disabled"));
				}
				/*中间的数字页*/
				//小于等于11个按钮，全部输出
				if (pageMax <= 11)
				{
					for (var i = 1; i <= pageMax; i++)
					{
						$(self.element).append(AddButton(i, i, i == pageIndex ? "active" : null));
					}
				}
					//大于11个按钮，显示1
				else if (pageIndex < 6)
				{
					for (var i = 1; i <= 11; i++)
					{
						$(self.element).append(AddButton(i, i, i == pageIndex ? "active" : null));
					}
				}
					//大于11个按钮，显示pageMax
				else if (pageIndex > pageMax - 5)
				{
					for (var i = pageMax - 10; i <= pageMax; i++)
					{
						$(self.element).append(AddButton(i, i, i == pageIndex ? "active" : null));
					}
				}
				else
				{
					for (var i = pageIndex - 5; i <= pageIndex + 5; i++)
					{
						$(self.element).append(AddButton(i, i, i == pageIndex ? "active" : null));
					}
				}
				/*下一页，尾页*/
				if (pageIndex < pageMax)
				{
					$(self.element).append(AddButton(pageIndex + 1, "下一页&gt;"));
					$(self.element).append(AddButton(pageMax, "尾页"));
				}
				else
				{
					$(self.element).append(AddButton(pageIndex + 1, "下一页&gt;", "disabled"));
					$(self.element).append(AddButton(pageMax, "尾页", "disabled"));
				}

				/*样式*/
				$(self.element).removeClass("ui-state-error").addClass("jui-datapager ui-helper-clearfix");

				/*事件*/
				$("span.jui-datapager-item", $(self.element)).click(function ()
				{
					self._setOptions({ "pageIndex": $(this).attr("pageIndex") });
				});
			}
			else
			{
				$(self.element).removeClass("jui-datapager").remove("ui-helper-clearfix").addClass("ui-state-error");
				$(self.element).append('<span class="ui-icon ui-icon-alert" style="float: left; margin: 3px 3px 0px 3px;"></span><p>' + o.noResultsText + '</p>');
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
			var self = this, refresh = false;

			$.each(options, function (key, value)
			{
				self._setOption(key, value);
				if (key == "pageIndex" || key == "pageSize" || key == "recordCount")
					refresh = true;
			});
			if (refresh && self.options.onPageChange != null)
				self.options.onPageChange(self.options);
			self._jdatapagerify();
		},

		_destroy: function ()
		{
			$(this.element).empty();
			$(this).empty();

			return this;
		}
	});

	$.extend($.jui.jdatapager, {
		version: "0.1.0"
	});
})(jQuery);