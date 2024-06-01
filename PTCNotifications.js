

var PTCNotifications = {
    push: function (db_url, action_link, nickname, prof_img, id, msg, user_id) {
        let data = {
            [user_id]: {
                [id]: {
                    "nickname": nickname,
                    "prof_img": prof_img,
                    "link": action_link,
                    "msg": msg
                }
            }
        }

        FirebaseModule.patch(db_url, data);
    },
	
	get: function(user_id, db_url) {
		let user_notif = await FirebaseModule.get(db_url);
		user_notif = JSON.parse(user_notif);
		user_notif = Object.entries(user_notif);
		
		return user_notif;
	}
}
