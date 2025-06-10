var ImgurJS = {
    uploadImgUr: function (inputID, imgSRC) {
        document.getElementById(inputID).addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (!file || !file.type.match(/image.*/))
                return;

            var fd = new FormData();
            fd.append("image", file); // Append the file
            var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
            xhr.open("POST", "https://api.imgur.com/3/image"); // Boooom!
            xhr.onload = function () {
                if (xhr.status == 200) 
                    imgSRC.src = JSON.parse(xhr.responseText).data.link;
                else {
                    window.alert('ImgurXHR error: Error in uploading... Please try again');
                    imgLink.error = "Error Uploading in ImgUr";
                }
            }
            xhr.setRequestHeader('Authorization', 'Client-ID 33f63d5902f27e5');
            xhr.send(fd);
        }, false);
    }
}



