(async() => {
    await initFunctions(['FirebaseModule']);
    let allBtns = document.querySelectorAll('button[disabled]');
    let filterBtn = Array.from(allBtns);
    filterBtn = filterBtn.filter(items => {
        return items.id.substring(0, 4) === "ndm-" ? items : null;
    });

    for (let i = 0; i < filterBtn.length; i++) {
        let smallCtr = filterBtn[i].querySelector('small');
        let spanText = filterBtn[i].querySelector('span');
        let icon = filterBtn[i].querySelector('i');
        let btn = filterBtn[i];
        let key = '-' + filterBtn[i].id.split('ndm-')[1];
        let db = 'https://account-requests-default-rtdb.firebaseio.com/shortenedLinks';
		
		spanText.innerText = 'DOWNLOAD';
		icon.className = 'cloud download icon';

        let data = await FirebaseModule.get(db + '/' + key + '.json');
        data = JSON.parse(data);
        smallCtr.innerText = data.count;

        btn.onclick = async() => {
            data = await FirebaseModule.get(db + '/' + key + '.json');
            data = JSON.parse(data);
            smallCtr.innerText = data.count;
            await FirebaseModule.patch(db + '/' + key + '.json', JSON.stringify({
                    'count': parseInt(data.count) + 1
                }));
            smallCtr.innerText = data.count + 1;
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.8';
            window.location.href = 'https://storehaccounts.blogspot.com/p/link-terminal.html?' + key;
        }
        btn.removeAttribute('disabled');
    }
})();
