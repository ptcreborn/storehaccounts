if (!window.location.href.includes('/p/') && window.location.href.includes('.html') && window.location.href.includes('/')) {
    var randomRelatedIndex,
    showRelatedPost;
    (function (n, m, k) {
        var d = {
            widgetTitle: "<h3 class='title'>Related Posts</h3>",
            widgetStyle: 1,
            homePage: "http://www.jagodesain.com",
            numPosts: 7,
            summaryLength: 320,
            titleLength: "auto",
            thumbnailSize: 200,
            noImage: "data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
            containerId: "related-posts",
            newTabLink: true,
            moreText: "Read more",
            callBack: function () {}
        };
        for (var f in relatedPostConfig) {
            d[f] = (relatedPostConfig[f] == "undefined") ? d[f] : relatedPostConfig[f]
        }
        var j = function (a) {
            var b = m.createElement("script");
            b.async = "async";
            b.rel = "preload";
            b.src = a;
            k.appendChild(b)
        },
        o = function (b, a) {
            return Math.floor(Math.random() * (a - b + 1)) + b
        },
        l = function (a) {
            var p = a.length,
            c,
            b;
            if (p === 0) {
                return false
            }
            while (--p) {
                c = Math.floor(Math.random() * (p + 1));
                b = a[p];
                a[p] = a[c];
                a[c] = b
            }
            return a
        },
        e = (typeof labelArray == "object" && labelArray.length > 0) ? "/-/" + l(labelArray)[0] : "",
        h = function (b) {
            var c = b.feed.openSearch$totalResults.$t - d.numPosts,
            a = o(1, (c > 0 ? c : 1));
            j(d.homePage.replace(/\/$/, "") + "/feeds/posts/summary" + e + "?alt=json-in-script&orderby=updated&start-index=" + a + "&max-results=" + d.numPosts + "&callback=showRelatedPost");
        },
        g = function (z) {
            var s = document.getElementById(d.containerId),
            x = l(z.feed.entry),
            A = d.widgetStyle,
            c = d.widgetTitle + '<ul class="s-' + A + ' scrlH">',
            b = d.newTabLink ? ' target="_blank"' : "",
            y = d.moreText,
            v,
            t,
            w,
            r,
            u;
            if (!s) {
                return
            }
            for (var q = 0; q < d.numPosts; q++) {
                if (q == x.length) {
                    break
                }
                t = x[q].title.$t;
                w = (d.titleLength !== "auto" && d.titleLength < t.length) ? t.substring(0, d.titleLength) + "&hellip;" : t;
                r = ("media$thumbnail" in x[q] && d.thumbnailSize !== false) ? x[q].media$thumbnail.url.replace(/.*?:\/\//g, "//").replace(/\/s[0-9]+(\-c)?/, "/s" + d.thumbnailSize).replace(/\=s[0-9]+(\-c)?/, "=s" + d.thumbnailSize) : d.noImage;
                month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                date = x[q].published.$t.substring(0, 10);
                Y = date.substring(0, 4);
                m = date.substring(5, 7);
                D = date.substring(9, 10);
                M = month[parseInt(m - 1)];
                u = ("summary" in x[q] && d.summaryLength > 0) ? x[q].summary.$t.replace(/<br ?\/?>/g, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, d.summaryLength) + "&hellip;" : "";
                for (var p = 0, a = x[q].link.length; p < a; p++) {
                    v = (x[q].link[p].rel == "alternate") ? x[q].link[p].href : "#"
                }
                if (A == 2) {
                    c += '<li><div class="i"><div class="pThmb"><a class="thmb" aria-label="' + w + '" href="' + v + '" title="' + t + '"><div style="background-image: url(' + r + ')"></div></a></div><div class="iTtl aTtl"><a href="' + v + '" ' + b + '>' + w + '</a></div></div></li>'
                } else {
                    if (A == 3) {
                        c += '<li><div class="i"><div class="pThmb"><a class="thmb" aria-label="' + w + '" href="' + v + '" title="' + t + '"><div style="background-image: url(' + r + ')"></div></a></div><div class="iTtl aTtl"><a href="' + v + '" ' + b + ' data-date="' + M + ' ' + D + ', ' + Y + '" data-text="' + y + '">' + w + '</a></div></div></li>'
                    } else {
                        if (A == 4) {
                            c += '<li><div class="i"><div class="pThmb"><a class="thmb" aria-label="' + w + '" href="' + v + '" title="' + t + '"><div style="background-image: url(' + r + ')"></div></a></div><div class="iTtl aTtl"><a href="' + v + '" ' + b + '>' + w + '</a></div><div class="pSnpt">' + u + '</div><div class="pInf pSml" data-date="' + M + ' ' + D + ', ' + Y + '"></div></div></li>'
                        } else {
                            c += '<li><div class="iF"><div class="pThmb"><a class="thmb" aria-label="' + w + '" href="' + v + '" title="' + t + '"><div style="background-image: url(' + r + ')"></div></a></div><div class="pCtnt"><div class="pInr"><div class="iTtl aTtl"><a href="' + v + '" ' + b + '>' + w + '</a></div><div class="pSnpt">' + u + '</div><div class="pInf pSml" data-date="' + M + ' ' + D + ', ' + Y + '"></div></div></div></div></li>'
                        }
                    }
                }
            }
            s.innerHTML = c += "</ul>";
            d.callBack()
        };
        randomRelatedIndex = h;
        showRelatedPost = g;
        let relatedScroll = false;
        j(d.homePage.replace(/\/$/, "") + "/feeds/posts/summary" + e + "?alt=json-in-script&orderby=updated&max-results=0&callback=randomRelatedIndex");
    })(window, document, document.getElementsByTagName("head")[0]);

}
