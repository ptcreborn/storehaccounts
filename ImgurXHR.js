// USAGE YOU MUST HAVE INPUT ELEMENT
// ADD THE INPUT ID IN THE FUNCTION PARAMETER
// ADD THE OBJECT VARIABLE IN THE 2ND PARAMETER
// THE OBJECT IMGLINK WILL HOLD THE LINK OF THE IMAGE BEING UPLOADED.

// imgDIV is the div that holds all the uploaded images.


var ImgurXHR = {
    uploadImgUr: function (inputID, imgDIV) {
        document.getElementById(inputID).addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (!file || !file.type.match(/image.*/))
                return;

            var fd = new FormData();
            fd.append("image", file); // Append the file
            var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
            xhr.open("POST", "https://api.imgur.com/3/image"); // Boooom!
            xhr.onload = function () {

                if (xhr.status == 200) {
                    let temp_img = document.createElement('img');
                    temp_img.src = JSON.parse(xhr.responseText).data.link;
                    imgDIV.innerHTML = '';
                    imgDIV.appendChild(temp_img);
                    // callback(img_file);
                } else {
                    window.alert('ImgurXHR error: Error in uploading... Please try again');
                    imgLink.error = "Error Uploading in ImgUr";
                }
            }
            xhr.setRequestHeader('Authorization', 'Client-ID 33f63d5902f27e5');
            xhr.send(fd);
        }, false);
    }
}


