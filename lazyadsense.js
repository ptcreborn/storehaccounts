var lazyadsense = !1;
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
