let loadeda = !1;

function checkAdblockDetect() {
    if (!loadeda) {
        loadeda = !0;
        var t = document.createElement("script");
        t.type = "text/javascript",
        t.async = !0,
        t.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
        t.onerror = function () {
            if (null == localStorage.getItem("lem")) {
                var t;
                (t = document.getElementById("postBody")) && (t.innerHTML = '<p class="note wr"><strong>Ad-Block Detected.</strong><br/>Sorry, we detected that you have activated Ad-Blocker.<br/>Please consider <strong>supporting us</strong> by <strong>disabling your ad blocker</strong>. <br/><br/>It helps us maintain this website.<br/>To view the content, <strong>disable the adblocker and refresh the page.<br/><br/></strong>Watch the tutorial below and download vpn below.&nbsp;Thank You !!!</p><div><a href="https://youtu.be/Rh9UtRZ8VVI">yt</a></div><div><button class="button-7" rel="noopener" onclick="window.location.href = &quot;https://mega.nz/file/sVc2UCZI#PE7q4LPCKHcQXIdeS6i_S1hsEgXTt-aqRGwzEpFhIPU&quot;">Download VPN</button></div>'),
                window.adblock = !0
            }
        };
        var e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(t, e)
    }
}
if (!localStorage.getItem('lem'))
    checkAdblockDetect();

/*window.addEventListener("DOMContentLoaded", function() {
checkAdblockDetect()
}, !1),
window.addEventListener("load", function() {
document.querySelectorAll(".cmShw label")[0] && (window.location.href.includes("?showComment=") || window.location.href.includes("?sc") || window.location.href.includes("?commentPage")) && document.querySelectorAll(".cmShw label")[0].click();
}, !1),*/

(function () { /*document.addEventListener("contextmenu", t => t.preventDefault()), */
    if (document.querySelectorAll(".pIm div").length > 0 && document.querySelector("#authorInfo")) {
        let t = document.querySelectorAll(".pIm div")[0].getAttribute("data-style").split("/"),
        e = document.querySelectorAll(".pNm bdi")[0].getAttribute("data-text");
        t[0] = "",
        t[1] = "",
        t[7] = "w100-h100-rw-p-k-no-nu",
        t = t.join("/"),
        document.querySelectorAll("#authorInfo div:first-child")[0].remove(),
        document.querySelector("#authorInfo").style.display = "flex",
        document.querySelector("#authorInfo div").style.display = "inline-block",
        document.querySelector("#authorImage").style.display = "inline-block",
        document.querySelector("#authorName").style.display = "inline-block",
        document.querySelector("#authorImage").setAttribute("data-src", t),
        document.querySelector("#authorImage").setAttribute("class", "lazy"),
        document.querySelector("#authorImage").setAttribute("alt", e),
        document.querySelector("#authorName").innerText = e
    } else
        document.querySelectorAll(".pNm.n bdi").length > 0 ? (document.querySelectorAll("#authorInfo div:first-child")[0].remove(), document.querySelector("#authorInfo").style.display = "flex", document.querySelector("#authorInfo div").style.display = "inline-block", document.querySelector("#authorImage").style.display = "inline-block", document.querySelector("#authorName").style.display = "inline-block", document.querySelector("#authorImage").setAttribute("data-src", "https://tiermaker.com/images/avatars-2022/YeetDaNoob/YeetDaNoob.jpg"), document.querySelector("#authorImage").setAttribute("class", "lazy"), document.querySelector("#authorImage").setAttribute("alt", author), document.querySelector("#authorName").innerText = document.querySelectorAll(".pNm.n bdi")[0].getAttribute("data-text")) : document.querySelectorAll("#authorInfo").length > 0 && (document.querySelectorAll("#authorInfo div:first-child")[0].remove(), document.querySelector("#authorInfo").style.display = "none");
    for (i = 0; i < document.querySelectorAll(".cmAv div").length; i++)
        document.querySelectorAll(".cmAv div")[i].getAttribute("data-style").includes("resources.blogblog") && document.querySelectorAll(".cmAv div")[i].setAttribute("data-style", "background-image: url(https://pa1.aminoapps.com/8304/888dd417dd1d7f964587c98f08d52c21f9a1e1a7r1-320-320_hq.gif)");

})();

function r(t, e, r, l, o) {
    let s = !1;
    window.addEventListener(o, function () {
        if (!s) {
            s = !0;
            let o = document.createElement("script");
            if (l && document.querySelectorAll(".wL.pSml.bg.ls a").length > 0) {
                let n = document.querySelectorAll(".wL.pSml.bg.ls a");
                e = n[Math.floor(Math.random() * (n.length - 1 + 1) + 0)].ariaLabel
            }
            o.setAttribute("numberofposts", r),
            o.setAttribute("label", e),
            o.setAttribute("display", "vertical"),
            o.setAttribute("boxrounding", "5"),
            o.setAttribute("boxbackground", "inherit"),
            o.setAttribute("boxpadding", "5"),
            o.setAttribute("lineheight", "1.2"),
            o.setAttribute("borderwidth", "1"),
            o.setAttribute("borderstyle", "outset"),
            o.setAttribute("bordercolor", "#474747"),
            o.setAttribute("showimage", "left"),
            o.setAttribute("imagesize", "40"),
            o.setAttribute("imagerounding", "10"),
            o.setAttribute("noimage", "https://thumbs.dreamstime.com/b/no-death-sign-vector-illustration-no-death-sign-113929382.jpg"),
            o.setAttribute("showtitle", "left"),
            o.setAttribute("titlefont", "Inherit"),
            o.setAttribute("titlesize", "14"),
            o.setAttribute("boldtitle", "true"),
            o.setAttribute("titlecolor", "inherit"),
            o.setAttribute("showinfo", "none"),
            o.setAttribute("showlabels", "none"),
            (window.location.href.includes('?m=1') ? o.setAttribute("excerptlength", "0") : o.setAttribute("excerptlength", "100")),
            o.setAttribute("excerptalign", "justify"),
            o.setAttribute("textfont", "Inherit"),
            o.setAttribute("textsize", "12"),
            o.setAttribute("textcolor", "inherit"),
            o.setAttribute("src", "https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts@1.1.7/randomposts.js"),
            t && (t.innerHTML = "", t.appendChild(o))
        }
    })
}
r(document.querySelector("#novaupdates"), "NOVA", "24", !1, "load"), r(document.querySelector("#dogsupdates"), "DOGS", "24", !1, "load"), r(document.querySelector("#bcmupdates"), "BCM", "24", !1, "load"), r(document.querySelector("#authorsupdates"), "NEWS", "30", !0, "load"), r(document.querySelector("#exploremore"), "NEWS", "30", !0, "load");
var l, o, s, n, u = "MODPACK";
let a;
s = document.querySelector("#bcupacks"), n = !1, a = !1, window.addEventListener("load", function () {
    if (!a) {
        a = !0;
        let t = document.createElement("script");
        if (n && document.querySelectorAll(".wL.pSml.bg.ls a").length > 0) {
            let e = document.querySelectorAll(".wL.pSml.bg.ls a");
            u = e[Math.floor(Math.random() * (e.length - 1 + 1) + 0)].ariaLabel
        }
        t.setAttribute("numberofposts", "5"),
        t.setAttribute("label", u),
        t.setAttribute("display", "vertical"),
        t.setAttribute("boxrounding", "5"),
        t.setAttribute("boxbackground", "inherit"),
        t.setAttribute("boxpadding", "5"),
        t.setAttribute("lineheight", "1.2"),
        t.setAttribute("borderwidth", "1"),
        t.setAttribute("borderstyle", "outset"),
        t.setAttribute("bordercolor", "#474747"),
        t.setAttribute("showimage", "left"),
        t.setAttribute("imagesize", "40"),
        t.setAttribute("imagerounding", "10"),
        t.setAttribute("noimage", "https://thumbs.dreamstime.com/b/no-death-sign-vector-illustration-no-death-sign-113929382.jpg"),
        t.setAttribute("showtitle", "left"),
        t.setAttribute("titlefont", "Inherit"),
        t.setAttribute("titlesize", "14"),
        t.setAttribute("boldtitle", "true"),
        t.setAttribute("titlecolor", "inherit"),
        t.setAttribute("showinfo", "none"),
        t.setAttribute("showlabels", "none"),
        (window.location.href.includes('?m=1') ? t.setAttribute("excerptlength", "0") : t.setAttribute("excerptlength", "100")),
        t.setAttribute("excerptalign", "justify"),
        t.setAttribute("textfont", "Inherit"),
        t.setAttribute("textsize", "12"),
        t.setAttribute("textcolor", "inherit"),
        t.setAttribute("src", "https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts@1.1.7/randomposts.js"),
        s && (s.innerHTML = "", s.appendChild(t))
    }
});
(function () {
    var l,
    o,
    s,
    n,
    u = "PTC";
    let a;
    s = document.querySelector("#ptcmods"),
    n = !1,
    a = !1,
    window.addEventListener("load", function () {
        if (!a) {
            a = !0;
            let t = document.createElement("script");
            if (n && document.querySelectorAll(".wL.pSml.bg.ls a").length > 0) {
                let e = document.querySelectorAll(".wL.pSml.bg.ls a");
                u = e[Math.floor(Math.random() * (e.length - 1 + 1) + 0)].ariaLabel
            }
            t.setAttribute("numberofposts", "5"),
            t.setAttribute("label", u),
            t.setAttribute("display", "vertical"),
            t.setAttribute("boxrounding", "5"),
            t.setAttribute("boxbackground", "inherit"),
            t.setAttribute("boxpadding", "5"),
            t.setAttribute("lineheight", "1.2"),
            t.setAttribute("borderwidth", "1"),
            t.setAttribute("borderstyle", "outset"),
            t.setAttribute("bordercolor", "#474747"),
            t.setAttribute("showimage", "left"),
            t.setAttribute("imagesize", "40"),
            t.setAttribute("imagerounding", "10"),
            t.setAttribute("noimage", "https://thumbs.dreamstime.com/b/no-death-sign-vector-illustration-no-death-sign-113929382.jpg"),
            t.setAttribute("showtitle", "left"),
            t.setAttribute("titlefont", "Inherit"),
            t.setAttribute("titlesize", "14"),
            t.setAttribute("boldtitle", "true"),
            t.setAttribute("titlecolor", "inherit"),
            t.setAttribute("showinfo", "none"),
            t.setAttribute("showlabels", "none"),
            (window.location.href.includes('?m=1') ? t.setAttribute("excerptlength", "0") : t.setAttribute("excerptlength", "100")),
            t.setAttribute("excerptalign", "justify"),
            t.setAttribute("textfont", "Inherit"),
            t.setAttribute("textsize", "12"),
            t.setAttribute("textcolor", "inherit"),
            t.setAttribute("src", "https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts@1.1.7/randomposts.js"),
            s && (s.innerHTML = "", s.appendChild(t))
        }
    });
})();
var b, c, d = "NEWS";
let A;
b = document.querySelector("#bcnews"), c = !1, A = !1, window.addEventListener("load", function () {
    if (!A) {
        A = !0;
        let t = document.createElement("script");
        if (c && document.querySelectorAll(".wL.pSml.bg.ls a").length > 0) {
            let e = document.querySelectorAll(".wL.pSml.bg.ls a");
            d = e[Math.floor(Math.random() * (e.length - 1 + 1) + 0)].ariaLabel
        }
        t.setAttribute("numberofposts", "30"),
        t.setAttribute("label", d),
        t.setAttribute("display", "vertical"),
        t.setAttribute("boxrounding", "5"),
        t.setAttribute("boxbackground", "inherit"),
        t.setAttribute("boxpadding", "5"),
        t.setAttribute("lineheight", "1.2"),
        t.setAttribute("borderwidth", "1"),
        t.setAttribute("borderstyle", "outset"),
        t.setAttribute("bordercolor", "#474747"),
        t.setAttribute("showimage", "left"),
        t.setAttribute("imagesize", "40"),
        t.setAttribute("imagerounding", "10"),
        t.setAttribute("noimage", "https://thumbs.dreamstime.com/b/no-death-sign-vector-illustration-no-death-sign-113929382.jpg"),
        t.setAttribute("showtitle", "none"),
        t.setAttribute("titlefont", "Inherit"),
        t.setAttribute("titlesize", "14"),
        t.setAttribute("boldtitle", "true"),
        t.setAttribute("titlecolor", "inherit"),
        t.setAttribute("showinfo", "none"),
        t.setAttribute("showlabels", "none"),
        t.setAttribute("excerptlength", "190"),
        t.setAttribute("excerptalign", "left"),
        t.setAttribute("textfont", "Inherit"),
        t.setAttribute("textsize", "12"),
        t.setAttribute("textcolor", "inherit"),
        t.setAttribute("src", "https://cdn.jsdelivr.net/gh/bloggerwidgets/scripts@1.1.7/randomposts.js"),
        b && (b.innerHTML = "", b.appendChild(t))
    }
});
let g;
if (document.querySelector('#ptc_title'))
    document.querySelector('#ptc_title').innerText = document.title;
l = document.querySelector("#articlesmidpost"), o = !0, g = !1, window.addEventListener("load", function () {

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
            l.innerHTML = "",
            l.appendChild(r);
            let s = document.getElementsByClassName("ptcrandom")[0];
            if (s) {
                let n = Math.floor(document.querySelectorAll(".post-body").length) - 1,
                u = document.querySelectorAll(".post-body")[0]; //[n < 0 ? 0 : n];
                /*u.parentNode.insertBefore(s, u.nextSibling),*/
                document.getElementsByClassName("ptcrandom")[0].style.display = "block"
            }
        }
    }
})

(function () {
    // this is to load data from the user informations...
	initFunctions(['JBLOBFunctions']);
    if (localStorage.getItem('ptc_user')) {
        let user_temp = document.querySelector('#profile-circle-header');
        let user_id = JSON.parse(localStorage.getItem('ptc_user')).user.replaceAll('\r', '').replaceAll('\n', '');

        JBLOBFunctions.getBlobRecord('https://jsonblob.com/api/jsonBlob/' + user_id, function (data) {
            data = JSON.parse(data);
            user_temp.querySelector('.content').innerHTML = "<span>Welcome back, ptcrebornofficial</span><br><br><button onclick='javascript:window.location.href=\"https://storehaccounts.blogspot.com/p/your-account-page.html?" + user_id + "\"'>Profile</button><br><button onclick='javascript:window.location.href=\"https://storehaccounts.blogspot.com/p/ptc-official-post-creator.html\"'>Create Post</button><br><button onclick='javascript:(function() {    PTC_Cookies.deleteStorage(\"ptc_user\");PTC_Cookies.deleteCookies(\"ptc_user_data\");PTC_Cookies.deleteStorage(\"ptc_background_image\");window.location.href = \"https://storehaccounts.blogspot.com/p/login_20.html\";})();'>Logout</button>";
            user_temp.querySelector('img').src = data.prof_image;
            user_temp.querySelector('span').innerText = 'Welcome back, ' + data.nickname;
        });
    }

    document.getElementById('user-upper-right').style.display = 'block';
})();
