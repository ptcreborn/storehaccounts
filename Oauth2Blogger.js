// checks whether the user logged in from Blogger Users: Landing Point Page to Home page
// gets the access token and expiry in seconds...

(() => {
    url = new URL(window.location.href);

    let access_token = '';
    let expiry_seconds = 0;

    if (!url.hash) return;

    if (!url.hash.includes('#state=pass-through')) return;

    access_token = url.hash.split('&access_token=')[1].split('&token_type=')[0];
    expiry_seconds = parseInt(url.hash.split('&expires_in=')[1].split('&scope=')[0]);

    localStorage.setItem('userBloggerToken', JSON.stringify({
        token: access_token,
        expiry: expiry_seconds
    }));
    window.location.href = localStorage.getItem('beforeOauthUrl');
})();
