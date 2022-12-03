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
import { generateAvatar } from "../utils";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [providerUser, setProviderUser] = useState();
  const [userRecord, setUserRecord] = useState();
  const [loggedIn, setLoggedIn] = useState("pending");
  const goTo = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setProviderUser(await (await signInWithPopup(auth, provider)).user);
  };

  const signIn = async (email, password, setError) => {
    try {
      setProviderUser(
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
      setProviderUser(
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

  const deleteAccount = () => {
    api.execute(api.user.deleteAccount(user.uid));
    logOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) setLoggedIn(false);
      setProviderUser(currentUser);
    });
    return unsubscribe;
  }, [providerUser]);

  useEffect(() => {
    const getRecord = async () => {
      const record = await api.user.getUser(providerUser.uid);
      if (!providerUser.photoURL) {
        record.photoURL = generateAvatar(user.email.charAt(0), "white");
      }
      setUserRecord(record);
      setLoggedIn(true);
      goTo("/");
    };
    if (providerUser) getRecord();
  }, [providerUser]);

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
