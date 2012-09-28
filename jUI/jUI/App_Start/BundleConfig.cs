using System.Web;
using System.Web.Optimization;

namespace jUI
{
	public class BundleConfig
	{
		// 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/script/basic").Include(
						"~/Scripts/jquery-{version}.js",
						"~/Scripts/jquery-ui-{version}.js",
						"~/Scripts/jquery.validate*",
						"~/Scripts/modernizr-*",
						"~/Scripts/jUI/jui.jlayout.js"
						));

			bundles.Add(new StyleBundle("~/css/basic").Include(
						"~/Content/reset.css",
						"~/Content/site.css",
						"~/Content/jquery-ui.css",
						"~/Content/jUI/jui.jlayout.css"
						));

			//添加syntaxhighlighter相关的包
			bundles.Add(new ScriptBundle("~/script/syntaxhighlighter").Include(
						"~/Scripts/syntaxhighlighter/shCore.js",
						"~/Scripts/syntaxhighlighter/shAutoloader.js",
						"~/Scripts/syntaxhighlighter/shBrushXml.js",
						"~/Scripts/syntaxhighlighter/shBrushJScript.js",
						"~/Scripts/syntaxhighlighter/shBrushCSharp.js",
						"~/Scripts/syntaxhighlighter/shBrushCss.js",
						"~/Scripts/syntaxhighlighter/configSH.js"
						));
			bundles.Add(new StyleBundle("~/css/syntaxhighlighter").Include(
				"~/Content/syntaxhighlighter/shCoreDefault.css",
				"~/Content/syntaxhighlighter/shThemeDefault.css"));

		}
	}
}