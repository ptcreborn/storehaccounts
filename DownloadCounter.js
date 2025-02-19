'(async function () {window.addEventListener(\"load\"),async function () {query(" + request_url + ").querySelector(\"b\")[1].innerText = await FirebaseModule.get(\"https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/" + request_url + "/clicks.json\");query(" + request_url + ").querySelector(\"b\")[2].innerText = await FirebaseModule.get(\"https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/" + request_url + "/downloads.json\");},false);let currentCount = await FirebaseModule.get(\"https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/" + request_url + "/clicks.json\");await FirebaseModule.patch(\"https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/" + request_url + ".json\", JSON.stringify({\"clicks\": ++currentCount}));query(" + request_url + ").querySelector(\"b\")[1].innerText = currentCount;window.location.href = \"https://storehaccounts.blogspot.com/p/link-terminal.html#fb?" + request_url + ";\"})();'

window.addEventListener('load', async function () {
    let allDownloadsBtns = document.querySelectorAll('button');
    allDownloadsBtns = Array.from(allDownloadsBtns);

    allDownloadsBtns.filter(items => {return items.id.charAt(0) === '-' ? items.id : null});

    allDownloadsBtns.forEach(id => {
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

function get_dl_views(url) {
    let LT_url = 'https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/';
    let data = await FirebaseModule.get(LT_url + url + ".json");
    data = JSON.parse(data).clicks;

    query(url).querySelector('b')[1].innerText = data;
}

function get_dl_counts() {
    let LT_url = 'https://storehaccounts-users-default-rtdb.firebaseio.com/link_terminal/';
    let data = await FirebaseModule.get(LT_url + url + ".json");
    data = JSON.parse(data).downloads;

    query(url).querySelector('b')[2].innerText = data;
}
