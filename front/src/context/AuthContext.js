import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, database } from "../firebase";
import axios from "axios";
import { onSnapshot, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}

export function AuthProvider({ children }) {
  const [userDetails, setUserDetails] = useState();
  const [userPreferences, setUserPreferences] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  function addUser() {
    axios.post("/users/create", {
      id: userDetails.uid,
      name: userDetails.displayName,
    });
  }

  useEffect(() => {
    if (!userDetails) return;
    const checkExist = async () => {
      if (!userDetails) return
      const doc = await getDoc(database.users, userDetails.uid);
      if (!doc.exists()) addUser()
    }
    return () => checkExist()
  }, [userDetails]);

  useEffect(() => {
    if (!userDetails) return;
    const unsubscribe = onSnapshot(doc(database.users, userDetails.uid), (doc) => {
      setUserPreferences({ ...doc.data(), uid: doc.id });
    })
    return () => unsubscribe()
  }, [userDetails])

  function logOut() {
    signOut(auth);
    setUserPreferences(null);
    setLoggedIn(false)
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

  useEffect(() => {
    if (userDetails && userPreferences)
      setLoggedIn(true);
  }, [userDetails, userPreferences]);

  return (
    <AuthContext.Provider value={{ signInWithGoogle, logOut, user, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
