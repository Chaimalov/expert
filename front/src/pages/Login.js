import React from 'react'
import {firebase, provider, auth, signInWithRedirect, StyledFirebaseAuth } from '../firebase'


// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};
export default function login() {
  return (
    <div>{signInWithRedirect(firebase.auth(), provider)}</div>
    
  )
}
