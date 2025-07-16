(async() => {
    // Notification Service
    // Place on every page of the website
    // Fetch the notifications, sorting from unread (latest) to read (latest)
    // Build HTML
    // Basically Hide Read Notifs by creating "Read all Notifications"
    // Create All Caught up when no notifications

    await initFunctions(['supabase', 'moment']);

    let username = await getUsername();

    if (!username) {
        console.log(`username is invalid`);
        return;
    }

    const notif_parent = document.getElementById('notif_dropdown');
    const notif_container = document.getElementById('notif_container');
    const notif_template = document.querySelector('[notif-template]');

    notif_parent.style.display = 'block';

    await fetchNotification(username);

    async function fetchNotification(username) {
        // this function will fetch from firebase
        // sorting from read to unread (latest to soonest)

        await initFunctions(['FirebaseModule']);

        const encodedUsername = btoa(username);
        const db = `https://ptc-database-default-rtdb.firebaseio.com/notifications/${encodedUsername}.json`;

        let notifs_data = await FirebaseModule.fetchJSON(db);

        if (!notifs_data) {
            let container = notif_template.content.cloneNode(true).children[1];
            document.querySelector('#notif_count').innerText = 0;
            notif_container.querySelector('div').appendChild(container);
        } else {
            let keys = Object.keys(notifs_data);
            keys.reverse();
            let count_notif = 0;
            let read_keys = [];

            for (const key_obj of keys) {
                let data = notifs_data[key_obj];

                if (!data.read) {
                    let container = notif_template.content.cloneNode(true).children[0];
                    container.id = key_obj;
                    if (container.querySelector('[notif-none]')) container.querySelector('[notif-none]').remove();
                    container.querySelector('[notif-action]').innerText = data.action;
                    container.querySelector('[notif-prof]').src = data.prof;
                    container.querySelector('[notif-thumb]').src = data.hasOwnProperty('thumb') ? data.thumb : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';

                    container.querySelector('[notif-title-snippet]').innerHTML = data.title + `<br/><i
                    style="font-size: 11px; font-weight: 500; color: white; opacity: 0.6;">${data.href}</i>`;
                    container.querySelector('[notif-user]').innerText = data.user;
                    container.querySelector('[notif-time]').innerText = moment(new Date(parseInt(key_obj))).fromNow();
                    notif_container.querySelector('div').appendChild(container);
                    document.getElementById(key_obj).addEventListener('click', async() => {
                        await markRead(`https://ptc-database-default-rtdb.firebaseio.com/notifications/${encodedUsername}`, key_obj, data.href);
                    });
                    count_notif++;
                } else
                    read_keys.push(key_obj);

            }

            for (key_obj of read_keys) {
                let data = notifs_data[key_obj];
                let container = notif_template.content.cloneNode(true).children[0];

                if (container.querySelector('[notif-none]')) container.querySelector('[notif-none]').remove();
                container.id = key_obj;
                container.querySelector('[notif-action]').innerText = data.action;
                container.querySelector('[notif-prof]').src = data.prof;
                container.querySelector('[notif-thumb]').src = data.hasOwnProperty('thumb') ? data.thumb : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';

                container.querySelector('[notif-title-snippet]').innerHTML = data.title + `<br/><i
                    style="font-size: 11px; font-weight: 500; color: white; opacity: 0.6;">${data.href}</i>`;
                container.querySelector('[notif-user]').innerText = data.user;
                container.querySelector('[notif-time]').innerText = moment(new Date(parseInt(key_obj))).fromNow();
                notif_container.querySelector('div').appendChild(container);
                container.querySelector('[notif-unread]').remove();

                document.getElementById(key_obj).addEventListener('click', async() => {
                    await markRead(`https://ptc-database-default-rtdb.firebaseio.com/notifications/${encodedUsername}`, key_obj, data.href);
                });
            }

            document.querySelector('#notif_count').innerText = count_notif;

            if(count_notif == 0)
                notif_parent.querySelector('div').classList.remove('teal');
        }

        document.getElementById('notif_dropdown').querySelector('div').addEventListener('click', () => {
            if (notif_container.style.display == "block") {
                notif_parent.querySelector('i').classList.remove('open');
                notif_container.style.display = "none";
            } else {
                notif_parent.querySelector('i').classList.add('open');
                notif_container.style.display = "block";
            }
        });

    }

    async function markRead(db, key, link) {
        const notif_db = `${db}/${key}.json`;
        await FirebaseModule.patch(notif_db, JSON.stringify({
            read: true
        }));
        window.location.href = link;
    }

    async function getUsername() {
        let { data, error } = await supabase.auth.getSession();

        if (error) {
            console.log(`Error in getUsername[error] function
                ${error.message}`);
            return;
        }
        if (!data) {
            console.log(`Error in getUsername[data] function
                ${data}`);
            return;
        }

        let email = data.session.user.email;
        let userData = await supabase.from('users').select('username').eq('email', email);

        if (userData.error) {
            console.log(`Error in getUsername[userData.error] function
                ${userData.error.message}`);
            return;
        }
        if (userData.data.length == 0) {
            {
                console.log(`Error in getUsername[!userData.data && userData.data.length == 0] function
                ${userData.data}`);
                return;
            }
        }

        return userData.data[0].username;
    }
})();
