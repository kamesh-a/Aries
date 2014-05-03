
	// Aries.js
	// @IdeasNeverCease
	// ========================================================

	var $vW = $(window).width(), $vH = $(window).height();

	$(function () {

		$("#url-bar").css("width", $vW - 190 + "px");

		$("#aries-powerbar").mouseover(function () {
			$("#aries-titlebar").css({
				"margin": "0",
				"opacity": "1"
			});
		});

		$("#aries-showcase").mouseover(function () {
			$("#aries-titlebar").css({
				"margin": "0 0 -31px 0",
				"opacity": "0"
			});
		});

	});
