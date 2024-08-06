import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';
import { auth } from '../firebase';
import { generateAvatar } from '../utils';

export type ExpertUser = User & {
  products: Record<string, unknown>;
  notifyBefore: number;
  id: string;
  email: string;
  isAdmin: boolean;
};

type AuthContextProps = {
  signInWithGoogle: () => Promise<void>;
  logOut: () => void;
  signUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  user: ExpertUser;
  loggedIn: 'success' | 'error' | 'pending';
  deleteAccount: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [providerUser, setProviderUser] = useState<User>();
  const [userRecord, setUserRecord] = useState<User>();
  const [logInState, setLogInState] =
    useState<AuthContextProps['loggedIn']>('pending');

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLogInState('pending');

    const result = await signInWithPopup(auth, provider);
    await api.user.createUser(result.user.displayName ?? '',result.user.email ?? '')
 
    setProviderUser(result.user);
    setLogInState('success');
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setProviderUser(user);
      setLogInState('success');
    } catch (error) {
      console.error(error);
      setLogInState('error');
      throw new Error('password is incorrect');
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
      console.error(error);
      setLogInState('error');
      throw new Error('SignUp failed');
    }
  };

  const logOut = () => {
    signOut(auth);
    setLogInState('pending');
  }

  const deleteAccount = () => {
    if (!user?.uid) return;

    try {
      api.execute(api.user.deleteAccount(user.email));
      logOut();
    } catch (error) {
      console.error(error);
      setLogInState('error');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setProviderUser(currentUser);
        setLogInState('success');
      } else {
        setLogInState('error');
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getRecord = async (providerUser: Readonly<User>) => {
      try {
        const record = await api.user.getUser(providerUser.email ?? '');
        if (!providerUser.photoURL && providerUser.email) {
          record.photoURL = generateAvatar(
            providerUser.email.charAt(0),
            'white'
          );
        }
        setUserRecord(record);
      } catch (error) {
        console.error(error);
        setLogInState('error');
      }
    };

    if (providerUser) {
      getRecord(providerUser);
    }
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
  return useContext(AuthContext) as AuthContextProps;
};
