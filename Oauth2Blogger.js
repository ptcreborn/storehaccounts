// checks whether the user logged in from Blogger Users: Landing Point Page to Home page
// gets the access token and expiry in seconds...

(() => {
    url = new URL(window.location.href);

    let access_token = '';
    let expiry_seconds = 0;

    // check expiry of the token...
    if(localStorage.getItem('userBloggerToken')) {
        let data = JSON.parse(localStorage.getItem('userBloggerToken'));
        let end = data.expiry;
        let start = data.start;

        if((new Date().getTime() - start)/1000 > end) {
            localStorage.removeItem('userBloggerToken');
        }
    }

    if (!url.hash) return;

    if (!url.hash.includes('#state=pass-through')) return;

    access_token = url.hash.split('&access_token=')[1].split('&token_type=')[0];
    expiry_seconds = parseInt(url.hash.split('&expires_in=')[1].split('&scope=')[0]);

    localStorage.setItem('userBloggerToken', JSON.stringify({
        token: access_token,
        expiry: expiry_seconds,
        start: new Date().getTime()
    }));
    
    if(!localStorage.getItem('beforeOauthUrl')) return;
    window.location.href = localStorage.getItem('beforeOauthUrl');
})();
