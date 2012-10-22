/**********************************************************
 * 模    块	：	通用js扩展类
 * 作    者	：	Jasper
 * 编写时间	：	2012-10-22
 * 实现功能	：	添加通用方法，扩展String对象，Array对象
 * 详细描述	：	
 * *********************************************************/


//┏━━━━━━━━━━━━━━━━┓
//┃ String对象的扩展 ┃
//┗━━━━━━━━━━━━━━━━┛
String.format = function ()
{
	/// <summary>
	/// 将指定字符串s中的{0}，{1}。。。替换为指定字符串
	/// </summary>
	/// <returns type="String" />

	var s = arguments[0];
	for (var i = 0; i < arguments.length - 1; i++)
	{
		var reg = new RegExp("\\{" + i + "\\}", "gm");
		s = s.replace(reg, arguments[i + 1]);
	}

	return s;
};

String.prototype.replace2 = function (oldStr, newStr)
{
	/// <summary>
	/// 将字符串中的newStr替换为oldStr
	/// </summary>
	/// <returns type="String" />
	var reg = new RegExp(oldStr, "gm");
	return this.replace(reg, newStr);
}

String.prototype.trim = function ()
{
	/// <summary>
	/// 从当前 String 对象移除所有前导空白字符和尾部空白字符。
	/// &#10;将会返回一个新字符串
	/// </summary>
	/// <returns type="String" />
	return this.replace(/(^\s*)|(\s*$)|\r|\n/g, ""); 
}

String.prototype.trimLeft = function ()
{
	/// <summary>
	/// 从当前 String 对象移除所有前导空白字符。
	/// &#10;将会返回一个新字符串
	/// </summary>
	/// <returns type="String" />
	return this.replace(/(^\s*)|\r|\n/g, "");
};

String.prototype.trimRight = function ()
{
	/// <summary>
	/// 从当前 String 对象移除所有尾部空白字符。
	/// &#10;将会返回一个新字符串
	/// </summary>
	/// <returns type="String" />
	return this.replace(/(\s*$)|\r|\n/g, "");
};

String.prototype.endsWith = function (str)
{
	/// <summary>
	/// 是否以指定字符串结尾
	/// </summary>
	/// <returns type="BOOL" />
	return (this.substr(this.length - str.length) === str);
};

String.prototype.startsWith = function (str)
{
	/// <summary>
	/// 是否以指定字符串开始
	/// </summary>
	/// <returns type="BOOL" />
	return (this.substr(0, str.length) === str);
};

String.prototype.isNumber = function ()
{
	/// <summary>
	/// 是否是数字
	/// </summary>
	/// <returns type="BOOL" />
	return !isNaN(this);
};

String.prototype.isEmail = function ()
{
	/// <summary>
	/// 是否是邮件地址
	/// </summary>
	/// <returns type="BOOL" />
	return (new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.trim()));
};

String.prototype.encodeURI = function ()
{
	var returnString; returnString = escape(this)
	returnString = returnString.replace(/\+/g, "%2B");
	return returnString
}

String.prototype.decodeURI = function ()
{
	return unescape(this)
}