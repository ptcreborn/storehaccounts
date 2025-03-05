(function () {

    let body = '<!--The Modal--> <div class="modal" id="loginModal"> <!--Modal content--> <div class="ui info message modal-content"> <div class="header"> Welcome to Community!</div><div class="content"> <small>Create an account for free! Store your progress in this website and make your access in every resources here for free!</small><br><br> <a href="https://storehaccounts.blogspot.com/p/create-account.html" class="ui blue image label"><i class="google icon"></i>Sign in with Google</a> </div> </div> </div>';
    let doc = document.createElement('div');
    doc.innerHTML = body;
    document.querySelector('body').appendChild(doc);
    let modal = document.getElementById("loginModal");
    let content = modal.querySelector(".modal-content");
    content.style.width = '30%';

    let btn = document.getElementById("profile-circle-header");
    btn.onclick = function () {
        modal.style.display = "block";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})();
