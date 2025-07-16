// This script works with Supabase and Storehaccounts website.
// This will be the official editor for comments!
// This also uses Quill Editor (Open Source) June 24, 2025

(async() => {

    // Checking if the user is logged in!
    // and storing users' important data

    if (!document.querySelector('#postBody') || window.location.href.includes('/p/')) return;

    await initFunctions(['supabase', 'jQuery', 'FirebaseModule']);
    let userData = await supabase.auth.getSession();
    let userid = '';
    let username = '';
    let userphoto = '';
    let commentid = '';

    let parent_html = document.createElement('div');
    parent_html.innerHTML = `<div id='comment_editor_footer_loader' class="ui segment"> <div class="ui active dimmer"> <div class="ui indeterminate text loader">Preparing Comment Editor</div> </div> <br/> <br/> <br/> </div> <div id='ptc_comment_editor' class='ui inverted message' style='display: none;'> </div>`;
    document.querySelector('#postBody').appendChild(parent_html);
    const parent_editor = document.getElementById('ptc_comment_editor');

    // Adding a reply container
    window.appendEditor = async(elem) => {
        await initFunctions(['ModalCreator']);
        const comment_editor = document.querySelector('#ptc_comment_editor');
        let comment_target;

        if (elem.parentNode.id.includes('reply'))
            comment_target = document.getElementById(elem.parentNode.parentNode.id);
        else
            comment_target = document.getElementById(elem.parentNode.id);


        if (!comment_target || !comment_editor) {
            ModalCreator.popFunction(new Date().getTime(), "Please Login first before replying to a comment.",
                "You are not yet logged in. To share your ideas and thoughts, you can log in with google account or discord account for free. Do you want to log in?",
                'google icon', 'Login', () => {
                    window.location.href = 'https://storehaccounts.blogspot.com/p/sign-in-with-storehaccounts.html';
                });
            return;
        }
        comment_target.appendChild(comment_editor);
        scrollIntoViewportByElement(comment_editor);

        commentid = comment_target.id;

        if (document.getElementById('ql-comment-action'))
            document.getElementById('ql-comment-action').innerText = "Reply";
        if (document.getElementById('cancelReplyBtn'))
            document.getElementById('cancelReplyBtn').style.display = "block";
    }

    function scrollIntoViewportByElement(element) {
        element.scrollIntoView({
            block: "center",
            behavior: "smooth"
        });
    }

    if (userData.error || !userData.data.session) {
        parent_editor.classList.add('ui', 'compact', 'floating', 'warning', 'message', 'inverted');
        parent_editor.innerHTML = `<h4>Please <a class="ui blue basic label" href="https://storehaccounts.blogspot.com/p/sign-in-with-storehaccounts.html"><i icon="blind icon"></i>sign in first</a> before commenting :)</h4>`;
        parent_editor.style.display = 'block';
        document.getElementById('comment_editor_footer_loader').remove();
        if (userData.error) window.alert(`${userData.error.message}`);
        return;
    } else if (userData.data.session) {
        // building comment_editor_html
        // appending to postBody
        userData = await supabase.from('users').select('id, username, prof_img').eq('email', `${userData.data.session.user.email}`);

        if (userData.error) {
            window.alert(`${userData.error.message}`);
            return;
        }

        if (userData.data.length == 0) {
            window.alert(`Invalid logged in! The user logged in cant be identified`);
            return;
        }

        userid = userData.data[0].id;
        username = userData.data[0].username;
        userphoto = userData.data[0].prof_img;

        let tempo_comment_html = document.createElement('div');
        tempo_comment_html.innerHTML = `<div class='ui floating message'><div class='header'>Please be respectful! Add your <span class='ui inverted large black label' id='ql-comment-action'></span></div></div> <div id="ql-comment-editor" class='ui loading inverted attached segment'> </div> <div id="ql-toolbar-container" class='ui inverted attached segment'> <div class="ui blue image label"> <img src="${userData.data[0].prof_img}"> ${userData.data[0].username} </div> <span class="ql-formats"> <button class="ql-bold"></button> <button class="ql-italic"></button> <button class="ql-underline"></button> <button class="ql-strike"></button> </span> <span class="ql-formats"><button class="ql-blockquote"></button> <button class="ql-code-block"></button> </span> <span class="ql-formats"> <button class="ql-list" value="ordered"></button> <button class="ql-list" value="bullet"></button> </span> <span class="ql-formats"> <button class="ql-link"></button> <button class="ql-image"></button> <button class="ql-video"></button> </span> <span class="ql-formats"> <button class="ql-clean"></button> </span> </div> <div class="ui inverted attached segment" style="min-height: 80px;"> <button id="postBtn" class="ui blue disabled inverted button" style="float: left;">Type something...</button>
<button id="cancelReplyBtn" style="display: none; float: right;" class="ui red inverted button">Cancel Reply</button> </div>`;
        document.getElementById('ptc_comment_editor').appendChild(tempo_comment_html);
    }

    const postBtn = document.getElementById('postBtn');
    const editor = document.getElementById('ql-comment-editor');
    const cancelBtn = document.getElementById('cancelReplyBtn');
    const actionText = document.getElementById('ql-comment-action');
    document.getElementById('ql-comment-action').innerText = "Comment";

    (() => {
        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js';
        document.querySelector('body').appendChild(script);
    })();

    // setting up Quill Editor
    await initFunctions(['Quill']);
    const quill = new Quill('#ql-comment-editor', {
        modules: {
            syntax: false,
            toolbar: '#ql-toolbar-container'
        },
        theme: "snow"
    });

    parent_editor.style.display = 'block';
    document.getElementById('comment_editor_footer_loader').remove();

    quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        let ops = []
        delta.ops.forEach(op => {
            if (op.insert && typeof op.insert === 'string') {
                ops.push({
                    insert: op.insert
                })
            }
        })
        delta.ops = ops
        return delta
    })

    const limit = 1000;
    const minlimit = 10;

    quill.on('text-change', function(delta, old, source) {
        if (source == 'user') {
            if (quill.getLength() > limit) {
                quill.deleteText(limit, quill.getLength());
            } else if (quill.getLength() < minlimit) {
                postBtn.innerText = "Type something...";
                postBtn.classList.add('disabled');
            } else if (quill.getLength() > minlimit && quill.getLength() < limit) {
                postBtn.classList.remove('disabled');
                postBtn.innerText = `${actionText.innerText}`;
            }
        }
    });

    let editorForm = document.querySelector('#ql-comment-editor > div');
    while (!editorForm) {
        setTimeout(() => {
            editorForm = document.querySelector('#ql-comment-editor > div');
        }, 300);
    }
    editorForm.classList.add('ui', 'inverted', 'attached', 'segment');
    document.querySelector('#ql-comment-editor').classList.remove('loading');

    function getContent() {
        return document.querySelector('#ql-comment-editor div').innerHTML;
    }

    function getText() {
        return quill.getText();
    }

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    // Cancelling a reply
    cancelBtn.addEventListener('click', async() => {
        document.getElementById('ptc_comment_container').parentNode.insertBefore(document.getElementById('ptc_comment_editor'), document.getElementById('ptc_comment_container').nextSibling);
        actionText.innerText = "Comment";
        postBtn.innerText = actionText.innerText;
        cancelBtn.style.display = "none";
    });

    // Posting the comment
    postBtn.addEventListener('click', async() => {
        postBtn.classList.add('disabled');
        postBtn.innerHTML = `<i class="loading spinner icon"></i>${actionText.innerText}ing...`;
        editor.querySelector('div').setAttribute('contenteditable', false);

        let allImgs = document.querySelector('#ql-comment-editor div').querySelectorAll('img');
        let img_json_arr = [];

        if (allImgs.length > 0)
            for (const items of allImgs) {
                let newsrc = await ImgurJS.uploadB64Img(dataURItoBlob(items.src));
                items.src = newsrc.link;
                img_json_arr.push(newsrc.link);
            }

        if (img_json_arr.length == 0) {
            img_json_arr = null;
        } else {
            img_json_arr = {
                img: img_json_arr
            }
        }

        // STORING COMMENT TABLE
        if (actionText.innerText == "Comment") {
            let data = await supabase.from('comments').insert({
                date: "now()",
                content: getContent(),
                images: img_json_arr
            }).select('id');

            if (data.error) {
                window.alert(`Some encountered problem!
        ~
        ~
        Logs:
        ${data.error.message}`);
                return;
            }

            let comment_id = data.data[0].id;
            data = await supabase.from('website-posts').select('id').eq('url', `${new URL(window.location.href).pathname}`);
            if (data.error) {
                window.alert(`${data.error.message}`);
                return;
            }

            if (data.data.length == 0) {
                data = await supabase.from('website-posts').insert({
                    date: "now()",
                    url: new URL(window.location.href).pathname,
                    thumb: document.querySelector('#postBody img') ? document.querySelector('#postBody img').src : null
                }).select('id');

                if (data.error) {
                    window.alert(`Some encountered problem!
        ~
        ~
        Logs:
        ${data.error.message}`);
                    return;
                }
            }


            let post_id = data.data[0].id;
            data = await supabase.from('websiteposts-comments').insert({
                date: "now()",
                websiteposts_id: post_id,
                comments_id: comment_id,
                users_id: userid
            });

            if (data.error) {
                window.alert(`Some encountered problem!
        ~
        ~
        Logs:
        ${data.error.message}`);
                return;
            }
        }

        // STORING REPLY TABLE
        else if (actionText.innerText == "Reply") {
            let data = await supabase.from('replies').insert({
                date: "now()",
                content: getContent(),
                images: img_json_arr,
                url: new URL(window.location.href).pathname + '?comment=' + commentid.replace('ptc-child-comment-', '')
            }).select('id');

            // notifying all users involved in the comment's reply...
            let users_involved = document.getElementById(commentid).querySelectorAll('div.warning');

            for (users of users_involved) {
                if(!users.querySelector('[thread-user-name]')) return;
                let recipient = users.querySelector('[thread-user-name]').innerText;
                notifyUser({
                    recipient: recipient,
                    user: username,
                    prof: userphoto,
                    thumb: document.querySelector('.postBody img') ? document.querySelector('.postBody img').src : userphoto,
                    action: "replied",
                    title: window.document.title,
                    href: "https://storehaccounts.blogspot.com" + new URL(window.location.href).pathname + '?comment=' + commentid.replace('ptc-child-comment-', ''),
                    date: new Date().getTime(),
                    read: false
                });
            }

            if (data.error) {
                window.alert(`Some encountered problem!
        ~
        ~
        Logs:
        ${data.error.message}`);
                return;
            }

            let reply_id = data.data[0].id;


            // posting to comments-replies
            data = await supabase.from('comments-replies').insert({
                comments_id: commentid.replace('ptc-child-comment-', ''),
                replies_id: reply_id,
                users_id: userid
            }).select('id');
            if (data.error) {
                window.alert(`${data.error.message}`);
                return;
            }
        }
        postBtn.innerHTML = `${actionText.innerText} Posted!!`;
        postBtn.classList.add('green');
        setTimeout(() => {
            if (!document.querySelector('#ptc_comment_container')) return;

            let div = document.createElement('div');
            let div_html = `<div class="ui ignored warning message" style="min-height: 100px;">
            <img style="float: left; width: 64px !important; height: 64px !important; object-fit: cover; border: 1px solid white; margin: 0 10px 10px 0 !important;" src="https://static.wikia.nocookie.net/361735c0-7535-4dfe-b5d7-6f1683b4550b/scale-to-width/755">
            <a class="ui blue label">  
             ${userData.data[0].username} <span id="action">said</span>...
              </a>
                <div class="ui basic small blue label">
                  <i class="hourglass half icon" style="margin-right: 0px !important;"></i>
                  ${moment(new Date()).fromNow()}
                </div>
              <br>
              ${getContent()}`;

            div.innerHTML = div_html;

            if (actionText.innerText == "Comment") document.getElementById('ptc_comment_container').appendChild(div);
            else if (actionText.innerText = "Reply") document.getElementById(`${commentid}`).appendChild(div);

            const comments_container = document.querySelector('#ptc_comment_container');
            const comments_count_container = document.querySelector('#ptc_comment_count');

            // after posting or replying make sure the editor is outside comment container
            cancelBtn.click();

            sessionStorage.setItem(new URL(window.location.href).pathname, JSON.stringify({
                count: comments_count_container.innerHTML,
                content: comments_container.innerHTML,
                date: new Date().getTime()
            }));

            postBtn.classList.remove('green');
            editor.querySelector('div').setAttribute('contenteditable', true);
            document.querySelector('#ql-comment-editor div').innerHTML = '';
        }, 1000);
    });

    var ImgurJS = {
        uploadB64Img: function(file) {
            return new Promise((resolve, reject) => {
                var fd = new FormData();
                fd.append("image", file); // Append the file
                var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
                xhr.open("POST", "https://api.imgur.com/3/image"); // Boooom!
                xhr.onload = function() {
                    if (xhr.status == 200) {
                        let data = JSON.parse(xhr.responseText).data;
                        resolve(data);
                    } else {
                        window.alert(`ImgurXHR error: Error in uploading... Please try again
                        Status: ${xhr.status}
                        Please try again!`);
                        reject(`ImgurXHR error: Error in uploading... Please try again
                        Status: ${xhr.status}
                        Please try again!`);
                    }
                }
                xhr.setRequestHeader('Authorization', 'Client-ID 33f63d5902f27e5');
                xhr.send(fd);
            });
        }
    }

    async function notifyUser(json_data) {
        if (json_data.user == json_data.to_user) return;

        let data = {
            [json_data.date]: {
                recipient: json_data.recipient,
                user: json_data.user,
                prof: json_data.prof,
                thumb: json_data.thumb,
                action: json_data.action,
                title: json_data.title,
                href: json_data.href,
                read: false
            }
        }

        const db = `https://ptc-database-default-rtdb.firebaseio.com/notifications/${btoa(json_data.recipient)}.json`;
        await FirebaseModule.patch(db, JSON.stringify(data));
    }
})();
