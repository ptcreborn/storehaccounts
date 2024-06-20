

var quillEditor = {
    quill: '',
    init: function (elem_id) {
        quill = new Quill('#' + elem_id, {
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
                            'size': ['small', false, 'large']
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

    setContent: function (htmlValue) {
        quillEditor.quill.clipboard.dangerouslyPasteHTML(0, htmlValue);
    },

    getContent: function () {
        return quillEditor.quill.getSemanticHTML();
    }
}
