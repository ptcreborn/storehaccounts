// This script contains the compact viewable content of comments
// including users and comments data
// including ranks data as well
// June 25 2025....

(async() => {
        if (window.location.href.includes('/p/') || !document.querySelector('.postBody'))
            return;

        await initFunctions(['supabase', 'moment']);

        let url = new URL(window.location.href);
        url = url.pathname;
        let isViewingComment = false;

        const comments_container = document.querySelector('#ptc_comment_container');
        const comments_count_container = document.querySelector('#ptc_comment_count');
        comments_container.classList.add('notification-parent-comments');
        let queried_comment_elem = '';

        // check if the cookies for all comments are stored
        if (sessionStorage.getItem(url) && !extractCommentIDQuery()) {
            let cached_comment = JSON.parse(sessionStorage.getItem(url));
            let ms_expiration = 120000;

            if (new Date().getTime() - (parseInt(cached_comment.date)) < ms_expiration) {
                comments_container.innerHTML = cached_comment.content;
                comments_count_container.innerHTML = cached_comment.count;

                queried_comment_elem = extractCommentIDQuery();
                if (queried_comment_elem) {
                    if (queried_comment_elem.hasOwnProperty('answer'))
                        scrollIntoViewport(`ptc-child-reply-${queried_comment_elem.answer}`);
                    else if (queried_comment_elem.hasOwnProperty('answer'))
                        scrollIntoViewport(`ptc-child-reply-${queried_comment_elem.reply}`);
                } else return;
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
                                		${user_comments_data.length < 2 ? `${user_comments_data.length} comment` : ` ${user_comments_data.length} comments`}</h4><br/><br/>`;                         
                                                                                
    await checkQueryComment();                                        

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
        qt(clonedTemplate, 'thread-country').querySelector('img').src = `${items.users.country == "Anonymous" ? ` https: //static.wikia.nocookie.net/361735c0-7535-4dfe-b5d7-6f1683b4550b/scale-to-width/755` : `https://flagsapi.com/${items.users.country}/shiny/64.png`}`;
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

        if (replies_data)
            for (const reply of replies_data) {
                let reply_user = reply.users;
                let reply_content = reply.replies;
                let reply_user_rank = reply_user.ranks;

                let clonedTemplate = qts('comment-container').cloneNode(true).content.children[0];
                clonedTemplate.id = `ptc-child-reply-${reply_content.id}`;
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
                qt(clonedTemplate, 'thread-country').querySelector('img').src = `${reply_user.country == "Anonymous" ? ` https: //static.wikia.nocookie.net/361735c0-7535-4dfe-b5d7-6f1683b4550b/scale-to-width/755` : `https://flagsapi.com/${reply_user.country}/shiny/64.png`}`;
                    qt(clonedTemplate, 'thread-country').querySelector('span').innerText = `${country_name}`;
                qt(clonedTemplate, 'thread-user-name').innerText = reply_user.username;

                // build comments info
                qt(clonedTemplate, 'thread-comments').innerHTML = reply_content.content;
                qt(clonedTemplate, 'thread-action').innerText = "replied";
                qt(clonedTemplate, 'thread-time-ago').innerText = moment(new Date(reply_content.date)).fromNow();

                // build rank info
                let ranks_data = await getRanksData(reply_user_rank.id);
                qt(clonedTemplate, 'thread-rank').querySelector('img').src = ranks_data.rank_image;
                qt(clonedTemplate, 'thread-rank').querySelector('span').innerText = `Rank ${reply_user_rank.id} ${ranks_data.rank_name}`;

                qt(clonedTemplate, 'thread-reply').addEventListener('click', () => {
                    clonedTemplate.parentNode.querySelector('[thread-reply]').click();
                });

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
    async function checkQueryComment() {
        let comment_id = extractCommentIDQuery();

        if(!comment_id) return;

        let data = await getCommentsAndUsersDataviaCommentID(comment_id.comment);
        let targetElemId = `ptc-child-comment-${comment_id.comment}`;
        let items = data;
        let clonedTemplate = qts('comment-container').cloneNode(true).content.children[0];
        let country_name = '';

        clonedTemplate.id = `ptc-child-comment-${items.comments.id}`;

        if (items.users.country == "Anonymous") {
            country_name = 'Homeless Catter';
        } else {
            country_name = await fetch('https://restcountries.com/v3.1/alpha/' + items.users.country);
            country_name = await country_name.json();
            country_name = country_name[0].name.official;
        }

        // build user data first
        qt(clonedTemplate, 'thread-user-img').src = items.users.prof_img;
        qt(clonedTemplate, 'thread-country').querySelector('img').src = `${items.users.country == "Anonymous" ? ` https: //static.wikia.nocookie.net/361735c0-7535-4dfe-b5d7-6f1683b4550b/scale-to-width/755` : `https://flagsapi.com/${items.users.country}/shiny/64.png`}`;
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
        if (comment_id.reply) {
                let reply = await getRepliesDataViaID(comment_id.reply);
                let reply_user = reply.users;
                let reply_content = reply.replies;
                let reply_user_rank = reply_user.ranks;

                let clonedTemplate = qts('comment-container').cloneNode(true).content.children[0];
                clonedTemplate.id = `ptc-child-reply-${reply_content.id}`;
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
                qt(clonedTemplate, 'thread-country').querySelector('img').src = `${reply_user.country == "Anonymous" ? ` https: //static.wikia.nocookie.net/361735c0-7535-4dfe-b5d7-6f1683b4550b/scale-to-width/755` : `https://flagsapi.com/${reply_user.country}/shiny/64.png`}`;
                    qt(clonedTemplate, 'thread-country').querySelector('span').innerText = `${country_name}`;
                qt(clonedTemplate, 'thread-user-name').innerText = reply_user.username;

                // build comments info
                qt(clonedTemplate, 'thread-comments').innerHTML = reply_content.content;
                qt(clonedTemplate, 'thread-action').innerText = "replied";
                qt(clonedTemplate, 'thread-time-ago').innerText = moment(new Date(reply_content.date)).fromNow();

                // build rank info
                let ranks_data = await getRanksData(reply_user_rank.id);
                qt(clonedTemplate, 'thread-rank').querySelector('img').src = ranks_data.rank_image;
                qt(clonedTemplate, 'thread-rank').querySelector('span').innerText = `Rank ${reply_user_rank.id} ${ranks_data.rank_name}`;

                qt(clonedTemplate, 'thread-reply').addEventListener('click', () => {
                    clonedTemplate.parentNode.querySelector('[thread-reply]').click();
                });

                targetElemId = `ptc-child-reply-${comment_id.reply}`;

                let cloneReplyTemplate = clonedTemplate;

            if (comment_id.answer) {
                let reply = await getRepliesDataViaID(comment_id.answer);
                let reply_user = reply.users;
                let reply_content = reply.replies;
                let reply_user_rank = reply_user.ranks;

                let clonedTemplate = qts('comment-container').cloneNode(true).content.children[0];
                clonedTemplate.id = `ptc-child-reply-${reply_content.id}`;
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
                qt(clonedTemplate, 'thread-country').querySelector('img').src = `${reply_user.country == "Anonymous" ? ` https: //static.wikia.nocookie.net/361735c0-7535-4dfe-b5d7-6f1683b4550b/scale-to-width/755` : `https://flagsapi.com/${reply_user.country}/shiny/64.png`}`;
                    qt(clonedTemplate, 'thread-country').querySelector('span').innerText = `${country_name}`;
                qt(clonedTemplate, 'thread-user-name').innerText = reply_user.username;

                // build comments info
                qt(clonedTemplate, 'thread-comments').innerHTML = reply_content.content;
                qt(clonedTemplate, 'thread-action').innerText = "replied";
                qt(clonedTemplate, 'thread-time-ago').innerText = moment(new Date(reply_content.date)).fromNow();

                // build rank info
                let ranks_data = await getRanksData(reply_user_rank.id);
                qt(clonedTemplate, 'thread-rank').querySelector('img').src = ranks_data.rank_image;
                qt(clonedTemplate, 'thread-rank').querySelector('span').innerText = `Rank ${reply_user_rank.id} ${ranks_data.rank_name}`;

                qt(clonedTemplate, 'thread-reply').addEventListener('click', () => {
                    clonedTemplate.parentNode.querySelector('[thread-reply]').click();
                });

                targetElemId = `ptc-child-reply-${comment_id.answer}`;             

                cloneReplyTemplate.querySelector('button').remove();
                cloneReplyTemplate.appendChild(clonedTemplate);
                comment_temp_container.appendChild(cloneReplyTemplate);
            }  else 
                comment_temp_container.appendChild(cloneReplyTemplate);            
        }      

        scrollIntoViewport(targetElemId);
    }

    function extractCommentIDQuery() {

        // hierarchy of parameters..
        // comment is the highest user interaction..
        // reply is the interaction of the user to a comment..
        // answer is the interaction of the user to a reply..

        let url = window.location.href;
        url = new URL(url).search;

        if (!url)
            return;

        let  url_params = new URLSearchParams(url);

        if (!url_params.get('comment') && !url_params.get('reply') && !url_params.get('answer'))
            return;

        if(url_params.get('answer'))
            return {
                comment: url_params.get('comment'),
                reply: url_params.get('reply'),
                answer: url_params.get('answer')
        }

        else return {
                comment: url_params.get('comment'),
                reply: url_params.get('reply')
        }
    }
    function scrollIntoViewport(id) {
        let element;
        element = document.getElementById(id);

        element.classList.add('ui', 'inverted', 'teal', 'message');
        element.scrollIntoView({
            block: "center",
            behavior: "smooth"
        });
    }
    function qts(str) { // queryselector for templates
        return document.querySelector(`[${str}]`);
    }
    function qt(elem, str) { // queryselector for cloned templates
        return elem.querySelector(`[${str}]`);
    }
    async function getPostID(url) {
        let {
            data,
            error
        } = await supabase.from('website-posts').select('id').eq('url', url);
        if (error) {
            console.log(`getPostID:
                ${error.message}`);
            return;
        }
        if (data.length == 0)
            return;
        else
            return data[0].id;
    }
    async function getCommentsAndUsersDataviaCommentID(id) {
        let {
            data,
            error
        } = await supabase.from('websiteposts-comments').select('users(username, country, prof_img, rank_id), comments(id, content, date)').eq('comments_id', id);
        if (error) {
            console.log(`getCommentsAndUsersDataviaCommentID:
                ${error.message}`);
            return;
        }
        if (data.length == 0)
            return;
        else
            return data[0];
    }
    async function getCommentsAndUsersData(id) {
        let {
            data,
            error
        } = await supabase.from('websiteposts-comments').select('users(username, country, prof_img, rank_id), comments(id, content, date)').eq('websiteposts_id', id);
        if (error) {
            console.log(`getCommentsAndUsersData:
                ${error.message}`);
            return;
        }
        if (data.length == 0)
            return;
        else
            return data;
    }
    async function getRanksData(id) {
        let {
            data,
            error
        } = await supabase.from('ranks').select('rank_name, rank_image').eq('id', id);
        if (error) {
            console.log(`getRanksData:
                ${error.message}`);
            return;
        }
        if (data.length == 0)
            return;
        else
            return data[0];
    }
    async function getRepliesData(commentid) {
        let {
            data,
            error
        } = await supabase.from('comments-replies').select('replies(date, content, id), users(country, username, prof_img, ranks(id, rank_name, rank_image))').eq('comments_id', commentid);
        if (error) {
            console.log(`getRepliesData:
                ${error.message}`);
            return;
        }
        if (data.length == 0)
            return;
        else
            return data;
    }
        async function getRepliesDataViaID(replyid) {
        let {
            data,
            error
        } = await supabase.from('comments-replies').select('replies(date, content, id), users(country, username, prof_img, ranks(id, rank_name, rank_image))').eq('replies_id', replyid);
        if (error) {
            console.log(`getRepliesDataViaID:
                ${error.message}`);
            return;
        }
        if (data.length == 0)
            return;
        else
            return data[0];
    }
})();
