

(async () => {
    // this function is checking whether the user is logged in or not.

    let user = await supabase.auth.getSession();

    if (!user.data.session || user.error) {
        await initFunctions(['ModalCreator']);
        ModalCreator.initiator(
            'profile-circle-header',
            'loginModal',
            'Welcome to Community!',
            '<br/>Sign in and create your account with Storehaccounts. <br/>Store all the progress of downloads, battle cats packs, bcu tools and account requests. <br/>Also share your work with others who can love it and we will make a better mod out of community ideas.',
            'user circle icon',
            'Sign in Now',
            'https://storehaccounts.blogspot.com/p/sign-in-with-storehaccounts.html',
            '');
        return;
    }

    if(user && user.data) {
        let user_data = user.data.session.user.user_metadata;
        document.querySelector('#profile-circle-header').parentNode.style.display = 'block';
        document.querySelector('#profile-circle-header').innerHTML = "<img src=\"" + user_data.avatar_url + "\"/>";
        document.querySelector('#profile-circle-header').href = "https://storehaccounts.blogspot.com/p/profile-page.html";
    }
})();
