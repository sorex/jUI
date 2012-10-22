/// <reference path=".../jquery-1.8.1-vsdoc.js"/>

jQuery.extend({
	juileftShow: function () { $("#LeftDiv").show("slide"); },
	juileftHide: function () { $("#LeftDiv").hide("slide"); },
	juirightShow: function () { $("#RightDiv").show("slideRight"); },
	juirightHide: function () { $("#RightDiv").hide("slideRight"); }
});

(function ($, undefined)
{

	$.effects.slideRight = function (o)
	{

		return this.queue(function ()
		{

			// Create element
			var el = $(this), props = ['position', 'top', 'bottom', 'left', 'right'];

			// Set options
			var mode = $.effects.setMode(el, o.options.mode || 'show'); // Set Mode
			var direction = o.options.direction || 'left'; // Default Direction

			// Adjust
			$.effects.save(el, props); el.show(); // Save & Show
			$.effects.createWrapper(el).css({ overflow: 'hidden' }); // Create Wrapper
			var ref = (direction == 'up' || direction == 'down') ? 'top' : 'left';
			var motion = (direction == 'up' || direction == 'left') ? 'pos' : 'neg';
			var distance = o.options.distance || (ref == 'top' ? el.outerHeight(true) : el.outerWidth(true));
			if (mode == 'show') el.css(ref, motion == 'pos' ? distance : (isNaN(distance) ? "-" + distance : -distance)); // Shift

			// Animation
			var animation = {};
			animation[ref] = (mode == 'show' ? (motion == 'pos' ? '-=' : '+=') : (motion == 'pos' ? '+=' : '-=')) + distance;

			// Animate
			el.animate(animation, {
				queue: false, duration: o.duration, easing: o.options.easing, complete: function ()
				{
					if (mode == 'hide') el.hide(); // Hide
					$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
					if (o.callback) o.callback.apply(this, arguments); // Callback
					el.dequeue();
				}
			});
		});
	};
})(jQuery);