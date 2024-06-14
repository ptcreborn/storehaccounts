

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
		return quillEditor.quill.getSemanticHTML();
	},

    setContents: function (html) {
		quillEditor.quill.setText(html);
	}
}
