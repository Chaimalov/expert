import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../firebase";
import axios from "axios";
import { onSnapshot, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
const signIn = async (email, password, setError) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    setError("password is incorrect");
  }
};

const signUpWithEmailAndPassword = async (email, password, setError) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    signIn(email, password, setError);
    // setError("email already exists. try sign in");
  }
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
