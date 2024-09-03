// USAGE YOU MUST HAVE INPUT ELEMENT
// ADD THE INPUT ID IN THE FUNCTION PARAMETER
// ADD THE STRING VARIABLE IN THE 2ND PARAMETER
// THE STRING IMGLINK WILL HOLD THE LINK OF THE IMAGE BEING UPLOADED.


var ImgurXHR = {
    uploadImgUr: function (inputID, imgLink) {
        document.getElementById(inputID).addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (!file || !file.type.match(/image.*/))
                return;

            var fd = new FormData();
            fd.append("image", file); // Append the file
            var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
            xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
            xhr.onload = function () {

                if (xhr.status == 200) {
                    imgLink = JSON.parse(xhr.responseText).data.link;
                    // callback(img_file);
                } else {
                    window.alert('ImgurXHR error: Error in uploading... Please try again');
                    imgLink = "Error Uploading in ImgUr";
                    //callback("error in uploading...");
                }
            }
            xhr.setRequestHeader('Authorization', 'Client-ID FOO');
            xhr.send(fd);
        }, false);
    }
}


