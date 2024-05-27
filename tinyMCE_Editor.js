

var tinyMCE_Editor = {
    // note this needs a script tag in the </head> using defer
    // <script defer='defer' referrerpolicy='origin' src='https://cdn.tiny.cloud/1/o5qu1o2naca2z6sbvhvmk99zkszzkl1g66h4wkg2riy4zlz9/tinymce/7/tinymce.min.js'/>

    postContent: function () {
        return tinymce.get("tinymce_ptc_editor").getContent();
    },

    setupEditor: function (parentElem) {
        document.querySelector('#' + parentElem).innerHTML = "<textarea id='tinymce_ptc_editor'></textarea>";

        tinymce.init({
            selector: '#tinymce_ptc_editor',
            menubar: false,
            toolbar_mode: 'wrap',
            toolbar_drawer: false,
            images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', 'https://api.imgbb.com/1/upload?key=07f1351d4e674784012d92ae6e03b49d');

                xhr.upload.onprogress = (e) => {
                    progress(e.loaded / e.total * 100);
                };

                xhr.onload = () => {
                    if (xhr.status === 403) {
                        reject({
                            message: 'HTTP Error: ' + xhr.status,
                            remove: true
                        });
                        return;
                    }

                    if (xhr.status < 200 || xhr.status >= 300) {
                        reject('HTTP Error: ' + xhr.status);
                        return;
                    }

                    const json = JSON.parse(xhr.responseText);

                    if (!json) {
                        reject('Invalid JSON: ' + xhr.responseText);
                        return;
                    }

                    resolve(json.data.thumb.url);
                };

                xhr.onerror = () => {
                    reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
                };

                const formData = new FormData();
                formData.append('image', blobInfo.blob());
                xhr.send(formData);
            }),
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
            toolbar1: 'blocks alignleft aligncenter alignright alignjustify forecolor backcolor numlist bullist  outdent indent  blockquote undo redo link unlink image media table hr bold italic underline strikethrough cut copy paste',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [{
                    value: 'First.Name',
                    title: 'First Name'
                }, {
                    value: 'Email',
                    title: 'Email'
                },
            ],
            mobile: {
                toolbar_mode: 'wrap'
            },
            skin: 'oxide-dark',
            content_css: 'dark',
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        });
    }
}
