String.prototype.lTrim = function ()
{
	return this.replace(/^\s*/, "");
}

String.prototype.rTrim = function ()
{
	return this.replace(/\s*$/, "");
}

String.prototype.trim = function ()
{
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.endsWith = function (sEnd)
{
	return (this.substr(this.length - sEnd.length) == sEnd);
}

String.prototype.startsWith = function (sStart)
{
	return (this.substr(0, sStart.length) == sStart);
}

String.prototype.format = function ()
{
	var s = this; for (var i = 0; i < arguments.length; i++)
	{ s = s.replace("{" + (i) + "}", arguments[i]); }
	return (s);
}

String.prototype.removeSpaces = function ()
{
	return this.replace(/ /gi, '');
}

String.prototype.removeExtraSpaces = function ()
{
	return (this.replace(String.prototype.removeExtraSpaces.re, " "));
}

String.prototype.removeExtraSpaces.re = new RegExp("\\s+", "g");

String.prototype.removeSpaceDelimitedString = function (r)
{
	var s = " " + this.trim() + " "; return s.replace(" " + r, "").rTrim();
}

String.prototype.isEmpty = function ()
{
	return this.length == 0;
};

String.prototype.validateURL = function ()
{
	var urlRegX = /[^a-zA-Z0-9-]/g; return sURL.match(urlRegX, "");
}

String.prototype.isEmail = function ()
{
	var emailReg = /^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; return emailReg.test(this);
}

String.prototype.isAlphaNumeric = function ()
{
	var alphaReg = /[^a-zA-Z0-9]/g; return !alphaReg.test(this);
}

String.prototype.encodeURI = function ()
{
	var returnString; returnString = escape(this)
	returnString = returnString.replace(/\+/g, "%2B"); return returnString
}

String.prototype.decodeURI = function ()
{
	return unescape(this)
}