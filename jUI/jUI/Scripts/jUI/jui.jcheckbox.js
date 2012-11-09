$(function () {
	$(":checkbox").after("<span class='jui-checkbox'></span>").click(function (event) {//checkbox的点击事件
		if ($(this).is(':checked')) {

			$(this).next().addClass("jui-checkbox-checked");
			$(this).checked = true;
			$(this).next().removeClass("jui-checkbox-checked-hover");
			$(this).next().removeClass('jui-checkbox-checked-checked');
		}
		else {

			$(this).next().removeClass('jui-checkbox-checked-checked');
			$(this).next().removeClass('jui-checkbox-checked');
			$(this).next().addClass("jui-checkbox-checked-hover");
			$(this).checked = false;
		}
		event.stopPropagation();

	}).hide().next().click(function (event) { //背景图片点击事件
		var myObject = document.getElementById($(this).prev().attr("id"));
		if (myObject.checked == true) {
			$(this).removeClass('jui-checkbox-checked');
			myObject.checked = false;
		} else {
			myObject.checked = true;
			$(this).addClass('jui-checkbox-checked')
		}
		event.stopPropagation();

	}).next().mouseover(function (event) {
		$(this).addClass('jui-checkbox-laber');

		if ($(this).prev().attr("class") == 'jui-checkbox') {
			$(this).prev().addClass('jui-checkbox-checked-hover');
		} else {
			$(this).prev().addClass('jui-checkbox-checked-checked');
		}

		event.stopPropagation();
	}).mouseout(function (event) {
		$(this).prev().removeClass('jui-checkbox-checked-hover');
		$(this).prev().removeClass('jui-checkbox-checked-checked');
		event.stopPropagation();
	});

});