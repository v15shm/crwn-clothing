import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCgfKzSuHCeesgfbmWQjKRIdFReQ9ct2DE",
    authDomain: "crwn-db-8a687.firebaseapp.com",
    databaseURL: "https://crwn-db-8a687.firebaseio.com",
    projectId: "crwn-db-8a687",
    storageBucket: "crwn-db-8a687.appspot.com",
    messagingSenderId: "590311584980",
    appId: "1:590311584980:web:5b3b83fc81c54817f87741"
  };




  
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const {displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userRef;

  };  


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);