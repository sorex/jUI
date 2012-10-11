$(function () {
	$(":radio").after("<span class='jui-radio'></span>").click(function () {
		if ($(this).is(':checked')) {
			$(this).next().siblings().removeClass("jui-radio-checked");
			$(this).next().addClass("jui-radio-checked");
			$(this).checked = true;
		} else {
			$(this).next().removeClass("jui-radio-checked");
			$(this).checked = false;

		}
	}).hide().next().click(function () {
		$(this).siblings().removeClass("jui-radio-checked");
		if (!$(this).prev().is(":checked")) {
			$(this).prev()[0].checked = true;
			$(this).addClass("jui-radio-checked");
		}
	});

});