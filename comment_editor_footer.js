// This script works with Supabase and Storehaccounts website.
// This will be the official editor for comments!
// This also uses Quill Editor (Open Source) June 24, 2025

(async () => {

  // Checking if the user is logged in!
  // and storing users' important data

  if (!document.querySelector('#postBody')) return;

  await initFunctions(['supabase']);
  let userData = await supabase.auth.getSession();
  let userid;
  let useremail;

  let parent_html = document.createElement('div');
  parent_html.innerHTML = `<div id='comment_editor_footer_loader' class="ui segment"> <div class="ui active dimmer"> <div class="ui indeterminate text loader">Preparing Comment Editor</div> </div> <br/> <br/> <br/> </div> <div id='ptc_comment_editor' class='ui inverted message' style='display: none;'> </div>`;
  document.querySelector('#postBody').appendChild(parent_html);
  const parent_editor = document.getElementById('ptc_comment_editor');

  if (userData.error || !userData.data.session) {
    parent_editor.classList.add('ui', 'compact', 'floating', 'warning', 'message', 'inverted');
    parent_editor.innerHTML = `<h4>Please <a class="ui blue basic label" href="https://storehaccounts.blogspot.com/p/sign-in-with-storehaccounts.html"><i icon="blind icon"></i>create account first</a> before commenting :)</h4>`;
    parent_editor.style.display = 'block';
    document.getElementById('comment_editor_footer_loader').remove();
    if (userData.error) window.alert(`${userData.error.message}`);
    return;
  } else if (userData.data.session) {
    // building comment_editor_html
    // appending to postBody
    useremail = userData.data.session.user.email;
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

    let tempo_comment_html = document.createElement('div');
    tempo_comment_html.innerHTML = `<div class='ui floating message'><div class='header'>Add your comment</div></div> <div id="ql-comment-editor" class='ui loading inverted attached segment'> </div> <div id="ql-toolbar-container" class='ui inverted attached segment'> <div class="ui blue image label"> <img src="${userData.data[0].prof_img}"> ${userData.data[0].username} </div> <span class="ql-formats"> <button class="ql-bold"></button> <button class="ql-italic"></button> <button class="ql-underline"></button> <button class="ql-strike"></button> </span> <span class="ql-formats"> <select class="ql-color"></select> <select class="ql-background"></select> </span> <span class="ql-formats"> <button class="ql-header" value="1"></button> <button class="ql-header" value="2"></button> <button class="ql-blockquote"></button> <button class="ql-code-block"></button> </span> <span class="ql-formats"> <button class="ql-list" value="ordered"></button> <button class="ql-list" value="bullet"></button> </span> <span class="ql-formats"> <button class="ql-link"></button> <button class="ql-image"></button> <button class="ql-video"></button> </span> <span class="ql-formats"> <button class="ql-clean"></button> </span> </div> <div class='ui inverted attached segment'> <button id='postBtn' class='ui blue disabled inverted button'>Type something...</button> </div>`;
    document.getElementById('ptc_comment_editor').appendChild(tempo_comment_html);
  }

  const postBtn = document.getElementById('postBtn');
  const editor = document.getElementById('ql-comment-editor');

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
    placeholder: 'Make it something good bruh...',
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

  quill.on('text-change', function (delta, old, source) {
    if (source == 'user') {
      if (quill.getLength() > limit) {
        quill.deleteText(limit, quill.getLength());
      } else if (quill.getLength() < minlimit) {
        postBtn.innerText = "Type something...";
        postBtn.classList.add('disabled');
      } else if (quill.getLength() > minlimit && quill.getLength() < limit) {
        postBtn.classList.remove('disabled');
        postBtn.innerText = "Post";
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
    return quill.getSemanticHTML();
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

  // Posting the comment
  postBtn.addEventListener('click', async () => {
    postBtn.classList.add('disabled');
    postBtn.innerHTML = `<i class="loading spinner icon"></i>Posting...`;
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

    // posting to comments table
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

    
    // posting to websitepost table
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
    // posting to comments-website-post table
    data = await supabase.from('websiteposts-comments').insert({
      date: "now()",
      websiteposts_id: post_id,
      comments_id: comment_id
    });

    if (data.error) {
      window.alert(`Some encountered problem!
        ~
        ~
        Logs:
        ${data.error.message}`);
      return;
    }

    // posting to users-comments table
    data = await supabase.from('users-comments').insert({
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
    postBtn.innerHTML = `Comment Posted!!`;
    postBtn.classList.add('green');
    setTimeout(() => {
      postBtn.classList.remove('green');
      editor.querySelector('div').setAttribute('contenteditable', true);
      document.querySelector('#ql-comment-editor div').innerHTML = '';
    }, 1000);
  });

  var ImgurJS = {
    uploadB64Img: function (file) {
      return new Promise((resolve, reject) => {
        var fd = new FormData();
        fd.append("image", file); // Append the file
        var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
        xhr.open("POST", "https://api.imgur.com/3/image"); // Boooom!
        xhr.onload = function () {
          if (xhr.status == 200) {
            let data = JSON.parse(xhr.responseText).data;
            resolve(data);
          }
          else {
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
})();
