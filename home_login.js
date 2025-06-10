

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

    if (user && user.data) {
        let data = await supabase.from('users').select('prof_img').eq('email', user.data.session.user.email);
        let profile = '';
        if (localStorage.getItem('ptc_user')) {
            if (JSON.parse(localStorage.getItem('ptc_user')).prof_img)
                profile = JSON.parse(localStorage.getItem('ptc_user')).prof_img;
        } else
            profile = data.data[0].prof_img;

        if (data.error) {
            window.alert("Error in retrieving profile image: " + JSON.stringify(data.error));
            return;
        }
        localStorage.setItem('ptc_user', JSON.stringify({
            prof_img: profile
        }));
        document.querySelector('#profile-circle-header').parentNode.style.display = 'block';
        document.querySelector('#profile-circle-header').innerHTML = "<img src=\"" + data.data[0].prof_img + "\"/>";
        document.querySelector('#profile-circle-header').href = "https://storehaccounts.blogspot.com/p/profile-page.html";
    }
})();
