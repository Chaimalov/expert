import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { auth } from "../firebase";
import { generateAvatar } from "../utils";

export type ExpertUser = User & {
  products: Record<string, unknown>;
  notifyBefore: number;
};

const AuthContext = createContext<{
  signInWithGoogle: Function;
  logOut: Function;
  signUpWithEmailAndPassword: Function;
  signIn: Function;
  user: ExpertUser;
  loggedIn: string;
  deleteAccount: Function;
}>({} as any);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [providerUser, setProviderUser] = useState<User>();
  const [userRecord, setUserRecord] = useState<User>();
  const [logInState, setLogInState] = useState<"success" | "error" | "pending">(
    "pending"
  );

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setProviderUser((await signInWithPopup(auth, provider)).user);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setProviderUser(user);
    } catch (error) {
      throw new Error("password is incorrect");
    }
  };

  const signUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setProviderUser(user);
    } catch (error) {
      signIn(email, password);
    }
  };

  function logOut() {
    signOut(auth);
  }

  const deleteAccount = () => {
    if (!user.uid) return;

    api.execute(api.user.deleteAccount(user.uid));
    logOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return setLogInState("error");
      setProviderUser(currentUser);
    });

    return unsubscribe;
  }, [providerUser]);

  useEffect(() => {
    const getRecord = async (providerUser: Readonly<User>) => {
      const record = await api.user.getUser(providerUser.uid);

      if (!providerUser.photoURL && user.email) {
        record.photoURL = generateAvatar(user.email.charAt(0), "white");
      }

      setUserRecord(record);
      setLogInState("success");
    };

    if (providerUser) getRecord(providerUser);
  }, [providerUser]);

  const user = {
    ...providerUser,
    ...userRecord,
  } as ExpertUser;

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        logOut,
        signUpWithEmailAndPassword,
        signIn,
        user,
        loggedIn: logInState,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
