! function($) {

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
    }
}(window.jQuery || window.Zepto),

function($) {
    $.fn.fitText = function(t, e) {
        var i = t || 1,
            r = $.extend({
                minFontSize: Number.NEGATIVE_INFINITY,
                maxFontSize: Number.POSITIVE_INFINITY
            }, e);
        return this.each(function() {
            var t = $(this),
                e = function() {
                    t.css("font-size", Math.max(Math.min(t.width() / (10 * i), parseFloat(r.maxFontSize)), parseFloat(r.minFontSize)))
                };
            e(), $(window).on("resize.fittext orientationchange.fittext", e)
        })
    }
}
(jQuery);
