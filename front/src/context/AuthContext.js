import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [providerUser, seProviderUser] = useState();
  const [userRecord, setUserRecord] = useState();
  const [status, setStatus] = useState(false);

  const loggedIn = providerUser && userRecord;

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    seProviderUser(await (await signInWithPopup(auth, provider)).user);
  };

  const signIn = async (email, password, setError) => {
    try {
      seProviderUser(
        await (
          await signInWithEmailAndPassword(auth, email, password)
        ).user
      );
    } catch (error) {
      setError("password is incorrect");
    }
  };

  const signUpWithEmailAndPassword = async (email, password, setError) => {
    try {
      seProviderUser(
        await (
          await createUserWithEmailAndPassword(auth, email, password)
        ).user
      );
    } catch (error) {
      signIn(email, password, setError);
    }
  };

  function logOut() {
    signOut(auth);
  }

  const deleteAccount = async () => {
    await api.user.deleteAccount(user.uid);
    logOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      seProviderUser(currentUser);
    });
    return unsubscribe;
  }, [providerUser]);

  useEffect(() => {
    const getRecord = async () => {
      const record = await api.user.getUser(providerUser.uid);
      if (!providerUser.photoURL) {
        record.photoURL = "http://www.zooniverse.org/assets/simple-avatar.png";
      }
      setUserRecord(record);
    };
    if (providerUser) getRecord();
  }, [providerUser, status]);

  const user = {
    ...providerUser,
    ...userRecord,
  };

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        logOut,
        signUpWithEmailAndPassword,
        signIn,
        user,
        loggedIn,
        setStatus,
        status,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
