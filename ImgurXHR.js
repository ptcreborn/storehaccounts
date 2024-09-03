var ImgurXHR = {
    uploadImgUr: function (inputID, imgLink) {
        document.getElementById(inputID).addEventListener('change', function (e, imgLink) {
            var file = e.target.files[0];
            if (!file || !file.type.match(/image.*/))
                return;

            var fd = new FormData();
            fd.append("image", file); // Append the file
            var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
            xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
            xhr.onload = function () {

                if (xhr.status == 200) {
                    img_file = JSON.parse(xhr.responseText).data.link;
                } else {
                    window.alert('ImgurXHR error: Error in uploading... Please try again');
                    img_file = "error uploading";
                }
            }
            xhr.setRequestHeader('Authorization', 'Client-ID FOO');
            xhr.send(fd);
        }, false);
    }
}
