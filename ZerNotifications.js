
let ZerNotifications = {

    // This file handles the load of the notifications from the user in storehaccounts website.
    // This should control the bell and all its children.

    qpro: function(str) {
        return document.querySelector('[' + str + ']');
    },

   fetchNotifs: async function() {
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

                for (let i = data.length-1; i > -1; i--) {
                    let id = data[i][0];
                    let content = data[i][1];

                    let myDoc = ZerNotifications.qpro('zer-notif-template').content.cloneNode(true).children[0];
					
					if(!content.read)
						total_notif += 1;

                    myDoc.id = id;
					myDoc.style.cursor = "pointer";
					myDoc.setAttribute('onclick', 'window.location.href = ' + content.link);
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
                    <img zer-notif-user-img src='download.jfif'/>
                    <div class='notif-content notif-content1'>
                    <p class='notif-user-info'>
                    <small zer-notif-time-ago class='notif-date-published'>6 days ago</small>
                    <br/>
                    <span zer-notif-nickname class='notif-user-name'>Jason</span>
                    <span zer-notif-action class='notif-action-taken'>commented on</span>
                    <span zer-notif-title class='notif-topic'>bcu pack</span>
                    </p>
                    <p class='notif-user-snippet'>
                    <span zer-notif-snippet>dsadas etrte tretrtr fehiurgr</span>
                    </p>
                    </div>
                    <div class='notif-content notif-content2'>
                    <img zer-notif-images src='download.jfif'/>
                    </div>
                    </div>
                    </template>
                     */
                }
				
				
				if(total_notif > 0) {
					document.getElementById('zer-notif-count').innerText = total_notif;
					document.getElementById('zer-notif-count').style.display = "block";
				}
            }
        }
    }
}
