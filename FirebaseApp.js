import {
    initializeApp
}
from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
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

export var FirebaseApp = {
    firebaseConfig: '',
    app: '',
    auth: '',
    provider: '',

    initialize: function () {
        FirebaseApp.firebaseConfig = {
            apiKey: "AIzaSyDXd2n0yLGZS1mkFgLRctgtVZadsOK7JIs",
            authDomain: "login-project-2efef.firebaseapp.com",
            databaseURL: "https://login-project-2efef-default-rtdb.firebaseio.com",
            projectId: "login-project-2efef",
            storageBucket: "login-project-2efef.firebasestorage.app",
            messagingSenderId: "470352098",
            appId: "1:470352098:web:4a095dc9e58a5ee461debb"
        };
        FirebaseApp.app = initializeApp(FirebaseApp.firebaseConfig);
        FirebaseApp.auth = getAuth(FirebaseApp.app);
        FirebaseApp.auth.languageCode = 'en';
        FirebaseApp.provider = new GoogleAuthProvider();
    },

    signInWithGoogle: function (data) {
        signInWithPopup(FirebaseApp.auth, FirebaseApp.provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            let data = {
                "public": {
					"fullname": user.displayName,
					"emailVerified": user.emailVerified,
					"photoURL": user.photoURL,
				},
                "secret": {
					"email": user.email,
				}
            }

            FirebaseApp.writeDataJSON(user.uid, "users", data);

        }).catch((error) => {
            window.error(error);
        })
    },

    isUserLoggedIn: async function () {
        let isUserLoggedIn = false;
        try {
            await FirebaseApp.verifyUserLogStatus();
            isUserLoggedIn = true;
        } catch (e) {
            isUserLoggedIn = false;
        }
        return isUserLoggedIn;
    },

    verifyUserLogStatus: async function () {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(FirebaseApp.auth, function (user) {
                if (user)
                    resolve(true);
                else
                    reject("User not logged in.");
            });
        });
    },

    signOutUser: function () {
        signOut(FirebaseApp.auth).then(() => {
            console.log("Signed out successfully");
        }).catch((error) => {
            window.alert("Error " + error);
        });
    },

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
