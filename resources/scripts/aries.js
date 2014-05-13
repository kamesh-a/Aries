
	// Aries.js
	// @IdeasNeverCease
	// ========================================================

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
		};

		var $vW = $(window).width(), $vH = $(window).height();

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

		// Set URL bar width
		$("#url-bar").css("width", nw.win.window.innerWidth - 190 + "px");

		// Set showcase width and height
		$("#aries-showcase, iframe").css({
			"width": nw.win.window.innerWidth,
			"height": nw.win.window.innerHeight - 31 + "px"
		});

		// Recalculate sizing of browser elements when scaling Aries
		nw.win.on("resize", function () {

			// Set URL bar width
			$("#url-bar").css("width", nw.win.window.innerWidth - 190 + "px");

			// Set showcase width and height
			$("#aries-showcase, iframe").css({
				"width": nw.win.window.innerWidth,
				"height": nw.win.window.innerHeight - 31 + "px"
			});

		});

		// Keyboard shortcuts courtesy of Mousetrap. Holla!
		// https://github.com/ccampbell/mousetrap
		Mousetrap.bind(["command+t", "ctrl+t"], function () {

			// Remove focus from other tabs and windows
			$(".tab, .tabs-pane").removeClass("active");

			$("#tab-wrapper").append("<button class='tab active' data-page='start.html'><img class='tab-favicon' type='image/x-icon' src='resources/images/favicon-default.png'><span class='tab-close'></span><span class='tab-title'>Start Page</span></button>");
			$("#aries-showcase").append("<iframe class='tabs-pane active' src='start.html' seamless='true' nwUserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Aries/0.1.0' nwdisable nwfaketop></iframe>");

			$("#url-bar").val("app://aries/start.html");

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

		});

		// Reload current iframe page
		Mousetrap.bind(["command+r", "ctrl+r"], function () {

			$("iframe.active").each(function () {
			  this.contentWindow.location.reload(true);
			});

			console.log("Reloaded window");

		});

		/*
		$("#aries-showcase iframe").each(function () {

			// $(document).on("load", "#aries-showcase iframe", function () {
			$("iframe").load(function () {

				var currentURL = $("#aries-showcase iframe.active").get(0).contentWindow.location; // get current iframe URL
				var currentTitle = $("#aries-showcase iframe.active").contents().find("title").html(); // get current iframe title

				$("#url-bar").val(currentURL);
				$("#tab-wrapper button.active").text(currentTitle);

				var _windowID_ = $(this).attr("id");
				var _windowURL_ = $(this).attr("src");
				// var _windowTitle_ = $(this).contents().find("title").html();
				var _tabTitle_ = $("#" + _windowID_);

				$("#tab-wrapper button").attr("data-tab", _tabTitle_);
				// $("#tab-wrapper button").attr("data-tab", "#" + _windowID_);
				
				console.log("iframe window ID " + _windowID_);
				console.log("iframe window URL " + _windowURL_);
				// console.log("iframe tab title " + _tabTitle_);
				// console.log("iframe window URL " + _windowTitle_);

			});

		});

		$(document).on("load", "iframe.active", function () {
		});
		*/

		$(document).on("click", ".tab", function () {

			var _tabID = $(this).attr("data-tab");
			var _gotIT = $("iframe" + _tabID).attr("src");
			// var _windowID = $(this).attr("data-page");

			// var currentURL = $("#aries-showcase iframe.active").get(0).contentWindow.location; // get current iframe URL
			var currentURL = $("#aries-showcase iframe.active").attr("src"); // get current iframe URL
			var currentTitle = $("#aries-showcase iframe.active").contents().find("title").html(); // get current iframe title
			var currentIcon = $("#aries-showcase iframe.active").contents().find("link[rel='shortcut icon']").attr("href");

			// rel="shortcut icon" // var url = $('#aries-showcase iframe.active link[rel="shortcut icon"]')[0].href;

			$("#url-bar").val(currentURL);
			$("#tab-wrapper button.active .tab-title").text(currentTitle);
			$("#tab-wrapper button.active .tab-favicon").attr("src", currentIcon);

			console.log(_tabID);
			console.log(_gotIT);
			console.log(currentIcon);
			// console.log(_windowID);

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

			$("#bt-menu").toggleClass("bt-menu-open");

			$(document).one("click", function(e) {
				if($("#bt-menu").has(e.target).length === 0) {
					$("#bt-menu").removeClass("bt-menu-open");
				}
			});

		});

		/*
		// node-webkit takes over this shortcut at the moment
		// Close current iframe page
		Mousetrap.bind(["command+w", "ctrl+w"], function () {

			$("iframe.active").each(function () {
				this.remove();
			});

			console.log("Closed window");

		});
		*/

		// Bring up Developer Tools
		Mousetrap.bind(["command+u", "ctrl+u"], function () {

			nw.win.showDevTools("iframe");
			console.log("Dev Mode, ON");

		});

		// Things to do before Aries starts
		onload = function() {

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

					console.log("New tab shit #3: " + _currentTitle_);

				}, 50);

				console.log("New tab shit #1: " + _dataPage_);
				console.log("New tab shit #2: " + _dataTab_);

			});

			tabHover();

			// Let's get this shit started!
			nw.win.maximize();
			nw.win.show();

		}

		// $("#url-bar").focus();

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

	// Go to a website, or search for something
	function goThere() {

		// var search = /\s+/; // regex to look for spaces in input

		// 567 TLDs!
		// TLD list: https://data.iana.org/TLD/tlds-alpha-by-domain.txt
		// used http://convertcase.net to take IANA's list out of caps
		// var pattern = new RegExp('^((http|https|ftp|gopher|ssh|telnet|localhost):\/\/)?'+ // protocol
		var url = /(\S+\.(ac|academy|actor|ad|ae|aero|af|ag|agency|ai|airforce|al|am|an|ao|aq|ar|archi|arpa|as|asia|associates|at|au|aw|ax|axa|az|ba|bar|bargains|bayern|bb|bd|be|berlin|best|bf|bg|bh|bi|bid|bike|biz|bj|black|blackfriday|blue|bm|bn|bo|boutique|br|bs|bt|build|builders|buzz|bv|bw|by|bz|ca|cab|camera|camp|capital|cards|care|career|careers|cash|cat|catering|cc|cd|center|ceo|cf|cg|ch|cheap|christmas|ci|citic|ck|cl|cleaning|clinic|clothing|club|cm|cn|co|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|cr|creditcard|cruises|cu|cv|cw|cx|cy|cz|dance|dating|de|democrat|dental|desi|diamonds|directory|discount|dj|dk|dm|dnp|do|domains|dz|ec|edu|education|ee|eg|email|engineering|enterprises|equipment|er|es|estate|et|eu|eus|events|exchange|expert|exposed|fail|farm|feedback|fi|finance|financial|fish|fishing|fitness|fj|fk|flights|florist|fm|fo|foo|foundation|fr|frogans|fund|furniture|futbol|ga|gal|gallery|gb|gd|ge|gf|gg|gh|gi|gift|gl|glass|globo|gm|gmo|gn|gop|gov|gp|gq|gr|graphics|gratis|gripe|gs|gt|gu|guitars|guru|gw|gy|haus|hk|hm|hn|holdings|holiday|horse|house|hr|ht|hu|id|ie|il|im|immobilien|in|industries|info|ink|institute|insure|int|international|investments|io|iq|ir|is|it|je|jetzt|jm|jo|jobs|jp|kaufen|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|kp|kr|kred|kw|ky|kz|la|land|lb|lc|lease|li|lighting|limited|limo|link|lk|london|lr|ls|lt|lu|luxury|lv|ly|ma|maison|management|mango|marketing|mc|md|me|media|meet|menu|mg|mh|miami|mil|mk|ml|mm|mn|mo|mobi|moda|moe|monash|moscow|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|nc|ne|net|neustar|nf|ng|ni|ninja|nl|no|np|nr|nu|nyc|nz|okinawa|om|onl|org|pa|paris|partners|parts|pe|pf|pg|ph|photo|photography|photos|pics|pictures|pink|pk|pl|plumbing|pm|pn|post|pr|pro|productions|properties|ps|pt|pub|pw|py|qa|qpon|quebec|re|recipes|red|reisen|ren|rentals|repair|report|rest|reviews|rich|ro|rocks|rodeo|rs|ru|ruhr|rw|ryukyu|sa|saarland|sb|sc|schule|sd|se|services|sexy|sg|sh|shiksha|shoes|si|singles|sj|sk|sl|sm|sn|so|social|sohu|solar|solutions|soy|sr|st|su|supplies|supply|support|surgery|sv|sx|sy|systems|sz|tattoo|tax|tc|td|technology|tel|tf|tg|th|tienda|tips|tj|tk|tl|tm|tn|to|today|tokyo|tools|town|toys|tp|tr|trade|training|travel|tt|tv|tw|tz|ua|ug|uk|university|uno|us|uy|uz|va|vacations|vc|ve|vegas|ventures|vg|vi|viajes|villas|vision|vn|vodka|vote|voting|voto|voyage|vu|wang|watch|webcam|wed|wf|wien|wiki|works|ws|wtc|wtf|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--45brj9c|xn--55qw42g|xn--55qx5d|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80asehdb|xn--80aswg|xn--90a3ac|xn--c1avg|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czru2d|xn--d1acj3b|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--gecrj9c|xn--h2brj9c|xn--i1b6b1a6a2e|xn--io0a7i|xn--j1amh|xn--j6w193g|xn--kprw13d|xn--kpry57d|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a4f16a|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbayh7gpa|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgberp4a5d4ar|xn--mgbx4cd0ab|xn--ngbc5azd|xn--nqv7f|xn--nqv7fs00ema|xn--o3cw4h|xn--ogbpf8fl|xn--p1ai|xn--pgbs0dh|xn--q9jyb4c|xn--rhqv96g|xn--s9brj9c|xn--ses554g|xn--unup4y|xn--wgbh1c|xn--wgbl6a|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xxx|xyz|ye|yokohama|yt|za|zm|zone|zw)(\/\S+)?)/;
		// var url = /^(ht|f)tp(s?)\:\/\/(([a-zA-Z0-9\-\._]+(\.[a-zA-Z0-9\-\._]+)+)|localhost)(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?([\d\w\.\/\%\+\-\=\&amp;\?\:\\\&quot;\'\,\|\~\;]*)$/;
		var a = url.test($("#url-bar").val());

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
			var encodeSearch = "https://next.duckduckgo.com/?q=" + encodeURIComponent($("#url-bar").val());

			$("iframe.active").attr("src", encodeSearch);
			$("button.active").attr("data-page", encodeSearch);

			console.log(a); // should be true, search DDG

		}

	}
