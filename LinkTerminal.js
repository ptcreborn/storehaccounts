(() => {
    document.addEventListener('contextmenu', event => event.preventDefault());
    try {

        let timeout;
        let counter = 0;
        let isProceedUnlocked = false;
        let url = window.location.href;
        var targetUrl = '';

        let LT_isFrameFocus = false;
        let isFrameFocus = false;
        let isFrameFocus2 = false;
        let iframeClickCount = 0;
        let iframeClickCount2 = 0;
        let isUnloading = false;

        localStorage.setItem('time1', 0);
        localStorage.setItem('time2', 0);
        localStorage.setItem('time3', 0);

        let frameClickStart = 0;

        let lockAlert = false;

        function Lget(id) {
            let item = localStorage.getItem(id);
            if (!isNaN(item))
                return parseInt(item);
            else
                return item;
        }

        function display(str) {
            document.querySelector('#log_status').innerText += str + '\n';
        }

        function Lset(id, item) {
            return localStorage.setItem(id, item);
        }

        if (url.includes('?m=1'))
            url = url.replaceAll('?m=1', '');

        if (url.includes('=%3D'))
            url = url.substring(0, url.lastIndexOf('%') - 1);
        if (url.includes('&m=1'))
            url = url.replaceAll('&m-1', '');
        if (url.includes('#google_vignette'))
            url = url.replaceAll('#google_vignette', '');

        if (url.includes('#fb?-')) { // means new way of bypassing
            newWayBypass(url);
        } else {
            if (url.includes('?')) {
                document.querySelector('#bypass-progress').innerText = 'Bypassing: ' + atob(url.split('?')[1]);
                url = url.substring(0, url.indexOf('?'));
            } else if (url.includes('|')) {
                document.querySelector('#bypass-progress').innerText = 'Bypassing: ' + atob(url.split('|')[1]);
                url = url.substring(0, url.indexOf('|'));
            }

            try {
                targetUrl = atob(url.split("#")[1]);
            } catch (err) {
                window.alert('The requested link has error, cannot decrypt.\nError logs: ' + err);
            }
            var tempUrl = new URL(atob(url.split("#")[1]));
        }

        window.addEventListener('load', function () {
            document.querySelector('#loadStat').innerText = 'Reloading... (Click me to start)';
            timeout = setInterval(startCount, 140);
        }, false);

        function proceedingNow() {
            // Proceed now link will be only activated once invisible ad is away or gone.
            localStorage.removeItem('LinkTerminalPop');
            document.cookie = 'ptc_expired_notif=; Max-Age=0'; // means end session detected
        }
        document.querySelector('#realLink').addEventListener('click', proceedingNow, false);

        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            display('reloaded err...');
            localStorage.removeItem('link-ptc-click');
            localStorage.removeItem('clickTime');
            isProceedUnlocked = false;
        } else {
            console.info("This page is not reloaded");
        }

        function storeTimeClicked() {
            localStorage.setItem('clickTime', new Date().getTime());
        }

        function checkTime() {
            if (new Date().getTime() - parseInt(localStorage.getItem('clickTime')) >= 10000) // greater than 10 seconds
                return true;
            else
                return false;
        }

        function detectUnload() { // means the user clicked the ad and starting to unload
            setTimeout(function () {
                isUnloading = true;
                Lset('time3', new Date().getTime());
                Lset('time2', 0);
                if (isFrameFocus2 && !isProceedUnlocked) {
                    // Session started... Please stay there for 5 to 10 seconds...
                    localStorage.setItem('link-ptc-click', 'set');
                    storeTimeClicked(); // starts the adview counter
                }
            }, 1);
        }

        function detectVisibility() { // means the user clicked the ad and open new tab
            if (document.visibilityState === "hidden" && !isUnloading) {
                console.log('hidden!');
                Lset('time2', new Date().getTime());
                Lset('time3', 0);
                if (isFrameFocus && !isProceedUnlocked) {
                    document.querySelector('#ad_status').innerText = 'Session started... Please stay there for 5 to 10 seconds...';
                    localStorage.setItem('link-ptc-click', 'set'); // means redirected to ADS page
                    storeTimeClicked(); // starts the adview counter
                }
            }
            if (document.visibilityState === "visible") { // could mean the user got back from ad page to link terminal
                console.log('from visible2: ' + (Lget('time2') - Lget('time1')));
                console.log('from visible3: ' + (Lget('time3') - Lget('time1')));
                console.log(checkTime());
                if (localStorage.getItem('link-ptc-click') && !isProceedUnlocked) { // got back from the ADS page
                    let invalidResult = Lget('time2') == 0 ? (Lget('time3') - Lget('time1')) > 200 : (Lget('time2') - Lget('time1')) > 200;
                    if (!checkTime() || invalidResult) {
                        storeTimeClicked();
                        document.getElementById('loadStat').innerHTML = "Try again... Bruhh wait for 5 to 10 seconds...";
                        document.querySelector('#realLink').innerHTML = 'Try again...';
                        isUnloading = false;
                    } else {
                        localStorage.removeItem('link-ptc-click');
                        setCookie('link-exhaust3', 'set', 1); // when successfully clicked, set exhaust to disable for next 20 minutes..
                        unlockLink();
                    }
                }
            }
        }

        function blurEvent() { // listener when focus to another iframe or window
            setTimeout(function () {
                if (document.activeElement == document.querySelector("#popup iframe") && !isProceedUnlocked) {
                    // Reveal the ad when clicked 5 times
                    Lset('time1', new Date().getTime());
                    isFrameFocus = true;
                    isFrameFocus2 = true;
                    window.focus();
                }
            }, 0);
        }

        async function detectAdBlock() {
            let adBlockEnabled = false
                const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
                try {
                    await fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true)
                } catch (e) {
                    adBlockEnabled = true
                } finally {
                    return adBlockEnabled;
                }
        }

        async function startCount() {
            // means abort the counter if exhausted and not yet unlocked the link
            let guessWhat = Math.floor(Math.random() * 100);
            if ((getCookieName('link-exhaust3') && !isProceedUnlocked))
                unlockLink();

            if (localStorage.getItem('link-ptc-click')) { // got back from the ADS page from same load page
                display('GOT BACK FROM LOAD PAGE');
                display(checkTime());
                display('proceed now status: ' + isProceedUnlocked);
                if (!checkTime()) {
                    document.querySelector('#popup').style.display = 'block';
                    counter = 85;
                    storeTimeClicked();
                    display(counter);
                    document.getElementById('loadStat').innerHTML = "Try again...";
                } else {
                    setCookie('link-exhaust3', 'set', 1); // when successfully clicked, set exhaust to disable for next 20 minutes..
                    unlockLink();
                }
            }
            window.blur();
            if (counter == 85) {
                document.querySelector("#popup").style.opacity = '0.0001';
                document.querySelector("#popup").style.position = 'relative';
                document.querySelector("#popup").style.top = '-55px';
                display('done counting...');
                document.getElementById('realLink').style.display = 'inline-block';

                if (document.querySelectorAll("#popup ins")[0].getAttribute("data-ad-status")
                     && document.querySelectorAll("#popup iframe")[0].getAttribute("data-load-complete")
                     && document.querySelector('#popup iframe')
                     && document.querySelector('#popup iframe').clientHeight > 0
                     && !await detectAdBlock()) {
                    // means data ad served well
                    window.focus(); // focusing to window and not to any iframe
                    window.addEventListener('blur', blurEvent, false);
                } else if (document.querySelectorAll("#popup ins")[0].getAttribute("data-ad-status")
                     && document.querySelectorAll("#popup ins")[0].getAttribute("data-ad-status") == 'unfilled'
                     && document.querySelector('#popup iframe')
                     && document.querySelector('#popup iframe').clientHeight == 0
                     && !await detectAdBlock()) {
                    document.querySelector('#popup').style.display = 'block';
                    display('unlocking from unfilled and lem');
                    unlockLink();
                    clearInterval(timeout);
                } else {
                    display('adblock detected.');
                    document.querySelector('#ss_set').innerHTML = 'AD BLOCK DETECTED! Please reload this page or use incognito!';
                    window.alert('AD BLOCK DETECTED!');
                }
                document.addEventListener("visibilitychange", detectVisibility, false);
                window.addEventListener("beforeunload", detectUnload, false);
                focus();
                clearInterval(timeout);
            } else { // Counter decoding link...
                //display('counting...');
                if (isElementVisible(document.getElementById('loadStat'))) { /* elementInViewport(document.getElementById('loadStat')) */
                    if (counter <= 70)
                        document.getElementById('loadStat')
                        .innerHTML = "Decoding link " + getDot(counter);
                    else {
                        if (!isProceedUnlocked) {
                            document.querySelector('#popup').style.display = 'block';
                        }
                        document.getElementById('loadStat').innerHTML = "Decoding complete! Click the link below to proceed."
                            if (targetUrl.includes('p/ptc-account-portal-automated-4') || targetUrl.includes('p/account-retrieval') || targetUrl.includes('archive.org/') || targetUrl.includes('bit.ly')) {
                                document.getElementById('realLink').removeAttribute('target');
                            }
                            document.getElementById('realLink').style.pointerEvents = 'none';
                        document.getElementById('realLink').href = targetUrl;
                        //document.getElementById('realLink').setAttribute('onclick', 'javascript:window.alert("Bypass first before unlocking the link");');
                        if (!document.querySelector('#popup ins').getAttribute('data-ad-status') || document.querySelector('#popup iframe').clientHeight == 0) {
                            //unlockLink();
                            document.querySelector('#ss_set').innerHTML = 'AD BLOCK DETECTED! PLEASE SUPPORT PTC BY DISABLING/NOT USING ANTI AD BLOCKERS';
                        }
                    }
                    counter++;
                } else
                    console.log(document.hasFocus());
            }
        }

        async function unlockLink() {
            display('Unlock link...');
            if (!isProceedUnlocked && (document.querySelector('#popup ins').getAttribute('data-ad-status') || localStorage.getItem('lem'))) {

                display('unlocking link...');
                isProceedUnlocked = true;
                localStorage.removeItem('link-ptc-click');
                localStorage.removeItem('clickTime');
                document.querySelector('#ss_set').innerHTML = 'Properly Set.';
                //document.querySelector('#auctionAD').style.display = 'block';
                //document.querySelector('#auctionAD').appendChild(document.querySelector('#popup ins'));
                document.querySelector('#popup').style.position = 'static';
                document.querySelector('#popup').style.opacity = '1';

                if (window.location.href.includes('#fb?-')) {
                    url = window.location.href;
                    let LT = 'https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal';
                    let req_url = url.split('#fb?')[1];
                    let uid = req_url.split('&')[1];
                    req_url = req_url.split('&')[0];
                    let fbmod = await FirebaseModule.get(LT + '/' + req_url + '.json');

                    fbmod = JSON.parse(fbmod);
                    let numads = fbmod.numads;
                    let bypass = 0;

                    try {
                        bypass = fbmod.visitors[uid].bypass;
                    } catch (e) {
                        window.location.href = url.split('&')[0];
                        document.querySelector('#realLink').innerHTML = '✅ Link Unlocked';
                        document.querySelector('#realLink').href = url.split('&')[0];
                    }

                    if (bypass < numads) {
                        let curCount = parseInt(bypass) + 1;
                        await FirebaseModule.patch(LT + '/' + req_url + '/visitors/' + uid + '.json',
                            JSON.stringify({
                                "bypass": curCount
                            }));
                        document.getElementById('realLink').href = window.location.href + '#fb?-' + req_url + '&' + uid;
                    } else {
                        document.querySelector('#bypass-progress').innerText = 'Bypassing Done!';
                        await FirebaseModule.patch(LT + '/' + req_url + '.json',
                            JSON.stringify({
                                'downloads': parseInt(fbmod.downloads) + 1
                            }));
                        await FirebaseModule.patch(LT + '/' + req_url + '/visitors/' + uid + '.json', 'null');
                        document.getElementById('realLink').href = fbmod.target;
                    }
                } else {
                    document.getElementById('realLink').href = targetUrl;
                }

                if (targetUrl.includes('www.dropbox.com')) {
                    document.querySelector('#realLink').innerHTML = '✅Downloading your mod now...';
                    document.getElementById('realLink').style.pointerEvents = 'none';
                    document.getElementById('realLink').style.opacity = '0.7';
                    window.location.href = targetUrl;
                }

                // LINK
                document.querySelector('#realLink').innerHTML = '✅ Link Unlocked';
                document.getElementById('loadStat').innerHTML = "Decoding complete! Click the link below to proceed.";
                document.querySelector('#realLink').style.fontSize = '24px';
                document.querySelector('#realLink').style.display = 'block';
                document.querySelector('#ad_status').innerText = 'Your link has been unlocked.';
                document.getElementById('realLink').style.pointerEvents = 'auto';
                document.getElementById('realLink').removeAttribute('onclick');

            }
            /*else {
            display('adblock detected.');
            document.querySelector('#ss_set').innerHTML = 'AD BLOCK DETECTED!';
            window.alert('AD BLOCK DETECTED!');

            isProceedUnlocked = true;
            document.querySelector('#ss_set').innerHTML = 'Properly Set.';
            document.querySelector('#popup').style.visibility = 'visible';
            document.querySelector('#popup').style.opacity = '1';
            document.querySelector('#popup').classList.remove('absolute');
            document.querySelector('#auctionAD').appendChild(document.querySelector('#popup'));
            document.querySelector('#realLink').innerHTML = 'Downloading...';
            document.querySelector('#realLink').style.pointerEvents = 'none';
            window.location.href = document.querySelector('#realLink').href;
            }*/

            clearInterval(timeout);
        }

        async function newWayBypass(url) {
            window.addEventListener('load', async function () {
                if (!url.includes('&')) {
                    // fresh link
                    // generate uid for this visitor
                    let req_url = url.split('#fb?')[1];
                    let uid = new Date().getTime();
                    await FirebaseModule.patch("https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/" + req_url + '/visitors.json',
                        JSON.stringify({
                            [uid]: {
                                "bypass": 0
                            }
                        }));
                    window.location.href = window.location.href + '&' + uid;
                    document.querySelector('#bypass-progress').innerText = 'Bypassing: started...';
                } else {
                    let LT = 'https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal';
                    let req_url = url.split('#fb?')[1];
                    let uid = req_url.split('&')[1];
                    req_url = req_url.split('&')[0];
                    let fbmod = await FirebaseModule.get(LT + '/' + req_url + '.json');
                    fbmod = JSON.parse(fbmod);
                    let numads = fbmod.numads;
                    let bypass = 0;

                    try {
                        bypass = fbmod.visitors[uid].bypass;
                    } catch (e) {
                        window.location.href = url.split('&')[0];
                        document.querySelector('#realLink').innerHTML = '✅ Link Unlocked';
                        document.querySelector('#realLink').href = url.split('&')[0];
                    }

                    document.querySelector('#bypass-progress').innerText = 'Bypassing: (' + bypass + '/' + numads + ')';
                }
            }, false);
        }

        function clearCookies() {
            document.cookie = 'ptc_session=; Max-Age=0';
            document.cookie = 'ptc_expired_notif=; Max-Age=0';
        }

        function isElementVisible(el) {
            var rect = el.getBoundingClientRect(),
            vWidth = window.innerWidth || doc.documentElement.clientWidth,
            vHeight = window.innerHeight || doc.documentElement.clientHeight,
            efp = function (x, y) {
                return document.elementFromPoint(x, y)
            };

            // Return false if it's not in the viewport
            if (rect.right < 0 || rect.bottom < 0
                 || rect.left > vWidth || rect.top > vHeight)
                return false;

            // Return true if any of its four corners are visible
            return (
                el.contains(efp(rect.left, rect.top))
                 || el.contains(efp(rect.right, rect.top))
                 || el.contains(efp(rect.right, rect.bottom))
                 || el.contains(efp(rect.left, rect.bottom)));
        }

        function elementInViewport(el) {
            let top = el.offsetTop;
            let left = el.offsetLeft;
            let width = el.offsetWidth;
            let height = el.offsetHeight;
            while (el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }
            return (top >= window.pageYOffset && left >= window.pageXOffset && (top + height) <= (window.pageYOffset + window.innerHeight) && (left + width) <= (window.pageXOffset + window.innerWidth) && document.hasFocus());
        }

        function getDot(count) {
            let dots = "";
            let random = Math.floor((Math.random() * 3) + 1);
            if (random == 1)
                return ("😲");
            else if (random == 2)
                return ("🥱");
            else if (random == 3)
                return ("😴");
            else
                return ("!");
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
    } catch (e) {

        console.log(e);
    }
})();
