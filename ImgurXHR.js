// USAGE YOU MUST HAVE INPUT ELEMENT
// ADD THE INPUT ID IN THE FUNCTION PARAMETER
// ADD THE STRING VARIABLE IN THE 2ND PARAMETER
// THE STRING IMGLINK WILL HOLD THE LINK OF THE IMAGE BEING UPLOADED.


var ImgurXHR = {
    uploadImgUr: function (inputID, imgLink) {
        document.getElementById(inputID).addEventListener('change', async function (e, imgLink) {
            await new Promise(function (resolve, reject) {
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
						resolve(imgLink);
                    } else {
                        window.alert('ImgurXHR error: Error in uploading... Please try again');
						reject(imgLink);
                    }
                }
                xhr.setRequestHeader('Authorization', 'Client-ID FOO');
                xhr.send(fd);
            });
        }, false);
    }
}

