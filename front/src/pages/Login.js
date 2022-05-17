import React, { createRef, useState, useEffect } from 'react'
import { firebase, createUserWithEmailAndPassword } from "../firebase";
import Input from "../components/Input"
import Button from '../components/Button';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Transition from '../Transition';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

// function signUp(email, password) {

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in 
//       const user = userCredential.user;
//       console.log(user)
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// }

export default function Login() {
  // const emailRef = createRef()
  // const passRef = createRef()

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <Transition>
        <div className='center'>
          <h1>sign-in</h1>
          <h2>Please sign-in:</h2>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </Transition>
    );
  }
  return (
    <Transition>
      <div>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <Button secondary onClick={() => firebase.auth().signOut()}>Sign-out</Button>
      </div>
    </Transition >
  );
}
