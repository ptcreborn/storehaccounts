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
    get,
    push,
    update
}
from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

export var FirebaseApp = {
    firebaseConfig: '',
    app: '',
    auth: '',
    provider: '',

    initialize: function () {
        FirebaseApp.firebaseConfig = {
            apiKey: "AIzaSyAC5eiXYGlEslYrau8A7DVSvmUszgaD3OI",
            authDomain: "storehaccounts-users.firebaseapp.com",
            databaseURL: "https://storehaccounts-users-default-rtdb.firebaseio.com",
            projectId: "storehaccounts-users",
            storageBucket: "storehaccounts-users.firebasestorage.app",
            messagingSenderId: "445561746761",
            appId: "1:445561746761:web:4820f757f522f20f791698",
            measurementId: "G-MPP91JYHVN"
        };
        FirebaseApp.app = initializeApp(FirebaseApp.firebaseConfig);
        FirebaseApp.auth = getAuth(FirebaseApp.app);
        FirebaseApp.auth.languageCode = 'en';
        FirebaseApp.provider = new GoogleAuthProvider();
    },

    signInWithGoogle: async function (callback) {
        signInWithPopup(FirebaseApp.auth, FirebaseApp.provider)
        .then(async(result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            let res = await FirebaseModule.get('https://storehaccounts-users-default-rtdb.firebaseio.com/users_lists/' + user.uid + '.json');
            if (res == "null") {
                // means new account!
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

                FirebaseApp.writeDataJSON("users", user.uid, data);
                FirebaseApp.writeDataJSON("users_lists", user.uid, new Date().getTime());
                callback();
            }
        }).catch((error) => {
            window.alert(error);
        })
    },

    isUserLoggedIn: async function () {
        let isUserLoggedIn;
        try {
            isUserLoggedIn = await FirebaseApp.verifyUserLogStatus();
        } catch (e) {
            isUserLoggedIn = null;
        }
        return isUserLoggedIn;
    },

    verifyUserLogStatus: async function () {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(FirebaseApp.auth, function (user) {
                if (user)
                    resolve(user.uid);
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

    writeDataJSON: function (path, child, data) {
        const db = getDatabase();
        set(ref(db, path + "/" + child), data);
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
            window.alert(error);
        });
    }
}
