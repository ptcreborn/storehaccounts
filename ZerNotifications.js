
let ZerNotifications = {

    // This file handles the load of the notifications from the user in storehaccounts website.
    // This should control the bell and all its children.

    qpro: function (str) {
        return document.querySelector('[' + str + ']');
    },

    markRead: async function (notif_id, content_link, isRead, thisID) {
        // by clicking the notification,
        // the notif card must be lessen the opacity
        // the notif from firebase must be marked as read

        let data = {
            "read": true
        }

        if(!isRead) await FirebaseModule.patch(notif_id, JSON.stringify(data));
		
	document.getElementById(thisID).style.background = '#3d3d3d';
		//document.getElementById(thisID).style.opacity = '0.95';
        if(document.getElementById(thisID).querySelector('[zer-notif-read-status]')) document.getElementById(thisID).querySelector('[zer-notif-read-status]').remove();

        window.location.href = content_link.replaceAll("'", "");
    },

    fetchNotifs: async function () {
        // check if the user is logged on.
        // get the firebase list if exists
        // create a template and append to the div parent container

        let user = localStorage.getItem('ptc_user');
        if (user) {
            user = JSON.parse(user);
            user = user.user;

            let data = await FirebaseModule.get('https://storehaccounts-notifications-default-rtdb.firebaseio.com/' + user + '.json');
            if (data != null || data != "null") {
                data = JSON.parse(data);
                data = Object.entries(data);

                let total_notif = 0;

                for (let i = data.length - 1; i > -1; i--) {
                    let id = data[i][0];
                    let content = data[i][1];

                    let myDoc = ZerNotifications.qpro('zer-notif-template').content.cloneNode(true).children[0];

                    if (!content.read) 
                        total_notif += 1; 
					else {
						myDoc.style.background = '#1E1F22';
						myDoc.style.opacity = '0.95';
                        if(myDoc.querySelector('[zer-notif-read-status]')) myDoc.querySelector('[zer-notif-read-status]').remove();
                    }

                    myDoc.id = id;
                    myDoc.style.cursor = "pointer";
					
                    myDoc.addEventListener('click', function () {
                        ZerNotifications.markRead('https://storehaccounts-notifications-default-rtdb.firebaseio.com/' + user + '/' + id + '.json', content.link, content.read, id);
                    });
                    myDoc.querySelector('[zer-notif-user-img]').src = content.prof_img;
                    myDoc.querySelector('[zer-notif-time-ago]').innerText = moment(parseInt(id)).fromNow();
                    myDoc.querySelector('[zer-notif-nickname]').innerText = content.nickname;
                    myDoc.querySelector('[zer-notif-action]').innerText = content.action;

                    myDoc.querySelector('[zer-notif-title]').innerText = content.webtitle;
                    myDoc.querySelector('[zer-notif-snippet]').innerText = content.snippet;
                    myDoc.querySelector('[zer-notif-images]').src = content.thumb;

                    ZerNotifications.qpro('zer-notification-parent').appendChild(myDoc);

                    /*
                    <template zer-notif-template>
                    <div class='notif-list notif-list4'>
                    <img zer-notif-user-img src='https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_square_small.gif'/>
                    <div class='notif-content notif-content1'>
                    <p class='notif-user-info'>
                    <span zer-notif-read-status style="font-weight: 600; margin-right: 5px; font-size: 12px; background: red; padding: 1px 3px; border-radius: 5px; color: white;">UNREAD</span>
                    <small zer-notif-time-ago class='notif-date-published'>Loading...</small>
                    <br/>
                    <span zer-notif-nickname class='notif-user-name'>Loading...</span>
                    <span zer-notif-action class='notif-action-taken'>Loading...</span>
                    <span zer-notif-title class='notif-topic'>Loading...</span>
                    </p>
                    <p class='notif-user-snippet'>
                    <span zer-notif-snippet>Loading...</span>
                    </p>
                    </div>
                    <div class='notif-content notif-content2'>
                    <img zer-notif-images src='https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_square_small.gif'/>
                    </div>
                    </div>
                    </template>
                     */
                }

                if (total_notif > 0) {
                    document.getElementById('zer-notif-count').innerText = total_notif;
                    document.getElementById('zer-notif-count').style.display = "block";
                }
            }
        }
    }
}
