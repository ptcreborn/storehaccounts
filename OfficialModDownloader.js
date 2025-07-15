(async() => {
    // check if the post is official download page
    // by checking app-signature
    // by checking app-version
    // by checking div with id "download"..

    const app_signature = document.querySelector('[app-signature]');
    const app_version = document.querySelector('[app-version]');
    const download = document.querySelector('div#download button');
    const app_downloads = document.querySelector('[app-dl-count]');

    if (!app_signature || !app_version || !download) return;

    download.addEventListener('click', async() => {
        download.classList.add('disabled', 'placeholder');
        download.innerText = "Downloading...";

        const db = `https://ptc-database-default-rtdb.firebaseio.com/mods`;

        await initFunctions(['FirebaseModule']);

        let key = btoa(app_signature.innerText);
        let ver = app_version.innerText; //

        let mf_link = await FirebaseModule.fetchJSON(`${db}/${key}/versions/${ver}/dl.json`);
        let dl_count = await FirebaseModule.fetchJSON(`${db}/${key}/downloads.json`);

        dl_count += 1;

        app_downloads.innerText = dl_count;

        await MFLinkGenerator(mf_link);

        async function MFLinkGenerator(mf_link) {
            let html_text = await fetch('https://corsproxy.io/?' + mf_link);

            if (html_text.status != "200")
                window.location.href = mf_link;

            html_text = await html_text.clone().text();

            let temp_div = document.createElement('div');
            temp_div.innerHTML = html_text;

            let mf_dl_link = atob(temp_div.querySelector('a.input.popsok').getAttribute('data-scrambled-url'));

            if (!mf_dl_link)
                window.location.href = mf_link;

            if (mf_dl_link.includes('download'))
                window.location.href = mf_dl_link;
            else
                MFLinkGenerator(mf_dl_link);
        }
    });
})();
