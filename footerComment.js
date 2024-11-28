var footerComment = {

    // build comment_footer_url
	// record_api: 'https://jsonblob.com/api/jsonBlob/1242732119490158592',
    comment_footer_url: window.location.href.split('.html')[0] + '.html',
    record_api: 'https://jsonblob.com/api/jsonBlob/1311554306020925440',
    replied_to: '',
    username: 'Guest',
    userid: 'https://storehaccounts.blogspot.com/p/create-account.html',
    userimg: 'https://i.giphy.com/j5i2tzUmDA2OFeMJVL.webp',
    userbackimg: 'https://img.freepik.com/premium-vector/banana-pattern-wallpaper_17937-2.jpg',

    start: function () {
        if (!window.location.href.includes('/p/') && footerComment.query('postBody'))
            footerComment.buildCommentHTML();

        window.addEventListener('load', function () {
            if (!window.location.href.includes('/p/') && footerComment.query('postBody')) {
                footerComment.getUserInfos();
                footerComment.buildComment();
                footerComment.disable(footerComment.query('form-ptc-comment'), false);
            }
        }, false);
    },

    textAreaAdjust: function (element) {
        element.style.height = 'auto';
        element.style.height = (element.scrollHeight) + "px";
    },

    disable: function (elem, disable) {
        if (disable) {
            elem.style.pointerEvents = 'none';
            elem.style.opacity = '0.5';
        } else {
            elem.style.pointerEvents = 'auto';
            elem.style.opacity = '1';
        }
    },

    query: function (id) {
        return document.getElementById(id);
    },

    // check the blob if exists!

    getAllAttachImages: function () {
        let attachimgs = footerComment.query('comm_form_attached_images').querySelectorAll('img');
        let imgs = ' ';

        for (i = 0; i < attachimgs.length; i++) {
            let img = document.createElement('img');
            img.src = attachimgs[i].src;
            img.setAttribute('onclick', "window.open(\"" + img.src + "\", ' _blank ').focus();");
            img.style.cursor = 'pointer';
            imgs += img.outerHTML;
        }
        return imgs;
    },

    createComment: function () {
        footerComment.disable(footerComment.query('form-ptc-comment'), true);
        let isReply = footerComment.replied_to.length > 0;

        if (isReply)
            footerComment.record_api = 'https://jsonblob.com/api/jsonBlob/' + footerComment.replied_to;

        JBLOBFunctions.PUTRecordBlob(footerComment.record_api, function (data) {
            let comment_value = footerComment.query('comment-value').value;
            let comment_data;
            let blob_id = '';
            let firebase_data = {
                [new Date().getTime()]: {
                    "userimg": footerComment.userimg,
                    "content": comment_value,
                    "link": footerComment.comment_footer_url
                }
            }

            if (isReply)
                comment_data = {
                    "username": footerComment.username,
                    "userimg": footerComment.userimg,
                    "content": comment_value,
                    "userid": footerComment.userid,
                    "imgs": footerComment.getAllAttachImages(),
                    "background": footerComment.userbackimg,
                    "date": new Date().getTime()
                };
            else
                comment_data = {
                    "username": footerComment.username,
                    "userimg": footerComment.userimg,
                    "userid": footerComment.userid,
                    "content": comment_value,
                    "imgs": footerComment.getAllAttachImages(),
                    "background": footerComment.userbackimg,
                    "date": new Date().getTime(),
                    "replies": []
                };

            FirebaseModule.patch('https://storehaccounts-comments-default-rtdb.firebaseio.com/comments.json', JSON.stringify(firebase_data));

            JBLOBFunctions.createRecordBlob(JSON.stringify(comment_data), function (data) {
                blob_id = data.split('jsonBlob/')[1].replace('\r', '').replace('\n', '');
            });

            let user;
            if (localStorage.getItem('ptc_user')) {
                user = JSON.parse(localStorage.getItem('ptc_user'));
                user = user.user;
            }

            if (user)
                JBLOBFunctions.PUTRecordBlob('https://jsonblob.com/api/jsonBlob/' + user, function (data) {
                    if (data.hasOwnProperty('comments')) {
                        data.comments = parseInt(data.comments) + 1;
                    } else {
                        data["comments"] = 1;
                    }
                    return data;
                }, function (data) {
                    console.log(data);
                });

            if (isReply)
                data.replies.push(blob_id);
            else {
                if (data.hasOwnProperty(footerComment.comment_footer_url))
                    data[footerComment.comment_footer_url].comments.push(blob_id);
                else
                    data[footerComment.comment_footer_url] = {
                        "comments": [blob_id]
                    };
            }

            return data;
        }, function (data) {
            window.location.reload();
        });
    },

    addElementToNext: function (thisElement, newElement, id) {
        footerComment.replied_to = id + '';
        thisElement.parentNode.insertBefore(newElement, thisElement.nextSibling);
        footerComment.query('add-comment-btn').style.display = 'block';
    },

    resetCommentForm: function (elem) {
        footerComment.addElementToNext(elem, footerComment.query('form-ptc-comment'), '');
        footerComment.query('add-comment-btn').style.display = 'none';
    },

    // build comments
    buildComment: function () {
        JBLOBFunctions.getBlobRecord(footerComment.record_api, async function (data) {
            data = JSON.parse(data);
            if (data.hasOwnProperty(footerComment.comment_footer_url)) {
                footerComment.query('comment-count').innerText = data[footerComment.comment_footer_url].comments.length;
                for (i = 0; i < data[footerComment.comment_footer_url].comments.length; i++) {
                    let comment_id = data[footerComment.comment_footer_url].comments[i];
                    let temp_data = await JBLOBFunctions.getBlobRecordSync('https://jsonblob.com/api/jsonBlob/' + comment_id, null);
					temp_data = JSON.parse(temp_data);
                    let username = temp_data.username;
                    let userimg = temp_data.userimg;
                    let userid = temp_data.userid;
                    let content = temp_data.content.replaceAll('\n', '<br/>');
                    let date = moment(parseInt(temp_data.date)).fromNow();
                    let background = temp_data.background;
                    let reply_build = '';
                    let num_of_replies = (temp_data.replies.length > 0 ? " - about " + temp_data.replies.length + " replies" : "");

                    let div_imgs = document.createElement('div');
                    div_imgs.setAttribute('class', 'image-attachments');
                    div_imgs.innerHTML = temp_data.imgs;

                    for (j = 0; j < temp_data.replies.length; j++) {
                        let reply_comment_id = temp_data.replies[j];
                        let new_data = await JBLOBFunctions.getBlobRecordSync('https://jsonblob.com/api/jsonBlob/' + reply_comment_id, null);

                        new_data = JSON.parse(new_data);

                        let div_imgs = document.createElement('div');
                        div_imgs.setAttribute('class', 'image-attachments');
                        div_imgs.innerHTML = new_data.imgs;

                        reply_build += "<div id=" + reply_comment_id + " class='comment-replied'><img class='user-profile' src='" + new_data.userimg + "'/><a target='_blank' href='" + new_data.userid + "'>" + new_data.username + "</a><span>replied " + moment(parseInt(new_data.date)).fromNow() + "</span><p>" + new_data.content.replaceAll('\n', '<br/>') + "</p>" + div_imgs.outerHTML + "</div>";
                    }

                    footerComment.query('comment-container').innerHTML += "<div id=" + comment_id + " class='comment-thread' style='background-image: linear-gradient(to bottom, rgb(0,0,0,0.6) 10%, rgb(0,0,0,0.9) 90%), url(\"" + background + "\"); background-repeat: no-repeat; background-size: cover; background-position: center center;'><img class='user-profile' src='" + userimg + "'/><a target='_blank' href='" + userid + "'>" + username + "</a><span>commented " + date + " " + num_of_replies + "</span><p>" + content + "</p>" + div_imgs.outerHTML + "" + reply_build + "<div style='position: relative; width: 100%;margin: 10px 0 50px 0;'><button style='font-size: 12px !important; color: black !important;' onclick='footerComment.addElementToNext(this, footerComment.query(\"form-ptc-comment\"), \"" + comment_id + "\")'>Add reply</button></div></div>";
                }
            }
        });
    },

    getUserInfos: async function () {
        // check if user is logged in
        let user = localStorage.getItem('ptc_user');

        if (user) {
            // means logged in.
            user = JSON.parse(user);

            let temp_data = await JBLOBFunctions.getBlobRecordSync('https://jsonblob.com/api/jsonBlob/' + user.user, null);
            temp_data = JSON.parse(temp_data);

            footerComment.username = temp_data.nickname;
            footerComment.userimg = temp_data.prof_image;
            footerComment.userid = 'https://storehaccounts.blogspot.com/p/your-account-page.html?' + user.user;
            footerComment.userbackimg = temp_data.background_image;

            footerComment.query('current-user').innerText = footerComment.username;
        }
    },

    buildCommentHTML: function () {
        let div = document.createElement('div');
        div.innerHTML = "<div style='margin-top: 20px; background: red; color: white; padding-left: 10px; font-size: 16px; font-weight: 600;'><span style='color: yellow;' id='comment-count'></span> Comments</div><div id='comment-container'></div><button id='add-comment-btn' style='color: black !important; font-size: 14px !important; width: 100%; display: none;' onclick='footerComment.resetCommentForm(this)'>ADD COMMENT</button><form id='form-ptc-comment' class='form-comment-post' style='pointer-events: none; opacity: 0.5;' action='javascript:footerComment.createComment()'><div class='title-border'></div><div class='text-editor'><span><b>Post a Comment as <span id='current-user' style='text-decoration: underline;'>Guest</span></b></span><br><textarea id='comment-value' required onkeyup='footerComment.textAreaAdjust(this)'></textarea><div id='comm_form_attached_images'></div> <label id='uploadImg' for='comm_imgupload1'>🖼️ Add Image <input style='display: none;' id='comm_imgupload1' accept='image/png, image/gif, image/jpeg, image/bmp' type='file' /></label><button type='submit' id='post_btn'>Submit</button></div></form>";
        footerComment.query('postBody').appendChild(div);

        comm_imgupload1.addEventListener("change", ev => {
            footerComment.query('post_btn').style.pointerEvents = 'none';
            footerComment.query('post_btn').innerText = 'Please wait uploading image...';
            const formdata = new FormData();
            formdata.append("image", ev.target.files[0])
            fetch("https://api.imgbb.com/1/upload?key=07f1351d4e674784012d92ae6e03b49d", {
                method: "post",
                body: formdata
            }).then(data => data.json()).then(data => {
                let defUrl = data.data.image.url;
                let img = document.createElement('img');
                img.src = defUrl;
                img.style.maxWidth = "150px";
                img.style.margin = '5px';
                footerComment.query('comm_form_attached_images').appendChild(img);
                footerComment.query('post_btn').style.pointerEvents = 'auto';
                footerComment.query('post_btn').innerText = 'Comment';
            }).catch((data) => {
                window.alert("Error in uploading! Try uploading again.");
                footerComment.query('post_btn').style.pointerEvents = 'auto';
                footerComment.query('post_btn').innerText = 'Comment';
            });
        });
    }
}

footerComment.start();
