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

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setUser(await signInWithPopup(auth, provider));
  };

  const signIn = async (email, password, setError) => {
    try {
      setUser(await signInWithEmailAndPassword(auth, email, password));
    } catch (error) {
      setError("password is incorrect");
    }
  };

  const signUpWithEmailAndPassword = async (email, password, setError) => {
    try {
      setUser(await createUserWithEmailAndPassword(auth, email, password));
    } catch (error) {
      signIn(email, password, setError);
      // setError("email already exists. try sign in");
    }
  };

  // useEffect(() => {
  //   if (!userDetails) return;
  //   const checkExist = async () => {
  //     if (!userDetails) return;
  //     const doc = await getDoc(database.users, userDetails.uid);
  //     if (!doc.exists()) addUser();
  //   };
  //   return () => checkExist();
  // }, [userDetails]);

  // useEffect(() => {
  //   if (!userDetails) return;
  //   const unsubscribe = onSnapshot(
  //     doc(database.users, userDetails.uid),
  //     (doc) => {
  //       setUserPreferences({ ...doc.data(), uid: doc.id });
  //     }
  //   );
  //   return () => unsubscribe();
  // }, [userDetails]);

  function logOut() {
    signOut(auth);
    // setUserPreferences(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [user]);

  const loggedIn = !!user;

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
