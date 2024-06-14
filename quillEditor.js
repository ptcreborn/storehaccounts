

var quillEditor = {
    quill: '',
    initiate: function (editor) {
        quillEditor.quill = new Quill('#' + editor, {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote', 'code-block'],
                    ['link'], // custom button values

                    [{
                            'list': 'ordered'
                        }, {
                            'list': 'bullet'
                        }, {
                            'list': 'check'
                        }
                    ],

                    [{
                            'size': ['small', false, 'large', 'huge']
                        }
                    ], // custom dropdown
                    [{
                            'align': ''
                        }, {
                            'align': 'center'
                        }, {
                            'align': 'right'
                        }
                    ]
                ],
            },
            placeholder: "Compose a thread",
            theme: 'snow', // or 'bubble'
        });
    },

    getContents: function () {
		let q = quillEditor.quill;
		let temp_div = document.createElement('div');
		temp_div.setAttribute('class', 'ql-editor');
		temp_div.style.color = 'white';
		temp_div.style.background = 'black';
		temp_div.innerHTML = q.getSemanticHTML;
        return temp_div;
    },

    setContents: function (html) {
		let q = quillEditor.quill;
        const delta = q.clipboard.convert(html);
        q.setContents(delta, 'silent');
    }
}
