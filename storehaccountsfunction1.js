if(document.querySelector('.cmnt.tIc')) document.querySelector('.cmnt.tIc').setAttribute('onclick', 'document.querySelector("#comment-container").scrollIntoView()');
window.addEventListener('load', function () {
    let allLinks = document.querySelectorAll(".postBody a");
    if (allLinks) {
        for (i = 0; i < allLinks.length; i++)
            if (0 == allLinks[i].querySelectorAll("img").length) {
                let e = allLinks;
                if (!e[i].href.includes("lh3.googleusercontent.com") && !e[i].href.includes("storehaccounts.blogspot.com") && !e[i].href.includes("blogger.googleusercontent.com") && !e[i].href.includes("youtube.com/watch") && !e[i].href.includes("youtu.be") && !e[i].href.includes("javascript:;") && e[i].href.length > 1 && !window.location.href.includes("storehaccounts.blogspot.com/p/link-terminal.html") && !window.location.href.includes("storehaccounts.blogspot.com/p/link-terminal-station-2.html") && !window.location.href.includes("storehaccounts.blogspot.com/p/link-terminal-station-3.html") && !window.location.href.includes("storehaccounts.blogspot.com/p/ptc-account-portal-automated-4.html") && !window.location.href.includes("storehaccounts.blogspot.com/p/the-portal.html") && !e[i].innerText.includes("/overlay")) {
                    let l = btoa(allLinks[i].href);
                    if(!window.location.href.includes("2024/01/ptc-all-mods-update-131-global-free.html")) allLinks[i].href = "https://storehaccounts.blogspot.com/p/link-terminal.html#" + l
                }
                let t = document.createElement("span"),
                n = document.createElement("svg");
                if ((allLinks[i].innerHTML.includes("/download/button") || allLinks[i].innerHTML.toLowerCase().includes("download")) ? (n.setAttribute("class", "downloadLink"), allLinks[i].setAttribute('class', 'button-7')) : allLinks[i].innerHTML.includes("/overlay") ? (n.setAttribute("class", "downloadLink"), t.innerText = " " + allLinks[i].innerText.split("/")[0], allLinks[i].innerHTML = "", allLinks[i].appendChild(n), allLinks[i].appendChild(t), allLinks[i].setAttribute("class", "button"), allLinks[i].setAttribute("onclick", "onOverlay('" + allLinks[i].href + "')"), allLinks[i].removeAttribute("href")) : allLinks[i].innerHTML.includes("/preview/button") ? (n.setAttribute("class", "previewLink"), t.innerText = " " + allLinks[i].innerText.split("/")[0], allLinks[i].innerHTML = "", allLinks[i].appendChild(n), allLinks[i].appendChild(t), allLinks[i].setAttribute("class", "button")) : allLinks[i].innerHTML.includes("/link/button") ? (n.setAttribute("class", "linkLink"), t.innerText = " " + allLinks[i].innerText.split("/")[0], allLinks[i].innerHTML = "", allLinks[i].appendChild(n), allLinks[i].appendChild(t), allLinks[i].setAttribute("class", "button")) : allLinks[i].innerHTML.includes("/button") ? (n.setAttribute("class", "buttonLink"), t.innerText = " " + allLinks[i].innerText.split("/")[0], allLinks[i].innerHTML = "", allLinks[i].appendChild(n), allLinks[i].appendChild(t), allLinks[i].setAttribute("class", "button")) : "_blank" == allLinks[i].target && allLinks[i].setAttribute("class", "extL"), allLinks[i].href.includes("youtube.com") || allLinks[i].href.includes("youtu.be")) {
                    let s = document.createElement("div");
                    s.setAttribute("class", "videoYt");
                    let a = document.createElement("iframe");
                    a.setAttribute("title", "Youtube Video"),
                    a.setAttribute("class", "lazy"),
                    a.setAttribute("data-src", "//www.youtube.com/embed/" + youtube_parser(allLinks[i].href)),
                    a.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"),
                    a.setAttribute("allowfullscreen", ""),
                    s.appendChild(a),
                    allLinks[i].parentNode.insertBefore(s, allLinks[i].nextSibling),
                    allLinks[i].remove()
                }
            }
    }
}, false);



function youtube_parser(e) {
        var t = e.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/);
        return !!t && 11 == t[7].length && t[7]
}

function onOverlay(e) {
        document.getElementById("download-status").innerHTML = "<br/>Your request is now processing...", document.getElementById("overlayptc").style.opacity = "1", document.getElementById("overlayptc").style.visibility = "visible", document.getElementById("overlayptc").style.display = "block", document.getElementById("ptcoverlayads").removeAttribute("onclick");
        let t = document.querySelectorAll("#overlayptc")[0];
        t && t.appendChild(document.querySelectorAll("#ptcoverlayads")[0]), setTimeout(function() {
                document.getElementById("ptcoverlayads").setAttribute("onclick", "off();"), document.getElementById("download-status").innerHTML = 'Download has started... Thanks for using PTC Services.<br/>Submit your work by posting on website <a class="button" href="https://storehaccounts.blogspot.com/p/become-author.html" target="_blank">apply as author now!</a><br/><br/><small style="cursor: pointer; text-decoration: underline;" onclick="hideOverlayAds();">Close this window.</small>', "u.pcloud.link" == new URL(e).hostname ? downloadFilePCloud(e) : window.location.href = e
        }, 5e3)
}

function hideOverlayAds() {
        document.getElementById("overlayptc").style.opacity = "0", document.getElementById("overlayptc").style.visibility = "hidden"
}

function downloadFilePCloud(e) {
        $.ajax({
                url: e,
                type: "GET",
                success: function(e) {
                        let t = e.split("<script>"),
                                l = t.length;
                        window.location.href = t[l - 1].split('"downloadlink": ')[1].split('"')[1].replaceAll("\\", "")
                }
        })
}

function off() {
        document.getElementById("overlayptc").style.display = "none"
}
var lazyadsense = !1;

function closeoverlay_greet() {
		console.log('overlay close');
        document.getElementsByClassName("overlay_greet")[0].style.opacity = "0";
        document.getElementsByClassName("overlay_greet")[0].style.visibility = "hidden";
        document.getElementsByClassName("overlay_greet")[0].style.display = "none";
}

function setCookie(e, t, l) {
        var o = new Date;
        o = new Date(o.getTime() + 1e3 * l), document.cookie = e + "=" + t + "; expires=" + o.toGMTString() + ";";
}

function getCookieName(e) {
        var t = document.cookie,
                l = e + "=",
                o = t.indexOf("; " + l);
        if (-1 == o) {
                if (0 != (o = t.indexOf(l))) return null
        } else {
                o += 2;
                var n = document.cookie.indexOf(";", o); - 1 == n && (n = t.length)
        }
        return decodeURI(t.substring(o + l.length, n))
}
/*window.addEventListener("load", function() {
        if (!1 === lazyadsense) {
                var e, t, l;
                async function o(e) {
                        let t = e.srcElement;
                        t.innerText = "Copied", await navigator.clipboard.writeText(t.parentElement.querySelector("code").innerText), t.classList.add("copyed"), setTimeout(() => {
                                t.classList.remove("copyed"), t.innerText = "Copy"
                        }, 1e3)
                }
                e = document.createElement("script"), (t = document.createAttribute("crossorigin")).value = "anonymous", e.setAttributeNode(t), e.async = !0, e.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6328531102448868", (l = document.getElementsByTagName("head")[0]).parentNode.insertBefore(e, l), lazyadsense = !0, document.querySelectorAll("pre").forEach(e => {
                        if (navigator.clipboard) {
                                let t = document.createElement("button");
                                t.classList.add("preCopy"), t.innerText = "Copy", t.addEventListener("click", o), e.appendChild(t)
                        }
                })
        }
}, !1);*/


window.addEventListener("load", function () {
      document.querySelector('.mainWrp').style.backgroundImage = "linear-gradient(to bottom, rgb(0,0,0,0.5) 10%, rgb(0,0,0,0.9) 90%), url(https://i.imgur.com/HF6SOyn.png)";
    document.querySelector('.mainWrp').style.backgroundRepeat = "no-repeat;"
        document.querySelector('.mainWrp').style.backgroundSize = "cover";
    document.querySelector('.mainWrp').style.backgroundPosition = "center center";
    document.querySelector('.mainWrp').style.backgroundAttachment = "fixed";
if (PTC_Cookies.checkIfStorageSupported()) {
    if (PTC_Cookies.getLocalStorage('ptc_background_image')) {
        document.querySelector('.mainWrp').style.backgroundImage = "linear-gradient(to bottom, rgb(0,0,0,0.5) 10%, rgb(0,0,0,0.9) 90%), url(\"" + PTC_Cookies.getLocalStorage('ptc_background_image').img + "\")";
        document.querySelector('.mainWrp').style.backgroundRepeat = "no-repeat";
        document.querySelector('.mainWrp').style.backgroundSize = "cover";
        document.querySelector('.mainWrp').style.backgroundPosition = "center center";
        document.querySelector('.mainWrp').style.backgroundAttachment = "fixed";
    }
}

    if (!window.location.href.includes("p/link-terminal.html") &&
        !window.location.href.includes("p/ptc-account-portal-automated-4.html") &&
        !window.location.href.includes("p/account-retrieval.html") &&
        !window.location.href.includes("p/link-terminal-station-2.html") &&
        !window.location.href.includes("p/link-terminal-station-3.html") &&
        !window.location.href.includes("p/account-redirect-2.html") &&
        !window.location.href.includes("p/account-retrieval-2.html") &&
        !window.location.href.includes("p/download-terminal.html") &&
        !window.location.href.includes("p/ptc-account-portal-automated-7.html") &&
        !window.location.href.includes("p/account-giveaway-terminal.html") &&
        !window.location.href.includes("p/ptc-account-portal-automated-7.html")) {
        let e = new Date().getHours(),
        t = ["🌄 Good morning", "🌞 Good afternoon", "🌜 Good evening"],
        l = "";
        l = e < 12 ? t[0] : e < 18 ? t[1] : t[2],
        document.getElementById("popup_greet1").style.display = "block",
        document.getElementById("overlay_greet_greet").innerText = l + " Catters!",
        document.getElementById("popup_greet1").style.visibility = "visible",
        document.getElementById("popup_greet1").style.opacity = "1";
        let o = !1,
        n = !1;

        let isFrameFocus = false;
        let isFrameFocus2 = false;

        document.getElementsByClassName("overlay_greet")[0].style.display = "block";
        document.getElementsByClassName("overlay_greet")[0].style.opacity = '0.0001';
        document.getElementsByClassName("overlay_greet")[0].style.visibility = "hidden";

        document.querySelectorAll(".popup_greet .close")[0].style.opacity = '1';

		// set notify timer
		let now = new Date().getTime();

		//To display popup
		/*if(localStorage.getItem('ptc_notifier') == null) {
			document.getElementsByClassName("overlay_greet")[0].style.opacity = '1';
        	document.getElementsByClassName("overlay_greet")[0].style.visibility = "visible";		
            document.querySelectorAll(".popup_greet .close")[0].style.pointerEvents = "auto";
            document.querySelectorAll(".popup_greet .close")[0].setAttribute("onclick", "(function(){  document.getElementsByClassName('overlay_greet')[0].style.opacity = '0.00001';  document.querySelectorAll('.popup_greet .close')[0].style.pointerEvents = 'auto';document.getElementById('popup_greet1').style.visibility = 'hidden';})();");	
			localStorage.setItem('ptc_notifier', new Date().getTime());
		} else {
			if(now - localStorage.getItem('ptc_notifier') > 600000) {
				localStorage.removeItem('ptc_notifier');
				document.getElementsByClassName("overlay_greet")[0].style.opacity = '1';
        		document.getElementsByClassName("overlay_greet")[0].style.visibility = "visible";
            	document.querySelectorAll(".popup_greet .close")[0].style.pointerEvents = "auto";
            	document.querySelectorAll(".popup_greet .close")[0].setAttribute("onclick", "(function(){  document.getElementsByClassName('overlay_greet')[0].style.opacity = '0.00001';  document.querySelectorAll('.popup_greet .close')[0].style.pointerEvents = 'auto';document.getElementById('popup_greet1').style.visibility = 'hidden';})();");	
			} else {
				document.getElementsByClassName("overlay_greet")[0].style.opacity = '0.00001';
        		document.getElementsByClassName("overlay_greet")[0].style.visibility = "hidden";
			}
		}*/

		if(sessionStorage.getItem('catters_ads')) {
        	document.getElementsByClassName("overlay_greet")[0].style.display = "block";
        	document.getElementsByClassName("overlay_greet")[0].style.visibility = "visible";
       	    document.getElementsByClassName("overlay_greet")[0].style.opacity = '1';

        	document.querySelectorAll(".popup_greet .close")[0].style.opacity = '1';
			sessionStorage.removeItem('catters_ads');
		}

        if (document.querySelectorAll('#ptcmenupop ins')[0].childElementCount < 1) {
            closeoverlay_greet();
        }
        if (localStorage.getItem('link-pop-click') || getCookieName('link-exhaust3')) {
            if (localStorage.getItem('link-pop-click'))
                localStorage.removeItem('link-pop-click');
            closeoverlay_greet();
        }
        if ("filled" == document.querySelectorAll("#ptcmenupop ins")[0].getAttribute("data-ad-status")) { // && document.querySelector('#popup iframe').clientHeight != 0
            window.focus(); // focusing to window and not to any iframe
            window.addEventListener('blur', function () {
                setTimeout(function () {
                    if (document.activeElement == document.querySelector("#ptcmenupop iframe")) {
                        if (document.querySelector("#ptcmenupop iframe").clientHeight == 0) {
                            document.querySelectorAll(".popup_greet .close")[0].style.pointerEvents = "auto";
                            document.querySelectorAll(".popup_greet .close")[0].setAttribute("onclick", "closeoverlay_greet()");
                        }
                        isFrameFocus = true;
                        isFrameFocus2 = true;
                        window.focus();
                    }
                }, 0);
            }, false);
        } else if (("unfilled" == document.querySelectorAll("#ptcmenupop ins")[0].getAttribute("data-ad-status") && "true" == document.querySelectorAll("#ptcmenupop iframe")[0].getAttribute("data-load-complete")) || localStorage.getItem('lem') || getCookieName('lem')) {
            closeoverlay_greet();
        } else {
            closeoverlay_greet();
        }
        document.addEventListener("visibilitychange", function () {
            if (document.visibilityState === "hidden") {
                if (isFrameFocus) {
                    setCookie('link-exhaust3', 'set', 120); // when successfully clicked, set exhaust to disable for next 20 minutes..
                    localStorage.setItem('link-pop-click', 'set'); // means redirected to ADS page
                }
            }
            if (document.visibilityState === "visible") {
                if (localStorage.getItem('link-pop-click')) { // got back from the ADS page
                    localStorage.removeItem('link-pop-click');
                    closeoverlay_greet();
                }
            }
        }, false);
        window.addEventListener("beforeunload", function () {
            setTimeout(function () {
                if (isFrameFocus2) {
                    setCookie('link-exhaust3', 'set', 120); // when successfully clicked, set exhaust to disable for next 20 minutes..
                    localStorage.setItem('link-pop-click', 'set');
                }
            }, 200);
        }, false);
        focus();

        setTimeout(function () {
            if (window.location.href.includes('?sc') || window.location.href.includes('?showComment'))
                document.querySelector("#" + window.location.href.split('#')[1]).scrollIntoView();
            if (window.location.href.includes('#comment'))
                document.querySelector("#comment-container").scrollIntoView();
        }, 1000);
    } else {
		document.getElementById("popup_greet1").style.display = "none";
	}
}, !1);



/*function supportBCHGA(iframe_id) {
    let isUnloaded = false;
    let isOpenTab = false;
    let isInitiated = false;
    let e = new Date().getHours(),
    t = ["🌄 Good morning", "🌞 Good afternoon", "🌜 Good evening"],
    l = "";
    l = e < 12 ? t[0] : e < 18 ? t[1] : t[2],
    document.getElementById("popup_greet1").style.display = "block",
    document.getElementById("overlay_greet_greet").innerText = l + " Catters!",
    document.getElementById("popup_greet1").style.visibility = "visible",
    document.getElementById("popup_greet1").style.opacity = "1";
    let o = !1,
    n = !1;
	
    let isFrameFocus = false;
    let isFrameFocus2 = false;

    if (getCookieName(iframe_id)) {
        document.getElementById(iframe_id).style.display = "none";
        document.getElementById(iframe_id).style.opacity = '0';
        document.getElementById(iframe_id).style.visibility = "hidden";
    } else if (!localStorage.getItem('ptc-click')) {
        document.getElementById(iframe_id).style.display = "block";
        document.getElementById(iframe_id).style.opacity = '1';
        document.getElementById(iframe_id).style.visibility = "visible";
    }

    if (localStorage.getItem('ptc-click')) {
        localStorage.removeItem('ptc-click');
        closeoverlay_greet(iframe_id);
    }

    document.querySelectorAll(".popup_greet .close")[0].style.opacity = '1';
    window.focus();

    if (document.querySelector('#' + iframe_id + ' iframe') && document.querySelector('#' + iframe_id + ' iframe').getAttribute('data-load-complete') == 'true') {
        window.focus();
        window.addEventListener('blur', function () {
            if (document.activeElement == document.querySelectorAll('#' + iframe_id + ' iframe')[0]) {
                console.log('focus');
                isFrameFocus = true;
                isFrameFocus2 = true;
                setTimeout(function () {
                    window.focus();
                    document.activeElement.blur();
                    isFrameFocus = false;
                }, 700);
            }
        });
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                if (isFrameFocus) {
                    localStorage.setItem('ptc-click', 'set');
                }
            }
            if (document.visibilityState === "visible") {
                if (localStorage.getItem('ptc-click')) {
                    localStorage.removeItem('ptc-click');
                    closeoverlay_greet(iframe_id);
                }
            }
        }, false);
        window.addEventListener("pagehide", function (event) {
            window.event.cancelBubble = true; // Don't know if this works on iOS but it might!
            if (isFrameFocus2)
                localStorage.setItem('ptc-click', 'set');
        }, false);
        window.addEventListener("beforeunload", function (event) {
            if (isFrameFocus2)
                localStorage.setItem('ptc-click', 'set');
        }, false);

        window.focus();
    } else if (localStorage.getItem('lem')) {
        document.querySelectorAll(".popup_greet .close")[0].style.pointerEvents = "auto",
        document.querySelectorAll(".popup_greet .close")[0].setAttribute("onclick", "closeoverlay_greet('" + iframe_id + "')");
    } else {
        document.querySelectorAll(".popup_greet .close")[0].style.pointerEvents = "auto";
        document.querySelectorAll(".popup_greet .close")[0].setAttribute("onclick", "closeoverlay_greet('" + iframe_id + "')");
    }
}

function closeoverlay_greet(id) {
    setCookie(id, 'set', 60);
    document.getElementById(id).style.opacity = "0.001";
    document.getElementById(id).style.visibility = "hidden";
    document.getElementById(id).style.display = "none";
}

window.addEventListener('load', function () {
    supportBCHGA('popup_greet1');
}, false);*/


let loadeda = !1;

function checkAdblockDetect() {
        if (!loadeda) {
                loadeda = !0;
                var t = document.createElement("script");
                t.type = "text/javascript", t.async = !0, t.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", t.onerror = function() {
                        if (null == localStorage.getItem("lem")) {
                                var t;
                                (t = document.getElementById("postBody")) && (t.innerHTML = '<p class="note wr"><strong>Ad-Block Detected.</strong><br/>Sorry, we detected that you have activated Ad-Blocker.<br/>Please consider <strong>supporting us</strong> by <strong>disabling your ad blocker</strong>. <br/><br/>It helps us maintain this website.<br/>To view the content, <strong>disable the adblocker and refresh the page.<br/><br/></strong>Watch the tutorial below and download vpn below.&nbsp;Thank You !!!</p><div><a href="https://youtu.be/Rh9UtRZ8VVI">yt</a></div><div><button class="button-7" rel="noopener" onclick="window.location.href = &quot;https://mega.nz/file/sVc2UCZI#PE7q4LPCKHcQXIdeS6i_S1hsEgXTt-aqRGwzEpFhIPU&quot;">Download VPN</button></div>'), window.adblock = !0
                        }
                };
                var e = document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(t, e)
        }
}
if(!localStorage.getItem('lem')) checkAdblockDetect();

/*window.addEventListener("DOMContentLoaded", function() {
        checkAdblockDetect()
}, !1),
window.addEventListener("load", function() {
        document.querySelectorAll(".cmShw label")[0] && (window.location.href.includes("?showComment=") || window.location.href.includes("?sc") || window.location.href.includes("?commentPage")) && document.querySelectorAll(".cmShw label")[0].click();
}, !1),*/

window.addEventListener("load", function() { /*document.addEventListener("contextmenu", t => t.preventDefault()), */
        if (document.querySelectorAll(".pIm div").length > 0 && document.querySelector("#authorInfo")) {
                let t = document.querySelectorAll(".pIm div")[0].getAttribute("data-style").split("/"),
                        e = document.querySelectorAll(".pNm bdi")[0].getAttribute("data-text");
                t[0] = "", t[1] = "", t[7] = "w100-h100-rw-p-k-no-nu", t = t.join("/"), document.querySelectorAll("#authorInfo div:first-child")[0].remove(), document.querySelector("#authorInfo").style.display = "flex", document.querySelector("#authorInfo div").style.display = "inline-block", document.querySelector("#authorImage").style.display = "inline-block", document.querySelector("#authorName").style.display = "inline-block", document.querySelector("#authorImage").setAttribute("data-src", t), document.querySelector("#authorImage").setAttribute("class", "lazy"), document.querySelector("#authorImage").setAttribute("alt", e), document.querySelector("#authorName").innerText = e
        } else document.querySelectorAll(".pNm.n bdi").length > 0 ? (document.querySelectorAll("#authorInfo div:first-child")[0].remove(), document.querySelector("#authorInfo").style.display = "flex", document.querySelector("#authorInfo div").style.display = "inline-block", document.querySelector("#authorImage").style.display = "inline-block", document.querySelector("#authorName").style.display = "inline-block", document.querySelector("#authorImage").setAttribute("data-src", "https://tiermaker.com/images/avatars-2022/YeetDaNoob/YeetDaNoob.jpg"), document.querySelector("#authorImage").setAttribute("class", "lazy"), document.querySelector("#authorImage").setAttribute("alt", author), document.querySelector("#authorName").innerText = document.querySelectorAll(".pNm.n bdi")[0].getAttribute("data-text")) : document.querySelectorAll("#authorInfo").length > 0 && (document.querySelectorAll("#authorInfo div:first-child")[0].remove(), document.querySelector("#authorInfo").style.display = "none");
        for (i = 0; i < document.querySelectorAll(".cmAv div").length; i++) document.querySelectorAll(".cmAv div")[i].getAttribute("data-style").includes("resources.blogblog") && document.querySelectorAll(".cmAv div")[i].setAttribute("data-style", "background-image: url(https://pa1.aminoapps.com/8304/888dd417dd1d7f964587c98f08d52c21f9a1e1a7r1-320-320_hq.gif)");

        
}, !1);

function r(t, e, r, l, o) {
                let s = !1;
                window.addEventListener(o, function() {
                        if (!s) {
                                s = !0;
                                let o = document.createElement("script");
                                if (l && document.querySelectorAll(".wL.pSml.bg.ls a").length > 0) {
                                        let n = document.querySelectorAll(".wL.pSml.bg.ls a");
                                        e = n[Math.floor(Math.random() * (n.length - 1 + 1) + 0)].ariaLabel
                                }
                                o.setAttribute("numberofposts", r), o.setAttribute("label", e), o.setAttribute("display", "vertical"), o.setAttribute("boxrounding", "5"), o.setAttribute("boxbackground", "inherit"), o.setAttribute("boxpadding", "5"), o.setAttribute("lineheight", "1.2"), o.setAttribute("borderwidth", "1"), o.setAttribute("borderstyle", "outset"), o.setAttribute("bordercolor", "#474747"), o.setAttribute("showimage", "left"), o.setAttribute("imagesize", "40"), o.setAttribute("imagerounding", "10"), o.setAttribute("noimage", "https://thumbs.dreamstime.com/b/no-death-sign-vector-illustration-no-death-sign-113929382.jpg"), o.setAttribute("showtitle", "left"), o.setAttribute("titlefont", "Inherit"), o.setAttribute("titlesize", "14"), o.setAttribute("boldtitle", "true"), o.setAttribute("titlecolor", "inherit"), o.setAttribute("showinfo", "none"), o.setAttribute("showlabels", "none"), (window.location.href.includes('?m=1') ? o.setAttribute("excerptlength", "0") : o.setAttribute("excerptlength", "100")), o.setAttribute("excerptalign", "justify"), o.setAttribute("textfont", "Inherit"), o.setAttribute("textsize", "12"), o.setAttribute("textcolor", "inherit"), o.setAttribute("src", "https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts@1.1.7/randomposts.js"), t && (t.innerHTML = "", t.appendChild(o))
                        }
                })
        }
        r(document.querySelector("#novaupdates"), "NOVA", "24", !1, "load"), r(document.querySelector("#dogsupdates"), "DOGS", "24", !1, "load"), r(document.querySelector("#bcmupdates"), "BCM", "24", !1, "load"), r(document.querySelector("#authorsupdates"), "NEWS", "30", !0, "load"), r(document.querySelector("#exploremore"), "NEWS", "30", !0, "load");
        var l, o, s, n, u = "MODPACK";
        let a;
        s = document.querySelector("#bcupacks"), n = !1, a = !1, window.addEventListener("load", function() {
                if (!a) {
                        a = !0;
                        let t = document.createElement("script");
                        if (n && document.querySelectorAll(".wL.pSml.bg.ls a").length > 0) {
                                let e = document.querySelectorAll(".wL.pSml.bg.ls a");
                                u = e[Math.floor(Math.random() * (e.length - 1 + 1) + 0)].ariaLabel
                        }
                        t.setAttribute("numberofposts", "5"), t.setAttribute("label", u), t.setAttribute("display", "vertical"), t.setAttribute("boxrounding", "5"), t.setAttribute("boxbackground", "inherit"), t.setAttribute("boxpadding", "5"), t.setAttribute("lineheight", "1.2"), t.setAttribute("borderwidth", "1"), t.setAttribute("borderstyle", "outset"), t.setAttribute("bordercolor", "#474747"), t.setAttribute("showimage", "left"), t.setAttribute("imagesize", "40"), t.setAttribute("imagerounding", "10"), t.setAttribute("noimage", "https://thumbs.dreamstime.com/b/no-death-sign-vector-illustration-no-death-sign-113929382.jpg"), t.setAttribute("showtitle", "left"), t.setAttribute("titlefont", "Inherit"), t.setAttribute("titlesize", "14"), t.setAttribute("boldtitle", "true"), t.setAttribute("titlecolor", "inherit"), t.setAttribute("showinfo", "none"), t.setAttribute("showlabels", "none"), (window.location.href.includes('?m=1') ? t.setAttribute("excerptlength", "0") : t.setAttribute("excerptlength", "100")), t.setAttribute("excerptalign", "justify"), t.setAttribute("textfont", "Inherit"), t.setAttribute("textsize", "12"), t.setAttribute("textcolor", "inherit"), t.setAttribute("src", "https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts@1.1.7/randomposts.js"), s && (s.innerHTML = "", s.appendChild(t))
                }
        });
(function(){var l, o, s, n, u = "PTC";
        let a;
        s = document.querySelector("#ptcmods"), n = !1, a = !1, window.addEventListener("load", function() {
                if (!a) {
                        a = !0;
                        let t = document.createElement("script");
                        if (n && document.querySelectorAll(".wL.pSml.bg.ls a").length > 0) {
                                let e = document.querySelectorAll(".wL.pSml.bg.ls a");
                                u = e[Math.floor(Math.random() * (e.length - 1 + 1) + 0)].ariaLabel
                        }
                        t.setAttribute("numberofposts", "5"), t.setAttribute("label", u), t.setAttribute("display", "vertical"), t.setAttribute("boxrounding", "5"), t.setAttribute("boxbackground", "inherit"), t.setAttribute("boxpadding", "5"), t.setAttribute("lineheight", "1.2"), t.setAttribute("borderwidth", "1"), t.setAttribute("borderstyle", "outset"), t.setAttribute("bordercolor", "#474747"), t.setAttribute("showimage", "left"), t.setAttribute("imagesize", "40"), t.setAttribute("imagerounding", "10"), t.setAttribute("noimage", "https://thumbs.dreamstime.com/b/no-death-sign-vector-illustration-no-death-sign-113929382.jpg"), t.setAttribute("showtitle", "left"), t.setAttribute("titlefont", "Inherit"), t.setAttribute("titlesize", "14"), t.setAttribute("boldtitle", "true"), t.setAttribute("titlecolor", "inherit"), t.setAttribute("showinfo", "none"), t.setAttribute("showlabels", "none"), (window.location.href.includes('?m=1') ? t.setAttribute("excerptlength", "0") : t.setAttribute("excerptlength", "100")), t.setAttribute("excerptalign", "justify"), t.setAttribute("textfont", "Inherit"), t.setAttribute("textsize", "12"), t.setAttribute("textcolor", "inherit"), t.setAttribute("src", "https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts@1.1.7/randomposts.js"), s && (s.innerHTML = "", s.appendChild(t))
                }
        });})();
        var b, c, d = "NEWS";
        let A;
        b = document.querySelector("#bcnews"), c = !1, A = !1, window.addEventListener("load", function() {
                if (!A) {
                        A = !0;
                        let t = document.createElement("script");
                        if (c && document.querySelectorAll(".wL.pSml.bg.ls a").length > 0) {
                                let e = document.querySelectorAll(".wL.pSml.bg.ls a");
                                d = e[Math.floor(Math.random() * (e.length - 1 + 1) + 0)].ariaLabel
                        }
                        t.setAttribute("numberofposts", "30"), t.setAttribute("label", d), t.setAttribute("display", "vertical"), t.setAttribute("boxrounding", "5"), t.setAttribute("boxbackground", "inherit"), t.setAttribute("boxpadding", "5"), t.setAttribute("lineheight", "1.2"), t.setAttribute("borderwidth", "1"), t.setAttribute("borderstyle", "outset"), t.setAttribute("bordercolor", "#474747"), t.setAttribute("showimage", "left"), t.setAttribute("imagesize", "40"), t.setAttribute("imagerounding", "10"), t.setAttribute("noimage", "https://thumbs.dreamstime.com/b/no-death-sign-vector-illustration-no-death-sign-113929382.jpg"), t.setAttribute("showtitle", "none"), t.setAttribute("titlefont", "Inherit"), t.setAttribute("titlesize", "14"), t.setAttribute("boldtitle", "true"), t.setAttribute("titlecolor", "inherit"), t.setAttribute("showinfo", "none"), t.setAttribute("showlabels", "none"), t.setAttribute("excerptlength", "190"), t.setAttribute("excerptalign", "left"), t.setAttribute("textfont", "Inherit"), t.setAttribute("textsize", "12"), t.setAttribute("textcolor", "inherit"), t.setAttribute("src", "https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts@1.1.7/randomposts.js"), b && (b.innerHTML = "", b.appendChild(t))
                }
        });
        let g;
		if(document.querySelector('#ptc_title')) document.querySelector('#ptc_title').innerText = document.title;
        l = document.querySelector("#articlesmidpost"), o = !0, g = !1, window.addEventListener("load", function() {

/*
let enhancerTimer = 0;				
let enhancer = setInterval(function() {
let allRandImgs = document.querySelectorAll('pbprandompost img');
if(allRandImgs.length > 0) { 
for(i=0; i< allRandImgs.length; i++) {
       let tempRI = allRandImgs[i].src.split('/');
		if(tempRI.length == 9) {
			tempRI[7] = 's1600-h400-w400-c-rw';
			tempRI = tempRI.join('/');
			allRandImgs[i].src = tempRI;
		} else if(tempRI.length == 6) {
			tempRI[5] = tempRI[5].split('=')[0] + '=s1600-h400-w400-c-rw'
			tempRI = tempRI.join('/');
			allRandImgs[i].src = tempRI;
		}
}
clearInterval(enhancer);
}
enhancerTimer++;
if(enhancerTimer > 100) clearInterval(enhancer);
}, 100);*/


                if (!g) {
                        g = !0;
                        let t = "",
                                e = document.querySelectorAll(".brdCmb div a span");
                        o && e.length > 1 && document.querySelectorAll(".brdCmb div a span").length > 0 && (t = e[Math.floor(Math.random() * (e.length - 1) + 1)].innerText);
                        let r = document.createElement("script");
                        if (r.setAttribute("borderstyle", "solid"), r.setAttribute("borderwidth", "0"), r.setAttribute("excerptlength", "190"), r.setAttribute("label", t), r.setAttribute("nothumbnail", "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZ35r4JRyGHLPBN-pxh2F0Shdu0swm8JuU17hKske3sYCK0gWmB8H7lUjU5RcArImmqN2AWKCWwYbNPwU1eB514oczRUKJBKJtafSbx27efwiscOh4kxSSOHHE0zuMz1I538btqSiFGA/s1600/no-image.png"), r.setAttribute("numberofposts", "3"), r.setAttribute("numofcomments", "none"), r.setAttribute("postauthor", "none"), r.setAttribute("postcategories", "none"), r.setAttribute("postinfo", "left"), r.setAttribute("posttitle", "left"), r.setAttribute("publishdate", "none"), r.setAttribute("src", "https://probloggerplugins.github.io/randomPosts/randomPosts.js"), r.setAttribute("textcolor", "Inherit"), r.setAttribute("textfont", "Inherit"), r.setAttribute("textsize", "12"), r.setAttribute("thumbnail", "left"), r.setAttribute("thumbnailrounding", "15"), r.setAttribute("thumbnailsize", "80"), r.setAttribute("titlecolor", "Inherit"), r.setAttribute("titlefont", "Inherit"), r.setAttribute("titlesize", "16"), l) {
                                l.innerHTML = "", l.appendChild(r);
                                let s = document.getElementsByClassName("ptcrandom")[0];
                                if (s) {
                                        let n = Math.floor(document.querySelectorAll(".post-body").length) - 1,
                                                u = document.querySelectorAll(".post-body")[0]; //[n < 0 ? 0 : n];
                                       /*u.parentNode.insertBefore(s, u.nextSibling),*/ document.getElementsByClassName("ptcrandom")[0].style.display = "block"										
                                }
                        }
                }
        })

window.addEventListener('load', async function () {
    // this is to load data from the user informations...
    document.querySelector('#user_profile_pic').onclick = (e) => {
        e.preventDefault();
        document.querySelector('.header-user-profile div.content').style.display = 'block';
        document.querySelector('.header-user-profile div.content').focus();
    }

    document.querySelector('#exitmodal').onclick = (e) => {
        e.preventDefault();
        document.querySelector('.header-user-profile div.content').style.display = 'none';
    }

    let db = 'https://ptc-database-default-rtdb.firebaseio.com/';
    let user = await FirebaseModule.get(db + 'reserved/username.json');
    if (localStorage.getItem(user) && JSON.parse(localStorage.getItem(user)).uid) {
        let userdata = JSON.parse(localStorage.getItem(user)).uid;
        userdata = await FirebaseModule.get(db + 'users/' + userdata + '.json');
		userdata = JSON.parse(userdata);
        if (userdata && userdata.hasOwnProperty('setup') && userdata.setup) {
            let user_temp = document.querySelector('.header-user-profile');
            user_temp.querySelector('#user_profile_pic').src = userdata.profile;
            user_temp.querySelector('span').innerText = "Storehaccount™\nBasic Cat";

            user_temp = document.querySelector('.finalcontent');
            user_temp.style.textAlign = 'center';

            user_temp.innerHTML = '<img class="ui tiny left spaced image" src="' + userdata.profile + '" /><div class="ui black image label"><div class="ui black label">' + userdata.dname + '</div><div class="ui black label"><span>Lvl. 1 (Cat)</span> <img class="ui mini right spaced image" src="https://static.wikitide.net/battlecatswiki/5/58/Uni000_f00.png" /></div></div> <br /><a class="ui inverted fluid green label">Create Post<div class="detail"><i class="pencil alternate icon"></i></div> </a><br /><a class="ui black fluid label">Edit Profile<div class="detail"><i class="user circle icon"></i></div> </a><br /><a class="ui black fluid label">Settings<div class="detail"><i class="codepen icon"></i></div> </a><br /><a href="https://storehaccountsdummy.blogspot.com/p/logout_10.html" class="ui black fluid label">Logout<div class="detail"><i class="power off icon"></i></div> </a><br /><a class="ui inverted fluid red label">Report Problem<div class="detail"><i class="exclamation icon"></i></div> </a><br />';
        }
    }

    /*if (localStorage.getItem('ptc_user')) {
    let user_id = JSON.parse(localStorage.getItem('ptc_user')).user.replaceAll('\r', '').replaceAll('\n', '');
    JBLOBFunctions.getBlobRecord('https://jsonblob.com/api/jsonBlob/' + user_id, function (data) {
    data = JSON.parse(data);
    user_temp.querySelector('.content').innerHTML = "<span>Welcome back, ptcrebornofficial</span><br><br><button onclick='javascript:window.location.href=\"https://storehaccounts.blogspot.com/p/your-account-page.html?" + user_id + "\"'>Profile</button><br><button onclick='javascript:window.location.href=\"https://storehaccounts.blogspot.com/p/ptc-official-post-creator.html\"'>Create Post</button><br><button onclick='javascript:(function() {    PTC_Cookies.deleteStorage(\"ptc_user\");PTC_Cookies.deleteCookies(\"ptc_user_data\");PTC_Cookies.deleteStorage(\"ptc_background_image\");window.location.href = \"https://storehaccounts.blogspot.com/p/login_20.html\";})();'>Logout</button>";
    user_temp.querySelector('img').src = data.prof_image;
    user_temp.querySelector('span').innerText = 'Welcome back, ' + data.nickname;
    });
    }*/

    document.getElementById('user-upper-right').style.display = 'block';
}, false);
