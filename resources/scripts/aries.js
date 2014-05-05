
	// Aries.js
	// @IdeasNeverCease
	// ========================================================

	var $vW = $(window).width(), $vH = $(window).height();

	$(function () {

		// Set URL bar width
		$("#url-bar").css("width", $vW - 190 + "px");

		// Set showcase width and height
		$("#aries-showcase").css({
			"width": $vW,
			"height": $vH - 31 + "px"
		});

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

	function goThere() {

		var reg = /\s+/;
		var a = reg.test($("#url-bar").val());

		if (reg.test($("#url-bar").val())) {

			// if user inputs a space, it's indicative of a search
			document.getElementById("aries-showcase").src = "http://duckduckgo.com?q=" + encodeURIComponent(document.getElementById("url-bar").value);
			console.log(a); // should be true, search DDG

		} else {

			// if there are no spaces, it's indicative of a destination
			document.getElementById("aries-showcase").src = "http://" + encodeURIComponent(document.getElementById("url-bar").value);
			console.log(a); // should be false, go to actual site

		}

	}

	$(function() {

		"use strict";

		var url = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

		$("#url-bar").on("keyup", function(e) {

			var urls, output = "";

			if (e.keyCode !== 8 && e.keyCode !== 9 && e.keyCode !== 13 && e.keyCode !== 32 && e.keyCode !== 46) {
				// Return is backspace, tab, enter, space or delete was not pressed.
				return;
			}

			while ((urls = url.exec(this.value)) !== null) {
				output += urls[0] + ", ";
			}

			console.log("URLS: " + output.substring(0, output.length - 2));

		});

	});
