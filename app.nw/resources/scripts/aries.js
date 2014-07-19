
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
		}, os = require('os');

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
					$("#aries-showcase").append("<iframe class='tabs-pane active' seamless='true' nwUserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.113 Aries/0.2-alpha' nwdisable nwfaketop onLoad='pageLoad();' src='start.html'></iframe>");

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

		// Build initial iframe
		_iframe = "";
		_iframe += "<iframe class='tabs-pane active'";
		_iframe += "seamless='true'";
		_iframe += "nwUserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.113 Aries/0.2-alpha'";
		_iframe += "nwdisable nwfaketop ";
		_iframe += "onLoad='pageLoad();'";
		_iframe += "id='tab1'>";

		$("#aries-showcase").append(_iframe);

		// Minimize Aries
		$(".app-minimize").on("click", function () { nw.win.minimize(); });

		// Un/Maximize Aries
		$(".app-maximize").on("click", function () { nw.win.maximize(); });

		// Close Aries
		$(".app-close").on("click", function () { nw.win.close(); });

		// Set URL bar width
		$("#url-bar").css("width", nw.win.window.innerWidth - 190 + "px");

		// Set showcase width and height
		$("#aries-showcase, iframe").css({
			"width": nw.win.window.innerWidth,
			"height": nw.win.window.innerHeight - 31 + "px"
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

		$(document).on("click", ".tab", function () {

			var _tabID = $(this).attr("data-tab");
			var _gotIT = $("iframe" + _tabID).attr("src");
			var _title = $("iframe" + _tabID).contents().find("title").html();

			// Remove active states for other tabs/windows
			$("iframe").removeClass("active");
			$("#tab-wrapper button").removeClass("active");

			// Add active states for selected tab/window
			$("iframe" + _tabID).addClass("active");
			$(this).addClass("active");

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

			// Make sure the next tab and window take focus
			$(this).parent().next(".tab").addClass("active");
			$(_gotIT).next("iframe").addClass("active");

			// Close the current tab and window
			$(this).parent().remove();
			$(_gotIT).remove();

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

			tabHover();

			// Let's get this shit started!
			nw.win.maximize();
			nw.win.show();

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

		for (var i = 0; i < nodeList.length; i++) {
			// get any type of icon
			if ((nodeList[i].getAttribute("rel") == "icon") || (nodeList[i].getAttribute("rel") == "shortcut icon") || (nodeList[i].getAttribute("rel") == "apple-touch-icon")) {
				favicon = nodeList[i].href; // get absolute path
			}
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

			// Start progress bar when clicking <a> inside window
			var iframe = $(this).contents();

			iframe.find("a").not("a[href*='#'], a[href*='%'], a").bind("click", function() {

				NProgress.start();

				$("button.active .tab-title").html(currentTitle);
				$("button.active .tab-favicon").attr("src", getFavicon);

				var _location = $(this)[0].href;
				$("iframe.active").attr("src", _location);

				console.log("Hmm, " + _location);

			});

			/*
			// Don't show anything in address bar if on start page,
			// but put it in focus
			if (currentURL === "start.html" || "app://aries/app.nw/start.html") {
				$("#url-bar").val("").focus();
			}
			*/

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

		/*
		// Don't show anything in address bar if on start page,
		// but put it in focus
		if ($("#url-bar").val() === "start.html" || "app://aries/app.nw/start.html") {
			$("#url-bar").val("").focus();
		}
		*/

	}

	// Go to a website, or search for something
	function goThere() {

		// var search = /\s+/; // regex to look for spaces in input

		// 567 TLDs!
		// TLD list: https://data.iana.org/TLD/tlds-alpha-by-domain.txt
		// used http://convertcase.net to take IANA's list out of caps
		// var pattern = new RegExp('^((http|https|ftp|gopher|ssh|telnet|localhost):\/\/)?'+ // protocol
		// var url = /(\S+\.(ac|academy|actor|ad|ae|aero|af|ag|agency|ai|airforce|al|am|an|ao|aq|ar|archi|arpa|as|asia|associates|at|au|aw|ax|axa|az|ba|bar|bargains|bayern|bb|bd|be|berlin|best|bf|bg|bh|bi|bid|bike|biz|bj|black|blackfriday|blue|bm|bn|bo|boutique|br|bs|bt|build|builders|buzz|bv|bw|by|bz|ca|cab|camera|camp|capital|cards|care|career|careers|cash|cat|catering|cc|cd|center|ceo|cf|cg|ch|cheap|christmas|ci|citic|ck|cl|cleaning|clinic|clothing|club|cm|cn|co|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|cr|creditcard|cruises|cu|cv|cw|cx|cy|cz|dance|dating|de|democrat|dental|desi|diamonds|directory|discount|dj|dk|dm|dnp|do|domains|dz|ec|edu|education|ee|eg|email|engineering|enterprises|equipment|er|es|estate|et|eu|eus|events|exchange|expert|exposed|fail|farm|feedback|fi|finance|financial|fish|fishing|fitness|fj|fk|flights|florist|fm|fo|foo|foundation|fr|frogans|fund|furniture|futbol|ga|gal|gallery|gb|gd|ge|gf|gg|gh|gi|gift|gl|glass|globo|gm|gmo|gn|gop|gov|gp|gq|gr|graphics|gratis|gripe|gs|gt|gu|guitars|guru|gw|gy|haus|hk|hm|hn|holdings|holiday|horse|house|hr|ht|hu|id|ie|il|im|immobilien|in|industries|info|ink|institute|insure|int|international|investments|io|iq|ir|is|it|je|jetzt|jm|jo|jobs|jp|kaufen|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|kp|kr|kred|kw|ky|kz|la|land|lb|lc|lease|li|lighting|limited|limo|link|lk|london|lr|ls|lt|lu|luxury|lv|ly|ma|maison|management|mango|marketing|mc|md|me|media|meet|menu|mg|mh|miami|mil|mk|ml|mm|mn|mo|mobi|moda|moe|monash|moscow|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|nc|ne|net|neustar|nf|ng|ni|ninja|nl|no|np|nr|nu|nyc|nz|okinawa|om|onl|org|pa|paris|partners|parts|pe|pf|pg|ph|photo|photography|photos|pics|pictures|pink|pk|pl|plumbing|pm|pn|post|pr|pro|productions|properties|ps|pt|pub|pw|py|qa|qpon|quebec|re|recipes|red|reisen|ren|rentals|repair|report|rest|reviews|rich|ro|rocks|rodeo|rs|ru|ruhr|rw|ryukyu|sa|saarland|sb|sc|schule|sd|se|services|sexy|sg|sh|shiksha|shoes|si|singles|sj|sk|sl|sm|sn|so|social|sohu|solar|solutions|soy|sr|st|su|supplies|supply|support|surgery|sv|sx|sy|systems|sz|tattoo|tax|tc|td|technology|tel|tf|tg|th|tienda|tips|tj|tk|tl|tm|tn|to|today|tokyo|tools|town|toys|tp|tr|trade|training|travel|tt|tv|tw|tz|ua|ug|uk|university|uno|us|uy|uz|va|vacations|vc|ve|vegas|ventures|vg|vi|viajes|villas|vision|vn|vodka|vote|voting|voto|voyage|vu|wang|watch|webcam|wed|wf|wien|wiki|works|ws|wtc|wtf|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--45brj9c|xn--55qw42g|xn--55qx5d|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80asehdb|xn--80aswg|xn--90a3ac|xn--c1avg|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czru2d|xn--d1acj3b|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--gecrj9c|xn--h2brj9c|xn--i1b6b1a6a2e|xn--io0a7i|xn--j1amh|xn--j6w193g|xn--kprw13d|xn--kpry57d|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a4f16a|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbayh7gpa|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgberp4a5d4ar|xn--mgbx4cd0ab|xn--ngbc5azd|xn--nqv7f|xn--nqv7fs00ema|xn--o3cw4h|xn--ogbpf8fl|xn--p1ai|xn--pgbs0dh|xn--q9jyb4c|xn--rhqv96g|xn--s9brj9c|xn--ses554g|xn--unup4y|xn--wgbh1c|xn--wgbl6a|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xxx|xyz|ye|yokohama|yt|za|zm|zone|zw)(\/\S+)?)/;
		// var url = /^(ht|f)tp(s?)\:\/\/(([a-zA-Z0-9\-\._]+(\.[a-zA-Z0-9\-\._]+)+)|localhost)(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?([\d\w\.\/\%\+\-\=\&amp;\?\:\\\&quot;\'\,\|\~\;]*)$/;
		// John Gruber's URL regex, modified for JavaScript | http://stackoverflow.com/a/6927878/1167646
		// var url = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
		// var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var url = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.‌​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[‌​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1‌​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00‌​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u‌​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

		var a = url.test($("#url-bar").val());

		// check to see if input is a URL
		// apparently, encodeURIComponent fucks up URLs. Hooray for learning!
		var encodeURL = "http://" + encodeURI($("#url-bar").val());
		// var encodeURL = encodeURI($("#url-bar").val());

		$("iframe.active").attr("src", encodeURL);
		$("button.active").attr("data-page", encodeURL);

		console.log(a); // should be true, go to actual site

		setTimeout(function () {

			var currentTitle = $("iframe.active").contents().find("title").html(); // get current iframe title

			$("button.active .tab-title").html(currentTitle);
			$("button.active .tab-favicon").attr("src", getFavicon);

		}, 500);

		/*
		// if this is active, can't access sites like localhost:4000
		if (url.test($("#url-bar").val())) {

			// check to see if input is a URL
			// apparently, encodeURIComponent fucks up URLs. Hooray for learning!
			var encodeURL = "http://" + encodeURI($("#url-bar").val());
			// var encodeURL = encodeURI($("#url-bar").val());

			$("iframe.active").attr("src", encodeURL);
			$("button.active").attr("data-page", encodeURL);

			console.log(a); // should be true, go to actual site

		} else {

			// looks like input isn't a URL, so search!
			var encodeSearch = "https://duckduckgo.com/?q=" + encodeURIComponent($("#url-bar").val());

			$("iframe.active").attr("src", encodeSearch);
			$("button.active").attr("data-page", encodeSearch);

			console.log(a); // should be true, search DDG

		}
		*/

	}

	console.log("Platform: " + process.platform);
	console.log("Processor architecture: " + process.arch);
	console.log("PID: " + process.pid);

	// Error Handling
	process.setMaxListeners(0);

	process.on("uncaughtException", function(error) {
	  console.log("Aries Error: " + error);
	});
