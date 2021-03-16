import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => { 
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app(); // if already initialized, use that one
      }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
      .signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        return signedInUser;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  }

export  const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fb user after sign in',user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }

export  const handleSignOut = () => {
    firebase.auth()
      .signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
        return signedOutUser;
        
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

//   export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       // Signed in 
//       const newUserInfo = { ...user };
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//     })
//     .catch((error) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//       updateUserName(user.name);
//     });
//   }

//   export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       console.log('Sign in user info', res.user);
//     })
//     .catch((error) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//     });
//   }

// export  const updateUserName = name => {
//     var user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name,
//     }).then(() => {
//       console.log('user name updated successfully');
//     }).catch((error) => {
//       console.log(error);
//     });
//   }