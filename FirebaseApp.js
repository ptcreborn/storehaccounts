

import {
    initializeApp
}
from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
}
from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    child,
    get
}
from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

var FirebaseApp {
    firebaseConfig: {
        apiKey: "AIzaSyDXd2n0yLGZS1mkFgLRctgtVZadsOK7JIs",
        authDomain: "login-project-2efef.firebaseapp.com",
        databaseURL: "https://login-project-2efef-default-rtdb.firebaseio.com",
        projectId: "login-project-2efef",
        storageBucket: "login-project-2efef.firebasestorage.app",
        messagingSenderId: "470352098",
        appId: "1:470352098:web:4a095dc9e58a5ee461debb"
    },

    app: initializeApp(FirebaseApp.firebaseConfig),
    auth: getAuth(FirebaseApp.app),
    provider: new GoogleAuthProvider(),
    auth.languageCode: 'en',

    initialize: function () {
        // Import the functions you need from the SDKs you need
        import {
            initializeApp
        }
        from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
        import {
            getAuth,
            GoogleAuthProvider,
            signInWithPopup
        }
        from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

        import {
            getDatabase,
            ref,
            set,
            child,
            get
        }
        from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

        // for Storehaccounts!

    },

    signInWithGoogle: function () {
        signInWithPopup(FirebaseApp.auth, FirebaseApp.provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            let data = {
                "fullname": user.displayName,
                "emailVerified": user.emailVerified,
                "email": user.email,
                "photoURL": user.photoURL,
                "UID": user.uid
            }

            FirebaseApp.writeDataJSON(user.uid, "users", data);

        }).catch((error) => {
            window.error(error);
        })
    },

    signOutGoogle: function () {},

    writeDataJSON: function (uid, path, data) {
        const db = getDatabase();
        set(ref(db, path + '/' + uid), data);
    },

    getDataJSON: function (path) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, path)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return null;
            }
        }).catch((error) => {
            window.error(error);
        });
    }
}
