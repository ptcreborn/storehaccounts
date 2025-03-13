function modalCreator(initiatorID, modalID, titleText, bodyText, buttonIcon, buttonText, moreButtonHTML) {
    let body = '<!--The Modal--> <div class="modal" id="' + modalID + '"> <!--Modal content--> <div class="ui info message modal-content"> <div class="header">' + titleText + '</div><div class="content"> <small>' + bodyText + '</small><br><br> <a href="https://storehaccounts.blogspot.com/p/create-account.html" class="ui blue image label"><i class="' + buttonIcon + '"></i>' + buttonText + '</a>' + moreButtonHTML + '</div> </div> </div>';
    let doc = document.createElement('div');
    doc.innerHTML = body;
    document.querySelector('body').appendChild(doc);
    let modal = document.getElementById(modalID);
    let content = modal.querySelector(".modal-content");
    content.style.width = '30%';

    let btn = document.getElementById(initiatorID);
    btn.onclick = function () {
        modal.style.display = "block";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
