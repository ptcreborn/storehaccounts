(async function () {
    // this function is for direct link downloads
    await initFunctions(['FirebaseModule', 'PTC_Cookies']);
    let allBtns = document.querySelectorAll('button[disabled]');
    let myBtns = Array.from(allBtns);

    myBtns = myBtns.filter(items => {
        return (items.id.substring(0, 4) === 'dl?-' ? items : null);
    });

    for (let i = 0; i < myBtns.length; i++) {
        let btn = myBtns[i];
        let btnText = btn.querySelector('span');
        let smallText = btn.querySelector('small');
        let icon = btn.querySelector('i');

        let db = 'https://account-requests-default-rtdb.firebaseio.com/shortenedLinks';
        let key = '-' + btn.id.split('dl?-')[1];

        let jdata = await FirebaseModule.get(db + '/' + key + '.json');
        jdata = JSON.parse(jdata);

        icon.className = 'cloud download icon';
        btnText.innerText = 'DOWNLOAD';
        smallText.innerText = jdata.count;

        btn.addEventListener('click', async() => {			
            if (PTC_Cookies.checkIfCookiesSupported()) {
                btn.style.pointerEvents = 'none';
                btn.style.opacity = '0.8';
                let guid = btoa(jdata.title);
                let uid = '?dl=' + jdata.title + '&token=' + (new Date().getTime() * 17);
                PTC_Cookies.storeLocalStorage(guid, JSON.stringify({
                        'dltime': new Date().getTime(),
                        'expiration': 720000,
                        'targ': jdata.targ

                    }));

                jdata = await FirebaseModule.get(db + '/' + key + '.json');
                jdata = JSON.parse(jdata);
                jdata.count += 1;

                await FirebaseModule.patch(db + '/' + key + '.json', JSON.stringify({
                        'count': jdata.count
                    }));

                smallText.innerText = jdata.count;
                window.location.href = 'https://storehaccounts.blogspot.com/p/mediafire-link-generator.html' + uid;
            } else {
                window.alert("Dear user, your browser does not support Cookies! Please enable them or use other browser. Thank you!");
            }
        }, false);
        btn.removeAttribute('disabled');
    }
})();
