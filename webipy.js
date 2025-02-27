  <script> 
        //<![CDATA[// LAZY LOAD ALL IMAGES
function webipy() {
    let t = document.querySelectorAll(".postBody img:not(#ptc-preview):not(#authorImage)"),
    e = document.querySelectorAll(".postBody img:not(#ptc-preview):not(#authorImage)");
    if (t.length > 0 && !window.location.href.includes("/p/"))
        for (i = 0; i < t.length; i++) {
            i >= -1 && (t[i].alt = document.title);
            if (t[i].src.includes('googleusercontent') || t[i].src.includes('blogger')) {
                let s = t[i].src.split("/");
                if (9 == s.length)
                    s[7].includes("-rw") || (s[7] = "s16000-rw"), t[i].src = s.join("/");
                else if (6 == s.length && s[s.length - 1].includes("=")) {
                    let l = s[5].split("=");
                    l[1] = l[1] + "-rw",
                    s[5] = l.join("="),
                    t[i].src = s.join("/")
                } else
                    s[5] = s[5] + "=s16000-rw", t[i].src = s.join("/");
            }
            e[i].getAttribute("data-src") || (e[i].setAttribute("data-src", e[i].src), e[i].setAttribute("src", "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTChyvkoq8sZSxHIunMyT1_JKievVmFGdyNztjwFiWTRhkYZqwcw3OB9ac0JYrhJcE94cGQr6ETZcFnHgomGiU6huZhewuAn_uBgZdPTebQ8R8mlw7BLuLy08DM5U9JkKSjRhP5Qg8J4ixrH-CQ3vu7p7kaa9rzAchyytzmkaWviQJaC6lRBg_MDXtqojE/w50-h50-rw/XVo6.gif"), e[i].setAttribute("class", "lazy"));

        }
    console.log('done webipy');
}
webipy();
        /*]]>*/
      </script>
