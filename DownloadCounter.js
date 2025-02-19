

window.addEventListener('load', async function () {
    let allDownloadsBtns = document.querySelectorAll('button');
    allDownloadsBtns = Array.from(allDownloadsBtns);

    allDownloadsBtns = allDownloadsBtns.filter(items => {return items.id.charAt(0) === '-' ? items : null});

    allDownloadsBtns.forEach(elems => {
		let id = elems.id;
        get_dl_views(id);
        get_dl_counts(id);
        query(id).onclick = async() => {
            let curCount = await FirebaseModule.get('https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/' + id + '.json');
			curCount = JSON.parse(curCount).clicks;
            await FirebaseModule.patch('https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/' + id + '.json', JSON.stringify({
                    "clicks": ++curCount
                }));
            window.location.href = "https://storehaccounts.blogspot.com/p/link-terminal.html#fb?" + id;
        }
    });
}, false);

async function get_dl_views(url) {
    let LT_url = 'https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/';
    let data = await FirebaseModule.get(LT_url + url + ".json");
    data = JSON.parse(data).clicks;

    query(url).querySelectorAll('b')[1].innerText = data;
}

async function get_dl_counts(url) {
    let LT_url = 'https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/';
    let data = await FirebaseModule.get(LT_url + url + ".json");
    data = JSON.parse(data).downloads;

    query(url).querySelectorAll('b')[2].innerText = data;
}
