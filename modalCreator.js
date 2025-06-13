

var ModalCreator = {
    initiator: function (initiatorID, modalID, titleText, bodyText, buttonIcon, buttonText, buttonLink, moreButtonHTML) {
        let btn = document.getElementById(initiatorID);
        btn.parentNode.style.display = 'block';
        btn.onclick = function () {
            let doc = document.createElement('div');
            let body = '<!--The Modal--> <div class="modal" id="' + modalID + '"> <!--Modal content--> <div class="ui info message modal-content"> <div class="header">' + titleText + '</div><div class="content"> <small>' + bodyText + '</small><br><br> <a href="' + buttonLink + '" class="ui blue image label"><i class="' + buttonIcon + '"></i>' + buttonText + '</a>' + moreButtonHTML + '</div> </div> </div>';                                      
            doc.innerHTML = body;
            document.querySelector('body').appendChild(doc);
            let modal = document.getElementById(modalID);
            let content = modal.querySelector(".modal-content");
            content.style.width = '30%';
            modal.style.display = "block";
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    doc.remove();
                }
            }
        }
    },
    pop: function (modalID, titleText, bodyText, buttonIcon, buttonText, buttonLink, moreButtonHTML) {
        let doc = document.createElement('div');
        let body = '<!--The Modal--> <div class="modal" id="' + modalID + '"> <!--Modal content--> <div class="ui info message modal-content"> <div class="header">' + titleText + '</div><div class="content"> <small>' + bodyText + '</small><br><br> <a href="' + buttonLink + '" class="ui blue image label"><i class="' + buttonIcon + '"></i>' + buttonText + '</a>' + moreButtonHTML + '</div> </div> </div>';                                      
        doc.innerHTML = body;
        document.querySelector('body').appendChild(doc);
        let modal = document.getElementById(modalID);
        let content = modal.querySelector(".modal-content");
        content.style.width = '30%';
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                doc.remove();
            }
        }
    },
    popFunction: function (modalID, titleText, bodyText, buttonIcon, buttonText, buttonFunc) {
        let doc = document.createElement('div');
        let body = '<!--The Modal--> <div class="modal" id="' + modalID + '"> <!--Modal content--> <div class="ui info message modal-content"> <div class="header">' + titleText + '</div><div class="content"> <small>' + bodyText + '</small><br><br> <a class="ui blue image label"><i class="' + buttonIcon + '"></i>' + buttonText + '</a></div> </div> </div>';                                      
        doc.innerHTML = body;
        document.querySelector('body').appendChild(doc);
        let modal = document.getElementById(modalID);
        let content = modal.querySelector(".modal-content");
        content.style.width = '30%';
        modal.style.display = "block";
        document.querySelector('#' + modalID + ' a').addEventListener('click', async () => {
            await buttonFunc();
        });
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                doc.remove();
            }
        }
    }
}
