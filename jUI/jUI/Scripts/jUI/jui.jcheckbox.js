$(function () {
	$(":checkbox").after("<span class='jui-checkbox'></span>").click(function (event) {
		if ($(this).is(':checked')) {
			$(this).next().addClass("jui-checkbox-checked");
			$(this).checked = true;
		}
		else {
			$(this).next().removeClass('jui-checkbox-checked');
			$(this).checked = false;
		}
		event.stopPropagation();
	}).hide().next().click(function (event) {
		var myObject = document.getElementById($(this).prev().attr("id"));
		if (myObject.checked == true) {
			$(this).removeClass('jui-checkbox-checked')
			myObject.checked = false;
		} else {

			myObject.checked = true;
			$(this).addClass('jui-checkbox-checked')
		}
		event.stopPropagation();
	});

});