import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export const initializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      const { displayName, photoURL, email } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        photo: photoURL,
        email: email,
        success: true,
      };
      return signedInUser;
      console.log(displayName, photoURL, email);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
 return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var credential = result.credential;
      var accessToken = credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        photo: "",
        email: "",
      };
      return signedOutUser;
    })
    .catch((error) => {});
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email[0], password[0])
    .then((res) => {
      let newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      return(newUserInfo);
      updateUserName(name);
    })
    .catch((error) => {
      let newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email[0], password[0])
    .then((res) => {
      let newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      return newUserInfo;
    })
    .catch((error) => {
      let newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  var user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name[0],
    })
    .then(function () {
      console.log("user name updated successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
};
