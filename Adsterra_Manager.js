

// this js file will manage all adsterra ads


// ADSTERRA Lazy ADS

(async function () {
  // PLEASE ADD to array only BANNER!
    let adsProperty = [[
            //ADS #1
            "adsterra_top",
            "atOptions = { 'key' : 'dbb081bd229885ddc0aa9d909e761042', 'format' : 'iframe', 'height' : 90, 'width' : 720, 'params' : {} };",
            "//www.highperformanceformat.com/dbb081bd229885ddc0aa9d909e761042/invoke.js"
        ],

        // ADS#2
        [
            "adsterra_mid",
            "atOptions = { 		'key' : 'dbb081bd229885ddc0aa9d909e761042', 		'format' : 'iframe', 		'height' : 90, 		'width' : 720, 		'params' : {} 	};",
            "//www.highperformanceformat.com/dbb081bd229885ddc0aa9d909e761042/invoke.js"
        ]
    ];

    // ADDING BANNERS
    adsProperty.forEach(items => {
        if (document.getElementById(items[0])) {
            let tempo_div = document.getElementById(items[0]);
            let scriptA = document.createElement('script');
            let scriptB = document.createElement('script');

            scriptA.innerHTML = items[1];
            scriptB.src = items[2];

            tempo_div.appendChild(scriptA);
            tempo_div.appendChild(scriptB);
        }
    });

    // Native Banner Only! FIXED
    let scriptt = document.createElement('script');
    let divv = document.createElement('div');

    scriptt.setAttribute('async', 'async');
    scriptt.setAttribute('data-cfasync', 'false');
    scriptt.setAttribute('src', '//pl26726594.profitableratecpm.com/d43c359fe4d2caa5b747df7256cd242b/invoke.js');
    divv.id = 'container-d43c359fe4d2caa5b747df7256cd242b';

    if (document.querySelector('#adsterra_bottom')) {
        document.querySelector('#adsterra_bottom').appendChild(divv);
        document.querySelector('#adsterra_bottom').appendChild(scriptt);
    }

})();
