
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

	// Window Actions!
	$(function () {

		var nw = {
			gui: require("nw.gui"), // Load native UI library
			win: require("nw.gui").Window.get(), // Get the current window
			platform: require("os").platform,
			spawn: require("child_process").spawn,
			exec: require("child_process").exec,
			fs: require("fs"),
			path: require("path")
		}

		// Minimize Aries
		$(".app-minimize").on("click", function () {
			nw.win.minimize();
		});

		// Un/Maximize Aries
		$(".app-maximize").on("click", function () {
			nw.win.maximize();
		});

		// Close Aries
		$(".app-close").on("click", function () {
			nw.win.close();
		});

	});
