import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../firebase";
import axios from "axios";
import { onSnapshot, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}
const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const signUpWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential.user);
      return userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
};

export function AuthProvider({ children }) {
  const [userDetails, setUserDetails] = useState();
  const [userPreferences, setUserPreferences] = useState();

  function addUser() {
    axios.post("/users/create", {
      id: userDetails.uid,
      name: userDetails.displayName,
    });
  }

  useEffect(() => {
    if (!userDetails) return;
    const checkExist = async () => {
      if (!userDetails) return;
      const doc = await getDoc(database.users, userDetails.uid);
      if (!doc.exists()) addUser();
    };
    return () => checkExist();
  }, [userDetails]);

  useEffect(() => {
    if (!userDetails) return;
    const unsubscribe = onSnapshot(
      doc(database.users, userDetails.uid),
      (doc) => {
        setUserPreferences({ ...doc.data(), uid: doc.id });
      }
    );
    return () => unsubscribe();
  }, [userDetails]);

  function logOut() {
    signOut(auth);
    setUserPreferences(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserDetails(currentUser);
    });
    return unsubscribe;
  }, []);

  const user = {
    ...userDetails,
    ...userPreferences,
  };

  const loggedIn = userDetails && userPreferences;

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        logOut,
        signUpWithEmailAndPassword,
        signIn,
        user,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
