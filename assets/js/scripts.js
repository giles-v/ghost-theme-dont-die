"use strict";

$.fn.fitVids = function(t) {
  var e = {
    customSelector: null
  };
  if (!document.getElementById("fit-vids-style")) {
    var i = document.head || document.getElementsByTagName("head")[0],
      r = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
      o = document.createElement("div");
    o.innerHTML = '<p>x</p><style id="fit-vids-style">' + r + "</style>", i.appendChild(o.childNodes[1])
  }
  return t && $.extend(e, t), this.each(function() {
    var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
    e.customSelector && t.push(e.customSelector);
    var i = $(this).find(t.join(","));
    i = i.not("object object"), i.each(function() {
      var t = $(this);
      if (!("embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
        var e = "object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
          i = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10),
          r = e / i;
        if (!t.attr("id")) {
          var o = "fitvid" + Math.floor(999999 * Math.random());
          t.attr("id", o)
        }
        t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * r + "%"), t.removeAttr("height").removeAttr("width")
      }
    })
  })
};

function PopupCenter(url, title, w, h) {
	// Fixes dual-screen position						 Most browsers	  Firefox
	var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

	var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	var top = ((height / 2) - (h / 2)) + dualScreenTop;
	var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	// Puts focus on the newWindow
	if (window.focus) {
		newWindow.focus();
	}
}

$(document).ready(function() {

	$('.main-header__toggle, .main-header__overlay').on('click', function (e) {
		e.preventDefault();
		$('body').toggleClass('menu-open');
	});

	$(".format-video").fitVids();



	$(".social-share a").click(function(event) {
		var el = $(this);
		PopupCenter(el.attr("href"), el.find(".visually-hidden").text(), 600, 300);
		event.preventDefault();
	});

  var cycleTopics = $('.cycling-topics');
  var current = cycleTopics.find('.visible');
  var letterInterval = 50;
  var delayAfterDelete = 700;
  var delayAfterType = 1500;
  function cycleHeadTopics() {
    var next = current.next();
    if (!next.length) next = cycleTopics.find(':first-child');

    hideTopic(current, function() {
    	showTopic(next, function() {
    		current = next;
    		setTimeout(cycleHeadTopics, delayAfterType);
    	})
    });
  }
  function hideTopic(el, cb) {
  	el.attr('data-text', el.text());
  	var typeInterval = setInterval(function() {
  		var newText = el.text().split('').slice(0, -1).join('');
  		el.text(newText);
  		if (newText == '') {
  			clearInterval(typeInterval);
  			el.removeClass('visible');
  			setTimeout(cb, delayAfterDelete);
  		}
  	}, letterInterval);
  }
  function showTopic(el, cb) {
  	if (el.text()) {
  		el.attr('data-text', el.text());
  		el.text('');
  	}
  	el.addClass('visible');
  	var allChars = el.attr('data-text').split('');
  	var typeInterval = setInterval(function() {
  		var newText = el.text() + allChars.shift();
  		el.text(newText);
  		if (allChars.length === 0) {
  			clearInterval(typeInterval);
  			cb();
  		}
  	}, letterInterval);
  }
  if (cycleTopics.length) {
  	setTimeout(cycleHeadTopics, delayAfterType);
  }
});
