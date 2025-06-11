

(async () => {
    // this function is checking whether the user is logged in or not.
    await initFunctions(['supabase', 'ModalCreator']);
    let user = await supabase.auth.getSession();

    if (!user.data.session || user.error) {
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
    } else {
        let email = user.data.session.user.email;
        let isMember = await supabase.from('users').select('email').eq('email', email);

        if (isMember.error) {
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

        if (isMember.data.length == 0) {
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
    }

    if (user && user.data) {
        let data = await supabase.from('users').select('prof_img').eq('email', user.data.session.user.email);
        let profile = data.data[0].prof_img;
        if (data.error) {
            window.alert("Error in retrieving profile image: " + JSON.stringify(data.error));
            return;
        }
        document.querySelector('#profile-circle-header').parentNode.style.display = 'block';
        document.querySelector('#profile-circle-header').innerHTML = "<img src=\"" + profile + "\"/>";
        document.querySelector('#profile-circle-header').href = "https://storehaccounts.blogspot.com/p/profile-page.html";
    }
})();
