window.addEventListener('load', async() => {
    document.querySelector('#generate').onclick = async() => {
        console.log('clicked!');
        let db = 'https://account-requests-default-rtdb.firebaseio.com/shortenedLinks.json';
        let link = document.querySelector('#link').value;
        try {
            if (!new URL(link).hostname.includes('mediafire.com'))
                throw new Error('Not Mediafire!');
        } catch (e) {
            window.alert('Only Mediafire Link acceptable! ' + e);
        }
        let numads = document.querySelector('#numads').value;
        let size = document.querySelector('#size').value;
        let version = document.querySelector('#version').value;
        let title = document.querySelector('#title').value;
        let progress = numads;
        link = await FirebaseModule.post(db, JSON.stringify({
                    'count': 0,
                    'targ': btoa(link),
                    'numads': numads,
                    'title': title,
                    'version': version,
                    'size': size + ' MB'
                }));
        link = JSON.parse(link).name;
        let output = document.querySelector('#outputhtml');
        let outputta = document.querySelector('#output');

        if (numads == 0) { // means direct link
            output.innerHTML = '<button disabled id="dl?' + link + '" class="ui big labeled icon teal button"><i class="loading spinner icon"></i><span>FETCHING ... </span><small style="float: right;">0</small></button>';
            outputta.value = '<button disabled id="dl?' + link + '" class="ui big labeled icon teal button"><i class="loading spinner icon"></i><span>FETCHING ... </span><small style="float: right;">0</small></button>';
        } else {
            output.innerHTML = '<button disabled id="ndm' + link + '" class="ui big labeled icon teal button"><i class="loading spinner icon"></i><span>FETCHING ... </span><small style="float: right;">0</small></button>';
            outputta.value = '<button disabled id="ndm' + link + '" class="ui big labeled icon teal button"><i class="loading spinner icon"></i><span>FETCHING ... </span><small style="float: right;">0</small></button>';
        }
    }

}, false);
