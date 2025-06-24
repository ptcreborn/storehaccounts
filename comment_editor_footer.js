(async () => {
  // appending Quill script after load
  if(!document.getElementById('ptc_comment_editor')) return;

  const postBtn = document.getElementById('postBtn');
  const editor = document.getElementById('ql-comment-editor');
  const parent_editor = document.getElementById('ptc_comment_editor');

  // Checking if the user is logged in!
  await initFunctions(['supabase']);
  let userData = await supabase.auth.getSession();

  if (userData.error || !userData.data.session) {
    parent_editor.classList.add('ui', 'compact', 'floating', 'warning', 'message', 'inverted');
    parent_editor.innerHTML = `<h4>Please <a href="https://storehaccounts.blogspot.com/p/sign-in-with-storehaccounts.html">create account first</a> before commenting :)</h4>`;
    parent_editor.style.display = 'block';
    document.getElementById('comment_editor_footer_loader').remove();
    if (userData.error) window.alert(`${userData.error.message}`);
    return;
  }

  (() => {
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js';
    document.querySelector('body').appendChild(script);

    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    document.querySelector('body').appendChild(script);
  })();

  console.log("Added quill script");

  // setting up Quill Editor
  await initFunctions(['Quill']);
  const quill = new Quill('#ql-comment-editor', {
    modules: {
      syntax: true,
      toolbar: '#ql-toolbar-container'
    },
    placeholder: 'Make it something good bruh...',
    theme: "snow"
  });

  console.log("Quill initialized.");

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

  // listeners to handle user input
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

  // changing the theme into dark mode
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

    console.log(allImgs);

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


    console.log('Done');

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


    console.log('posting to comments table');

    let comment_id = data.data[0].id;

    // posting to websitepost table
    data = await supabase.from('website-posts').insert({
      date: "now()",
      url: window.location.href,
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

    console.log('posting to posts table');
    let post_id = data.data[0].id;

    // posting to comments-website-post table
    data = await supabase.from('websitepost-comments').insert({
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
    postBtn.classList.remove('disabled');
    postBtn.innerHTML = `Post`;
    editor.querySelector('div').setAttribute('contenteditable', true);
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
