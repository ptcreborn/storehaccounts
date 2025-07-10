(() => {
    let adsterra_ads = [{
        src: `//pl26726594.profitableratecpm.com/d43c359fe4d2caa5b747df7256cd242b/invoke.js`,
        div: '<div id="container-d43c359fe4d2caa5b747df7256cd242b"></div>',
        divid: `adsterra_top`
    }, {
        src: `//pl26726594.profitableratecpm.com/d43c359fe4d2caa5b747df7256cd242b/invoke.js`,
        div: '<div id="container-d43c359fe4d2caa5b747df7256cd242b"></div>',
        divid: `adsterra_mid`
    }, {
        src: `//www.highperformanceformat.com/cc3b17b3d88c95500f8a72553d34420b/invoke.js`,
        div: `<script type="text/javascript">
	atOptions = {
		'key' : 'cc3b17b3d88c95500f8a72553d34420b',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
<\/script>`,
        divid: `adsterra_side_box`
    }, {
        src: `//www.highperformanceformat.com/e64a9928ce8120f24c524dc9289bfc65/invoke.js`,
        div: `<script type="text/javascript">
	atOptions = {
		'key' : 'e64a9928ce8120f24c524dc9289bfc65',
		'format' : 'iframe',
		'height' : 600,
		'width' : 160,
		'params' : {}
	};
<\/script>`,
        divid: `adsterra_leaderboard`
    }];

    adsterra_ads.forEach(items => {
        if (!document.getElementById(items.divid)) return;

        document.getElementById(items.divid).innerHTML = `${items.div}`;
        document.getElementById(items.divid).classList.remove('loading');

        let script = document.createElement('script');
        script.async = 'async';
        script.src = items.src;

        if (items.div.includes('<script>'))
            document.getElementById(items.divid)?.appendChild(script);
        else
            document.querySelector('body').appendChild(script);
    });
})();
