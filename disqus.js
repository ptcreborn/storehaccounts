window.addEventListener('load', () => {
    var disqus_config = function() {
        const cannonical_url = new URL(window.location.href);
        this.page.url = `${cannonical_url.origin}${cannonical_url.pathname}`; // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = `${cannonical_url.origin}${cannonical_url.pathname}`; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function() { // DON'T EDIT BELOW THIS LINE
        var d = document,
            s = d.createElement('script');
        s.src = 'https://battle-cats-archive.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
}, false);
