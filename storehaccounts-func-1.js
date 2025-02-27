if (document.querySelector('.cmnt.tIc'))
    document.querySelector('.cmnt.tIc').setAttribute('onclick', 'document.querySelector("#comment-container").scrollIntoView()');
(function () {
    let allLinks = document.querySelectorAll(".postBody a");
    if (allLinks) {
        for (i = 0; i < allLinks.length; i++)
            if (0 == allLinks[i].querySelectorAll("img").length) {
                let e = allLinks;
                if (!e[i].href.includes("lh3.googleusercontent.com") && !e[i].href.includes("storehaccounts.blogspot.com") && !e[i].href.includes("blogger.googleusercontent.com") && !e[i].href.includes("youtube.com/watch") && !e[i].href.includes("youtu.be") && !e[i].href.includes("javascript:;") && e[i].href.length > 1 && !window.location.href.includes("storehaccounts.blogspot.com/p/link-terminal.html") && !window.location.href.includes("storehaccounts.blogspot.com/p/link-terminal-station-2.html") && !window.location.href.includes("storehaccounts.blogspot.com/p/link-terminal-station-3.html") && !window.location.href.includes("storehaccounts.blogspot.com/p/ptc-account-portal-automated-4.html") && !window.location.href.includes("storehaccounts.blogspot.com/p/the-portal.html") && !e[i].innerText.includes("/overlay")) {
                    let l = btoa(allLinks[i].href);
                    if (!window.location.href.includes("2024/01/ptc-all-mods-update-131-global-free.html"))
                        allLinks[i].href = "https://storehaccounts.blogspot.com/p/link-terminal.html#" + l
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
})();

function youtube_parser(e) {
    var t = e.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/);
    return !!t && 11 == t[7].length && t[7]
}

function onOverlay(e) {
    document.getElementById("download-status").innerHTML = "<br/>Your request is now processing...",
    document.getElementById("overlayptc").style.opacity = "1",
    document.getElementById("overlayptc").style.visibility = "visible",
    document.getElementById("overlayptc").style.display = "block",
    document.getElementById("ptcoverlayads").removeAttribute("onclick");
    let t = document.querySelectorAll("#overlayptc")[0];
    t && t.appendChild(document.querySelectorAll("#ptcoverlayads")[0]),
    setTimeout(function () {
        document.getElementById("ptcoverlayads").setAttribute("onclick", "off();"),
        document.getElementById("download-status").innerHTML = 'Download has started... Thanks for using PTC Services.<br/>Submit your work by posting on website <a class="button" href="https://storehaccounts.blogspot.com/p/become-author.html" target="_blank">apply as author now!</a><br/><br/><small style="cursor: pointer; text-decoration: underline;" onclick="hideOverlayAds();">Close this window.</small>',
        "u.pcloud.link" == new URL(e).hostname ? downloadFilePCloud(e) : window.location.href = e
    }, 5e3)
}

function hideOverlayAds() {
    document.getElementById("overlayptc").style.opacity = "0",
    document.getElementById("overlayptc").style.visibility = "hidden"
}

function downloadFilePCloud(e) {
    $.ajax({
        url: e,
        type: "GET",
        success: function (e) {
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
    setCookie('link-exhaust3', 'set', 120);
}

function setCookie(e, t, l) {
    var o = new Date;
    o = new Date(o.getTime() + 1e3 * l),
    document.cookie = e + "=" + t + "; expires=" + o.toGMTString() + ";";
}

function getCookieName(e) {
    var t = document.cookie,
    l = e + "=",
    o = t.indexOf("; " + l);
    if (-1 == o) {
        if (0 != (o = t.indexOf(l)))
            return null
    } else {
        o += 2;
        var n = document.cookie.indexOf(";", o);
         - 1 == n && (n = t.length)
    }
    return decodeURI(t.substring(o + l.length, n))
}
(function () {
    if (!1 === lazyadsense) {
        var e,
        t,
        l;
        async function o(e) {
            let t = e.srcElement;
            t.innerText = "Copied",
            await navigator.clipboard.writeText(t.parentElement.querySelector("code").innerText),
            t.classList.add("copyed"),
            setTimeout(() => {
                t.classList.remove("copyed"),
                t.innerText = "Copy"
            }, 1e3)
        }
        e = document.createElement("script"),
        (t = document.createAttribute("crossorigin")).value = "anonymous",
        e.setAttributeNode(t),
        e.async = !0,
        e.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6328531102448868",
        (l = document.getElementsByTagName("head")[0]).parentNode.insertBefore(e, l),
        lazyadsense = !0,
        document.querySelectorAll("pre").forEach(e => {
            if (navigator.clipboard) {
                let t = document.createElement("button");
                t.classList.add("preCopy"),
                t.innerText = "Copy",
                t.addEventListener("click", o),
                e.appendChild(t)
            }
        })
    }
})();

(async function () {
    await initFunctions(['PTC_Cookies ']);
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

        if (1 == 1) {
            document.getElementsByClassName("overlay_greet")[0].style.display = "block";
            document.getElementsByClassName("overlay_greet")[0].style.opacity = '1';
            document.getElementsByClassName("overlay_greet")[0].style.visibility = "visible";

            document.querySelectorAll(".popup_greet .close")[0].style.opacity = '1';
            document.querySelectorAll(".popup_greet .close")[0].innerText = "X";
        } else {
            document.getElementsByClassName("overlay_greet")[0].style.display = "block";
            document.getElementsByClassName("overlay_greet")[0].style.opacity = '0.0001';
            document.getElementsByClassName("overlay_greet")[0].style.visibility = "hidden";
        }

        // set notify timer
        let now = new Date().getTime();

        if (sessionStorage.getItem('catters_ads')) {
            document.getElementsByClassName("overlay_greet")[0].style.display = "block";
            document.getElementsByClassName("overlay_greet")[0].style.visibility = "visible";
            document.getElementsByClassName("overlay_greet")[0].style.opacity = '1';
            document.querySelectorAll(".popup_greet .close")[0].style.opacity = '1';
            sessionStorage.removeItem('catters_ads');
        }
        if (localStorage.getItem('link-pop-click') || getCookieName('link-exhaust3')) {
            if (localStorage.getItem('link-pop-click'))
                localStorage.removeItem('link-pop-click');
            closeoverlay_greet();
        }
        if (document.querySelectorAll("#ptcmenupop ins")[0].getAttribute("data-ad-status") && "filled" == document.querySelectorAll("#ptcmenupop ins")[0].getAttribute("data-ad-status")) { // && document.querySelector('#popup iframe').clientHeight != 0
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
        } else if ((document.querySelectorAll("#ptcmenupop ins")[0].getAttribute("data-ad-status") && "unfilled" == document.querySelectorAll("#ptcmenupop ins")[0].getAttribute("data-ad-status") && document.querySelectorAll("#ptcmenupop iframe")[0].getAttribute("data-load-complete") && "true" == document.querySelectorAll("#ptcmenupop iframe")[0].getAttribute("data-load-complete")) || localStorage.getItem('lem') || getCookieName('lem')) {

            document.querySelectorAll(".popup_greet .close")[0].style.pointerEvents = "auto";
            document.querySelectorAll(".popup_greet .close")[0].setAttribute("onclick", "closeoverlay_greet()");
        } else {

            document.querySelectorAll(".popup_greet .close")[0].style.pointerEvents = "auto";
            document.querySelectorAll(".popup_greet .close")[0].setAttribute("onclick", "closeoverlay_greet()");
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
                    document.querySelectorAll(".popup_greet .close")[0].style.pointerEvents = "auto";
                }
            }
        }, false);
        window.addEventListener("beforeunload", function () {
            setTimeout(function () {
                if (isFrameFocus2) {
                    setCookie('link-exhaust3', 'set', 120); // when successfully clicked, set exhaust to disable for next 20 minutes..
                    localStorage.setItem('link-pop-click', 'set');
                    let win = window.open(window.location.href);
                    window.oldOpen = window.open;
                    window.open = function (url) { // reassignment function
                        win.location = window.location.href;
                        window.open = oldOpen;
                        win.focus();
                    }
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
})();
