/*
* Author: Jasper
* Create date: 2012-09-28 17:00
* Description: 为SyntaxHighlighter添加折叠代码的功能，并进行基本调用
*/

SyntaxHighlighter.toolbar.items.list = ['expandSource', 'foldingSource', 'help'];
SyntaxHighlighter.toolbar.items.foldingSource = {
	getHtml: function (highlighter)
	{
		if (highlighter.getParam('collapse') != true)
			return '';
		return SyntaxHighlighter.toolbar.getButtonHtml(highlighter, 'foldingSource', "-");
	},
	execute: function (highlighter)
	{
		var prefix = 'highlighter_';
		var divID = highlighter.id.indexOf(prefix) == 0 ? highlighter.id : prefix + highlighter.id;
		$("#" + divID).addClass('collapsed');
	}
};

SyntaxHighlighter.all();
