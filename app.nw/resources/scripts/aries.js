
	// Aries.js
	// @IdeasNeverCease
	// ========================================================

	// Window Actions!
	$(function () {

		// Initialize Node Webkit
		var
		$vW = $(window).width(),
		$vH = $(window).height(),
		nw = {
			gui: require("nw.gui"),
			win: require("nw.gui").Window.get(),
			platform: require("os").platform,
			spawn: require("child_process").spawn,
			exec: require("child_process").exec,
			fs: require("fs"),
			path: require("path")
		},
		os = require('os'),
		winState,
		currWinMode,
		resizeTimeout,
		isMaximizationEvent = false;

		if (os.platform() === "darwin") {
			// var menu = new nw.gui.Menu({ type: "menubar" });
			// menu.createMacBuiltin("Aries");
			// nw.win.menu = menu;

			// Create a menubar for window menu 
			var menubar = new nw.gui.Menu({ type: "menubar" });

			/***********************************************/

			// Aries Menu
			var _aries = new nw.gui.Menu();

			_aries.append(new nw.gui.MenuItem({
				label: "About Aries",
				click: function () {

					console.log("Clicked 'About Aries'");

					var win = nw.gui.Window.open("about.html", {
					  "position": "center",
					  "width": 600,
					  "height": 297,
					  "frame": false,
					  "toolbar": false
					});

					win.on("load", function () { this.focus(true); });

				}
			}));

			_aries.append(new nw.gui.MenuItem({ type: "separator" }));

			_aries.append(new nw.gui.MenuItem({
				label: "Preferences",
				click: function () {
					console.log("Clicked 'Preferences'");
				},
			  key: ",",
			  modifiers: "cmd",
			}));

			_aries.append(new nw.gui.MenuItem({ type: "separator" }));

			_aries.append(new nw.gui.MenuItem({
				label: "Synchronize", // Aries Connect
				click: function () {
					console.log("Clicked 'Synchronize'");
				}
			}));

			_aries.append(new nw.gui.MenuItem({
				label: "Clear Private Data",
				click: function () {
					console.log("Clicked 'Clear Private Data'");
				}
			}));

			_aries.append(new nw.gui.MenuItem({ type: "separator" }));

			_aries.append(new nw.gui.MenuItem({
				label: "Streamline", // like Opera Turbo
				click: function () {
					console.log("Clicked 'Streamline'");
				}
			}));

			_aries.append(new nw.gui.MenuItem({ type: "separator" }));

			_aries.append(new nw.gui.MenuItem({
				label: "Hide Aries",
				click: function () {
					console.log("Clicked 'Hide Aries'");
				},
			  key: "h",
			  modifiers: "cmd",
			}));

			_aries.append(new nw.gui.MenuItem({
				label: "Hide Others",
				click: function () {
					console.log("Clicked 'Hide Others'");
				},
			  key: "h",
			  modifiers: "shift-cmd",
			}));

			_aries.append(new nw.gui.MenuItem({
				label: "Show All",
				click: function () {
					console.log("Clicked 'Show All'");
				}
			}));

			_aries.append(new nw.gui.MenuItem({ type: "separator" }));

			_aries.append(new nw.gui.MenuItem({
				label: "Quit Aries",
				click: function () {

					nw.win.close();
					console.log("Clicked 'Quit Aries'");

				},
			  key: "q",
			  modifiers: "cmd",
			}));

			menubar.append(new nw.gui.MenuItem({
				label: "Aries",
				submenu: _aries
			}));

			/***********************************************/

			// File Menu
	    var _file = new nw.gui.Menu();

	    _file.append(new nw.gui.MenuItem({
				label: "New Tab",
				click: function() {
					console.log("Clicked 'New Tab'");

					// Remove focus from other tabs and windows
					$(".tab, .tabs-pane").removeClass("active");

					$("#tab-wrapper").append("<button class='tab active' data-page='start.html'><img class='tab-favicon' type='image/x-icon' src='resources/images/favicon-default.png'><span class='tab-close'></span><span class='tab-title'>Start Page</span></button>");

					$("#aries-showcase").append("<iframe class='tabs-pane active' seamless='true' nwUserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.157 Aries/0.5-alpha' nwdisable nwfaketop onLoad='pageLoad();' src='start.html'></iframe>");

					$("#url-bar").val("").focus();

					var tabID = 0, windowID = 0;

					// Add a new tab
					$("#tab-wrapper .tab").each(function () {

						tabID++;
						$(this).attr("data-tab", "#tab" + tabID);

						var dataPage = $(this).attr("data-page");
						console.log(dataPage);

					});

					// Add a new window
					$("#aries-showcase iframe").each(function () {

						windowID++;
						$(this).attr("id", "tab" + windowID);
						// $(this).attr("src", dataPage);

					}).css({ "width": nw.win.window.innerWidth, "height": nw.win.window.innerHeight - 31 + "px" });

					$("iframe.active").each(function () {
					  this.contentWindow.location.reload(true);
					});

					// Reinitialize tabby to recognize new tab and window
					tabby.init();
					tabHover();

					console.log("New tab added to Aries");
				},
			  key: "t",
			  modifiers: "cmd",
			}));

	    _file.append(new nw.gui.MenuItem({
				label: "New Window",
				click: function() {
					console.log("Clicked 'New Window'");
				},
			  key: "n",
			  modifiers: "cmd",
			}));

	    _file.append(new nw.gui.MenuItem({
				label: "New Private Window",
				click: function() {
					console.log("Clicked 'New Private Window'");
				},
			  key: "n",
			  modifiers: "shift-cmd",
			}));

	    _file.append(new nw.gui.MenuItem({
				label: "Open File",
				click: function() {
					console.log("Clicked 'Open File'");
				},
			  key: "o",
			  modifiers: "cmd",
			}));

	    _file.append(new nw.gui.MenuItem({
				label: "Open Location",
				click: function() {
					console.log("Clicked 'Open Location'");
				},
			  key: "l",
			  modifiers: "cmd",
			}));

			_file.append(new nw.gui.MenuItem({ type: "separator" }));

	    _file.append(new nw.gui.MenuItem({
				label: "Reload Tab",
				click: function() {

					$("iframe.active").attr("src", function (i, val) { return val; });
					console.log("Reloaded Tab");

				},
			  key: "r",
			  modifiers: "cmd",
			}));

	    _file.append(new nw.gui.MenuItem({
				label: "Close Tab",
				click: function() {
					console.log("Clicked 'Close Tab'");
				},
			  key: "w",
			  modifiers: "cmd",
			}));

	    _file.append(new nw.gui.MenuItem({
				label: "Close Other Tabs",
				click: function() {
					console.log("Clicked 'Close Other Tabs'");
				}
			}));

	    _file.append(new nw.gui.MenuItem({
				label: "Close Window",
				click: function() {
					console.log("Clicked 'Close Window'");
				},
			  key: "w",
			  modifiers: "shift-cmd",
			}));

			_file.append(new nw.gui.MenuItem({ type: "separator" }));

	    _file.append(new nw.gui.MenuItem({
				label: "Save Page As",
				click: function() {
					console.log("Clicked 'Save Page As'");
				},
			  key: "s",
			  modifiers: "shift-cmd",
			}));

			_file.append(new nw.gui.MenuItem({ type: "separator" }));

	    _file.append(new nw.gui.MenuItem({
				label: "Print",
				click: function() {
					console.log("Clicked 'Print'");
				},
			  key: "p",
			  modifiers: "cmd",
			}));

			menubar.append(new nw.gui.MenuItem({
				label: "File",
				submenu: _file
			}));

			/***********************************************/

			// Edit Menu
			var _edit = new nw.gui.Menu();

	    _edit.append(new nw.gui.MenuItem({
				label: "Undo",
				click: function() {
					console.log("Clicked 'Undo'");
				},
			  key: "z",
			  modifiers: "cmd",
			}));

	    _edit.append(new nw.gui.MenuItem({
				label: "Redo",
				click: function() {
					console.log("Clicked 'Redo'");
				},
			  key: "z",
			  modifiers: "shift-cmd",
			}));

			_edit.append(new nw.gui.MenuItem({ type: "separator" }));

	    _edit.append(new nw.gui.MenuItem({
				label: "Cut",
				click: function() {

					document.execCommand("cut");
					console.log("Cut something");

				},
			  key: "x",
			  modifiers: "cmd",
			}));

	    _edit.append(new nw.gui.MenuItem({
				label: "Copy",
				click: function() {

					document.execCommand("copy");
					console.log("Copied something");

				},
			  key: "c",
			  modifiers: "cmd",
			}));

	    _edit.append(new nw.gui.MenuItem({
				label: "Paste",
				click: function() {

					document.execCommand("paste");
					console.log("Pasted something");

				},
			  key: "v",
			  modifiers: "cmd",
			}));

	    _edit.append(new nw.gui.MenuItem({
				label: "Select All",
				click: function() {
					console.log("Clicked 'Select All'");
				},
			  key: "a",
			  modifiers: "cmd",
			}));

			_edit.append(new nw.gui.MenuItem({ type: "separator" }));

	    _edit.append(new nw.gui.MenuItem({
				label: "Find",
				click: function() {
					console.log("Clicked 'Find'");
				},
			  key: "f",
			  modifiers: "cmd",
			}));

	    _edit.append(new nw.gui.MenuItem({
				label: "Find Next",
				click: function() {
					console.log("Clicked 'Find Next'");
				},
			  key: "g",
			  modifiers: "cmd",
			}));

	    _edit.append(new nw.gui.MenuItem({
				label: "Find Previous",
				click: function() {
					console.log("Clicked 'Find Previous'");
				},
			  key: "g",
			  modifiers: "shift-cmd",
			}));

			menubar.append(new nw.gui.MenuItem({
				label: "Edit",
				submenu: _edit
			}));

			/***********************************************/

			// View Menu
			var _view = new nw.gui.Menu();

	    _view.append(new nw.gui.MenuItem({
				label: "Test 002",
				click: function() {
					console.log("Clicked 'Test 002'");
				},
			  key: "",
			  modifiers: "",
			}));

			_view.append(new nw.gui.MenuItem({ type: "separator" }));

			menubar.append(new nw.gui.MenuItem({
				label: "View",
				submenu: _view
			}));

			/***********************************************/

			// History Menu
			var _history = new nw.gui.Menu();

	    _history.append(new nw.gui.MenuItem({
				label: "Test 003",
				click: function() {
					console.log("Clicked 'Test 003'");
				},
			  key: "",
			  modifiers: "",
			}));

			_history.append(new nw.gui.MenuItem({ type: "separator" }));

			menubar.append(new nw.gui.MenuItem({
				label: "History",
				submenu: _history
			}));

			/***********************************************/

			// Developer Menu
			var _developer = new nw.gui.Menu();

	    _developer.append(new nw.gui.MenuItem({
				label: "Web Inspector",
				click: function() {

					nw.win.showDevTools("iframe");
					console.log("Dev Mode, ON");

				},
			  key: "i",
			  modifiers: "shift-cmd",
			}));

	    _developer.append(new nw.gui.MenuItem({
				label: "Reload Aries",
				click: function() {

					nw.win.reload();
					// nw.win.maximize(); // gotta be a better solution than this
					console.log("Reloaded Aries");

				},
			  key: "r",
			  modifiers: "shift-cmd",
			}));

			_developer.append(new nw.gui.MenuItem({ type: "separator" }));

	    _developer.append(new nw.gui.MenuItem({
				label: "View Source",
				click: function() {
					console.log("Clicked 'View Source'");
				},
			  key: "u",
			  modifiers: "cmd",
			}));

			_developer.append(new nw.gui.MenuItem({ type: "separator" }));

	    _developer.append(new nw.gui.MenuItem({
				label: "Task Manager",
				click: function() {
					console.log("Clicked 'Task Manager'");
				},
			  key: "",
			  modifiers: "",
			}));

	    _developer.append(new nw.gui.MenuItem({
				label: "Plugins",
				click: function() {
					console.log("Clicked 'Plugins'");
				},
			  key: "",
			  modifiers: "",
			}));

			menubar.append(new nw.gui.MenuItem({
				label: "Developer",
				submenu: _developer
			}));

			/***********************************************/

			// Window Menu
			var _window = new nw.gui.Menu();

	    _window.append(new nw.gui.MenuItem({
				label: "Test 005",
				click: function() {
					console.log("Clicked 'Test 005'");
				},
			  key: "",
			  modifiers: "",
			}));

			_window.append(new nw.gui.MenuItem({ type: "separator" }));

			menubar.append(new nw.gui.MenuItem({
				label: "Window",
				submenu: _window
			}));

			/***********************************************/

			// Help Menu
	    var _help = new nw.gui.Menu();

	    _help.append(new nw.gui.MenuItem({
				label: "Aries Help",
				click: function() {
					console.log("Clicked 'Aries Help'");
				}
			}));

	    _help.append(new nw.gui.MenuItem({
				label: "Keyboard Shortcuts",
				click: function() {
					console.log("Clicked 'Keyboard Shortcuts'");
				}
			}));

			_help.append(new nw.gui.MenuItem({ type: "separator" }));

	    _help.append(new nw.gui.MenuItem({
				label: "Report Issues",
				click: function() {
					console.log("Clicked 'Report Issues'");
				}
			}));

	    menu_help = new nw.gui.MenuItem({ label: "Help" });
	    menu_help.submenu = _help;

			menubar.append(menu_help);

			/***********************************************/

			// Assign the menubars to window menu
			nw.win.menu = menubar;
		}

		// winstate.js
		function initWindowState() {

			winState = JSON.parse(localStorage.windowState || "null");

			if (winState) {
				currWinMode = winState.mode;

				if (currWinMode === "maximized") {
					nw.win.maximize();
				} else {
					restoreWindowState();
				}
			} else {
				currWinMode = "normal";

				if (deltaHeight !== "disabled") deltaHeight = 0;
				dumpWindowState();
			}

			nw.win.show();

		}

		function dumpWindowState() {

			if (!winState) { winState = {}; }

			// we don't want to save minimized state, only maximized or normal
			if (currWinMode === "maximized") {
				winState.mode = "maximized";
			} else {
				winState.mode = "normal";
			}

			// when window is maximized you want to preserve normal
			// window dimensions to restore them later (even between sessions)
			if (currWinMode === "normal") {
				winState.x = nw.win.x;
				winState.y = nw.win.y;
				winState.width = nw.win.width;
				winState.height = nw.win.height;

				// save delta only of it is not zero
				if (deltaHeight !== "disabled" && deltaHeight !== 0 && currWinMode !== "maximized") {
					winState.deltaHeight = deltaHeight;
				}
			}

		}

		function restoreWindowState() {

			// deltaHeight already saved, so just restore it and adjust window height
			if (deltaHeight !== "disabled" && typeof winState.deltaHeight !== "undefined") {
				deltaHeight = winState.deltaHeight;
				winState.height = winState.height - deltaHeight;
			}

			nw.win.resizeTo(winState.width, winState.height);
			nw.win.moveTo(winState.x, winState.y);

		}

		function saveWindowState() {

			dumpWindowState();
			localStorage.windowState = JSON.stringify(winState);

		}

		// Build initial iframe
		_iframe = "";
		_iframe += "<iframe class='tabs-pane active'";
		_iframe += "seamless='true'";
		_iframe += "nwUserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.157 Aries/0.5-alpha'";
		_iframe += "nwdisable nwfaketop ";
		_iframe += "onLoad='pageLoad();'";
		_iframe += "id='tab1'>";

		$("#aries-showcase").append(_iframe);

		// Minimize Aries
		$(".app-minimize").on("click", function () {

			nw.win.on("minimize", function() {
				currWinMode = "minimized";
			});

			nw.win.minimize();

		});

		// Restore Aries
		nw.win.on("restore", function() {
			currWinMode = "normal";
		});

		// Un/Maximize Aries
		$(".app-maximize").on("click", function () {

			nw.win.on("maximize", function() {
				isMaximizationEvent = true;
				currWinMode = "maximized";
			});

			nw.win.on("unmaximize", function() {
				currWinMode = "normal";
				restoreWindowState();
			});

			nw.win.maximize();

		});

		// Resize Aries
		// Enable this when I have resizing implemented
		/*
		nw.win.window.addEventListener("resize", function () {

			// resize event is fired many times on one resize action,
			// this hack with setTiemout forces it to fire only once
			clearTimeout(resizeTimeout);

			resizeTimeout = setTimeout(function () {

				// on MacOS you can resize maximized window, so it's no longer maximized
				if (isMaximizationEvent) {
					// first resize after maximization event should be ignored
					isMaximizationEvent = false;
				} else {
					if (currWinMode === "maximized") {
						currWinMode = "normal";
					}
				}

				// there is no deltaHeight yet, calculate it and adjust window size
				if (deltaHeight !== "disabled" && deltaHeight === false) {
					deltaHeight = nw.win.height - winState.height;
					// set correct size
					if (deltaHeight !== 0) {
						nw.win.resizeTo(winState.width, nw.win.height - deltaHeight);
					}
				}

				dumpWindowState();

			}, 500);

		}, false);
		*/

		// Close Aries
		$(".app-close").on("click", function () {

			nw.win.on("close", function() {
				saveWindowState();
				this.close(true);
			});

			nw.win.close();

		});

		// Set URL bar width
		$("#url-bar").css("width", nw.win.window.innerWidth - 190 + "px");

		// Set showcase width and height
		$("#aries-showcase, iframe").css({
			"width": nw.win.window.innerWidth,
			"height": nw.win.window.innerHeight - 31 + "px"
		});

		// Prevent popups from occurring
		nw.win.on("new-win-policy", function (frame, url, policy) {
			policy.ignore();
		});

		// Recalculate sizing of browser elements when scaling Aries
		// Need to make this better
		nw.win.on("resize", function () {

			// Set URL bar width
			$("#url-bar").css("width", nw.win.window.innerWidth - 190 + "px");

			// Set showcase width and height
			$("#aries-showcase, iframe").css({
				"width": nw.win.window.innerWidth,
				"height": nw.win.window.innerHeight - 31 + "px"
			});

		});

		$(document).on("click", ".tab-title", function () {

			var _tabID = $(this).parent().attr("data-tab");
			// var _tabID = $(this).attr("data-tab");
			var _gotIT = $("iframe" + _tabID).attr("src");
			var _title = $("iframe" + _tabID).contents().find("title").html();

			// Remove active states for other tabs/windows
			$("iframe").removeClass("active");
			$("#tab-wrapper button").removeClass("active");

			// Add active states for selected tab/window
			$("iframe" + _tabID).addClass("active");
			$(this).parent().addClass("active");

			// Populate address bar, tab title, and tab icon with
			// appropriate information
			$("#url-bar").val(_gotIT);
			$(".tab-title", this).text(_title);
			$(".tab-favicon", this).attr("src", getFavicon);

			// Don't show anything in address bar if on start page,
			// but put it in focus
			if (_gotIT === "start.html") {
				$("#url-bar").val("").focus();
			}

			console.log(_tabID);
			console.log(_gotIT);

		});

		$(document).on("click", ".tab-close", function () {

			var _tabID = $(this).parent().attr("data-tab");
			var _gotIT = $("iframe" + _tabID);

			var
			tab = $(this).closest("#tab-wrapper").find(".tab"),
			win = $(_gotIT).closest("#aries-showcase").find("iframe"),
			tabCount = tab.length,
			winCount = win.length;

			if ((tabCount == 1) && (winCount == 1)) { // if there is only one window left

				console.log("This is the last tab and window.");

				$(this).parent(".tab").addClass("active");
				$(_gotIT).attr("src", "start.html");
				$(_gotIT).addClass("active");

			} else if ((tabCount > 1) && (winCount > 1)) { // if there is more than one window

				if ($(this).parent().hasClass("active") && $(_gotIT).hasClass("active")) {

					var prevTab = $(this).parent(".tab").prev(".tab");
					var nextTab = $(this).parent(".tab").next(".tab");

					if (prevTab.length) {
						$(this).parent(".tab").prev(".tab").addClass("active");
					} else if (nextTab.length) {
						$(this).parent(".tab").next(".tab").addClass("active");
					}

					var prevWin = $(_gotIT).prev("iframe");
					var nextWin = $(_gotIT).next("iframe");

					if (prevWin.length) {
						$(_gotIT).prev("iframe").addClass("active");
					} else if (nextWin.length) {
						$(_gotIT).next("iframe").addClass("active");
					}

				}

				setTimeout(function () {
					var _location = $("iframe.active").attr("src");
					$("#url-bar").val(_location);
				}, 10);

				$(this).parent(".tab").remove();
				$(_gotIT).remove();

			} else if ((tabCount < 1) && (winCount < 1)) { // just create new tab and window

				console.log("Create new tab and window");

				$("#tab-wrapper").append("<button class='tab active' data-tab='#tab1' data-page='start.html'><img class='tab-favicon' type='image/x-icon' src='resources/images/favicon-default.png'><span class='tab-close'></span><span class='tab-title'>Start Page</span></button>");

				$("#aries-showcase").append("<iframe class='tabs-pane active' seamless='true' nwUserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.157 Aries/0.5-alpha' nwdisable nwfaketop onLoad='pageLoad();' id='tab1' src='start.html'></iframe>");

				if ($("#url-bar").val() == "start.html") {
					$("#url-bar").val("").focus();
				} else {
					$("#url-bar").val("").focus();
				}

			}

		});

		$(document).on("click", ".app-go-back", function () {
			window.history.back();
		});

		$(document).on("click", ".app-go-forth", function () {
			window.history.forward();
		});

		$(document).on("click", ".app-settings", function (e) {

			e.preventDefault();
			e.stopPropagation();

			$("#bt-menu").toggleClass("bt-menu--is-open");

			$(document).one("click", function(e) {
				if($("#bt-menu").has(e.target).length === 0) {
					$("#bt-menu").removeClass("bt-menu--is-open");
				}
			});

		});

		// Things to do before Aries starts
		onload = function () {

			// Reload tabs and windows of previous session
			$("#tab-wrapper .tab").each(function () {

				var _dataTab_ = $(this).attr("data-tab");
				var _dataPage_ = $(this).attr("data-page");

				// Set window URL via associated tab [data-page]
				$("#aries-showcase iframe" + _dataTab_).attr("src", _dataPage_);

				// Grab page title and attach to associated tab
				setTimeout(function () {

					var _currentTitle_ = $("#aries-showcase iframe" + _dataTab_).contents().find("title").html();

					$("#aries-showcase iframe").bind("load", function () {
						$(".tab[data-tab=" + _dataTab_ + "] .tab-title").text(_currentTitle_);
					});

					console.log("#3 — Tab Title: " + _currentTitle_);

				}, 50);

				console.log("#1 — Tab URL: " + _dataPage_);
				console.log("#2 — Tab ID: " + _dataTab_);

			});

			// Inject CSS into iframe
			/*
			$("iframe").each(function() {

				function injectCSS() {
					// $iframe.contents().find("head").append( $("<link/>", { rel: "stylesheet", href: "http://hikar.io/aries/browser.css", type: "text/css" }) );
					$iframe.contents().find("head").append(css);
				}

				var $iframe = $(this);

				var css = "";
				css += "<style>";
				css += "input, input:active, input:checked, input:focus, input[type='radio']:focus+label { outline: none !important; }";
				css += "</style>";

				$iframe.on("load", function() { injectCSS(); });

				injectCSS();

			});
			*/

			tabHover();

			// Let's get this shit started!
			nw.win.maximize();

			setTimeout(function () {
				nw.win.show();
			}, 75);

		};

		/*
		// This needs to be smoother. For now, just grab and drag window via URL bar
		$(".button-group").hover(function () { showTitlebar(); });
		$("#aries-showcase").hover(function () { hideTitlebar(); });
		*/

	});

	/*
	// This goes along with the code comment above that needs to be smoother
	var timeoutId;

	// Titlebar show functionality
	function showTitlebar() {

		if (!timeoutId) {
			timeoutId = window.setTimeout(function () {

				timeoutId = null; 

				$("#aries-titlebar").css({
					"margin": "0",
					"opacity": "1"
				});

			}, 950);
		}
	
	}

	// Titlebar hide functionality
	function hideTitlebar() {

		if (timeoutId) {
			window.clearTimeout(timeoutId);
			timeoutId = null;
		} else {
			$("#aries-titlebar").css({
				"margin": "0 0 -31px 0",
				"opacity": "0"
			});
		}

	}
	*/

	function tabHover() {

		$(".tab").each(function () {

			$(this).on("mouseenter", function () {
				$(".tab-favicon", this).hide();
				$(".tab-close", this).show();
			});

			$(this).on("mouseleave", function () {
				$(".tab-favicon", this).show();
				$(".tab-close", this).hide();
			});

		});

	}

	// Grab favicons for tabs
	var getFavicon = function () {

		var favicon, _tabID = $(".tab.active").attr("data-tab");
		var nodeList = $("iframe" + _tabID).contents().find("link");
		// var nodeListII = $("iframe" + _tabID).contents().find("meta");

		for (var i = 0; i < nodeList.length; i++) {
			// get any type of icon
			// meta property="og:image" content="http://images.apple.com/home/images/og.jpg"
			if ((nodeList[i].getAttribute("rel") == "icon") || (nodeList[i].getAttribute("rel") == "shortcut icon") || (nodeList[i].getAttribute("rel") == "apple-touch-icon")) {
				favicon = nodeList[i].href; // get absolute path
			} // else { favicon = "resources/images/favicon-default.png"; }

			/*
			if (nodeListII[i].getAttribute("property") == "og:image") {
				favicon = nodeListII[i].content;
			}
			*/
		}

		return favicon;

	};

	function pageLoad() {

		NProgress.start();

		$("iframe.active").bind("load", function () {

			var baseURL = this.contentWindow.location.href;
			var currentTitle = $(this).contents().find("title").html();
			var currentURL = $("#url-bar").val(baseURL);

			$("#url-bar").val(baseURL);
			$("button.active .tab-title").html(currentTitle);
			$("button.active .tab-favicon").attr("src", getFavicon);

			// Remove focus from URL bar
			// TODO: focus on first input field in iframe.
			//////// if none exist, focus on iframe.
			$(this).focus();

			// Start progress bar when clicking <a> inside window
			var iframe = $(this).contents();

			iframe.find("a").not("a[href*='#'], a[href*='%'], a[href*='javascript:;']").bind("click", function() {

				// Hamburger menu on Dockyard.com has no href
				if ($(this).attr("href").length === 0) { return false; }

				NProgress.start();

				$("button.active .tab-title").html(currentTitle);
				$("button.active .tab-favicon").attr("src", getFavicon);

				var _location = $(this)[0].href;
				$("iframe.active").attr("src", _location);

				console.log("Hmm, " + _location);

			});

			// Don't show anything in address bar if on start page,
			// but put it in focus
			if ($("#url-bar").val() == "app://aries/app.nw/start.html") {
				$("#url-bar").val("").focus();
			}

			// Notification when on certain sites
			var uri = new URI(baseURL);

			// Uncomment below to find hostname parameter
			// console.log(uri.hostname());

			if (uri.hostname() == "www.facebook.com") {
				var fbNotify = iframe.find("#notificationsCountValue").text();

				if (fbNotify > 0) {
					$("button.active .tab-favicon").before("<span class='notification-count'>"+ fbNotify +"</span>");
					// $(".notification-count").css("opacity", "1");
				} else {
					$(".notification-count").css("opacity", "0");
				}
			}

			if (uri.hostname() == "www.deviantart.com") {
				var daNotify = $.trim(iframe.find("#oh-menu-split .oh-l").text());

				if (daNotify !== "undefined") {
					$("button.active .tab-favicon").before("<span class='notification-count'>"+ daNotify +"</span>");
					// $(".notification-count").css("opacity", "1");
				} else {
					// $(".notification-count").css("opacity", "0");
				}
			}

		});

		$("iframe.active").ready(function () {

			var nw = {
				gui: require("nw.gui"), // Load native UI library
				win: require("nw.gui").Window.get(), // Get the current window
				platform: require("os").platform,
				spawn: require("child_process").spawn,
				exec: require("child_process").exec,
				fs: require("fs"),
				path: require("path")
			};

			NProgress.done();

		});

	}

	// Go to a website, or search for something
	function goThere() {

		// pageLoad();

		// 651 TLDs!
		// TLD list: https://data.iana.org/TLD/tlds-alpha-by-domain.txt
		// used http://convertcase.net to take IANA's list out of caps
		// Version 2014071900, Last Updated Sat Jul 19 07:07:01 2014 UTC

		var url = /(\S+\.(ac|academy|accountants|active|actor|ad|ae|aero|af|ag|agency|ai|airforce|al|am|an|ao|aq|ar|archi|army|arpa|as|asia|associates|at|attorney|au|auction|audio|autos|aw|ax|axa|az|ba|bar|bargains|bayern|bb|bd|be|beer|berlin|best|bf|bg|bh|bi|bid|bike|bio|biz|bj|black|blackfriday|blue|bm|bmw|bn|bo|boutique|br|brussels|bs|bt|build|builders|buzz|bv|bw|by|bz|bzh|ca|cab|camera|camp|cancerresearch|capetown|capital|cards|care|career|careers|cash|cat|catering|cc|cd|center|ceo|cf|cg|ch|cheap|christmas|church|ci|citic|city|ck|cl|claims|cleaning|clinic|clothing|club|cm|cn|co|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|cr|credit|creditcard|cruises|cu|cuisinella|cv|cw|cx|cy|cz|dance|dating|de|deals|degree|democrat|dental|dentist|desi|diamonds|digital|direct|directory|discount|dj|dk|dm|dnp|do|domains|durban|dz|ec|edu|education|ee|eg|email|engineer|engineering|enterprises|equipment|er|es|estate|et|eu|eus|events|exchange|expert|exposed|fail|farm|feedback|fi|finance|financial|fish|fishing|fitness|fj|fk|flights|florist|fm|fo|foo|foundation|fr|frogans|fund|furniture|futbol|ga|gal|gallery|gb|gd|ge|gent|gf|gg|gh|gi|gift|gives|gl|glass|global|globo|gm|gmo|gn|gop|gov|gp|gq|gr|graphics|gratis|green|gripe|gs|gt|gu|guide|guitars|guru|gw|gy|hamburg|haus|hiphop|hiv|hk|hm|hn|holdings|holiday|homes|horse|host|house|hr|ht|hu|id|ie|il|im|immobilien|in|industries|info|ink|institute|insure|int|international|investments|io|iq|ir|is|it|je|jetzt|jm|jo|jobs|joburg|jp|juegos|kaufen|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|kp|kr|krd|kred|kw|ky|kz|la|lacaixa|land|lawyer|lb|lc|lease|lgbt|li|life|lighting|limited|limo|link|lk|loans|london|lotto|lr|ls|lt|lu|luxe|luxury|lv|ly|ma|maison|management|mango|market|marketing|mc|md|me|media|meet|melbourne|menu|mg|mh|miami|mil|mini|mk|ml|mm|mn|mo|mobi|moda|moe|monash|mortgage|moscow|motorcycles|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|navy|nc|ne|net|neustar|nf|ng|ngo|nhk|ni|ninja|nl|no|np|nr|nra|nrw|nu|nyc|nz|okinawa|om|onl|org|organic|ovh|pa|paris|partners|parts|pe|pf|pg|ph|photo|photography|photos|physio|pics|pictures|pink|pk|pl|place|plumbing|pm|pn|post|pr|press|pro|productions|properties|ps|pt|pub|pw|py|qa|qpon|quebec|re|recipes|red|rehab|reise|reisen|ren|rentals|repair|report|republican|rest|reviews|rich|rio|ro|rocks|rodeo|rs|ru|ruhr|rw|ryukyu|sa|saarland|sb|sc|scb|schmidt|schule|scot|sd|se|services|sexy|sg|sh|shiksha|shoes|si|singles|sj|sk|sl|sm|sn|so|social|software|sohu|solar|solutions|soy|space|spiegel|sr|st|su|supplies|supply|support|surf|surgery|suzuki|sv|sx|sy|systems|sz|tattoo|tax|tc|td|technology|tel|tf|tg|th|tienda|tips|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|town|toys|tp|tr|trade|training|travel|tt|tv|tw|tz|ua|ug|uk|university|uno|us|uy|uz|va|vacations|vc|ve|vegas|ventures|versicherung|vet|vg|vi|viajes|villas|vision|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu|wang|watch|webcam|website|wed|wf|whoswho|wien|wiki|works|ws|wtc|wtf|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--45brj9c|xn--4gbrim|xn--55qw42g|xn--55qx5d|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80asehdb|xn--80aswg|xn--90a3ac|xn--c1avg|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czr694b|xn--czru2d|xn--d1acj3b|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--gecrj9c|xn--h2brj9c|xn--i1b6b1a6a2e|xn--io0a7i|xn--j1amh|xn--j6w193g|xn--kprw13d|xn--kpry57d|xn--kput3i|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a4f16a|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbayh7gpa|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgberp4a5d4ar|xn--mgbx4cd0ab|xn--ngbc5azd|xn--nqv7f|xn--nqv7fs00ema|xn--o3cw4h|xn--ogbpf8fl|xn--p1ai|xn--pgbs0dh|xn--q9jyb4c|xn--rhqv96g|xn--s9brj9c|xn--ses554g|xn--unup4y|xn--wgbh1c|xn--wgbl6a|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xxx|xyz|yachts|yandex|ye|yokohama|yt|za|zm|zone|zw)|([0-9])(\/\S+)?)/;

		var a = url.test($("#url-bar").val());

		// check to see if input is a URL
		// apparently, encodeURIComponent fucks up URLs. Hooray for learning!
		var encodeURL = "http://" + encodeURI($("#url-bar").val());

		$("iframe.active").attr("src", encodeURL);
		$("button.active").attr("data-page", encodeURL);

		setTimeout(function () {

			var currentTitle = $("iframe.active").contents().find("title").html(); // get current iframe title

			$("button.active .tab-title").html(currentTitle);
			$("button.active .tab-favicon").attr("src", getFavicon);

		}, 500);

		if ( url.test($("#url-bar").val()) === true ) {
			console.log(a); // should be true, go to actual site
		} else {

			// looks like input isn't a URL, so search!
			var encodeSearch = "https://duckduckgo.com/?q=" + encodeURIComponent($("#url-bar").val());

			$("iframe.active").attr("src", encodeSearch);
			$("button.active").attr("data-page", encodeSearch);

			console.log(a); // should be false, search DDG

		}

	}

	console.log("Platform: " + process.platform);
	console.log("Processor architecture: " + process.arch);
	console.log("PID: " + process.pid);

	// Error Handling
	process.setMaxListeners(0);

	process.on("uncaughtException", function(error) {
	  console.log("Aries Error: " + error);
	});

	// process.on("net::ERR_NAME_NOT_RESOLVED", function(error) { console.log("Aries Error: " + error); });
