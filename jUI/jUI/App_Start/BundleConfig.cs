using System.Web;
using System.Web.Optimization;

namespace jUI
{
	public class BundleConfig
	{
		// 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/Scripts/basic").Include(
				"~/Scripts/jquery-{version}.js",
				"~/Scripts/jquery-ui-{version}.js",
				"~/Scripts/jquery.validate*",
				"~/Scripts/modernizr-*",
				"~/Scripts/extendjs.js"
				));

			bundles.Add(new StyleBundle("~/Content/basic").Include(
				"~/Content/reset.css",
				"~/Content/site.css",
				"~/Content/jquery-ui.css"
				));

			//添加syntaxhighlighter相关的包
			bundles.Add(new ScriptBundle("~/Scripts/syntaxhighlighter/js").Include(
				"~/Scripts/syntaxhighlighter/shCore.js",
				"~/Scripts/syntaxhighlighter/shAutoloader.js",
				"~/Scripts/syntaxhighlighter/shBrushXml.js",
				"~/Scripts/syntaxhighlighter/shBrushJScript.js",
				"~/Scripts/syntaxhighlighter/shBrushCSharp.js",
				"~/Scripts/syntaxhighlighter/shBrushCss.js",
				"~/Scripts/syntaxhighlighter/configSH.js"
				));
			bundles.Add(new StyleBundle("~/Content/syntaxhighlighter/css").Include(
				"~/Content/syntaxhighlighter/shCoreDefault.css",
				"~/Content/syntaxhighlighter/shThemeDefault.css"
				));

			//添加jUI相关的包
			bundles.Add(new ScriptBundle("~/Scripts/jUI/files").Include(
				"~/Scripts/jUI/jui.jlayout.js",
				"~/Scripts/jUI/jui.jheadMenu.js",
				"~/Scripts/jUI/jui.jleftMenu.js"
				));

			bundles.Add(new StyleBundle("~/Content/jUI/files").Include(
				"~/Content/jUI/jui.jlayout.css",
				"~/Content/jUI/jui.jheadMenu.css",
				"~/Content/jUI/jui.jleftMenu.css"
				));
		}
	}
}