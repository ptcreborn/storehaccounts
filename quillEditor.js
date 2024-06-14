

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
        return q.getSemanticHTML();
    },

    setContents: function (html) {
		let q = quillEditor.quill;
        const delta = q.clipboard.convert(html);
        q.setContents(delta, 'silent');
    }
}
