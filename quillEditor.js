/*


var quillEditor = {
    quill: '',
    init: function (elem_id) {
        quillEditor.quill = new Quill('#' + elem_id, {
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
    },

    getText: function() {
        return quillEditor.quill.getText();
    }
}

*/




var quillEditor = {
    quill: '',
    init: function (elem_id) {
        quillEditor.quill = new Quill('#' + elem_id, {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote'],
                     // custom button values , 'code-block'['link']

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
    },

    getText: function() {
        return quillEditor.quill.getText();
    }
}
