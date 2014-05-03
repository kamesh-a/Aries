
	// Aries.js
	// @IdeasNeverCease
	// ========================================================

	var $vW = $(window).width(), $vH = $(window).height();

	$(function () {

		// Set URL bar width
		$("#url-bar").css("width", $vW - 190 + "px");

		// Titlebar show functionality
		var timeoutId;

		$(".button-group").hover(function () {

			if (!timeoutId) {
				timeoutId = window.setTimeout(function () {

					timeoutId = null; 

					$("#aries-titlebar").css({
						"margin": "0",
						"opacity": "1"
					});

				}, 850);
			}

		});

		$("#aries-showcase").hover(function () {

			if (timeoutId) {
				window.clearTimeout(timeoutId);
				timeoutId = null;
			} else {
				$("#aries-titlebar").css({
					"margin": "0 0 -31px 0",
					"opacity": "0"
				});
			}

		});

	});
