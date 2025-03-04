(async() => {
    await initFunctions(['FirebaseModule']);
    let allBtns = document.querySelectorAll('button[disabled]');
    let filterBtn = Array.from(allBtns);
    filterBtn = filterBtn.filter(items => {
        return items.id.substring(0, 4) === "ndm-" ? items : null;
    });

    for (let i = 0; i < filterBtn.length; i++) {
        let spanCtr = filterBtn[i].querySelector('span');
        let btn = filterBtn[i];
        let key = '-' + filterBtn[i].id.split('ndm-')[1];
        let db = 'https://account-requests-default-rtdb.firebaseio.com/shortenedLinks';

        let data = await FirebaseModule.get(db + '/' + key + '.json');
        data = JSON.parse(data);
        spanCtr.innerText = data.count;

        btn.onclick = async() => {
            data = await FirebaseModule.get(db + '/' + key + '.json');
            data = JSON.parse(data);
            spanCtr.innerText = data.count;
            await FirebaseModule.patch(db + '/' + key + '.json', JSON.stringify({
                    'count': parseInt(data.count) + 1
                }));
            spanCtr.innerText = data.count + 1;
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.8';
            window.location.href = 'https://storehaccounts.blogspot.com/p/link-terminal.html?' + key;
        }
        btn.removeAttribute('disabled');
    }
})();
