//<![CDATA[
//OneSignal Lazyload By Wendy Code
var onsignal = !1;
(function () {
    (0 != document.documentElement.scrollTop && !1 === onsignal || 0 != document.body.scrollTop && !1 === onsignal) && (!function () {
        var e = document.createElement("script");
        e.type = "text/javascript",
        e.async = !0,
        e.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }
        (), onsignal = !0)
})();

function buildGallery() {
    // Check if the post has images
    let allImgs = document.querySelectorAll('.postBody img:not(#ptc-preview)');
    if (allImgs.length > 0 && !window.location.href.includes('/p/')) {
        for (i = 0; i < allImgs.length; i++) {
            let subParentDiv = document.createElement('div');
            let imglets = document.createElement('img');
            let temp = allImgs[i].getAttribute('data-src').split('/');
            if (temp.length == 9) {
                temp[7] = 's80-rw';
                temp = temp.join('/');
                imglets.setAttribute('src', temp);
            } else if (temp.length == 6) {
                temp = temp.join('/');
                temp = temp.split('=');
                temp[1] = 'w80-h80-rw';
                temp = temp.join('=');
                imglets.setAttribute('src', temp);
            } else {
                imglets.setAttribute('src', allImgs[i].getAttribute('data-src'));
            }
            imglets.setAttribute('class', 'lazy');
            imglets.setAttribute('alt', document.title);
            imglets.setAttribute('onclick', 'letsPreview(this)');
            subParentDiv.appendChild(imglets);
            document.querySelectorAll('.ptc-snaps')[0].appendChild(subParentDiv);
            if (i == 1)
                letsPreview(document.querySelectorAll('.ptc-snaps img')[0]);
        }
    }
}

function letsPreview(myData) {
    document.querySelector('#ptc-preview').removeAttribute('src');
    let temp = myData.src.split('/');
    if (temp.length == 9) {
        temp[7] = 's16000-rw';
        temp = temp.join('/');
    } else if (temp.length == 6) {
        temp = temp.join('/');
        temp = temp.split('=');
        temp[1] = 'w16000-h16000-rw';
        temp = temp.join('=');
    } else {
        temp = myData.src;
    }
    document.querySelector('#ptc-preview').setAttribute('src', temp);
    document.querySelector('#ptc-preview').setAttribute('alt', document.title);
    /*document.querySelector('.blogCont').style.background = "linear-gradient(to bottom, rgba(0,0,0,0.8) -50%, rgba(0,0,0,0.9)), url(" + temp + ") no-repeat center center fixed";
    document.querySelector('.blogCont').style.backgroundSize = '100% 700px';
    document.querySelector('.blogCont').style.backgroundPosition = 'fixed';
    document.querySelector('.blogCont').style.top = '0';
    document.querySelector('.blogCont').style.left = '0';
    document.querySelector('.blogCont').willChange = 'transform';*/
}

(function () {
	initFunctions(['ZerNotifications']);
    let shareThis = document.createElement('script');
    shareThis.setAttribute('async', 'async');
    shareThis.setAttribute('src', 'https://platform-api.sharethis.com/js/sharethis.js#property=6501dd359dda6c0012ae1168&product=inline-reaction-buttons&source=platform');
    shareThis.setAttribute('type', 'text/javascript');
    document.querySelector('head').appendChild(shareThis);
    //if(!window.location.href.includes('m=1')) document.querySelector('#offNav').click();

    // Check oauth for users moderators
    if (window.location.href.includes('#state=pass-through%20value&access_token=')) {
        let url = window.location.href;
        url = url.split('access_token=')[1];
        url = url.split('&token_type=Bearer')[0];
        setCookie('user_oauth', url, 3599);
        //window.alert('you are successfully logged in!');
        window.location.href = 'https://storehaccounts.blogspot.com/p/moderators-thread.html';
    }

    if (document.querySelector('#comment-editor'))
        document.querySelector('.postBody').appendChild(document.querySelector('#comment-editor'));

    ZerNotifications.fetchNotifs();
})();
