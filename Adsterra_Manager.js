(() => {
    let adsterra_ads = [{
        src: `//pl26726594.profitableratecpm.com/d43c359fe4d2caa5b747df7256cd242b/invoke.js`,
        div: '<div id="container-d43c359fe4d2caa5b747df7256cd242b"></div>',
        divid: `adsterra_top`
    }, {
        src: `//pl26726594.profitableratecpm.com/d43c359fe4d2caa5b747df7256cd242b/invoke.js`,
        div: '<div id="container-d43c359fe4d2caa5b747df7256cd242b"></div>',
        divid: `adsterra_mid`
    }];

    adsterra_ads.forEach(items => {
        if (!document.getElementById(items.divid)) return;

        document.getElementById(items.divid).innerHTML = `${items.div}`;
        document.getElementById(items.divid).classList.remove('loading');

        let script = document.createElement('script');
        script.async = 'async';
        script.src = items.src;

        document.querySelector('body').appendChild(script);
    });
})();
