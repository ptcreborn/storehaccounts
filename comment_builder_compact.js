// This script contains the compact viewable content of comments
// including users and comments data
// including ranks data as well
// June 25 2025..

(async () => {
	if (window.location.href.includes('/p/') || !document.querySelector('.postBody')) return;

	await initFunctions(['supabase', 'moment']);

	let url = new URL(window.location.href);
	url = url.pathname;

	const comments_container = document.querySelector('#ptc_comment_container');
	const comments_count_container = document.querySelector('#ptc_comment_count');
	comments_container.classList.add('notification-parent-comments');

	// check if the cookies for all comments are stored
	if (sessionStorage.getItem(url)) {
		let cached_comment = JSON.parse(sessionStorage.getItem(url));
		let ms_expiration = 120000;

		if (new Date().getTime() - (parseInt(cached_comment.date)) < ms_expiration) {
			comments_container.innerHTML = cached_comment.content;
			comments_count_container.innerHTML = cached_comment.count;
			return;
		}
	}

	const postid = await getPostID(url);
	if (!postid) {
		comments_count_container.innerHTML = `<br/><br/><h4 class="ui inverted horizontal divider header">
			<i class="comments icon"></i>
			Be the first one to comment!
			</h4><br/><br/>`;
		return;
	}

	let user_comments_data = await getCommentsAndUsersData(postid);
	comments_count_container.innerHTML = `<br/><br/><h4 class="ui inverted horizontal divider header">
		<i class="comments icon"></i>
		${user_comments_data.length < 2 ? `${user_comments_data.length} comment` : `${user_comments_data.length} comments`}
		</h4><br/><br/>`;


	for (const items of user_comments_data) {
		let clonedTemplate = qts('comment-container').cloneNode(true).content.children[0];
		clonedTemplate.id = `ptc-child-comment-${items.comments.id}`;

		let country_name = '';

		if (items.users.country == "Anonymous") {
			country_name = 'Homeless Catter';
		} else {
			country_name = await fetch('https://restcountries.com/v3.1/alpha/' + items.users.country);
			country_name = await country_name.json();
			country_name = country_name[0].name.official;
		}

		// build user data first
		qt(clonedTemplate, 'thread-user-img').src = items.users.prof_img;
		qt(clonedTemplate, 'thread-country').querySelector('img').src = `${items.users.country == "Anonymous" ? `https://static.wikia.nocookie.net/361735c0-7535-4dfe-b5d7-6f1683b4550b/scale-to-width/755` : `https://flagsapi.com/${items.users.country}/shiny/64.png`}`;
		qt(clonedTemplate, 'thread-country').querySelector('span').innerText = `${country_name}`;
		qt(clonedTemplate, 'thread-user-name').innerText = items.users.username;

		// build comments info
		qt(clonedTemplate, 'thread-comments').innerHTML = items.comments.content;
		qt(clonedTemplate, 'thread-action').innerText = "commented";
		qt(clonedTemplate, 'thread-time-ago').innerText = moment(new Date(items.comments.date)).fromNow();

		// build rank info
		let ranks_data = await getRanksData(items.users.rank_id);
		qt(clonedTemplate, 'thread-rank').querySelector('img').src = ranks_data.rank_image;
		qt(clonedTemplate, 'thread-rank').querySelector('span').innerText = `Rank ${items.users.rank_id} ${ranks_data.rank_name}`;

		comments_container.appendChild(clonedTemplate);
        let comment_temp_container = clonedTemplate;

        // After comment has been built, lets check if there are replies within it..
        // checking for replies within a comment
        let replies_data = await getRepliesData(items.comments.id);
        console.log(replies_data);
        for(const reply of replies_data) {
            let reply_user = reply.users;
            let reply_content = reply.replies;
            let reply_user_rank = reply_user.ranks;

            let clonedTemplate = qts('comment-container').cloneNode(true).content.children[0];
            clonedTemplate.id = `ptc-child-reply-${items.comments.id}`;
            clonedTemplate.className = 'ui warning message';

            let country_name = '';

            if (reply_user.country == "Anonymous") {
                country_name = 'Homeless Catter';
            } else {
                country_name = await fetch('https://restcountries.com/v3.1/alpha/' + reply_user.country);
                country_name = await country_name.json();
                country_name = country_name[0].name.official;
            }

            // build user data first
            qt(clonedTemplate, 'thread-user-img').src = reply_user.prof_img;
            qt(clonedTemplate, 'thread-country').querySelector('img').src = `${reply_user.country == "Anonymous" ? `https://static.wikia.nocookie.net/361735c0-7535-4dfe-b5d7-6f1683b4550b/scale-to-width/755` : `https://flagsapi.com/${reply_user.country}/shiny/64.png`}`;
            qt(clonedTemplate, 'thread-country').querySelector('span').innerText = `${country_name}`;
            qt(clonedTemplate, 'thread-user-name').innerText = reply_user.username;

            // build comments info
            qt(clonedTemplate, 'thread-comments').innerHTML = reply_content.content;
            qt(clonedTemplate, 'thread-action').innerText = "commented";
            qt(clonedTemplate, 'thread-time-ago').innerText = moment(new Date(reply_content.date)).fromNow();

            // build rank info
            let ranks_data = await getRanksData(reply_user_rank.id);
            qt(clonedTemplate, 'thread-rank').querySelector('img').src = ranks_data.rank_image;
            qt(clonedTemplate, 'thread-rank').querySelector('span').innerText = `Rank ${reply_user_rank.id} ${ranks_data.rank_name}`;

            comment_temp_container.appendChild(clonedTemplate);
        }
	}

	sessionStorage.setItem(url, JSON.stringify({
		count: comments_count_container.innerHTML,
		content: comments_container.innerHTML,
		date: new Date().getTime()
	}));

	// ###################
	// ###################
	// ###################
	// misc functions
	function qts(str) { // queryselector for templates
		return document.querySelector(`[${str}]`);
	}
	function qt(elem, str) { // queryselector for cloned templates
		return elem.querySelector(`[${str}]`);
	}
	async function getPostID(url) {
		let { data, error } = await supabase.from('website-posts').select('id').eq('url', url);
		if (error) {
			window.alert(`getPostID:
                ${error.message}`);
			return;
		}
		if (data.length == 0) return;
		else return data[0].id;
	}
	async function getCommentsAndUsersData(id) {
		let { data, error } = await supabase.from('websiteposts-comments').select('users(username, country, prof_img, rank_id), comments(id, content, date)').eq('websiteposts_id', id);
		if (error) {
			window.alert(`getCommentsAndUsersData:
                ${error.message}`);
			return;
		}
		if (data.length == 0) return;
		else return data;
	}
	async function getRanksData(id) {
		let { data, error } = await supabase.from('ranks').select('rank_name, rank_image').eq('id', id);
		if (error) {
			window.alert(`getRanksData:
                ${error.message}`);
			return;
		}
		if (data.length == 0) return;
		else return data[0];
	}
	async function getRepliesData(commentid) {
		let {data, error} = await supabase.from('comments-replies').select('replies(date, content, id), users(country, username, prof_img, ranks(id, rank_name, rank_image))').eq('comments_id', commentid);
		if (error) {
			window.alert(`getRepliesData:
                ${error.message}`);
			return;
		}
		if (data.length == 0) return;
		else return data;
	}
})();
